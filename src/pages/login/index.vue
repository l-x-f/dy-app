<template>
  <div class="login-page-container">
    <NavBar :has-title="false" />

    <view class="title-container">
      <text class="title">欢迎来到创作者!</text>
      <text class="sub-title">若该手机号未注册，我们将自动为您注册!</text>
    </view>

    <!-- 手机号内容区 -->
    <view class="phone-login-container">
      <input
        v-model="phone"
        class="phone-item"
        :input-border="false"
        type="number"
        placeholder-style="color: #9AA3F0;"
        placeholder="请输入手机号"
      />
      <button
        class="submit-button"
        :class="{
          'submit-button-disabled': isDisabled
        }"
        :disabled="isDisabled"
        @click="submitForm"
      >
        获取验证码
      </button>
    </view>

    <!-- 微信登录 -->
    <div class="other-login">
      <view class="other-login-text"> 其它登录方式</view>
      <button
        class="wechat-login-container"
        open-type="getUserProfile"
        @click="toLogin"
      >
        <div class="wechat-img">
          <img class="img" :src="wechat" alt="" />
        </div>
      </button>
      <view class="user-agreement">
        <uni-data-checkbox
          v-model="checked"
          class="485bf7"
          multiple
          :localdata="checkList"
          selected-color="#485bf7"
        />
        <view class="text"> 登录即表示同意<text>《用户协议》</text></view>
      </view>
    </div>
  </div>
</template>

<script setup>
import { toRefs, reactive, watchEffect, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { promiseUnilogin, getUserInfo } from '@/utils/uniUtils'
import { isPhone } from '@/utils'
import { useUserStore } from '@/store'
import NavBar from '@/components/NavBar'

const wechat =
  'https://static-1252186245.cos.ap-nanjing.myqcloud.com/wechat.png'

const store = useUserStore()
const { hasLogin } = storeToRefs(store)
const checkList = [{ value: true, text: '' }]

const state = reactive({
  phone: '13365667766',
  code: '',
  checked: [true]
})

// 按钮是否禁用
const isDisabled = computed(() => !isPhone(state.phone))
// 提交表单
const submitForm = () => {
  if (!state.phone) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none',
      mask: true
    })
    return
  }
  if (!state.checked.length) {
    uni.showToast({
      title: '请同意用户协议',
      icon: 'none',
      mask: true
    })
    return
  }
  uni.navigateTo({ url: '/pages/login/code?phone=' + state.phone })
}
// 导航去首页
const toHome = () => {
  uni.switchTab({ url: '/pages/index/index' })
}
// 登录
const toLogin = async () => {
  const { authResult } = await promiseUnilogin()
  const { userInfo } = await getUserInfo()
  console.log(authResult, userInfo, 'toLogin')
  const data = { ...authResult, userInfo }
  await store.login(data)
  uni.showToast({
    title: '微信登录成功',
    icon: 'success',
    success: () => {
      toHome()
    }
  })
}
// 登录拦截
watchEffect(() => {
  // hasLogin.value && toHome()
  console.log(hasLogin.value && toHome)
})
// 解构
const { phone, checked } = toRefs(state)
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.login-page-container {
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0 $page-spacing;
  background-color: #fff;

  .title-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 214rpx;
    .title {
      font-size: $font-max;
      font-weight: 500;
      color: $font-color-title;
    }
    .logo {
      width: 80px;
      height: 80px;
    }
  }
  .phone-login-container {
    margin-top: 70rpx;
    .phone-item {
      height: 117rpx;
      background: #f9fafe;
      border: 2px solid $border-color;
      border-radius: 17px;
      text-align: center;
      font-size: 44rpx;
      color: $font-color-base;
    }
    .submit-button {
      height: 117rpx;
      line-height: 117rpx;
      background-color: $primary-color;
      border-radius: 17px;
      margin-top: 32rpx;
      font-size: 35rpx;
      font-weight: 400;
      color: #fff;
    }
    .submit-button-disabled {
      background-color: $border-color;
    }
  }
  .other-login {
    position: absolute;
    bottom: 64rpx;
    left: 0;
    width: 100%;
    .other-login-text {
      text-align: center;
      font-size: 29rpx;
      font-weight: 300;
      color: $font-color-base;
    }
    .wechat-login-container {
      margin-top: 28rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #fff;
      color: #333;
      border: 0;
      &::after {
        border: 0;
      }
      .wechat-img {
        width: 94rpx;
        height: 94rpx;
        background: #f0efef;
        border-radius: 50%;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        .img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .wechat-text {
        padding-top: 5px;
        font-size: 24rpx;
      }
    }
    .user-agreement {
      margin-top: 121rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      :deep(.uni-data-checklist) {
        flex: 0 0 20px;
      }
      :deep(.checklist-box) {
        margin: 0;
      }
      .text {
        font-size: $font-sm;
        font-weight: 300;
        color: $font-color-sub;
      }
    }
  }
}
</style>
