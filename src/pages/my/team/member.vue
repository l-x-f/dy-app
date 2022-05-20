<template>
  <div class="team-page">
    <NavBar
      has-left
      :nav-wrapper-style="{ backgroundColor: 'transparent' }"
      :fixed-nav-wrapper-style="{ backgroundColor: '#745FB8' }"
      :title-style="{ color: '#fff' }"
      :fixed-title-style="{ color: '#fff' }"
      :has-placeholder="false"
    />

    <!-- 主内容区 -->
    <div class="nav-bar-background">
      <!-- 搜索栏 -->
      <view class="search-wrapper">
        <Search
          v-model="state.searchValue"
          placeholder="搜索学员"
          search-position="left"
        />
      </view>

      <view class="team-card">
        <view class="team-content">
          <view class="team-body">
            <view class="team-item">
              <view class="team-item-title">学员总数</view>
              <view class="team-item-value">121</view>
            </view>
            <view class="team-item">
              <view class="team-item-title">今日新增</view>
              <view class="team-item-value">121</view>
            </view>
          </view>
        </view>
      </view>

      <view class="card-radius" />
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
              <div class="member">微信：{{ item.member }}</div>
            </view>
            <div class="date">2020-04-20 加入</div>
          </view>
        </view>
      </view>
    </view>

    <!-- 加载更多 -->
    <uni-load-more :status="state.loadMoreStatus" />
  </div>
</template>

<script setup>
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import NavBar from '@/components/NavBar'
import Search from '@/components/Search'
import { usePageScroll } from '@/hooks'

// 添加页面滚动监听
usePageScroll()

const state = reactive({ searchValue: '', loadMoreStatus: 'more' })

// 列表
const memberList = ref(
  [...new Array(15)].map((_, index) => ({
    id: index,
    avatar:
      'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    text: '发芽的树',
    member: '120562' + index,
    date: new Date().toLocaleString(),
    searchTotalCount: 100 + index * 4,
    searchTodayCount: 215 - index * 2
  }))
)

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
    background: linear-gradient(0deg, #9790ad 0%, #745fb8 100%);
    // padding-bottom: calc(#{$page-spacing} + 22rpx);
  }
  .search-wrapper {
    padding: 0 $page-spacing;
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
          color: $font-color-sub;
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
            color: $warn-color;
            padding-left: 12rpx;
          }
        }
      }
      .team-item + .team-item {
        border-left: 1rpx solid $divide-line-color;
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
          border: 1rpx solid #e8e8e8;
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
  .card-radius {
    height: 22rpx;
    padding: 0 $page-spacing;
    background-color: $page-bg-color;
    margin-top: $item-spacing;
    border-top-left-radius: 30rpx;
    border-top-right-radius: 30rpx;
  }

  .member-wrapper {
    .member-body {
      padding: 0 $page-spacing;
      .member-item {
        margin-top: 22rpx;
        padding: 24rpx $page-spacing;
        border-radius: $border-radius;
        background-color: #fff;
        box-sizing: border-box;
        position: relative;

        .member-item-body {
          display: flex;
          align-items: center;
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
          .date {
            font-size: $font-small;
            color: $font-color-sub;
            position: absolute;
            top: 50%;
            right: $page-spacing;
            transform: translateY(-50%);
          }
        }
      }

      .member-item:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
