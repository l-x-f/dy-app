<template>
  <view class="nav-bar-wrapper" :style="subNavWrapperStyle">
    <div
      class="nav-bar-body"
      :style="navStyle"
      :class="{
        'has-border': hasBorder
      }"
    >
      <!-- 左侧 -->
      <view v-if="hasLeftWrapper" class="nav-bar-left">
        <view v-if="hasLeft" @click="handleClickLeft">
          <slot name="left">
            <uni-icons
              :type="leftIcon || 'back'"
              size="24"
              :color="subTitleStyle.color || '#070F26'"
            />
          </slot>
        </view>
      </view>

      <!--  中间标题 -->
      <view class="nav-bar-center">
        <view
          v-if="hasTitle"
          class="nav-bar-center-title"
          :style="titleWrapperStyle"
          @click="handleClickCenter"
        >
          <image
            v-if="titleImage"
            class="image"
            :src="titleImage"
            mode="aspectFill"
          />

          <text class="text" :style="subTitleStyle">
            {{ title || defaultTitle }}
          </text>
        </view>
      </view>

      <!--  右侧 -->
      <view class="nav-bar-right">
        <view
          v-if="hasRight"
          class="nav-bar-right-content"
          @click="handleClickRight"
        >
          <slot name="right">
            <uni-icons
              :type="rightIcon || 'search'"
              size="24"
              :color="subTitleStyle.color || '#070F26'"
            />
          </slot>
        </view>
      </view>
    </div>
    <div v-if="hasPlaceholder" class="nav-placeholder" />
  </view>
</template>
<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
// import { storeToRefs } from 'pinia'
// import variables from 'variables'
import { onPageScrollEvent } from '@/utils/emitEvent'
import { getNavigationBarTitle } from '@/utils/uniUtils'
// import { useAppStore } from '@/store'
// import { isWep } from '@/utils'

// const { navHeight: navH } = variables

const props = defineProps({
  // 中间标题 默认是 pages.json中 pages->style->navigationBarTitleText 字段
  title: {
    type: String,
    default: undefined
  },
  // 是否显示标题
  hasTitle: {
    type: Boolean,
    default: true
  },
  // 是否显示标题
  hasBorder: {
    type: Boolean,
    default: false
  },
  // 中间标题图片
  titleImage: {
    type: String,
    default: ''
  },
  // 标题样式
  titleStyle: {
    type: Object,
    default: () => ({})
  },
  // 固定标题样式
  fixedTitleStyle: {
    type: Object,
    default: () => ({})
  },
  // 标题容器样式
  titleWrapperStyle: {
    type: Object,
    default: () => ({})
  },
  // 导航样式
  navStyle: {
    type: Object,
    default: () => ({})
  },
  // 导航容器样式
  navWrapperStyle: {
    type: Object,
    default: () => ({})
  },
  // 固定导航容器样式
  fixedNavWrapperStyle: {
    type: Object,
    default: () => ({})
  },
  // 左侧是否显示
  hasLeft: {
    type: Boolean,
    default: false
  },
  // 左侧容器是否显示
  hasLeftWrapper: {
    type: Boolean,
    default: true
  },
  // 是否显示右侧
  hasRight: {
    type: Boolean,
    default: false
  },
  // 是否显示下面的占位栏
  hasPlaceholder: {
    type: Boolean,
    default: true
  },
  // 左侧图标
  leftIcon: {
    type: String,
    default: ''
  },
  // 右侧图标
  rightIcon: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['clickLeft', 'clickCenter', 'clickRight', 'fixed'])
// 默认标题
const defaultTitle = ref('')
// 导航变色处理
// const store = useAppStore()
// const { systemInfo } = storeToRefs(store)
// const navHeight = systemInfo.value.statusBarHeight +parseInt(navH)
// const navHeight = systemInfo.value.statusBarHeight
const subNavWrapperStyle = ref({ ...props.navWrapperStyle })
const subTitleStyle = ref({ ...props.titleStyle })
// 监听页面滚动
onPageScrollEvent(data => {
  if (data.scrollTop > 0) {
    subNavWrapperStyle.value = props.fixedNavWrapperStyle
    subTitleStyle.value = props.fixedTitleStyle
    emit('fixed', true)
  } else {
    subNavWrapperStyle.value = props.navWrapperStyle
    subTitleStyle.value = props.titleStyle
    emit('fixed', false)
  }
})
// 挂载时拿标题
onLoad(() => {
  if (props.title === void 0) {
    const title = getNavigationBarTitle()
    defaultTitle.value = title
  }
})
// 分发点击事件
const handleClickLeft = () => {
  uni.navigateBack({ delta: 1 })
  emit('clickLeft')
}
// 分发点击事件
const handleClickCenter = () => {
  emit('clickCenter')
}
// 分发点击事件
const handleClickRight = () => {
  emit('clickRight')
}
</script>

<style lang="scss" scoped>
@import 'variables';

.nav-bar-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: #ffff;
  .nav-bar-body {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-image: inherit;
    background-color: inherit;
    height: calc($nav-height + var(--status-bar-height));
    padding: var(--status-bar-height) $page-spacing 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 999;
  }
  .has-border {
    border-bottom: 1rpx solid $divide-line-color;
  }
  .nav-placeholder {
    height: calc($nav-height + var(--status-bar-height));
    width: 100%;
  }
  .nav-bar-left {
    flex: 1;
    margin-left: -6px;
  }
  .nav-bar-center {
    flex: 1;
    text-align: center;
    .nav-bar-center-title {
      display: flex;
      align-items: center;
      justify-content: center;
      .image {
        width: 48rpx;
        height: 48rpx;
        border-radius: 50%;
        margin-right: 10rpx;
      }
      .text {
        font-size: $nav-font-size;
        color: $font-color-main;
        font-weight: bold;
      }
    }
  }
  .nav-bar-right {
    flex: 1;
    text-align: right;
  }
}
</style>
