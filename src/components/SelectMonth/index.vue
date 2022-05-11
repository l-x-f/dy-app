<template>
  <uni-popup
    ref="popup"
    :is-mask-click="false"
    :mask-click="false"
    type="bottom"
  >
    <view class="popup-wrapper">
      <view class="popup-header">
        <view class="popup-header-cancel" @click="close">取消</view>
        <view class="popup-header-title">{{ title }}</view>
        <view class="popup-header-confirm" @click="handleConfirm">确定</view>
      </view>

      <view class="popup-body">
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
    </view>
  </uni-popup>
</template>
<script setup>
import { ref, watch, reactive, onMounted } from 'vue'
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
  popup.value?.open()
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

onMounted(() => {
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
.uni-popup {
  :deep(uni-view[name='mask']) {
    background-color: rgba(0, 0, 0, 0.5) !important;
  }
  // #ifdef H5
  :deep(uni-view[name='content']) {
    bottom: 50px !important;
  }
  // #endif
}
.popup-wrapper {
  background-color: #fff;
  padding: $item-spacing 0;
  border-radius: 10px 10px 0 0;
  position: relative;

  .popup-header {
    display: flex;
    justify-content: space-between;
    padding: 0 45rpx;
    font*size: $font-large;
    .popup-header-cancel {
      color: $font-color-sub;
    }
    .popup-header-title {
      font-weight: 500;
      color: $font-color-main;
    }
    .popup-header-confirm {
      color: $primary-color;
    }
  }
  .popup-body {
    .popup-body-year-wrapper {
      padding: 40rpx 45rpx 0;
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
      background-color: $font-color-sub;
    }
  }
}
</style>
