<template>
  <div class="tutor-details-page">
    <NavBar
      has-left
      :nav-wrapper-style="{ backgroundColor: navTransparentBackgroundColor }"
      :fixed-nav-wrapper-style="{ backgroundColor: '#018ac7' }"
      :title-style="{ color: navFixedColor }"
      :fixed-title-style="{ color: navFixedColor }"
      has-right
      :has-placeholder="false"
      right-icon="more-filled"
      :title="state.title"
      :title-image="state.titleImage"
      @clickRight="handleShare"
      @fixed="handleFixed"
    />

    <!-- 导航背景 -->
    <ScaleBackground class="nav-bar-image">
      <!-- 用户信息模块 -->
      <view class="user-wrapper">
        <div class="user-header">
          <div class="avatar">
            <image
              class="image"
              src="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
              mode="aspectFill"
            />
          </div>
          <div class="content">
            <div class="content-item">
              <div class="label">获赞</div>
              <div class="value">100</div>
            </div>
            <div class="content-item">
              <div class="label">笔记</div>
              <div class="value">100</div>
            </div>
            <div class="content-item">
              <div class="label">学员</div>
              <div class="value">100</div>
            </div>
          </div>
        </div>
        <div class="user-desc">
          <div class="title">短发发发发</div>
          <div class="sub-title">ID：12345678</div>
        </div>
        <div class="user-info">
          <text class="content">
            擅长热门话题，爆款视频，星图变现等一些列抖音赚钱渠道，资深抖音达人，全网粉丝300多万，其中抖音超过230多万，擅长热门话题款视频，星图变现等一些列抖音赚钱渠道
          </text>
          <text class="more"> 更多</text>
        </div>
        <!-- 编辑栏 -->
        <div class="user-footer">
          <div class="btn" @click="handleEdit">编辑资料</div>
          <div class="btn" @click="handleCopy(123456)">推广口令：123456</div>
        </div>
      </view>
    </ScaleBackground>

    <!-- 列表 -->
    <div class="section">
      <div
        v-for="item in 10"
        :key="item"
        class="section-item"
        @click="handleToContentDetails(item)"
      >
        <div class="section-item-title">202{{ item }}</div>
        <div class="content-item">
          <div class="content-item-body">
            <div class="date-wrapper">
              <text class="day">12</text>
              <text class="month"> 3月</text>
            </div>
            <div class="content">
              <div class="content-title">
                视频播放量几乎不过百，是视频质量 问题还是标签没选好
              </div>
              <div class="tag">
                <div class="tag-item"># 爆款视频</div>
                <div class="tag-item"># 爆款视频</div>
                <div class="tag-item"># 爆款视频</div>
              </div>
              <div class="content-info">
                你知道最近的热门话题是什么吗？快打 开看看，别忘记点赞...
              </div>
            </div>
          </div>

          <div class="content-footer">
            <div class="date">2022-15-22 144:44</div>
            <div class="hot">
              <text class="hot-label">热度</text>
              <text class="hot-value">100</text>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--悬浮按钮 -->
    <FabButton />

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
import variables from 'variables'
import FabButton from '@/components/FabButton'
import NavBar from '@/components/NavBar'
import ScaleBackground from '@/components/ScaleBackground'

import { usePageScroll } from '@/hooks'

const { navFixedColor, navTransparentBackgroundColor } = variables

console.log(variables, 'variables')

// 触发页面滚动
usePageScroll()

const state = reactive({
  title: '',
  titleImage: ''
})

const handleFixed = fixed => {
  state.title = fixed ? '导师详情' : ''
  state.titleImage = fixed
    ? 'https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000'
    : ''
}

onPullDownRefresh(() => {
  uni.showToast({
    title: '刷新成功',
    icon: 'success'
  })
  uni.stopPullDownRefresh()
})

const handleEdit = () => {
  uni.navigateTo({ url: '/pages/my/setting/edit-user-info/edit-tutor' })
}

// 复制到剪切板
const handleCopy = data => {
  uni.setClipboardData({
    data,
    success: () => {
      uni.showToast({
        title: '复制成功',
        icon: 'none'
      })
    }
  })
}
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
// 去内容详情页面
const handleToContentDetails = () => {
  uni.navigateTo({ url: `/pages/tutor/content-details?id=${1}` })
}
</script>

