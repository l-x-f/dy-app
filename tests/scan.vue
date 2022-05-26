<template>
  <div class="page-body" :style="{ backgroundSize }">
    <!-- <NavBar has-left /> -->

    <SwiperScroll
      class="scroll"
      :scroll-x="false"
      vertical
      height="200px"
      @change="handleChange"
    >
      <div class="movable-area" />
    </SwiperScroll>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import SwiperScroll from '@/components/SwiperScroll'
// import NavBar from '@/components/NavBar'

const step = 1

const state = reactive({
  x: 50,
  y: 0,
  transform: '',
  backgroundSize: '100% auto',
  base: 100,
  baseY: 200
})

const handleChange = e => {
  const dy = Math.abs(e.detail.dy)
  console.log(dy)

  if (dy === 200) {
    state.base = 100
    state.backgroundSize = `${state.base}%  auto`
    return
  }

  if (state.baseY < dy) {
    state.base = state.base + step
    state.backgroundSize = `${state.base}%  auto`
  } else {
    state.base = state.base - step
    if (state.base <= 100) {
      state.base = 100
    }
    state.backgroundSize = `${state.base}%  auto`
  }

  state.baseY = dy
}

const { backgroundSize } = toRefs(state)
</script>

<style lang="scss" scoped>
.page-body {
  background-image: url('/static/image/sea.png');
  transition: all 0.5 linear;
  background-repeat: no-repeat;
  background-origin: center center;
  background-position: top center;
  background-size: 100% auto;

  .scroll {
    padding-top: 181px;
  }
  .movable-area {
    padding-left: 100px;
    box-sizing: border-box;
    width: 100%;
    height: 200px;
    background-color: #f00;
  }
}
</style>
