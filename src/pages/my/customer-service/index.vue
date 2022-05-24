<template>
  <div class="customer-service">
    <NavBar has-left />
    <view class="customer-service-body">
      <view class="title"> 截图保存二维码添加微信客服</view>
      <image
        class="image"
        src="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
        mode="aspectFill"
      />
      <button type="primary" class="button">联系我们</button>
    </view>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar'
</script>

<style lang="scss" scoped>
@import 'variables';
.customer-service {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;
  .customer-service-body {
    margin-top: $page-spacing;
    background: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 100rpx $page-spacing;
    .title {
      font-size: 32rpx;
      color: $font-color-main;
    }
    .image {
      margin-top: 60rpx;
      width: 276rpx;
      height: 276rpx;
    }
    .button {
      width: 286rpx;
      margin-top: 32rpx;
    }
  }
}
</style>
