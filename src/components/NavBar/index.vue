<template>
  <view class="nav-bar-wrapper" :style="navWrapperStyle">
    <div class="nav-bar-body" :style="navStyle">
      <!-- 左侧 -->
      <view v-if="hasLeftWrapper" class="nav-bar-left">
        <view v-if="hasLeft" @click="handleClickLeft">
          <slot name="left">
            <uni-icons
              :type="leftIcon || 'back'"
              size="24"
              :color="titleStyle.color || '#333'"
            />
          </slot>
        </view>
      </view>

      <!--  中间标题 -->
      <view class="nav-bar-center">
        <view
          v-if="hasTitle"
          class="nav-bar-center-title"
          @click="handleClickCenter"
        >
          <image
            v-if="titleImage"
            class="image"
            :src="titleImage"
            mode="aspectFill"
          />

          <text class="text" :style="titleStyle">
            {{ title || defaultTitle }}
          </text>
        </view>
      </view>

      <!--  右侧 -->
      <view class="nav-bar-right">
        <view v-if="hasRight" @click="handleClickRight">
          <slot name="right">
            <uni-icons
              :type="rightIcon || 'search'"
              size="30"
              :color="titleStyle.color || '#333'"
            />
          </slot>
        </view>
      </view>
    </div>
    <div v-if="hasPlaceholder" class="nav-placeholder" />
  </view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getNavigationBarTitle } from '@/utils/uniUtils'
// import { isWep } from '@/utils'

const props = defineProps({
  // 中间标题 默认是 pages.json中 pages->style->navigationBarTitleText 字段
  title: {
    type: String,
    default: ''
  },
  // 是否显示标题
  hasTitle: {
    type: Boolean,
    default: true
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
  // 是否显示下面的站位栏
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
const emit = defineEmits(['clickLeft', 'clickCenter', 'clickRight'])

const defaultTitle = ref('')

onMounted(() => {
  if (!props.title) {
    const title = getNavigationBarTitle()
    defaultTitle.value = title
  }
})

const handleClickLeft = () => {
  uni.navigateBack({ delta: 1 })
  emit('clickLeft')
}
const handleClickCenter = () => {
  emit('clickCenter')
}
const handleClickRight = () => {
  emit('clickRight')
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.nav-bar-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: #fff;
  .nav-bar-body {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: inherit;
    height: calc($nav-height + var(--status-bar-height));
    padding: var(--status-bar-height) $page-spacing 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 999;
  }

  .nav-placeholder {
    height: $nav-height;
    width: 100%;
  }
  .nav-bar-left {
    flex: 1;
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
        font-size: $font-large;
        color: #333;
      }
    }
  }
  .nav-bar-right {
    flex: 1;
    text-align: right;
  }
}
</style>
