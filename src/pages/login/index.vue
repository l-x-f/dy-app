<template>
  <view class="login-page">
    <view>
      <block>
        <view class=" ">未登录</view>
        <view class=" "> 请点击按钮登录 </view>
      </block>
    </view>

    <view>
      <button
        type="primary"
        class="page-body-button"
        :loading="univerifyBtnLoading"
        @click="toLogin"
      >
        微信登录
      </button>
    </view>
  </view>
</template>

<script setup>
import { toRefs, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'

const store = useUserStore()

const { hasLogin } = storeToRefs(store.getter)

const state = reactive({
  univerifyBtnLoading: false,
  hasLogin
})

const toLogin = () => {
  uni.switchTab({ url: '/pages/home/index' })
}

const { univerifyBtnLoading } = toRefs(state)
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background-color: #fff;
}
</style>
