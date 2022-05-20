<template>
  <div class="edit-desc">
    <NavBar has-left />

    <view class="content">
      <view class="title">个人简介</view>
      <uni-easyinput
        v-model="name"
        :input-border="false"
        type="textarea"
        class="input"
        placeholder="你可以编辑个人简介，有趣的介绍能让学员更好 的了解你"
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

.edit-desc {
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
      box-sizing: border-box;
      margin-top: 20rpx;
      border-bottom: 1rpx solid $divide-line-color;
    }
  }
}
</style>
