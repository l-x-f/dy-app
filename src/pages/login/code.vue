<template>
  <div class="code-page">
    <NavBar :has-title="false" />

    <view class="title"> 请输入验证码 </view>
    <view class="sub-title">
      验证码已发送
      <text class="phone">{{ state.phone }}</text>
    </view>
    <view class="verify-input-wrapper">
      <VerifyInput v-model="state.code" />
      <view v-if="state.isError" class="error">验证码错误</view>
    </view>
    <view
      class="code-tip"
      :class="{ link: !state.sendCodeDisabled }"
      @click="sendCode"
    >
      <text class="text"> {{ state.text }}</text>
    </view>
  </div>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { reactive, watch } from 'vue'
import VerifyInput from '@/components/VerifyInput'
import NavBar from '@/components/NavBar'

const DefaultText = '重新发送验证码'
const CodeLength = 6

const state = reactive({
  code: '',
  phone: '',
  text: '',
  sendCodeDisabled: false,
  univerifyBtnLoading: false,
  timer: null,
  count: 60,
  isError: false
})
// 获取页面参数
onLoad(data => {
  state.phone = data.phone
})
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
// 开始倒计时
const startTime = () => {
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
    state.text = `${state.count}秒后重新发送`
  }, 1000)
}
startTime()
// 发送验证码
const sendCode = () => {
  if (state.sendCodeDisabled) {
    return
  }
  uni.showToast({
    title: '发送成功',
    icon: 'success',
    mask: true
  })
  startTime()
}
watch(
  () => state.code,
  val => {
    if (val.length === CodeLength) {
      toHome()
    }
  }
)
console.log(toLogin, 'tologin')
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.code-page {
  height: 100vh;
  background-color: #fff;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 $page-spacing;
  .title {
    font-size: $font-large-title;
    font-weight: 500;
    color: $font-color-main;
    text-align: center;
  }
  .sub-title {
    margin-top: 27rpx;
    font-size: $font-small;
    color: $font-color-sub;
    text-align: center;
    .phone {
      color: $primary-color;
      padding-left: 2rpx;
    }
  }
  .verify-input-wrapper {
    margin-top: 59rpx;
  }
  .error {
    text-align: center;
    margin-top: $item-spacing;
    color: $danger-color;
  }
  .code-tip {
    font-size: $font-small;
    font-weight: 400;
    color: $font-color-sub;
    margin-top: 40rpx;
    text-align: center;
  }
  .link {
    .text {
      border-bottom: 1px solid $font-color-sub;
    }
  }
}
</style>
