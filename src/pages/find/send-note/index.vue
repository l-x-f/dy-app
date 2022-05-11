<template>
  <div class="send-note-page">
    <NavBar has-left has-right>
      <template #right>
        <button class="nav-button" @click="handleSend">发布</button>
      </template>
    </NavBar>

    <form class="send-note-page-form" @submit="formSubmit" @reset="formReset">
      <view class="form-item">
        <input
          v-model="value"
          class="form-input"
          placeholder-class="placeholder-class"
          placeholder="这是一个输入框"
          :clearable="false"
        />
      </view>

      <view class="form-item">
        <AppTextarea
          v-model="value"
          :clearable="false"
          auto-height
          type="textarea"
          placeholder="请输入内容"
        />

        <view class="content-header-tag">
          <text class="tag-text"># 热门话题</text>
          <text class="tag-text"># 热门话题</text>
          <text class="tag-text"># 热门话题</text>
          <text class="tag-text"># 热门话题</text>
          <text class="tag-text"># 热门话题</text>
        </view>
      </view>
    </form>
  </div>
</template>

<script setup>
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { reactive } from 'vue'
import NavBar from '@/components/NavBar'
import AppTextarea from '@/components/AppTextarea'

const state = reactive({
  result: ''
})
console.log(state)

onPullDownRefresh(() => {
  uni.showToast({
    title: '刷新成功',
    icon: 'success'
  })
  uni.stopPullDownRefresh()
})

const handleSend = () => {
  console.log('发布')
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.send-note-page {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;
  background-color: #fff;

  :deep(.nav-bar-right-content) {
    display: flex;
    justify-content: flex-end;
  }
  .nav-button {
    height: 52rpx;
    line-height: 52rpx;
    background: #485bf7;
    border-radius: 6rpx;
    text-align: center;
    font-size: $font-middle;
    color: #fff;
  }
  .send-note-page-body {
    margin-top: $page-spacing;
  }
  .send-note-page-form {
    margin-top: $page-spacing;
    .form-item {
      margin-top: $item-spacing;
      border-bottom: 1px solid $divide-line-color;
      .form-input {
        padding: $item-spacing 0;
        color: $font-color-main;
        font-weight: 700;
      }

      :deep(.placeholder-class) {
        color: $font-color-sub;
        font-weight: 700;
        font-size: $font-base;
      }
    }
    .content-header-tag {
      margin: $page-spacing;
      padding: 28rpx $page-spacing 0;
      background-color: #f8f8fa;
      .tag-text {
        display: inline-block;
        margin-right: $item-spacing;
        margin-bottom: 26rpx;
      }
    }
  }
}
</style>
