<template>
  <div
    class="scale-background"
    :style="{
      backgroundSize: `${backgroundSize}% auto`,
      paddingTop: paddingTop + 'px'
    }"
    @touchend="touchend"
    @touchmove="touchmove"
  >
    <slot />
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { onPageScroll } from '@dcloudio/uni-app'

const step = 2

const state = reactive({
  backgroundSize: 100,
  paddingTop: 181,
  baseRate: 100,
  clientMoveY: 0,
  pageY: 0,
  timer: null
})

onPageScroll(e => {
  state.pageY = e.scrollTop
  console.log(state.pageY, ' state.pageY ')
})

const touchend = () => {
  if (state.pageY !== 0) {
    return
  }
  state.timer && clearInterval(state.timer)
  // 回弹
  state.timer = setInterval(() => {
    state.baseRate = state.baseRate - step * 2
    if (state.baseRate <= 100) {
      state.baseRate = 100
      state.paddingTop = 181
      clearInterval(state.timer)
    }
    state.backgroundSize = state.baseRate
    state.paddingTop = 181 * (state.baseRate / 100)
  }, 16)
}
const touchmove = e => {
  console.log(e, 'etouchmove')

  if (state.pageY !== 0) {
    return
  }
  const touchData = e.changedTouches[0]
  const { clientY } = touchData
  // 判断下拉
  if (state.clientMoveY - clientY < 0) {
    state.baseRate = state.baseRate + step
    state.backgroundSize = state.baseRate
    state.paddingTop = 181 * (state.baseRate / 100)
  }
  state.clientMoveY = clientY
}

const { backgroundSize, paddingTop } = toRefs(state)
</script>

<style lang="scss" scoped>
.scale-background {
  background-repeat: no-repeat;
  background-origin: center center;
  background-position: top center;
  background-size: 100% auto;
}
</style>
