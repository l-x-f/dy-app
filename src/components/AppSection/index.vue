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
        <img :src="refreshImage" class="refresh" alt="" />
      </view>

      <text v-if="date" class="sub-title-date"> 更新于{{ date }}</text>
    </view>

    <slot />
  </div>
</template>

<script setup>
/* eslint-disable  @typescript-eslint/no-unused-vars */
/* eslint-disable  no-unused-vars */
import { getImgUrl } from '@/utils/image'

const refreshImage = getImgUrl('refresh')

const props = defineProps({
  title: {
    type: String,
    default: ' '
  },
  subTitle: {
    type: String,
    default: ' '
  },
  hasRightRefresh: {
    type: Boolean,
    default: false
  },
  date: {
    type: String,
    default: ''
  },
  arrow: {
    type: Boolean,
    default: false
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
  margin-top: 70rpx;

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
        color: $font-color-title;
        font-weight: bold;
      }
      .sub-title {
        margin-top: 14rpx;
        .sub-title-text {
          font-size: $font-base-lg;
          color: $font-color-sub;
        }
      }
    }
    .sub-title-date {
      font-size: 23rpx;
      color: $font-color-green;
      position: absolute;
      right: 0;
      bottom: 30rpx;
    }
    .right-content {
      display: flex;
      align-items: center;
      .right-content-text {
        font-size: $font-sub-sm;
        color: $font-color-green;
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
