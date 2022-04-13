<template>
  <div class="components-section">
    <view class="section-body">
      <text class="title">
        {{ title }}
      </text>
      <uni-icons v-if="arrow" class="icons" type="forward" size="24" />
    </view>

    <slot />
  </div>
</template>

<script setup>
/* eslint-disable  */
const props = defineProps({
  title: {
    type: String,
    default: '标题'
  },
  arrow: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.components-section {
  padding: 10px 0;
  margin-top: 20px;
  background-color: #fff;
  .section-body {
    display: flex;
    flex-wrap: nowrap;
    height: 100%;
    padding-left: 10rpx;
    position: relative;
    .title {
      font-size: 32rpx;
      color: #333;
      border-left: 2px solid #2979ff;
      padding-left: 20rpx;
    }
    .icons {
      position: absolute;
      top: 50%;
      right: 10rpx;
      transform: translateY(-50%);
    }
  }
}
</style>
