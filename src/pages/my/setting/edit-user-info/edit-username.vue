<template>
  <div class="edit-username">
    <NavBar has-left has-right>
      <template #right>
        <view class="nav-button" @click="handleSubmit">修改</view>
      </template>
    </NavBar>

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
  .nav-button {
    font-size: $nav-font-size;
    color: $font-color-main;
    font-weight: 500;
  }

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
