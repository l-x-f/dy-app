<template>
  <view v-if="tagList.length" class="tag-list">
    <text v-for="item in tagList" :key="item" class="tag-text">
      #{{ item }}
    </text>
  </view>
</template>

<script setup>
/* eslint-disable */
const props = defineProps({
  //
  tagList: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.tag-list {
  padding: 28rpx calc(#{$page-spacing}/ 2);
  background-color: #f8f8fa;
  .tag-text {
    display: inline-block;
    padding: calc(#{$item-spacing}/ 2) 20rpx;
  }
}
</style>
