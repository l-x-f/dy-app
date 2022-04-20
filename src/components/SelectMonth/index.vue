<template>
  <uni-popup
    ref="popup"
    :is-mask-click="false"
    :mask-click="false"
    type="bottom"
  >
    <view class="popup-wrapper">
      <view class="popup-header">
        <view class="popup-header-item" @click="close">取消</view>
        <view class="popup-header-item" @click="handleConfirm">确定</view>
      </view>
      <view class="popup-body">
        <view class="popup-body-content">
          <view class="popup-body-icon-left" @click="minus"> &lt; </view>
          <view class="popup-body-year">
            {{ state.year }}
          </view>
          <view class="popup-body-icon-right" @click="add">&gt;</view>
        </view>

        <view class="popup-body-month-wrapper">
          <view
            v-for="item in MonthCount"
            :key="item"
            class="popup-body-month-item"
            :class="{
              'popup-body-month-item-active': state.month === item,
              'popup-body-month-item-disabled': disabledDate(state.year, item)
            }"
            @click="handleClickItem(item)"
          >
            {{ item }}月
          </view>
        </view>
      </view>
    </view>
  </uni-popup>
</template>
<script setup>
import { ref, watch, nextTick, reactive } from 'vue'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number, Date],
    default: ''
  },
  disabledDate: {
    type: Function,
    default: () => false
  }
})
const emit = defineEmits(['confirm', 'update:visible', 'update:modelValue'])
const popup = ref()

const MonthCount = 12
const DefaultYear = new Date().getFullYear()
const DefaultMonth = ''

const state = reactive({
  year: DefaultYear,
  month: DefaultMonth
})

/**
 * 初始化数据
 */
const initData = () => {
  state.year = DefaultYear
  state.month = DefaultMonth
}

/**
 * 打开弹窗
 */
const open = () => {
  nextTick(() => {
    popup.value.open()
  })
}

/**
 * 关闭弹窗
 */
const close = () => {
  popup.value?.close()
  emit('update:visible', false)
}

/**
 *  减少年份
 */
const minus = () => {
  state.year--
}

/**
 * 增加年份
 */
const add = () => {
  state.year++
}

/**
 * 点击月
 * @param {*} current
 */
const handleClickItem = current => {
  state.month = current
}

/**
 * 点击确定
 */
const handleConfirm = () => {
  if (!state.month) {
    return
  }
  const data = {
    yarn: state.year,
    month: state.month,
    value: state.year + '-' + state.month
  }
  emit('confirm', data)
  emit('update:modelValue', data.value)
  emit('update:visible', false)
}

// 监听 visible 显示弹窗
watch(
  () => props.visible,
  val => {
    val ? open() : close()
  },
  {
    immediate: true
  }
)

// 监听 modelValue 初始化值
watch(
  () => props.modelValue,
  val => {
    if (val) {
      const temp = val.toString().replace(/-/g, '/')
      const date = new Date(temp)
      if (isNaN(Number(date))) {
        console.error(`日期格式错误:${val}`)
        initData()
        return
      }
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      state.year = year
      state.month = month
    } else {
      initData()
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.popup-wrapper {
  background-color: #fff;
  padding: $page-spacing;
  border-radius: 10px 10px 0 0;
  position: relative;
  .popup-close {
    position: absolute;
    top: calc(#{$page-spacing} * 0.5);
    right: $page-spacing;
  }

  .popup-body {
    .popup-body-content {
      display: flex;
      justify-content: space-around;
      position: relative;
      padding-top: 20px;

      .popup-body-icon-left {
        position: absolute;
        left: 0;
      }
      .popup-body-icon-right {
        position: absolute;
        right: 0;
      }
      .popup-body-year {
        text-align: center;
      }
    }
  }

  .popup-body-month-wrapper {
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    .popup-body-month-item {
      text-align: center;
      flex: 0 0 25%;
      box-sizing: border-box;
      padding: 10px;
    }
    .popup-body-month-item-active {
      background-color: $primary-color;
    }
    .popup-body-month-item-disabled {
      background-color: #ccc;
    }
  }

  .popup-header {
    display: flex;
    justify-content: space-between;
    .popup-header-item {
      font-size: 14px;
    }
  }
}
</style>
