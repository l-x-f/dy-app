<template>
  <view class="search-components">
    <input
      v-model="inputValue"
      type="text"
      class="search-input"
      confirm-type="search"
      :placeholder="placeholder"
      placeholder-class="search-placeholder"
      @change="handleChange"
      @confirm="handleConfirm"
    />
    <image
      class="search-image"
      src="@/static/image/search.png"
      alt=""
      mode="aspectFill"
      @click="handleConfirm"
    />
  </view>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  // input值
  modelValue: {
    type: String,
    default: ''
  },
  // 占位符
  placeholder: {
    type: String,
    default: '请输入关键字'
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'confirm'])

const inputValue = ref('')

watchEffect(() => {
  inputValue.value = props.modelValue
})

const handleChange = () => {
  emit('update:modelValue', inputValue.value)
  emit('change', inputValue.value)
}

const handleConfirm = () => {
  emit('confirm', inputValue.value)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.search-components {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  .search-input {
    box-sizing: border-box;
    width: 100%;
    height: 88rpx;
    line-height: 106rpx;
    box-shadow: 7px 11px 8px 0 rgba(0, 0, 0, 0.08);
    border-radius: 12rpx;
    padding: 0 30rpx;
    background: #fff;
    font-size: $font-base;
  }
  .search-image {
    width: 48rpx;
    height: 48rpx;
    position: absolute;
    z-index: 1;
    top: 50%;
    right: $item-spacing;
    transform: translateY(-50%);
    object-fit: contain;
  }
  :deep(.search-placeholder) {
    font-size: $font-base;
    color: #acacac;
  }
}
</style>
