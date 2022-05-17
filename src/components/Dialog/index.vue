<template>
  <uni-popup
    ref="dialogPopup"
    :is-mask-click="false"
    :mask-click="false"
    type="center"
  >
    <view class="popup-wrapper">
      <view class="popup-body">
        <!-- 标题 -->
        <view v-if="title" class="popup-body-title">{{ title }}</view>

        <!-- 弹窗体 -->
        <view class="popup-content">
          <slot>
            <input
              v-model="inputValue"
              class="input"
              type="text"
              placeholder="请输入"
            />
          </slot>
        </view>
      </view>

      <!-- 底部确认按钮 -->
      <view :class="{ 'popup-footer': true, 'no-close': !hasClose }">
        <view v-if="hasClose" class="popup-footer-item">
          <button type="default" class="button" @click="handleClose">
            {{ closeText }}
          </button>
        </view>
        <view class="popup-footer-item">
          <button type="primary" class="button" @click="handleConfirm">
            {{ confirmText }}
          </button>
        </view>
      </view>
    </view>
  </uni-popup>
</template>
<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  // 弹窗显示
  modelValue: {
    type: [String, Number, Date],
    default: ''
  },
  // 标题
  title: {
    type: String,
    default: '绑定微信号'
  },
  // 确定文字
  confirmText: {
    type: String,
    default: '确定'
  },
  // 是否有取消按钮
  hasClose: {
    type: Boolean,
    default: false
  },
  // 取消文字
  closeText: {
    type: String,
    default: '取消'
  }
})
const emit = defineEmits(['confirm', 'close', 'update:modelValue'])

// 弹窗实例
const dialogPopup = ref()

// 输入框值
const inputValue = ref('')

/**
 * 打开弹窗
 */
const open = () => {
  dialogPopup.value.open()
}
/**
 * 关闭弹窗
 */
const close = () => {
  dialogPopup.value?.close()
}
/**
 * 点击关闭
 */
const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

/**
 * 点击确定
 */
const handleConfirm = () => {
  emit('confirm', inputValue.value)
  emit('update:modelValue', false)
}

// 监听 modelValue 显示弹窗
watch(
  () => props.modelValue,
  val => {
    val ? open() : close()
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.popup-wrapper {
  width: 615rpx;
  min-height: 347rpx;
  background: #fdfffe;
  border-radius: $page-spacing;
  padding: $page-spacing;
  display: flex;
  flex-direction: column;
  .uni-popup {
    uni-view[name='mask'] {
      background-color: rgba(0, 0, 0, 0.5) !important;
    }
  }
  .popup-body {
    flex: 1;
    .popup-body-title {
      font-size: 35rpx;
      font-weight: bold;
      color: $font-color-main;
    }
    .popup-content {
      margin-top: 31rpx;
      width: 100%;
    }
    .input {
      width: 100%;
      height: 92rpx;
      background: #fdfffe;
      border: 3px solid #3746c7;
      border-radius: $border-radius;
      box-sizing: border-box;
      padding: 0 20rpx;
    }
  }
  .popup-footer {
    display: flex;
    justify-content: space-between;
    margin-top: $page-spacing;
    .popup-footer-item {
      font-size: 14px;
      .button {
        width: 256rpx;
      }
    }
  }
  .no-close {
    width: 100%;
    .popup-footer-item {
      width: 100%;
      .button {
        width: 100%;
      }
    }
  }
}
</style>
