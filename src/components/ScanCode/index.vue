<template>
  <view>
    <text @click="scan">扫一扫</text>
    {{ state.result }}
  </view>
</template>
<script setup>
import { reactive } from 'vue'
import permision from '@/utils/permission'

const state = reactive({ result: '' })

/**
 * 检查权限
 * @param {*} code
 */
// #ifdef APP-PLUS
const checkPermission = async code => {
  console.log(code)
  let status = permision.isIOS
    ? await permision.requestIOS('camera')
    : await permision.requestAndroid('android.permission.CAMERA')
  if (status === null || status === 1) {
    status = 1
  } else {
    uni.showModal({
      content: '需要相机权限',
      confirmText: '设置',
      success: function (res) {
        if (res.confirm) {
          permision.gotoAppSetting()
        }
      }
    })
  }
  return status
}
// #endif

/**
 * 扫码
 */
const scan = async () => {
  // #ifdef APP-PLUS
  const status = await checkPermission()
  if (status !== 1) {
    return
  }
  // #endif
  uni.scanCode({
    success: res => {
      state.result = res.result
    },
    fail: err => {
      console.log(err)
    }
  })
}
</script>

<style>
.scan-result {
  min-height: 50rpx;
  line-height: 50rpx;
}
</style>
