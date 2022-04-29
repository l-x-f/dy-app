<template>
  <div class="tutor-details-page">
    <NavBar
      has-left
      :nav-wrapper-style="navWrapperStyle"
      :title-style="navTitleStyle"
      :nav-style="{
        height: '55px'
      }"
      has-right
      :has-placeholder="false"
      right-icon="more"
      title-image="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
    />

    <!-- 导航背景 -->
    <div class="nav-bar-image" />

    <!-- 用户信息模块 -->
    <cover-view class="user-wrapper">
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
            <div class="label">获赞</div>
            <div class="value">100</div>
          </div>
          <div class="content-item">
            <div class="label">获赞</div>
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

      <div class="user-footer">
        <div class="btn">编辑资料</div>
        <div class="btn">推广口令：123456</div>
      </div>
    </cover-view>

    <!-- 列表 -->
    <div class="section">
      <div v-for="item in 10" :key="item" class="section-item">
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
import { onPullDownRefresh, onPageScroll } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import NavBar from '@/components/NavBar'
import { useAppStore } from '@/store'

const store = useAppStore()
const { systemInfo } = storeToRefs(store)

const state = reactive({ result: '' })
console.log(state)

const DefaultNavWrapperStyle = {
  backgroundColor: 'transparent'
}
const FixedNavWrapperStyle = {
  backgroundColor: '#fff'
}
const DefaultNavTitleStyle = {
  fontWeight: 400,
  color: '#fff'
}
const FixedNavTitleStyle = {
  fontWeight: 400,
  color: '#333'
}

const navHeight = systemInfo.value.statusBarHeight
const navWrapperStyle = ref({ ...DefaultNavWrapperStyle })
const navTitleStyle = ref({ ...DefaultNavTitleStyle })
onPageScroll(data => {
  if (data.scrollTop > navHeight) {
    navWrapperStyle.value = FixedNavWrapperStyle
    navTitleStyle.value = FixedNavTitleStyle
  } else {
    navWrapperStyle.value = DefaultNavWrapperStyle
    navTitleStyle.value = DefaultNavTitleStyle
  }
})
onPullDownRefresh(() => {
  uni.showToast({
    title: '刷新成功',
    icon: 'success'
  })
  uni.stopPullDownRefresh()
})
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
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.tutor-details-page {
  box-sizing: border-box;
  padding-bottom: $page-bottom;
  .nav-bar-image {
    width: 100%;
    height: 253rpx;
    background-image: url('https://tse1-mm.cn.bing.net/th/id/R-C.d042a67e2697965d3fc92dcc2dd442cb?rik=gNLpj0wl9CcKRQ&riu=http%3a%2f%2fup.bizhizu.com%2fpic%2fba%2f03%2f2a%2fba032adbaf5967418e74177c7d37fc2d.jpg&ehk=dc9BFzyrx0FoPcMNXt6wnMFilhT1LxT5ACCL4y2taR4%3d&risl=&pid=ImgRaw&r=0');
    background-size: cover;
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
            font-size: $font-sub-sm;
            font-weight: 300;
            color: $font-color-base;
          }
          .value {
            margin-top: 10rpx;
            font-size: 33rpx;
            font-weight: bold;
            color: $font-color-base;
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
        color: $font-color-base;
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
      border-top: 1px solid $border-color;
      white-space: normal;
      height: 256rpx;
      overflow: hidden;
      .content {
        font-size: $font-middle-lg;
        font-weight: 400;
        color: $font-color-sub;
        line-height: 58rpx;
        white-space: normal;
      }
      .more {
        color: #485bf7;
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
        color: $font-color-title;
        margin: 30rpx 0;
      }
      .content-item {
        margin-top: 32rpx;
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
              font-size: $font-sm;
              font-weight: bold;
              color: $font-color-sub;
            }
          }
          .content {
            display: flex;
            flex-direction: column;
            margin-left: 32rpx;
            .content-title {
              font-size: $font-middle-lg;
              font-weight: bold;
              color: $font-color-base;

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
                font-size: $font-sub-sm;
                font-weight: 300;
                color: $font-color-base;
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
            font-size: $font-sm;
            color: $font-color-green;
          }
          .hot {
            .hot-label {
              font-size: $font-sm;
              color: $font-color-green;
            }
            .hot-value {
              font-size: $font-sm;
              color: $font-color-base;
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
          color: #f3730b;
        }
        .unit {
          font-size: $font-sm;
          color: $font-color-base;
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
