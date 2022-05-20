<template>
  <div class="withdrawal-record">
    <NavBar has-left />

    <!-- 标题 -->
    <view class="title-wrapper">
      <text class="label">已提现总金额</text>
      <text class="value">600</text>
    </view>

    <!-- 提现列表 -->
    <view class="record-list">
      <view v-for="item in 10" :key="item" class="record-list-item">
        <div class="header">
          <view class="label">
            <text class="dot" :class="[item <= 5 ? 'success' : 'fail']" />
            <text> 已提现总金额</text>
          </view>
          <text class="value">202-12-11 11:11:00</text>
        </div>
        <div class="footer">
          <text class="label">已提现总金额</text>
          <text class="value">￥600</text>
        </div>
      </view>
    </view>

    <!-- 加载更多 -->
    <uni-load-more :status="state.loadMoreStatus" />
  </div>
</template>

<script setup>
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { reactive } from 'vue'
import NavBar from '@/components/NavBar'
const state = reactive({ searchValue: '', loadMoreStatus: 'more' })

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
.withdrawal-record {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;
  background-color: #fff;
  min-height: 100vh;
  .title-wrapper {
    margin-top: $page-spacing;
    font-size: 32rpx;
    display: flex;
    justify-content: space-between;
    border-bottom: 1rpx solid $divide-line-color;
    padding-bottom: 30rpx;
    .value {
      color: $warn-color;
    }
  }
  .record-list {
    .record-list-item {
      margin-top: 40rpx;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .label {
        color: $font-color-main;
        font-size: $font-middle;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        .dot {
          display: inline-block;
          width: 8rpx;
          height: 8rpx;
          border-radius: 50%;
          margin-right: 10rpx;
        }
        .success {
          background-color: #15bd60;
        }
        .fail {
          background-color: #ee2828;
        }
      }
      .value {
        color: $font-color-sub;
      }
    }
    .footer {
      margin-top: 14rpx;
      display: flex;
      justify-content: space-between;
      .label {
        color: $font-color-main;
        font-size: $font-small;
      }
      .value {
        font-size: $font-large-title;
        color: $warn-color;
      }
    }
  }
}
</style>
