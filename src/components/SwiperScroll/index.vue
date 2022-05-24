<template>
  <swiper
    :autoplay="false"
    class="swiper-scroll-x-wrapper"
    :style="{ height }"
    :vertical="vertical"
    @transition="handleChange"
  >
    <swiper-item>
      <scroll-view :scroll-x="scrollX" :scroll-y="!scrollX">
        <view class="swiper-scroll-x-content">
          <slot />
        </view>
      </scroll-view>
    </swiper-item>
  </swiper>
</template>

<script setup>
/* 横向滚动带回弹效果  */

/* eslint-disable   */
const props = defineProps({
  // input值
  scrollX: {
    type: Boolean,
    default: true
  },
  vertical: {
    type: Boolean,
    default: false
  },
  height: {
    type: String,
    default: '378rpx'
  }
})

const emit = defineEmits(['change'])

const handleChange = (...arg) => {
  emit('change', ...arg)
}
</script>
