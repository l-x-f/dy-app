<template>
  <div class="components-section">
    <view class="section-body">
      <div class="title-wrapper">
        <text class="title">
          {{ title }}
        </text>
        <div class="sub-title">
          <text class="sub-title-text"> {{ subTitle }}</text>
        </div>
      </div>

      <view v-if="hasRightRefresh" class="right-content" @click="refresh">
        <text class="right-content-text">换一批</text>
        <image :src="refreshImage" class="refresh" alt="" mode="aspectFill" />
      </view>

      <text v-if="date" class="sub-title-date"> 更新于{{ date }}</text>
    </view>

    <slot />
  </div>
</template>

<script setup>
/* eslint-disable  @typescript-eslint/no-unused-vars */
/* eslint-disable  no-unused-vars */
import refreshImage from '@/static/image/refresh.png'

const props = defineProps({
  // 标题
  title: {
    type: String,
    default: ''
  },

  // 副标题
  subTitle: {
    type: String,
    default: ''
  },
  // 是否显示刷新按钮
  hasRightRefresh: {
    type: Boolean,
    default: false
  },
  // 日期
  date: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['refresh'])

// 刷新
const refresh = () => {
  emit('refresh')
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.components-section {
  margin-top: 54rpx;
  .section-body {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    position: relative;
    padding-bottom: 30rpx;
    .title-wrapper {
      display: flex;
      flex-direction: column;
      .title {
        font-size: $font-large;
        color: $font-color-main;
        font-weight: bold;
      }
      .sub-title {
        margin-top: 14rpx;
        .sub-title-text {
          font-size: $font-middle;
          color: $font-color-sub;
        }
      }
    }
    .sub-title-date {
      font-size: 23rpx;
      color: $font-color-sub;
      position: absolute;
      right: 0;
      bottom: 30rpx;
    }
    .right-content {
      display: flex;
      align-items: center;
      .right-content-text {
        font-size: $font-small;
        color: $font-color-sub;
        margin-right: 8rpx;
      }
      .refresh {
        width: 29rpx;
        height: 29rpx;
      }
    }
  }
}
</style>
