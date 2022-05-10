<template>
  <div class="content-details-page">
    <NavBar
      has-left
      :nav-wrapper-style="{ backgroundColor: 'transparent' }"
      has-right
      right-icon="more"
      @clickRight="handleShare"
    />

    <video
      class="video"
      src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"
      controls
    />

    <!-- 底部购买通知模块 -->
    <div class="footer-bar">
      <uni-notice-bar
        show-icon
        scrollable
        class="notice-bar"
        text="购买说明购买说明购买说明购买说明购买说明购买说"
      />

      <div class="footer-bar-content">
        <div class="price-wrapper">
          <text class="price">169</text>
          <text class="unit">元/年</text>
        </div>
        <button type="primary" class="button" @click="handleBuy">
          立即购买
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { reactive } from 'vue'
import NavBar from '@/components/NavBar'

const state = reactive({ result: '' })
console.log(state)

onPullDownRefresh(() => {
  uni.showToast({
    title: '刷新成功',
    icon: 'success'
  })
  uni.stopPullDownRefresh()
})

// 购买
const handleBuy = () => {
  uni.showToast({
    title: '购买成功',
    icon: 'success',
    mask: true,
    success: () => {
      uni.navigateBack({ delta: 1 })
    }
  })
}

// 去邀请分享页面
const handleShare = () => {
  uni.navigateTo({ url: `/pages/tutor/invite?id=${1}` })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.content-details-page {
  box-sizing: border-box;
  padding-bottom: $page-bottom;

  .video {
    object-fit: cover;
    width: 100%;
    :deep(.uni-video-video) {
      width: 100%;
      object-fit: cover !important;
    }
  }

  .footer-bar {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    .notice-bar {
      margin: 0;
      :deep(.uni-noticebar) {
        margin: 0;
      }
    }
    .footer-bar-content {
      background-color: #fff;
      height: 113rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 25rpx;
      .price-wrapper {
        .price {
          font-size: 61rpx;
          font-weight: 500;
          color: #f3730b;
        }
        .unit {
          font-size: $font-small;
          color: $font-color-main;
        }
      }
      .button {
        flex: 0 0 288rpx;
        width: 288rpx;
        margin: 0;
      }
    }
  }
}
</style>
