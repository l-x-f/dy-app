<template>
  <div class="invite-page">
    <NavBar has-left :nav-wrapper-style="{ backgroundColor: 'transparent' }" />

    <!-- tab 切换 -->
    <uni-segmented-control
      class="segmented-control"
      :current="current"
      :values="items"
      style-type="text"
      active-color="#485bf7"
      @clickItem="handleClickItem"
    />

    <!-- 海报 -->
    <view v-show="current === 0" class="post-wrapper">
      <view class="post-image-box">
        <LimePainter ref="painter" :board="poster" />
      </view>
      <div class="save-image-button-box">
        <button
          type="primary"
          class="save-image-button"
          @click="handleSaveImage"
        >
          保存图片
        </button>
      </div>
    </view>

    <!-- 素材 -->
    <view v-show="current === 1" class="text-wrapper">
      <div class="tex-body">
        <div v-for="item in 2" :key="item" class="tex-item">
          <div class="title">在东京奥运会上</div>
          <div class="content">
            中国跳水队夺得了7金5银的好成绩圆满完成了赛前制定的夺金任务。这些荣誉的背后，是中国跳水队全体运动员努力拼搏
          </div>
          <button type="primary" @click="handleCopy">一键复制</button>
        </div>
      </div>
    </view>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavBar from '@/components/NavBar'
import { saveImage } from '@/utils/uniUtils'
import LimePainter from '@/components/LimePainter/l-painter/l-painter'

const painter = ref(null)
const items = ['海报', '发圈素材']
const current = ref(0)
const poster = ref({})

onMounted(() => {
  const data = {
    css: {
      // 根节点若无尺寸，自动获取父级节点
    },
    views: [
      {
        src: 'https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000',
        type: 'image',
        css: {
          background: '#fff',
          objectFit: 'cover',
          marginLeft: '40rpx',
          marginTop: '40rpx',
          width: '84rpx',
          border: '2rpx solid #fff',
          boxSizing: 'border-box',
          height: '84rpx',
          borderRadius: '50%'
        }
      },
      {
        type: 'view',
        css: {
          marginTop: '40rpx',
          paddingLeft: '20rpx',
          display: 'inline-block'
        },
        views: [
          {
            text: '短发发发发',
            type: 'text',
            css: {
              display: 'block',
              paddingBottom: '10rpx',
              color: '#333',
              fontSize: '32rpx',
              fontWeight: 'bold'
            }
          },
          {
            text: '为您找到一个优质课程',
            type: 'text',
            css: {
              color: '#333',
              fontSize: '24rpx'
            }
          }
        ]
      },
      {
        css: {
          marginLeft: '40rpx',
          marginTop: '30rpx',
          padding: '32rpx',
          boxSizing: 'border-box',
          background: '#fff',
          borderRadius: '16rpx',
          width: '670rpx'
        },
        views: [
          {
            src: 'https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000',
            type: 'image',
            css: {
              objectFit: 'cover',
              objectPosition: '50% 50%',
              width: '300rpx',
              height: '300rpx'
            }
          },
          {
            css: {
              marginTop: '32rpx',
              color: '#FF0000',
              fontWeight: 'bold',
              fontSize: '28rpx',
              lineHeight: '1em'
            },
            views: [
              {
                text: '￥',
                type: 'text',
                css: {
                  verticalAlign: 'bottom'
                }
              },
              {
                text: '39',
                type: 'text',
                css: {
                  verticalAlign: 'bottom',
                  fontSize: '58rpx'
                }
              },
              {
                text: '.39',
                type: 'text',
                css: {
                  verticalAlign: 'bottom'
                }
              },
              {
                text: '￥59.99',
                type: 'text',
                css: {
                  verticalAlign: 'bottom',
                  paddingLeft: '10rpx',
                  fontWeight: 'normal',
                  textDecoration: 'line-through',
                  color: '#999999'
                }
              }
            ],

            type: 'view'
          },
          {
            css: {
              marginTop: '32rpx',
              fontSize: '26rpx',
              color: '#8c5400'
            },
            views: [
              {
                text: '自营',
                type: 'text',
                css: {
                  color: '#212121',
                  background: '#ffb400'
                }
              },
              {
                text: '30天最低价',
                type: 'text',
                css: {
                  marginLeft: '16rpx',
                  background: '#fff4d9',
                  textDecoration: 'line-through'
                }
              },
              {
                text: '满减优惠',
                type: 'text',
                css: {
                  marginLeft: '16rpx',
                  background: '#fff4d9'
                }
              },
              {
                text: '超高好评',
                type: 'text',
                css: {
                  marginLeft: '16rpx',
                  background: '#fff4d9'
                }
              }
            ],

            type: 'view'
          },
          {
            css: {
              marginTop: '30rpx'
            },
            views: [
              {
                text: '课程',
                type: 'text',
                css: {
                  paddingRight: '32rpx',
                  boxSizing: 'border-box',
                  lineClamp: 2,
                  color: '#333333',
                  lineHeight: '1.8em',
                  fontSize: '36rpx',
                  width: '478rpx'
                }
              },
              {
                text: 'limeui.qcoon.cn',
                type: 'qrcode',
                css: {
                  width: '128rpx',
                  height: '128rpx'
                }
              }
            ],
            type: 'view'
          }
        ],
        type: 'view'
      }
    ]
  }
  // 渲染
  painter?.value.render(data)
})

// 点击导航
const handleClickItem = ({ currentIndex }) => {
  current.value = currentIndex
}
// 保存图片
const handleSaveImage = () => {
  painter?.value.canvasToTempFilePathSync({
    fileType: 'png',
    quality: 1,
    success: res => {
      saveImage(res.tempFilePath).then(() => {
        uni.showToast({
          title: '保存图片成功',
          icon: 'none'
        })
      })
    }
  })
}

// 复制到剪切板
const handleCopy = () => {
  uni.setClipboardData({
    data: ' 中国跳水队夺得了7金5银的好成绩圆满完成了赛前制定的夺金任务。这些荣誉的背后，是中国跳水队全体运动员努力拼搏',
    success: () => {
      uni.showToast({
        title: '复制成功',
        icon: 'none'
      })
    }
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.invite-page {
  box-sizing: border-box;
  min-height: 100vh;
  .segmented-control {
    background-color: #fff;

    :deep(.segmented-control__item--text) {
      border-bottom-width: 3px;
    }
  }

  .post-wrapper {
    margin-top: $item-spacing;
    padding: 0 $page-spacing;
    box-sizing: border-box;
    position: relative;
    background-color: #fff;

    .post-image-box {
      width: 100%;
      height: calc(90vh - #{$item-spacing} - #{$nav-height} - 36px - 10px);
      .image {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .save-image-button-box {
      padding: 0 $item-spacing;
      position: fixed;
      box-sizing: border-box;
      width: 100%;
      bottom: 10px;
      left: 0;
    }
    .save-image-button {
      width: 100%;
    }
  }

  .text-wrapper {
    padding: 0 $page-spacing;
    .tex-body {
      .tex-item {
        background-color: #fff;
        border-radius: $border-radius;
        padding: $item-padding-spacing;
        font-size: 28rpx;
        color: $font-color-base;
        line-height: 46rpx;
        margin-top: $item-spacing;
      }
      .title {
        margin-bottom: $item-spacing;
      }

      .content {
        margin-bottom: $item-spacing;
      }
    }
  }
}
</style>
