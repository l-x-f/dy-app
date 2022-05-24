<template>
  <!-- 图片区域 -->
  <view class="image-list">
    <view v-for="item in imageList" :key="item" class="image-item">
      <image
        class="image"
        src="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
        mode="aspectFill"
      />
    </view>
  </view>
</template>

<script setup>
/* eslint-disable */
const props = defineProps({
  //
  imageList: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
@import 'variables';
@import 'mixin';
.image-list {
  margin-top: $item-spacing;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  .image-item {
    width: calc((100% - 20rpx - 20rpx) / 3);
    height: 216rpx;
    background: #dcdcdc;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
    border-radius: $border-radius;
    .image {
      width: 100%;
      height: 100%;
      border-radius: $border-radius;
    }
  }
  .image-item:nth-child(3n) {
    margin-right: 0;
  }
}
</style>