<style lang="scss" scoped>
@import 'variables';
@import 'mixin';
.tutor-details-page {
  box-sizing: border-box;
  padding-bottom: 100px;

  :deep(.fab-button) {
    bottom: calc(90px + $page-spacing);
  }

  .nav-bar-image {
    width: 100%;
    background-image: url('@/static/image/sea.png');
    background-size: contain;
    background-repeat: no-repeat;
    padding-top: 380rpx;
    box-sizing: border-box;
    background-color: #018ac7;
  }

  .user-wrapper {
    background-color: #fff;
    padding: $page-spacing;
    border-radius: 33rpx 33rpx 0 0;
    box-sizing: border-box;
    width: 100%;
    margin-top: -20px;
    overflow: visible;
    .user-header {
      display: flex;
      overflow: visible;
      .avatar {
        flex: 0 0 146rpx;
        width: 146rpx;
        height: 146rpx;
        border-radius: 50%;
        padding: 10rpx;
        background-color: #fff;
        overflow: visible;
        margin-top: -30px;
        .image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .content {
        flex: 1;
        display: flex;
        justify-content: space-around;
        .content-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 28rpx;
          position: relative;
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            right: -28rpx;
            transform: translateY(-50%);
            width: 1px;
            height: 61rpx;
            background-color: $border-color;
          }
          .label {
            font-size: $font-small;
            font-weight: 300;
            color: $font-color-main;
          }
          .value {
            margin-top: 10rpx;
            font-size: 33rpx;
            font-weight: bold;
            color: $font-color-main;
          }
        }
        .content-item:last-child {
          &::after {
            display: none;
          }
        }
      }
    }
    .user-desc {
      margin-top: 29rpx;
      .title {
        font-size: $font-large;
        font-weight: 500;
        color: $font-color-main;
      }
      .sub-title {
        margin-top: 17rpx;
        font-size: 33rpx;
        font-weight: 400;
        color: $font-color-sub;
      }
    }
    .user-info {
      margin-top: 35rpx;
      padding-top: 35rpx;
      border-top: 1rpx solid $border-color;
      white-space: normal;
      height: 256rpx;
      overflow: hidden;
      .content {
        font-size: $font-middle;
        font-weight: 400;
        color: $font-color-main;
        line-height: 58rpx;
        white-space: normal;
      }
      .more {
        color: $font-color-sub;
      }
    }
    .user-footer {
      display: flex;
      justify-content: space-around;
      margin-top: $page-spacing;
      .btn {
        width: 333rpx;
        height: 79rpx;
        line-height: 79rpx;
        text-align: center;
        background: #eff0f3;
        border-radius: 6px;
      }
    }
  }
  .section {
    padding: 0 $page-spacing $page-bottom;
    .section-item {
      .section-item-title {
        font-size: 46rpx;
        font-weight: bold;
        color: $font-color-main;
        margin: 30rpx 0;
      }
      .content-item {
        margin-top: $item-spacing;
        background-color: #fff;
        border-radius: $border-radius;
        padding: 33rpx 36rpx;
        display: flex;
        flex-direction: column;
        .content-item-body {
          display: flex;
          .date-wrapper {
            flex: 0 0 102rpx;
            width: 102rpx;
            height: 102rpx;
            background: #f5f5f6;
            border-radius: $border-radius;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            .day {
              font-size: 48rpx;
              font-weight: bold;
              color: $font-color-sub;
            }
            .month {
              font-size: $font-small;
              font-weight: bold;
              color: $font-color-sub;
            }
          }
          .content {
            display: flex;
            flex-direction: column;
            margin-left: $item-spacing;
            .content-title {
              font-size: $font-middle;
              font-weight: bold;
              color: $font-color-main;

              @include multiline-text-overflow-hidden(2);
            }
            .tag {
              margin-top: 42rpx;
              display: flex;
              justify-content: space-between;
              .tag-item {
                width: 146rpx;
                height: 41rpx;
                line-height: 41rpx;
                text-align: center;
                background: #f7f9fd;
                border-radius: 6px;
                font-size: $font-small;
                font-weight: 300;
                color: $font-color-main;
              }
            }
            .content-info {
              margin-top: 33rpx;
              font-size: 29rpx;
              font-weight: 400;
              color: $font-color-sub;
            }
          }
        }
        .content-footer {
          margin-top: 61rpx;
          display: flex;
          justify-content: space-between;
          .date {
            font-size: $font-small;
            color: $font-color-sub;
          }
          .hot {
            .hot-label {
              font-size: $font-small;
              color: $font-color-sub;
            }
            .hot-value {
              font-size: $font-small;
              color: $font-color-main;
            }
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
          color: $warn-color;
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
