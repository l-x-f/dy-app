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
    />
  </view>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入创作者口令'
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
    height: 106rpx;
    line-height: 106rpx;
    box-shadow: 0 11px 42px 0 rgba(70, 87, 224, 0.18);
    border-radius: $border-radius;
    padding: 0 32rpx;
  }
  .search-image {
    width: 42rpx;
    height: 42rpx;
    position: absolute;
    z-index: 1;
    top: 50%;
    right: 32rpx;
    transform: translateY(-50%);
    object-fit: contain;
  }
  :deep(.search-placeholder) {
    font-size: $font-middle;
    color: $font-color-base;
  }
}
</style>
