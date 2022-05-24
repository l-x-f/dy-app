<template>
  <div>
    <NavBar />
    <view class="login-page">
      <view class="logo-container">
         <image class="logo" :src="logo" alt=""   mode="aspectFill"/>
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
         <image class="wechat-img" :src="wechat" alt=""    mode="aspectFill"/>
        <view class="wechat-text">微信登录</view>
      </button>
      {{ monthData }}
    </view>
  </div>
</template>

<script setup>
import { toRefs, reactive, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { promiseUnilogin, getUserInfo } from '@/utils/uniUtils'
import { useUserStore, useAppStore } from '@/store'
import VerifyInput from '@/components/VerifyInput'
import NavBar from '@/components/NavBar'

const logo = 'https://static-1252186245.cos.ap-nanjing.myqcloud.com/dy.png'
const wechat =
  'https://static-1252186245.cos.ap-nanjing.myqcloud.com/wechat.png'

const DefaultText = '发送验证码'

const store = useUserStore()
const appStore = useAppStore()
const { hasLogin } = storeToRefs(store)
const { systemInfo } = storeToRefs(appStore)

console.log(systemInfo, 'statusBarHeight')

const state = reactive({
  visible: false,
  monthData: new Date(),
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
  const [{ authResult, code }, { userInfo }] = await Promise.all([
    promiseUnilogin(),
    getUserInfo()
  ])
  console.log(authResult, code, userInfo, 'toLogin')
  const data = { ...authResult, code, userInfo }
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

const disabledDate = (year, month) => {
  const date = new Date()
  if (year > date.getFullYear()) {
    return true
  } else {
    if (month > date.getMonth() + 1) {
      return true
    }
  }
}

// 登录拦截
watchEffect(() => {
  hasLogin.value && toHome()
})

const { formData, text, sendCodeDisabled, visible, monthData } = toRefs(state)
</script>

<style lang="scss">
 @import 'variables';

.uni-nav-bar-text {
  font-size: $font-large;
  span {
    font-size: $font-large;
  }
}
</style>
<style lang="scss" scoped>
 @import 'variables';

.nav-bar {
  width: 100%;
  position: fixed;
  top: var(--status-bar-height);
  left: 0;
}

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
      font-size:  $font-title;
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
        border-bottom:  1rpx solid rgba(187, 187, 187, 100);
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
