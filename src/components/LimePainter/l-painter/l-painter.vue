<template>
  <view class="lime-painter" ref="limepainter">
    <view v-if="canvasId && size" :style="size + customStyle">
      <!-- #ifndef APP-NVUE -->
      <canvas
        class="lime-painter__canvas"
        v-if="use2dCanvas"
        :id="canvasId"
        type="2d"
        :style="size"
      ></canvas>
      <canvas
        class="lime-painter__canvas"
        v-else
        :canvas-id="canvasId"
        :style="size"
        :id="canvasId"
        :width="boardWidth * dpr"
        :height="boardHeight * dpr"
      ></canvas>

      <!-- #endif -->
      <!-- #ifdef APP-NVUE -->
      <web-view
        v-if="hybrid || isInitFile"
        :style="size"
        ref="webview"
        :src="
          hybrid
            ? '/hybrid/html/lime-painter/index.html'
            : '_doc/uni_modules/lime-painter/index.html'
        "
        class="lime-painter__canvas"
        @pagefinish="onPageFinish"
        @error="onError"
        @onPostMessage="onMessage"
      >
      </web-view>
      <!-- #endif -->
    </view>
    <slot />
  </view>
</template>

<script>
import { parent } from '../common/relation'
//  #ifndef APP-NVUE
import {
  toPx,
  compareVersion,
  sleep,
  base64ToPath,
  pathToBase64,
  isBase64
} from './utils'
import Painter from './painter'
//  #endif
//  #ifdef APP-NVUE
import {
  toPx,
  sleep,
  base64ToPath,
  pathToBase64,
  getImageInfo,
  isBase64,
  useNvue
} from './utils'
const dom = weex.requireModule('dom')

