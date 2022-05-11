<template>
  <view class="app-textarea">
    <textarea
      v-model="inputValue"
      class="textarea"
      :maxlength="maxlength"
      placeholder-class="placeholder-class"
      :placeholder="placeholder"
      @input="handleChange"
    />
    <view class="app-textarea-length">
      <view> {{ contentLength }}/{{ maxlength }}字</view>
    </view>
  </view>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'

const props = defineProps({
  // input值
  modelValue: {
    type: String,
    default: ''
  },
  // 占位符
  placeholder: {
    type: String,
    default: '请输入笔记内容'
  },
  // 占位符
  maxlength: {
    type: Number,
    default: 500
  }
})
const emit = defineEmits(['update:modelValue', 'change', 'confirm'])

const inputValue = ref('')
const contentLength = computed(() => inputValue.value.length)

watchEffect(() => {
  inputValue.value = props.modelValue
})

const handleChange = () => {
  emit('update:modelValue', inputValue.value)
  emit('change', inputValue.value)
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.app-textarea {
  background: #fff;
  width: 100%;
  padding-bottom: $item-spacing;

  /* stylelint-disable-next-line selector-type-no-unknown */
  :deep(uni-textarea) {
    width: 100%;
  }

  .textarea {
    width: 100%;
    color: $font-color-main;
  }
  .app-textarea-length {
    display: flex;
    justify-content: flex-end;
    color: $font-color-sub;
    font-size: $font-small;
  }
}
</style>
