<template>
  <div class="team-page">
    <NavBar
      has-left
      :nav-wrapper-style="{ backgroundColor: 'transparent' }"
      :fixed-nav-wrapper-style="{ backgroundColor: '#3d6cac' }"
      :title-style="{ color: '#fff' }"
      :fixed-title-style="{ color: '#fff' }"
      :has-placeholder="false"
    />

    <!-- 主内容区 -->
    <div class="nav-bar-background">
      <view class="team-card">
        <view class="team-content">
          <view class="team-body">
            <view class="team-item">
              <view class="team-item-title">团队人数</view>
              <view class="team-item-value">121</view>
              <view class="team-item-today-value">
                今日新增
                <text class="add-value">+3</text>
              </view>
            </view>
            <view class="team-item">
              <view class="team-item-title">团队人数</view>
              <view class="team-item-value">121</view>
              <view class="team-item-today-value">
                今日新增
                <text class="add-value">+30</text>
              </view>
            </view>
          </view>
          <view
            v-show="state.tabIndex === 0"
            id="teamFooterInstance"
            class="team-footer"
          >
            <view class="team-footer-item">
              <image
                class="avatar-image"
                src="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
                mode="aspectFill"
              />
              <view class="title-wrapper">
                <view class="title"> 发芽的树 </view>
                <view class="sub-title"> 我的推荐人 </view>
              </view>
            </view>
            <view class="team-footer-item">
              <view class="btn">
                <image
                  class="wechat-image"
                  src="/static/image/wechat.svg"
                  mode="aspectFill"
                />
                <text class="text">联系他</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- tab栏 -->
      <view id="tabInstance" class="tab" :style="tabStyle">
        <view
          class="tab-item"
          :class="{ 'tab-item-active': state.tabIndex === 0 }"
          @click="handleSwitchTab(0)"
        >
          直推20
        </view>
        <view
          class="tab-item"
          :class="{ 'tab-item-active': state.tabIndex === 1 }"
          @click="handleSwitchTab(1)"
        >
          间推10
        </view>
      </view>
      <!-- tab 占位栏，使tab定位切换顺滑 -->
      <view class="tab-placeholder" :style="tabPlaceholderStyle" />
    </div>

    <!-- 成员列表 -->
    <view class="team-member-wrapper">
      <view class="team-member-body">
        <view
          v-for="(item, index) in memberList"
          :key="index"
          class="team-member-item"
          :index="index"
          :title="item.text"
        >
          <view class="team-member-item-body">
            <image class="image" :src="item.avatar" mode="aspectFill" />
            <view class="title-wrapper">
              <div class="name">{{ item.text }}</div>
              <div class="team-member">会员</div>
            </view>
            <div class="date">{{ item.date }}加入</div>
          </view>
          <view class="team-member-item-count">
            团队人数
            <text class="count">{{ item.searchTotalCount }}</text> 次， 会员人数
            <text class="count"> {{ item.searchTodayCount }} </text>次
          </view>
          <view class="team-member-item-footer">
            <view class="footer-item">
              <div class="lebel">微信:</div>
              <div class="value">123456</div>
              <image class="image" src="/static/image/copy.png" />
            </view>
            <view class="footer-item">
              <div class="lebel">总收益:</div>
              <div class="value">1,234.56</div>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 加载更多 -->
    <uni-load-more :status="state.loadMoreStatus" />
  </div>
</template>

<script setup>
import {
  onPullDownRefresh,
  onPageScroll,
  onReachBottom
} from '@dcloudio/uni-app'
import { reactive, ref, onMounted } from 'vue'
import NavBar from '@/components/NavBar'
import { emitPageScrollEvent } from '@/utils/emitEvent'
import { getBoundingClientRect } from '@/utils/uniUtils'

const state = reactive({ result: '', tabIndex: 0, loadMoreStatus: 'more' })

// 处理导航栏，处理tab定位
const tabStyle = ref({})
const tabPlaceholderStyle = ref({})
const tabHeight = ref(48)
const tabTop = ref(234)
const teamFooterHeight = ref(72)
onMounted(async () => {
  const { height, top } = await getBoundingClientRect('#tabInstance')
  const { height: teamHeight } = await getBoundingClientRect(
    '#teamFooterInstance'
  )
  tabHeight.value = height
  tabTop.value = top
  teamFooterHeight.value = teamHeight
})
onPageScroll(data => {
  emitPageScrollEvent(data)
  const height =
    state.tabIndex === 0 ? tabTop.value : tabTop.value - teamFooterHeight.value
  if (data.scrollTop > height) {
    tabStyle.value = { position: 'fixed', top: '44px', zIndex: 1, margin: 0 }
    tabPlaceholderStyle.value = { height: tabHeight.value + 'px' }
  } else {
    tabStyle.value = { position: 'static' }
    tabPlaceholderStyle.value = { height: '0' }
  }
})
// 列表
const memberList = ref(
  [...new Array(15)].map((_, index) => ({
    id: index,
    avatar:
      'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    text: '发芽的树',
    word: '120562' + index,
    date: new Date().toLocaleString(),
    searchTotalCount: 100 + index * 4,
    searchTodayCount: 215 - index * 2
  }))
)
console.log(state)
const handleSwitchTab = async index => {
  state.tabIndex = index
}
// 下拉刷新
onPullDownRefresh(() => {
  uni.showToast({
    title: '刷新成功',
    icon: 'success'
  })
  uni.stopPullDownRefresh()
})

