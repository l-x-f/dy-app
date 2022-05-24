<template>
  <div class="team-page">
    <NavBar
      has-left
      :nav-wrapper-style="{ backgroundColor: navTransparentBackgroundColor }"
      :fixed-nav-wrapper-style="{ backgroundColor: '#6B68C5' }"
      :title-style="{ color: navFixedColor }"
      :fixed-title-style="{ color: navFixedColor }"
      :has-placeholder="false"
    />

    <!-- 主内容区 -->
    <div class="nav-bar-background">
      <view class="title-wrapper">
        <view class="title">推广总收益</view>
        <view class="value">21,000.00</view>
      </view>

      <!-- 统计 -->
      <view class="grid">
        <view class="grid-item">
          <view class="grid-item-title"> 总邀请人数 </view>
          <view class="grid-item-value"> 150 </view>
        </view>
        <view class="grid-item">
          <view class="grid-item-title"> 直推收益 </view>
          <view class="grid-item-value"> 150 </view>
        </view>
        <view class="grid-item">
          <view class="grid-item-title"> 总会员人数 </view>
          <view class="grid-item-value"> 150 </view>
        </view>
        <view class="grid-item">
          <view class="grid-item-title"> 间推收益 </view>
          <view class="grid-item-value"> 150 </view>
        </view>
      </view>

      <!-- 时间月份选择 -->
      <view class="date">
        <view class="date-item-title">+1，235.00</view>
        <view class="date-item-value" @click="handleOpenSelectMonth">
          {{ state.month }}
        </view>
      </view>
    </div>

    <!-- 成员列表 -->
    <view class="member-wrapper">
      <view class="member-body">
        <view
          v-for="(item, index) in memberList"
          :key="index"
          class="member-item"
          :index="index"
          :title="item.text"
          @longpress="handleDelete(item, index)"
        >
          <view class="member-item-body">
            <image class="image" :src="item.avatar" mode="aspectFill" />
            <view class="title-wrapper">
              <div class="name">{{ item.text }}</div>
              <div class="member">订单编号：22910106555</div>
              <div class="member">交易时间：2022-04-20 12:00</div>
            </view>
            <div class="member-item-date">
              <view class="text">直推</view>
              <view class="value">+190</view>
            </div>
          </view>
          <view class="tutor-wrapper">
            <view class="tutor">导师:</view>
            <view class="tutor-value">刚哥自媒体</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 加载更多 -->
    <uni-load-more :status="state.loadMoreStatus" />

    <!-- 选择月份组件 -->
    <SelectMonth v-model="state.month" v-model:visible="state.visible" />
  </div>
</template>

<script setup>
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import variables from 'variables'
import NavBar from '@/components/NavBar'
import SelectMonth from '@/components/SelectMonth'
import { usePageScroll } from '@/hooks'

const { navFixedColor, navTransparentBackgroundColor } = variables

// 添加页面滚动监听
usePageScroll()

const state = reactive({
  result: '',
  tabIndex: 0,
  loadMoreStatus: 'more',
  month: '',
  visible: false
})

const handleOpenSelectMonth = () => {
  state.visible = true
}
// 列表
const memberList = ref(
  [...new Array(15)].map((_, index) => ({
    id: index,
    avatar:
      'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    text: '发芽的树',
    word: '120562' + index,
    date: '2022-12-14 14:20',
    searchTotalCount: 100 + index * 4,
    searchTodayCount: 215 - index * 2
  }))
)
console.log(memberList)

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
@import 'variables';
@import 'mixin';
.team-page {
  box-sizing: border-box;
  padding-bottom: $page-bottom;
  .nav-bar-background {
    padding-top: calc($nav-height + var(--status-bar-height));
    box-sizing: border-box;
    background-color: #6b68c5;
    color: #fff;
    .title-wrapper {
      padding: 0 $page-spacing;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 50rpx;
      .title {
        font-size: $font-small;
      }
      .value {
        margin-top: 30rpx;
        font-size: $font-large-title;
      }
    }
    .grid {
      margin-top: 36rpx;
      display: flex;
      flex-wrap: wrap;
      .grid-item {
        flex: 0 0 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 36rpx $page-spacing;
        box-sizing: border-box;
        border-top: 1rpx solid #e7e7e7;
        border-right: 1rpx solid #e7e7e7;
        background-color: #7370c8;
      }
      .grid-item:nth-of-type(even) {
        border-right: 0;
      }
    }
    .date {
      width: 100%;
      box-sizing: border-box;
      border-top-left-radius: 32rpx;
      border-top-right-radius: 32rpx;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 26rpx $page-spacing;
      font-size: $font-title;
      font-weight: bold;
      .date-item-title {
        color: $warn-color;
      }
      .date-item-value {
        color: $font-color-main;
      }
    }
  }

  .member-wrapper {
    .member-body {
      padding: 0 $page-spacing;
      .member-item {
        box-sizing: border-box;
        position: relative;
        margin-top: $item-spacing;
        .member-item-body {
          background-color: #fff;
          padding: 35rpx $page-spacing;
          border-radius: $border-radius;
          display: flex;
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
            .member {
              margin-top: 16rpx;
              font-size: $font-small;
              color: $font-color-sub;
            }
          }
          .member-item-date {
            font-size: $font-small;
            color: $font-color-sub;
            position: absolute;
            top: 40%;
            right: $page-spacing;
            transform: translateY(-50%);

            .text {
              font-size: $font-small;
            }
            .value {
              margin-top: 16rpx;
              color: $warn-color;
              font-size: $font-title;
            }
          }
        }
        .tutor-wrapper {
          background: linear-gradient(0deg, #fff 0%, #f5f5f5 100%);
          border-bottom-left-radius: $border-radius;
          border-bottom-right-radius: $border-radius;
          display: flex;
          padding: 26rpx $page-spacing;
          .tutor-value {
            margin-left: 4rpx;
            color: $font-color-sub;
          }
        }
      }
    }
  }
}
</style>
