<template>
  <Popup
    v-model:visible="state.subVisible"
    @click="close"
    @confirm="handleConfirm"
  >
    <view class="select-month">
      <view class="popup-body-year-wrapper">
        <view class="popup-body-icon-left" @click="minus">
          <uni-icons type="left" size="20" color="#666" />
        </view>
        <view class="popup-body-year">
          {{ state.year }}
        </view>
        <view class="popup-body-icon-right" @click="add">
          <uni-icons type="right" size="20" color="#666" />
        </view>
      </view>

      <view class="popup-body-month-wrapper">
        <view
          v-for="item in MonthCount"
          :key="item"
          :class="{
            'popup-body-month-item': true,
            'popup-body-month-item-active': state.month === item,
            'popup-body-month-item-disabled': disabledDate(state.year, item)
          }"
          @click="handleClickItem(item)"
        >
          {{ item }}
          <text>月</text>
        </view>
      </view>
    </view>
  </Popup>
</template>
<script setup>
import { watch, reactive, onMounted } from 'vue'
import Popup from '@/components/Popup'
const props = defineProps({
  // 弹窗显示
  visible: {
    type: Boolean,
    default: false
  },
  // 月历组件值
  modelValue: {
    type: [String, Number, Date],
    default: ''
  },
  // 禁用的日期
  disabledDate: {
    type: Function,
    default: (year, month) => {
      const date = new Date()
      if (year > date.getFullYear()) {
        return true
      }
      if (year === date.getFullYear() && month > date.getMonth() + 1) {
        return true
      }
      return false
    }
  }
})
const emit = defineEmits(['confirm', 'update:visible', 'update:modelValue'])

const date = new Date()

const MonthCount = 12
const DefaultYear = date.getFullYear()
const DefaultMonth = date.getMonth() + 1

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
 * 关闭弹窗
 */
const close = () => {
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
    subVisible: false,
    yarn: state.year,
    month: state.month,
    value: state.year + '-' + state.month
  }
  emit('confirm', data)
  emit('update:modelValue', data.value)
  emit('update:visible', false)
}

onMounted(() => {
  emit('update:modelValue', state.year + '-' + state.month)
  // 监听 visible 显示弹窗
  watch(
    () => props.visible,
    val => {
      state.subVisible = val
    },
    {
      immediate: true
    }
  )
})

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
.select-month {
  .popup-body-year-wrapper {
    padding: 40rpx 45rpx 10rpx;
    display: flex;
    justify-content: space-around;
    position: relative;
    .popup-body-icon-left {
      position: absolute;
      padding: 0 45rpx;
      left: 0;
    }
    .popup-body-icon-right {
      padding: 0 45rpx;
      position: absolute;
      right: 0;
    }
    .popup-body-year {
      text-align: center;
    }
  }

  .popup-body-month-wrapper {
    padding-top: 40rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    .popup-body-month-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 25%;
      width: 25%;
      height: 135rpx;
      border-radius: 10px;
      font-size: 29rpx;
      color: $font-color-sub;
    }

    .popup-body-month-item-active {
      background-color: #f7f9fd;
      color: $primary-color;
    }
    .popup-body-month-item-disabled {
      background-color: rgba(0, 0, 0, 0.04);
      border-radius: 0;
      color: $font-color-sub;
    }
  }
}
</style>
