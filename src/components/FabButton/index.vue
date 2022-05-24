<template>
  <view class="fab-button" @click="handleToSendNote">
    <image src="/static/image/find.png" mode="aspectFill" class="icon-image" />
  </view>
</template>

<script setup>
// 去发布笔记
const handleToSendNote = () => {
  uni.navigateTo({ url: '/pages/find/send-note/index' })
}
</script>

<style lang="scss" scoped>
@import 'variables';
.fab-button {
  position: fixed;
  z-index: 99;
  right: $page-spacing;

  // #ifdef APP-PLUS
  bottom: calc($page-spacing);
  // #endif

  // #ifdef H5
  bottom: calc(50px + $page-spacing);
  // #endif

  .icon-image {
    width: 90rpx;
    height: 90rpx;
    border-radius: 50%;
    background-color: $primary-color;
    display: flex;
  }
}
</style>
