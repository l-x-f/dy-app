<template>
  <view class="nav-bar-wrapper" :style="navStyle">
    <div class="nav-bar-body">
      <!-- 左侧 -->
      <view v-if="hasLeftWrapper" class="nav-bar-left">
        <view v-if="hasLeft" @click="handleClickLeft">
          <slot name="left">
            <uni-icons type="back" size="30" />
          </slot>
        </view>
      </view>

      <!--  中间标题 -->
      <view class="nav-bar-center">
        <view
          v-if="hasTitle"
          class="nav-bar-center-title"
          :style="titleStyle"
          @click="handleClickCenter"
        >
          {{ title }}
        </view>
      </view>

      <!--  右侧 -->
      <view class="nav-bar-right">
        <view v-if="hasRight" @click="handleClickRight">
          <slot name="right">
            <uni-icons type="search" size="30" />
          </slot>
        </view>
      </view>
    </div>
  </view>
</template>
<script setup>
/* eslint-disable no-unused-vars */
/* eslint-disable  @typescript-eslint/no-unused-vars */

import { ref, watch, nextTick, reactive } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  titleStyle: {
    type: Object,
    default: () => ({})
  },
  navStyle: {
    type: Object,
    default: () => ({})
  },
  hasLeft: {
    type: Boolean,
    default: false
  },
  hasLeftWrapper: {
    type: Boolean,
    default: true
  },
  hasTitle: {
    type: Boolean,
    default: true
  },
  hasRight: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits([
  'handleClickLeft',
  'handleClickCenter',
  'handleClickRight'
])

const handleClickLeft = () => {
  emit('handleClickLeft')
}
const handleClickCenter = () => {
  emit('handleClickCenter')
}
const handleClickRight = () => {
  emit('handleClickRight')
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.nav-bar-wrapper {
  height: $nav-height;
  width: 100%;
  position: fixed;
  top: var(--status-bar-height);
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 0 $page-spacing;
  box-sizing: border-box;

  .nav-bar-body {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .nav-bar-left {
    flex: 1;
  }
  .nav-bar-center {
    flex: 1;
    text-align: center;
    .nav-bar-center-title {
      font-size: $font-large;
      color: #111;
    }
  }
  .nav-bar-right {
    flex: 1;
    text-align: right;
  }
}
</style>
