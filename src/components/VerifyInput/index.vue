<template>
  <view class="verifical-input">
    <input
      v-model="inputCode"
      class="verifical-input-hidden"
      type="number"
      hold-keyboard="true"
      :maxlength="blockNum"
      :focus="isFucus"
      @input="handleChange"
      @click="handleClick"
      @blur="handleBlur"
    />
    <view class="verifical-input-real">
      <block v-for="(item, index) in blockNum" :key="index">
        <view
          :class="[
            'real-block',
            {
              'block-active': index === activeIndex && codeType === 'block',
              'line-active': index === activeIndex && codeType === 'line',
              'block-error': errorType
            },
            codeType === 'block' ? 'block-content' : 'line-content'
          ]"
        >
          <text
            v-if="index === activeIndex && isFucus"
            class="real-block-line"
          />
          <text class="real-block-number">{{ inputText[index] }}</text>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    // 验证码个数
    blockNum: {
      type: Number,
      default: 6
    },
    // 验证码类型
    codeType: {
      type: String,
      default: 'block'
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      activeIndex: 0, // 激活的方块
      inputText: '', // 输入的验证码
      isFucus: true, // 是否自动聚焦
      inputCode: '', // 输入的值
      errorType: false // 错误提示
    }
  },
  watch: {
    modelValue(val) {
      this.inputCode = val
    },
    errorType: {
      immediate: true,
      handler: function (newValue) {
        if (newValue === true) {
          this.inputText.length = 0
          this.inputCode = ''
          this.isFucus = true
        }
      }
    }
  },
  methods: {
    handleChange(event) {
      this.errorType = false
      this.inputText = event.detail.value.split('')
      this.activeIndex = this.inputText.length
      if (this.activeIndex == this.blockNum) {
        this.isFucus = false
        this.$emit('update:modelValue', event.detail.value)
      }
    },
    handleClick() {
      this.isFucus = true
      this.activeIndex = 0
    },
    handleBlur() {
      this.isFucus = false
      this.activeIndex = 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'variables';
/* stylelint-disable  */
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.verifical-input {
  position: relative;
  overflow: hidden;
  padding: 0 5px;
  .verifical-input-hidden {
    position: absolute;
    top: 0;
    left: -200%;
    width: 300%;
    height: 100%;
    background: none;
    color: #ffffff;
  }
  .verifical-input-real {
    width: 100%;
    @extend .flex-row;
    justify-content: start;
    .real-block {
      width: 16%;
      height: 112rpx;
      margin-right: 9rpx;

      @extend .flex-row;
      &:last-child {
        margin-right: 0;
      }
      .real-block-line {
        display: inline-block;
        width: 2rpx;
        height: 46rpx;
        background: $font-base;
        animation: line 1s infinite ease;
      }
      .real-block-number {
        font-size: $font-large;
      }
    }
    .line-content {
      border-bottom: 2rpx solid $disable-color;
    }
    .block-content {
      border-radius: 12rpx;
      border: 2rpx solid $disable-color;
      background-color: #f9fafe;
    }
    .block-active {
      border: 4rpx solid $primary-color !important;
    }
    .line-active {
      border-bottom: 2rpx solid $primary-color;
    }
  }
}
.block-error {
  border-color: $danger-color !important;
  animation: error 0.5s ease;
}
@keyframes line {
  0% {
    opacity: 0.9;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0.9;
  }
}
@keyframes error {
  0% {
    transform: translateX(-5px);
  }
  20% {
    transform: translateX(5px);
  }
  40% {
    transform: translateX(-5px);
  }
  60% {
    transform: translateX(5px);
  }
  80% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
