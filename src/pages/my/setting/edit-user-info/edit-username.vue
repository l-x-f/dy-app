<template>
  <div class="edit-username">
    <NavBar has-left />

    <view class="content">
      <view class="title">导师名称</view>
      <uni-easyinput
        v-model="name"
        :input-border="false"
        class="input"
        placeholder="请输入名称"
      />
    </view>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '@/components/NavBar'
const name = ref()
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.edit-username {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;
  background-color: #fff;
  min-height: 100vh;

  .content {
    margin-top: 60rpx;
    .title {
      font-size: $font-middle;
    }
    .input {
      margin-top: 20rpx;
      border-bottom: 1rpx solid $divide-line-color;
    }
  }
}
</style>
