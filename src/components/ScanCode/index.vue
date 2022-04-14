<template>
  <view>
    <text @click="scan">扫一扫</text>
    {{ state.result }}
  </view>
</template>
<script setup>
import { reactive } from 'vue'
import { scanCode } from '@/utils/uniUtils'

const state = reactive({ result: '' })

/**
 * 扫码
 */
const scan = async () => {
  // #ifdef APP-PLUS
  state.result = await scanCode()
}
</script>

<style>
.scan-result {
  min-height: 50rpx;
  line-height: 50rpx;
}
</style>