const version = '1.9.1.3'
//  #endif
export default {
  name: 'lime-painter',
  mixins: [parent('painter')],
  props: {
    board: Object,
    pathType: String, // 'base64'、'url'
    fileType: {
      type: String,
      default: 'png'
    },
    quality: {
      type: Number,
      default: 1
    },
    css: [String, Object],
    width: [Number, String],
    height: [Number, String],
    pixelRatio: Number,
    customStyle: String,
    isCanvasToTempFilePath: Boolean,
    sleep: {
      type: Number,
      default: 1000 / 30
    },
    beforeDelay: {
      type: Number,
      default: 100
    },
    afterDelay: {
      type: Number,
      default: 100
    },
    // #ifdef MP-WEIXIN || MP-TOUTIAO || MP-ALIPAY
    type: {
      type: String,
      default: '2d'
    },
    // #endif
    // #ifdef APP-NVUE
    hybrid: Boolean,
    timeout: {
      type: Number,
      default: 2000
    }
    // #endif
  },
  data() {
    return {
      // #ifdef MP-WEIXIN || MP-TOUTIAO || MP-ALIPAY
      use2dCanvas: true,
      // #endif
      // #ifndef MP-WEIXIN || MP-TOUTIAO || MP-ALIPAY
      use2dCanvas: false,
      // #endif
      canvasHeight: 150,
      canvasWidth: null,
      isPC: false,
      inited: false,
      progress: 0,
      // #ifdef APP-NVUE
      tempFilePath: [],
      isInitFile: false
      // #endif
    }
  },
  computed: {
    canvasId() {
      // #ifdef VUE3
      return `l-painter${this._.uid}`
      // #endif
      // #ifdef VUE2
      return `l-painter${this._uid}`
      // #endif
    },
    size() {
      if (this.boardWidth && this.boardHeight) {
        return `width:${this.boardWidth}px; height: ${this.boardHeight}px;`
      }
    },
    dpr() {
      return this.pixelRatio || uni.getSystemInfoSync().pixelRatio
    },
    boardWidth() {
      const { width = 0 } = (this.board && this.board.css) || this.board || this
      return toPx(width) || Math.max(toPx(width), toPx(this.canvasWidth))
    },
    boardHeight() {
      const { height = 0 } =
        (this.board && this.board.css) || this.board || this
      return toPx(height) || Math.max(toPx(height), toPx(this.canvasHeight))
    },
    elements() {
      return JSON.parse(JSON.stringify(this.el))
    }
  },
  watch: {
    canvasWidth(v) {
      if (this.el.css && !this.el.css.width) {
        this.el.css.width = v
      }
    },
    // #ifdef MP-WEIXIN ||  MP-ALIPAY
    size(v) {
      // #ifdef MP-WEIXIN
      if (this.use2dCanvas) {
        this.inited = false
      }
      // #endif
      // #ifdef MP-ALIPAY
      this.inited = false
      // #endif
    }
    // #endif
  },
  // #ifdef MP-WEIXIN || MP-TOUTIAO || MP-ALIPAY
  created() {
    const { SDKVersion, version, platform, environment } =
      uni.getSystemInfoSync()
    // #ifdef MP-WEIXIN
    this.isPC = /windows/i.test(platform)
    this.use2dCanvas =
      this.type === '2d' &&
      compareVersion(SDKVersion, '2.9.2') >= 0 &&
      !(
        (/ios/i.test(platform) && /7.0.20/.test(version)) ||
        /wxwork/i.test(environment)
      ) &&
      !this.isPC
    // #endif
    // #ifdef MP-TOUTIAO
    this.use2dCanvas =
      this.type === '2d' && compareVersion(SDKVersion, '1.78.0') >= 0
    // #endif
    // #ifdef MP-ALIPAY
    this.use2dCanvas =
      this.type === '2d' && compareVersion(my.SDKVersion, '2.7.0') >= 0
    // #endif
  },
  // #endif
  // #ifdef APP-NVUE
  created() {
    if (this.hybrid) return
    useNvue('_doc/uni_modules/lime-painter/', version, this.timeout).then(
      res => {
        this.isInitFile = true
      }
    )
  },
  // #endif
  async mounted() {
    await this.getParentWeith()
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.board) {
          this.$watch('board', this.watchRender, {
            deep: true,
            immediate: true
          })
        } else {
          this.$watch('elements', this.watchRender, {
            deep: true,
            immediate: true
          })
        }
      }, 30)
    })
  },
  methods: {
    async watchRender(val, old) {
      this.progress = 0
      if (
        !val ||
        !val.views ||
        !val.views.length ||
        JSON.stringify(val) === '{}' ||
        JSON.stringify(val) == JSON.stringify(old)
      )
        return
      clearTimeout(this.rendertimer)
      this.rendertimer = setTimeout(() => {
        this.render(val)
      }, this.beforeDelay)
    },
    async setFilePath(path, isEmit) {
      let filePath = path
      const { pathType } = this
      if (pathType == 'base64' && !isBase64(path)) {
        filePath = await pathToBase64(path)
      } else if (pathType == 'url' && isBase64(path)) {
        filePath = await base64ToPath(path)
      }
      if (isEmit) {
        this.$emit('success', filePath)
      }
      return filePath
    },
    async getSize(args) {
      if (!this.size) {
        const { width } = args.css || args
        const { height } = args.css || args
        if (width || height) {
          this.canvasWidth = width || this.canvasWidth
          this.canvasHeight = height || this.canvasHeight
          await sleep(30)
        } else {
          await this.getParentWeith()
        }
      }
    },
    canvasToTempFilePathSync(args) {
      this.$watch(
        'progress',
        v => {
          if (v == 1) {
            this.canvasToTempFilePath(args)
          }
        },
        {
          immediate: true
        }
      )
    },
    // #ifdef APP-NVUE
    onPageFinish() {
      this.$refs.webview.evalJS(`init(${this.dpr})`)
    },
    onMessage(e) {
      const res = e.detail.data[0] || null
      if (res.event) {
        if (res.event == 'inited') {
          this.inited = true
        }
        if (res.event == 'layoutChange') {
          const data = JSON.parse(res.data)
          this.canvasWidth = data.width
          this.canvasHeight = data.height
        }
        if (res.event == 'progressChange') {
          this.progress = res.data * 1
        }
        if (res.event == 'file') {
          this.tempFilePath.push(res.data)
          if (this.tempFilePath.length > 7) {
            this.tempFilePath.shift()
          }
          return
        }
        if (res.event == 'success') {
          if (res.data) {
            this.tempFilePath.push(res.data)
            if (this.tempFilePath.length > 8) {
              this.tempFilePath.shift()
            }
            if (this.isCanvasToTempFilePath) {
              this.setFilePath(this.tempFilePath.join(''), true)
            }
          } else {
            this.$emit('fail', 'canvas no data')
          }
          return
        }
        this.$emit(res.event, JSON.parse(res.data))
      } else if (res.file) {
        this.file = res.data
      } else if (/ms$/.test(res[0])) {
        console.info(res[0])
      } else {
        this.$emit('fail', res)
      }
    },
    getWebViewInited() {
      if (this.inited) return Promise.resolve(this.inited)
      return new Promise(resolve => {
        this.$watch(
          'inited',
          async val => {
            if (val) {
              resolve(val)
            }
          },
          {
            immediate: true
          }
        )
      })
    },
    getTempFilePath() {
      if (this.tempFilePath.length == 8)
        return Promise.resolve(this.tempFilePath)
      return new Promise(resolve => {
        this.$watch('tempFilePath', async val => {
          if (val.length == 8) {
            resolve(val.join(''))
          }
        })
      })
    },
    getWebViewDone() {
      if (this.progress == 1) return Promise.resolve(this.progress)
      return new Promise(resolve => {
        this.$watch(
          'progress',
          async val => {
            if (val == 1) {
              this.$emit('done')
              resolve(val)
            }
          },
          {
            immediate: true
          }
        )
      })
    },
    async render(args) {
      try {
        await this.getSize(args)
        const newNode = await this.calcImage(args)
        await this.getWebViewInited()
        const webview = this.$refs.webview
        webview.evalJS(`source(${JSON.stringify(newNode)})`)
        await this.getWebViewDone()
        await sleep(this.afterDelay)
        if (this.isCanvasToTempFilePath) {
          const params = {
            fileType: this.fileType,
            quality: this.quality
          }
          webview.evalJS(`save(${JSON.stringify(params)})`)
        }
        return Promise.resolve()
      } catch (e) {
        this.$emit('fail', e)
      }
    },
    async calcImage(args) {
      let node = JSON.parse(JSON.stringify(args))
      const urlReg = /url\((.+)\)/
      const isBG =
        node.css.backgroundImage && urlReg.exec(node.css.backgroundImage)?.[1]
      const url = node.url || node.src || isBG
      if ((node.type === 'image' || isBG) && url && !isBase64(url)) {
        const { path, type } = await getImageInfo(url)
        if (isBG) {
          node.css.backgroundImage = `url(${path})`
        } else {
          node.src = path
        }
      } else if (node.views && node.views.length) {
        for (let i = 0; i < node.views.length; i++) {
          node.views[i] = await this.calcImage(node.views[i])
        }
      }
      return node
    },
    async canvasToTempFilePath(args = {}) {
      if (!this.inited) {
        return this.$emit('fail', 'no init')
      }
      this.tempFilePath = []
      if (args.fileType == 'jpg') {
        args.fileType = 'jpeg'
      }
      this.$refs.webview.evalJS(`save(${JSON.stringify(args)})`)
      try {
        let tempFilePath = await this.getTempFilePath()
        tempFilePath = await this.setFilePath(tempFilePath)
        args.success({
          errMsg: 'canvasToTempFilePath:ok',
          tempFilePath
        })
      } catch (e) {
        args.fail({
          error: e
        })
      }
    },
    // #endif
    getParentWeith() {
      return new Promise(resolve => {
        // #ifdef APP-NVUE
        dom.getComponentRect(this.$refs.limepainter, res => {
          this.canvasWidth =
            this.canvasWidth || Math.ceil(res.size.width) || 300
          this.canvasHeight = res.size.height || this.canvasHeight || 150
          resolve(res.size)
        })
        // #endif
        // #ifndef APP-NVUE
        uni
          .createSelectorQuery()
          .in(this)
          .select(`.lime-painter`)
          .boundingClientRect()
          .exec(res => {
            this.canvasWidth = Math.ceil(res[0].width) || 300
            this.canvasHeight = res[0].height || this.canvasHeight || 150
            resolve(res[0])
          })
        // #endif
      })
    },

    // #ifndef APP-NVUE
    async render(args = {}) {
      await this.getSize(args)
      const ctx = await this.getContext()
      let { use2dCanvas, boardWidth, boardHeight, canvas, afterDelay } = this
      if (use2dCanvas && !canvas) {
        return Promise.reject(
          new Error('render: fail canvas has not been created')
        )
      }
      this.boundary = {
        top: 0,
        left: 0,
        width: boardWidth,
        height: boardHeight
      }
      if (!this.painter) {
        this.painter = new Painter(
          {
            context: ctx,
            canvas,
            width: boardWidth,
            height: boardHeight,
            pixelRatio: this.dpr,
            fixed: `${this.width ? 'width' : ''}${this.height ? 'height' : ''}`,
            listen: {
              onProgress: v => {
                this.progress = v
                this.$emit('progress', v)
              },
              onEffectFail: err => {
                this.$emit('faill', err)
              }
            }
          },
          this
        )
      }
      const { width, height } = await this.painter.source(args)
      this.boundary.height = this.canvasHeight = height
      this.boundary.width = this.canvasWidth = width
      await sleep(this.sleep)
      await this.painter.render()
      await new Promise(resolve => this.$nextTick(resolve))
      if (!use2dCanvas) {
        await this.canvasDraw()
      }
      if (afterDelay && use2dCanvas) {
        await sleep(afterDelay)
      }
      this.$emit('done')
      if (this.isCanvasToTempFilePath) {
        this.canvasToTempFilePath()
          .then(async res => {
            this.$emit('success', res.tempFilePath)
          })
          .catch(err => {
            this.$emit('fail', new Error(JSON.stringify(err)))
          })
      }
      return Promise.resolve({
        ctx,
        draw: this.painter,
        node: this.node
      })
    },
    canvasDraw(flag = false) {
      return new Promise((resolve, reject) =>
        this.ctx.draw(flag, () => setTimeout(() => resolve(), this.afterDelay))
      )
    },
    async getContext() {
      if (!this.canvasWidth) {
        this.$emit('fail', 'painter no size')
        console.error('painter no size: 请给画板或父级设置尺寸')
        return Promise.reject()
      }
      if (this.ctx && this.inited) {
        return Promise.resolve(this.ctx)
      }
      const { type, use2dCanvas, dpr, boardWidth, boardHeight } = this
      const _getContext = () => {
        return new Promise(resolve => {
          uni
            .createSelectorQuery()
            .in(this)
            .select(`#${this.canvasId}`)
            .boundingClientRect()
            .exec(res => {
              if (res) {
                const ctx = uni.createCanvasContext(this.canvasId, this)
                if (!this.inited) {
                  this.inited = true
                  this.use2dCanvas = false
                  this.canvas = res
                }
                if (this.isPC) {
                  ctx.scale(1 / dpr, 1 / dpr)
                }
                // #ifdef MP-ALIPAY
                ctx.scale(dpr, dpr)
                // #endif
                this.ctx = ctx
                resolve(this.ctx)
              }
            })
        })
      }
      // #ifndef MP-WEIXIN
      return _getContext()
      // #endif

      if (!use2dCanvas) {
        return _getContext()
      }
      return new Promise(resolve => {
        uni
          .createSelectorQuery()
          .in(this)
          .select(`#${this.canvasId}`)
          .node()
          .exec(res => {
            let { node: canvas } = res[0]
            if (!canvas) {
              this.use2dCanvas = false
              resolve(this.getContext())
            }
            const ctx = canvas.getContext(type)
            if (!this.inited) {
              this.inited = true
              this.use2dCanvas = true
              this.canvas = canvas
            }
            this.ctx = ctx
            resolve(this.ctx)
          })
      })
    },
    canvasToTempFilePath(args = {}) {
      const { use2dCanvas, canvasId, dpr, fileType, quality } = this
      return new Promise((resolve, reject) => {
        let { top: y = 0, left: x = 0, width, height } = this.boundary || this
        let destWidth = width * dpr
        let destHeight = height * dpr
        // #ifdef MP-ALIPAY
        width = destWidth
        height = destHeight
        // #endif
        const success = async res => {
          try {
            const tempFilePath = await this.setFilePath(res.tempFilePath)
            resolve(
              Object.assign(res, {
                tempFilePath
              })
            )
          } catch (e) {
            this.$emit('fail', e)
          }
        }
        const copyArgs = Object.assign(
          {
            x,
            y,
            width,
            height,
            destWidth,
            destHeight,
            canvasId,
            fileType,
            quality,
            success,
            fail: reject
          },
          args
        )
        if (use2dCanvas) {
          delete copyArgs.canvasId
          copyArgs.canvas = this.canvas
        }
        uni.canvasToTempFilePath(copyArgs, this)
      })
    }
    // #endif
  }
}
</script>
<style lang="scss">
.lime-painter,
.lime-painter__canvas {
  // #ifndef APP-NVUE
  width: 100%;
  // #endif
  // #ifdef APP-NVUE
  flex: 1;
  // #endif
}
</style>
