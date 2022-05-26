<template>
  <view class="my" @touchend="end" @touchmove="move">
    <!-- 顶部背景图 -->
    <view
      :class="{ banner: true, isPlay: isPlay }"
      :style="{ height: sheight + 'rpx' }"
    >
      <view class="">
        <image
          :class="{ isPlay: isPlay }"
          :style="{ height: sheight + 'rpx', transform: `scale(${imgWidth})` }"
          src="https://p4.music.126.net/nILBk4DaE3yV__25uq-5GQ==/18641120139241412.jpg?param=640y300"
          mode="aspectFill"
        />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      sheight: 400, // 高度
      imgWidth: 1, // 放大比例
      isPlay: false, // 是否播放动画
      // 用户滑动
      clientData: {
        // 用户手指Y轴
        clientMoveY: '', // 按下
        clientEndY: '', // 抬起
        // 页面Y轴
        pageY: 0
      }
    }
  },
  onLoad() {},
  onPageScroll(e) {
    // 获取当前页面滚动高度
    this.clientData.pageY = e.scrollTop
  },

  methods: {
    // 手指移动
    move(e) {
      console.log(e, 'e')
      console.log(this.clientData.pageY, 'this.clientData.pageY ')

      // 先判断用户是否到达了顶部
      if (this.clientData.pageY < 1) {
        // 本次手指移动的位置和上次移动的位置对比 <1 证明用户在下拉
        if (this.clientData.clientMoveY - e.changedTouches[0].clientY < 1) {
          // 拿到下拉的距离
          let distance =
            this.clientData.clientMoveY - e.changedTouches[0].clientY
          // 最大下拉到800rpx ,放大1.8倍大小
          if (this.sheight < 800 && this.imgWidth < 1.8) {
            this.sheight -= distance
            this.imgWidth -= distance / 500
          } else {
            console.log('最大下拉到800rpx ,放大1.8倍大小')

            // 超过800或者1.8倍就return 优化性能
            return
          }
        } else {
          return
        }
        // 上边的代码执行结束之后再把本次手指的位置赋值给data中,用来下一次对比
        this.clientData.clientMoveY = e.changedTouches[0].clientY
      }
    },
    // 手指抬起
    end(e) {
      this.clientData.clientEndY = e.changedTouches[0].clientY
      // 当图片的高度大于400的时候手指抬起再调用函数
      if (this.sheight > 400) {
        // 执行动画
        this.isPlay = true
        // 动画结束后把顶部图片的高度和放大比例该会原来的值
        setTimeout(() => {
          this.sheight = 400
          this.imgWidth = 1
          // 并把动画的class名取消掉
          this.isPlay = false
        }, 504)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  width: 100vw;
  overflow: hidden; // 防止图片放大，宽度被撑开
  background-size: cover;
  position: relative;
  image {
    width: 100%;
    max-height: 800rpx;
    position: absolute;
    bottom: 0;
  }
}
// 一个动画
.isPlay {
  animation: big 0.5s 1 alternate ease-in-out forwards;
}

@keyframes big {
  100% {
    transform-origin: center center;
    transform: scale(1);
    height: 400rpx;
  }
}
</style>
