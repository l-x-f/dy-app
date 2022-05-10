<template>
  <swiper :autoplay="false" class="swiper-scroll-x-wrapper">
    <swiper-item>
      <scroll-view scroll-x>
        <view class="swiper-scroll-x-content">
          <slot />
        </view>
      </scroll-view>
    </swiper-item>
  </swiper>
</template>

<script setup>
/* 横向滚动带回弹效果  */
</script>
<style>
.swiper-scroll-x-wrapper {
  height: 378rpx;
}
</style>
