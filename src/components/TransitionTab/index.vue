<template>
  <!-- tab栏 -->
  <view class="transition-tab-component">
    <view class="tab-item-wrapper">
      <view
        v-for="(item, index) in tabList"
        :key="index"
        class="tab-item"
        :class="{ 'tab-item-active': state.tabIndex === index }"
        :style="{ flex }"
        @click="handleSwitchTab(item, index)"
      >
        <text class="tab-item-text"> {{ item.title }}</text>
      </view>
    </view>
    <view class="tab-item-active-border" :style="{ left, width }" />
  </view>
</template>

<script setup>
import { reactive, watchEffect, computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  tabList: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['update:modelValue', 'switchTab'])

const width = computed(() =>
  Number(((1 / props.tabList.length) * 100).toFixed(2))
)
const left = ref(0)

const state = reactive({
  tabIndex: 0,
  tabItem: {}
})
watchEffect(() => {
  state.tabIndex = props.modelValue || 0
})
const flex = computed(() => `0 0 ${width.value}%`)

const handleSwitchTab = (item, index) => {
  state.tabIndex = index
  state.tabItem = item
  emit('update:modelValue', index)
  emit('switchTab', index, item)
  left.value = width.value * index + '%'
}
</script>

<style lang="scss" scoped>
@import 'variables';
@import 'mixin';

.transition-tab-component {
  margin: 28rpx 0;
  width: 100%;
  box-sizing: border-box;
  border-radius: 8rpx;
  position: relative;
  height: 100rpx;
  .tab-item-wrapper {
    width: 100%;
    position: absolute;
    left: 0;
    display: flex;
    justify-content: space-around;
    background-color: $page-bg-color;
    border-radius: 8rpx;
  }
  .tab-item {
    flex: 0 0 50%;
    text-align: center;
    font-size: 32rpx;
    height: 100rpx;
    color: $font-color-sub;
    box-sizing: border-box;
    border: 1rpx solid transparent;
    padding: 24rpx 0;
    position: relative;

    @include text-overflow-hidden;

    .tab-item-text {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
    }
  }
  .tab-item-active {
    .tab-item-text {
      color: #3b459a;
    }
  }
  .tab-item-active-border {
    background-color: #fff;
    box-sizing: border-box;
    width: 50%;
    height: 100rpx;
    position: absolute;
    top: 0;
    left: 200px;
    z-index: 1;
    border: 1rpx solid $divide-line-color;
    border-radius: 8rpx;
    transition: left 0.3s linear;
  }
}
</style>
