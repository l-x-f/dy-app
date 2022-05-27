<template>
  <div
    ref="reference"
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
import { reactive, toRefs, ref, computed } from 'vue'
import { onPageScroll } from '@dcloudio/uni-app'

// 动画步长
const step = 2
// 顶部距离
const top = 190
// 当前页面元素
const reference = ref()

const state = reactive({
  backgroundSize: 100,
  paddingTop: top,
  baseRate: 100,
  clientMoveY: 0,
  scrollTop: 0,
  timer: null
})

// 监听页面滚动
onPageScroll(e => {
  state.scrollTop = e.scrollTop
})

// 拿到页面父元素
const parentElements = computed(() =>
  Array.from([
    reference.value?.parentElement,
    reference.value?.parentElement?.parentElement,
    reference.value?.parentElement?.parentElement?.parentElement
  ])
)

//  开始时处理页面滚动
const handleMove = () => {
  parentElements.value.forEach(item => {
    item && (item.style.height = '100vh')
    item && (item.style.overflow = 'hidden')
  })
}

//  结束时处理页面滚动
const handleEnd = () => {
  parentElements.value.forEach(item => {
    item && (item.style.height = '')
    item && (item.style.overflow = '')
  })
}

// 监听移动
const touchmove = e => {
  // 页面不在顶部不调用
  if (state.scrollTop !== 0) {
    return
  }
  const touchData = e.changedTouches[0]
  const { clientY } = touchData
  // 判断下拉
  if (state.clientMoveY - clientY < 0) {
    state.baseRate = state.baseRate + step
    state.backgroundSize = state.baseRate
    state.paddingTop = top * (state.baseRate / 100)
  }
  state.clientMoveY = clientY
  handleMove()
}

// 监听移动结束
const touchend = () => {
  // 页面不在顶部不调用
  if (state.scrollTop !== 0) {
    return
  }
  state.timer && clearInterval(state.timer)
  // 回弹
  state.timer = setInterval(() => {
    state.baseRate = state.baseRate - step * 2
    if (state.baseRate <= 100) {
      state.baseRate = 100
      state.paddingTop = top
      clearInterval(state.timer)
    }
    state.backgroundSize = state.baseRate
    state.paddingTop = top * (state.baseRate / 100)
  }, 16)
  handleEnd()
}

const { backgroundSize, paddingTop } = toRefs(state)
</script>

<style lang="scss" scoped>
.scale-background {
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% auto;
}
</style>
