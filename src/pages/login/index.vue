<template>
  <view class="login-page">
    <view class="logo-container">
      <img class="logo" :src="logo" alt="" />
      <text class="logo-title">DY-App</text>
    </view>

    <view class="phone-login-container">
      <uni-forms label-width="48" class="form">
        <uni-forms-item label="手机号" prefix-icon="phone" name="phone">
          <view class="phone-item">
            <uni-easyinput
              v-model="formData.phone"
              :input-border="false"
              type="number"
              placeholder="请输入手机号"
            />
            <button
              :disabled="sendCodeDisabled"
              class="send-code-button"
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
      <button type="primary" class="submit-button" @click="submitForm">
        登录
      </button>
    </view>

    <!-- 微信登录 -->
    <button
      class="wechat-login-container"
      open-type="getUserProfile"
      @click="toLogin"
    >
      <img class="wechat-img" :src="wechat" alt="" />
      <view class="wechat-text">微信登录</view>
    </button>
  </view>
</template>

<script setup>
import { toRefs, reactive, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { promiseUnilogin, getUserInfo } from '@/utils/uniUtils'
import { useUserStore } from '@/store'
import VerifyInput from '@/components/VerifyInput'

const logo = 'https://static-1252186245.cos.ap-nanjing.myqcloud.com/dy.png'
const wechat =
  'https://static-1252186245.cos.ap-nanjing.myqcloud.com/wechat.png'

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

const submitForm = () => {
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
  toHome()
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
  min-height: 100vh;
  background-color: #fff;
  box-sizing: border-box;
  overflow: hidden;
  padding: 24px;

  .logo-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 20px;

    .logo {
      width: 80px;
      height: 80px;
    }
    .logo-title {
      font-size: 36rpx;
      margin-top: 10px;
      color: #333;
    }
  }

  .phone-login-container {
    margin-top: 40px;
    .phone-item {
      display: flex;
      align-items: center;

      .uni-easyinput {
        border-bottom: 1px solid rgba(187, 187, 187, 100);
      }

      :deep(.uni-easyinput__content-input) {
        line-height: 1.5;
      }
    }
    .send-code-button {
      height: 36px;
      line-height: 36px;
      box-sizing: border-box;
      margin-left: 10rpx;
      font-size: 28rpx;
      border: 0;
      outline: 0;
      padding: 0 5px;
      background-color: #fff;
      color: #007aff;
      &::after {
        border: 0;
      }
    }
    .submit-button {
      margin-top: 10px;
    }
  }

  .wechat-login-container {
    margin-top: 80px;
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
      width: 60px;
      height: 60px;
    }
    .wechat-text {
      padding-top: 5px;
      font-size: 24rpx;
    }
  }
}
</style>
