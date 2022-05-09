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
        :class="{
          'phone-item': true,
          'phone-item-disabled': !phone
        }"
        :input-border="false"
        type="number"
        placeholder-style="color: #999;"
        placeholder="请输入手机号"
      />
      <button
        :class="{
          'submit-button': true,
          'submit-button-disabled': isDisabled
        }"
        type="primary"
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
          <image
            class="img"
            src="@/static/image/wechat.png"
            alt=""
            mode="aspectFill"
          />
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
        <view class="text">
          登录即表示同意
          <text class="agreement" @click="handleToAgreement">《用户协议》</text>
        </view>
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
// 去用户协议
const handleToAgreement = () => {
  console.log('handleToAgreement')
}
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
    margin-top: 200rpx;
    .title {
      font-size: $font-large-title;
      font-weight: 500;
      color: $font-color-title;
    }

    .sub-title {
      margin-top: 20rpx;
      font-size: $font-base;
      color: $font-color-sub;
    }
    .logo {
      width: 80px;
      height: 80px;
    }
  }
  .phone-login-container {
    margin-top: 70rpx;
    .phone-item {
      height: 88rpx;
      background: #f9fafe;
      border: 2px solid $primary-color;
      border-radius: $border-radius;
      text-align: left;
      padding: 0 32rpx;
      font-size: $font-middle;
      color: $font-color-base;
    }
    .phone-item-disabled {
      border: 2px solid $disable-color;
    }
    .submit-button {
      height: 88rpx;
      margin-top: 32rpx;
      font-size: $font-large;
      color: #fff;
    }
    .submit-button-disabled {
      background-color: $disable-color;
    }
  }
  .other-login {
    width: 100%;
    margin-top: 240rpx;
    .other-login-text {
      text-align: center;
      font-weight: 300;
      color: $font-color-base;
    }
    .wechat-login-container {
      margin-top: 30rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #fff;
      border: 0;
      &::after {
        border: 0;
      }
      .wechat-img {
        width: 84rpx;
        height: 84rpx;
        background: #f0efef;
        border-radius: 50%;
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
        font-size: $font-small;
      }
    }
    .user-agreement {
      margin-top: 84rpx;
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
        font-size: $font-small;
        color: $font-color-sub;
      }
      .agreement {
        color: $primary-color;
      }
    }
  }
}
</style>
