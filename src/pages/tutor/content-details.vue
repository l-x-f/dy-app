<template>
  <div class="content-details-page">
    <NavBar has-left has-right right-icon="more" @clickRight="handleShare" />

    <view class="content-header">
      <view class="content-header-title">
        今天教大家一个新小程序，大家赶快认真学起来， 觉得好的话一定要点赞收藏
      </view>
      <view class="avatar-wrapper">
        <image
          class="image"
          src="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
          mode="aspectFill"
        />

        <view class="name"> 短发发发发 </view>
        <button type="danger" class="btn">
          <span class="icon">+</span>
          <span>关注</span>
        </button>
      </view>

      <view class="content-header-tag">
        <text class="tag-text"># 热门话题</text>
        <text class="tag-text"># 热门话题</text>
        <text class="tag-text"># 热门话题</text>
        <text class="tag-text"># 热门话题</text>
        <text class="tag-text"># 热门话题</text>
      </view>

      <view class="content-header-details">
        <view class="content-details-title">内容详情</view>
        <view class="content">
          在东京奥运会上，中国跳水队夺得了7金5银的好成绩圆满完成了赛前制定的夺金任务。这些荣誉的背后，是中国跳水队全体运动员努力拼搏的
        </view>
      </view>

      <view class="content-header-footer">
        <view class="left">
          <text class="label">热度</text>
          <text class="value">398</text>
        </view>
        <view class="right">
          <text class="label">发布时间</text>
          <text class="value">2022-14-14 40</text>
        </view>
      </view>
    </view>

    <!-- 图片区域 -->
    <view class="content-image-list">
      <view v-for="item in 4" :key="item" class="image-item">
        <image
          class="image"
          src="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
          mode="aspectFill"
        />
      </view>
    </view>

    <!-- 视频区域 -->
    <view class="content-video">
      <video
        class="video"
        src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"
        controls
      />
    </view>

    <div class="find-wrapper">
      <view class="find-item">
        <view class="find-item-body">
          <view class="find-item-image-wrapper">
            <image
              src="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
              class="find-item-image"
              mode="aspectFill"
            />
            <text class="find-item-image-text"> 398人已加入 </text>
          </view>

          <view class="find-item-right">
            <view class="find-item-title">
              豌豆的妈妈

              <div class="icons-wrapper">
                <uni-icons
                  class="icons"
                  type="forward"
                  size="18"
                  color="#999"
                />
              </div>
            </view>

            <view class="find-item-sub-title">
              一个精通短视频创作的 全职带娃宝妈，一个精 通短视频创作的全职...
            </view>
          </view>
        </view>
      </view>
    </div>

    <!-- 底部购买通知模块 -->
    <div class="footer-bar">
      <div class="footer-bar-content">
        <div class="price-wrapper">
          <text class="price">169</text>
          <text class="unit">元/年</text>
        </div>
        <button type="primary" class="button" @click="handleBuy">
          立即分享
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
  padding-bottom: 80px;

  .video {
    object-fit: cover;
    width: 100%;
    :deep(.uni-video-video) {
      width: 100%;
      object-fit: cover !important;
    }
  }

  .content-header {
    background-color: #fff;
    padding-top: $item-spacing;
    .content-header-title {
      font-size: 32rpx;
      font-weight: 500;
      padding: 0 $page-spacing;
      line-height: 1.5;
    }
    .avatar-wrapper {
      margin-top: 40rpx;
      background-color: #f8f8fa;
      display: flex;
      align-items: center;
      padding: 6rpx $page-spacing;
      position: relative;
      .image {
        width: 80rpx;
        height: 80rpx;
        background: #c2c3c4;
        border-radius: 50%;
      }
      .name {
        font-size: $font-middle;
        font-weight: 500;
        margin-left: $item-spacing;
      }
      .btn {
        position: absolute;
        top: 50%;
        right: $page-spacing;
        transform: translateY(-50%);
        vertical-align: baseline;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          display: inline-block;
          font-size: 20px;
          margin-right: 8rpx;
        }
      }
    }
    .content-header-tag {
      margin: $page-spacing;
      padding: 28rpx $page-spacing 0;
      background-color: #f8f8fa;
      .tag-text {
        display: inline-block;
        margin-right: $item-spacing;
        margin-bottom: 26rpx;
      }
    }
    .content-header-details {
      padding: 28rpx $page-spacing 0;
      .content-details-title {
        font-size: $font-large;
        font-weight: 500;
      }
      .content {
        padding: 25rpx 0;
        font-size: $font-middle;
        border-bottom: 1px solid $divide-line-color;
        line-height: 56rpx;
      }
    }
    .content-header-footer {
      padding: 32rpx $page-spacing;
      display: flex;
      justify-content: space-between;
      .label {
        font-size: $font-small;
        color: $font-color-sub;
        padding-right: 8rpx;
      }
      .value {
        font-size: $font-small;
        color: $font-color-main;
        font-weight: bolder;
      }
    }
  }
  .content-image-list {
    margin-top: $item-spacing;
    background-color: #fff;
    padding: $page-spacing;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    box-sizing: border-box;

    .image-item {
      width: 30%;
      height: 216rpx;
      background: #dcdcdc;
      margin-right: 20rpx;
      margin-bottom: 20rpx;
      border-radius: $border-radius;
      .image {
        width: 100%;
        height: 100%;
        border-radius: $border-radius;
      }
    }
    .image-item:nth-child(3n) {
      margin-right: 0;
    }
  }
  .content-video {
    padding: 0 $page-spacing $page-spacing;
    background-color: #fff;
    .video {
      border-radius: $border-radius;
      border: 1px solid $divide-line-color;
    }
  }
  .find-wrapper {
    padding: 0 $page-spacing;
    .find-item {
      position: relative;
      background: #fff;
      border-radius: $border-radius;
      display: flex;
      flex-direction: column;
      margin-top: $item-spacing;
      padding: 28rpx 24rpx;

      .find-item-body {
        display: flex;
        .find-item-image-wrapper {
          display: flex;
          flex-direction: column;
          .find-item-image {
            width: 152rpx;
            height: 152rpx;
            box-sizing: border-box;
            background: #f7f7f7;
            border-radius: $border-radius;
            object-fit: cover;
          }
          .find-item-image-text {
            margin-top: 22rpx;
            display: inline-block;
            padding: 5rpx;
            background: #f0f0f2;
            border-radius: 6px;
            color: $font-color-main;
          }
        }
        .find-item-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-left: 24rpx;
          .find-item-title {
            box-sizing: border-box;
            font-size: $font-middle;
            font-weight: bold;
            color: $font-color-main;
            position: relative;

            @include text-overflow-hidden;
            .icons-wrapper {
              position: absolute;
              top: 50%;
              right: 0;
              transform: translateY(-50%);
            }
          }

          .find-item-sub-title {
            margin-top: $item-spacing;
            font-size: $font-base;
            color: $font-color-sub;
            line-height: 44rpx;

            @include multiline-text-overflow-hidden(2);
          }
        }
      }
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
