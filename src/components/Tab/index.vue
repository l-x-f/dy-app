<template>
  <!-- tab栏 -->
  <view class="tab-component">
    <view
      v-for="(item, index) in tabList"
      :key="index"
      class="tab-item"
      :class="{ 'tab-item-active': state.tabIndex === index }"
      @click="handleSwitchTab(index)"
    >
      {{ item.title }}
    </view>
  </view>
</template>

<script setup>
import { reactive, watchEffect } from 'vue'

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

const state = reactive({
  tabIndex: 0
})
watchEffect(() => {
  state.tabIndex = props.modelValue || 0
})

const handleSwitchTab = index => {
  state.tabIndex = index
  emit('update:modelValue', index)
  emit('switchTab', index)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';

.tab-component {
  padding: 28rpx $page-spacing;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  border-top-left-radius: $border-radius;
  border-top-right-radius: $border-radius;
  .tab-item {
    flex: 1;
    text-align: center;
    font-size: 32rpx;
    color: $font-color-sub;
  }
  .tab-item-active {
    font-weight: 500;
    color: $font-color-main;
  }
}
</style>
