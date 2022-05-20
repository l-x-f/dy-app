<template>
  <div class="edit-background">
    <view class="image-wrapper">
      <image
        class="image"
        src="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
        mode="aspectFill"
      />
    </view>
    <div class="button" @click="handleUpload">更换背景</div>
  </div>
</template>

<script setup>
import { chooseImage } from '@/utils/uniUtils'

const handleUpload = async () => {
  await chooseImage()
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.edit-background {
  background-color: #000;
  height: 100vh;
  position: relative;
  .image-wrapper {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .image {
      width: 100%;
      height: 400rpx;
    }
  }
  .button {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 150rpx auto 0;
    background-color: #262626;
    width: 200rpx;
    height: 68rpx;
    color: #fff;
    border-radius: 8rpx;
    font-size: $font-base;
  }
}
</style>
