<template>
  <view class="login-page">
    <view class="phone-login-container">
      <uni-forms label-width="48" class="form">
        <uni-forms-item label="手机号" prefix-icon="phone" name="phone">
          <view class="phone-item">
            <uni-easyinput
              v-model="formData.phone"
              type="number"
              placeholder="请输入手机号"
            />
            <button
              :disabled="sendCodeDisabled"
              class="send-code"
              @click="sendCode"
            >
              {{ text }}
            </button>
          </view>
        </uni-forms-item>
        <uni-forms-item label="验证码" name="code">
          <VerifyInput v-model="formData.code" />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submitForm">登录</button>
    </view>

    <!-- 微信登录 -->
    <view class="wechat-login-container" @click="toLogin">
      <img class="wechat-img" src="/static/wechat.png" alt="" />
      <view class="wechat-text">微信登录</view>
    </view>
  </view>
</template>

<script setup>
import { toRefs, reactive, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
import VerifyInput from '@/components/VerifyInput'

const DefaultText = '发送验证码'

const store = useUserStore()
const { hasLogin } = storeToRefs(store)

const state = reactive({
  sendCodeDisabled: false,
  univerifyBtnLoading: false,
  timer: null,
  count: 60,
  text: DefaultText,
  formData: {
    phone: '',
    code: ''
  }
})

const submitForm = e => {
  const { phone, code } = state.formData
  if (!phone) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none',
      mask: true
    })
    return
  }
  if (!code) {
    uni.showToast({
      title: '请输入验证码',
      icon: 'none',
      mask: true
    })
    return
  }
  toHome(e)
}

// 导航去首页
const toHome = () => {
  uni.switchTab({ url: '/pages/index/index' })
}
// 登录
const toLogin = () => {
  toHome()
}
// 发送验证码
const sendCode = () => {
  if (!state.formData.phone) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none',
      mask: true
    })
    return
  }
  uni.showToast({
    title: '发送成功',
    icon: 'success',
    mask: true
  })
  state.sendCodeDisabled = true
  state.timer = setInterval(() => {
    if (state.count <= 0) {
      clearInterval(state.timer)
      state.sendCodeDisabled = false
      state.count = 60
      state.text = DefaultText
      return
    }
    state.count = state.count - 1
    state.text = `${state.count}s`
  }, 1000)
}

// 登录拦截
watchEffect(() => {
  hasLogin.value && toHome()
})

const { formData, text, sendCodeDisabled } = toRefs(state)
</script>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 24rpx;
  overflow: hidden;

  .form {
    padding: 20rpx 0;
  }

  .phone-login-container {
    margin-top: 50rpx;
    .phone-item {
      display: flex;
      align-items: center;
    }
    .send-code {
      height: 36px;
      line-height: 36px;
      box-sizing: border-box;
      margin-left: 10rpx;
      font-size: 20rpx;
      border: 1px solid #ccc;
      padding: 0 5px;
    }
  }

  .wechat-login-container {
    margin-top: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .wechat-img {
      width: 60px;
    }
    .wechat-text {
      padding-top: 10px;
    }
  }
}
</style>