// 上滑加载更多
onReachBottom(e => {
  if (state.loadMoreStatus === 'noMore') return
  state.loadMoreStatus = 'loading'
  setTimeout(() => {
    state.loadMoreStatus = 'noMore'
  }, 1000)
  console.log(e)
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.team-page {
  box-sizing: border-box;
  padding-bottom: $page-bottom;
  .nav-bar-background {
    padding-top: calc($nav-height + var(--status-bar-height));
    box-sizing: border-box;
    background: linear-gradient(0deg, #738db1 0%, #3d6cac 100%);
  }
  .team-card {
    margin-top: $page-spacing;
    padding: 0 $page-spacing;
    .team-content {
      background-color: #fff;
      border-radius: $border-radius;
    }
    .team-body {
      display: flex;
      justify-content: space-between;
      .team-item {
        padding: 36rpx $page-spacing;
        display: flex;
        flex-direction: column;
        flex: 1;
        .team-item-title {
          font-size: $font-small;
        }
        .team-item-value {
          margin-top: 36rpx;
          font-size: $font-large-title;
          font-weight: bold;
        }
        .team-item-today-value {
          margin-top: 36rpx;
          font-size: $font-small;
          color: $font-color-sub;
          .add-value {
            display: inline-block;
            color: #f3730b;
            padding-left: 12rpx;
          }
        }
      }
      .team-item + .team-item {
        border-left: 1px solid $divide-line-color;
      }
    }
    .team-footer {
      display: flex;
      justify-content: space-between;
      background-color: $page-bg-color;
      padding: $page-spacing;
      border-bottom-left-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
      .team-footer-item {
        display: flex;
        align-items: center;
        .avatar-image {
          width: 60rpx;
          height: 60rpx;
          border-radius: 50%;
        }
        .title-wrapper {
          margin-left: 20rpx;
          .title {
            font-size: $font-middle;
            color: $font-color-main;
          }
          .sub-title {
            margin-top: 8rpx;
            font-size: $font-small;
            color: $font-color-sub;
          }
        }
        .btn {
          width: 160rpx;
          height: 60rpx;
          background: rgba(250, 250, 250, 0.08);
          border: 1px solid #e8e8e8;
          border-radius: 12rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          .wechat-image {
            margin-right: 4rpx;
            width: 40rpx;
            height: 40rpx;
          }
          .text {
            font-weight: 700;
            font-size: $font-small;
            color: $font-color-main;
          }
        }
      }
    }
  }
  .tab {
    margin-top: $page-spacing;
    padding: 28rpx $page-spacing;
    width: 100%;
    background-color: #fff;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    .tab-item {
      font-size: 32rpx;
      color: $font-color-sub;
    }
    .tab-item-active {
      font-weight: 500;
      color: $font-color-main;
    }
  }
  .team-member-wrapper {
    margin: $item-spacing;
    .team-member-body {
      .team-member-item {
        margin-top: $item-spacing;
        padding-top: 24rpx;
        border-radius: $border-radius;
        background-color: #fff;
        box-sizing: border-box;
        .team-member-item-body {
          padding: 0 $page-spacing;
          display: flex;
          align-items: center;
          position: relative;
          .image {
            width: 70rpx;
            height: 70rpx;
            border-radius: 50%;
          }
          .title-wrapper {
            margin-left: 19rpx;
            .name {
              font-size: $font-base;
              color: $font-color-main;
            }
            .team-member {
              margin-top: 16rpx;
              font-size: $font-small;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 72rpx;
              height: 34rpx;
              background: rgba(167, 117, 51, 0.08);
              border: 1px solid #a77533;
              border-radius: 12px;
              color: #a77533;
            }
          }
          .date {
            font-size: $font-small;
            color: $font-color-sub;
            position: absolute;
            top: 50%;
            right: 24rpx;
            transform: translateY(-50%);
          }
        }
        .team-member-item-count {
          padding: 0 $page-spacing;
          margin-top: 40rpx;
          font-size: $font-small;
          color: $font-color-sub;
          .count {
            color: #3079c4;
          }
        }
        .team-member-item-footer {
          padding: $page-spacing;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background-color: #fefefe;
          border-radius: $border-radius;
          .footer-item {
            display: flex;
            align-items: center;
            font-size: $font-base;
            flex: 1;
            .label {
              color: $font-color-main;
            }
            .value {
              margin-left: 8rpx;
              color: $font-color-sub;
            }
            .image {
              margin-left: 37rpx;
              width: 34rpx;
              height: 34rpx;
            }
          }
          .footer-item + .footer-item {
            border-left: 1px solid $divide-line-color;
            padding-left: 20rpx;
          }
        }
      }
    }
  }
}
</style>
