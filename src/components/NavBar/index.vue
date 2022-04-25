<template>
  <view class="nav-bar-wrapper">
    <div class="nav-bar-body" :style="navStyle">
      <!-- 左侧 -->
      <view v-if="hasLeftWrapper" class="nav-bar-left">
        <view v-if="hasLeft" @click="handleClickLeft">
          <slot name="left">
            <uni-icons type="back" size="30" />
          </slot>
        </view>
      </view>

      <!--  中间标题 -->
      <view class="nav-bar-center">
        <view
          v-if="hasTitle"
          class="nav-bar-center-title"
          :style="titleStyle"
          @click="handleClickCenter"
        >
          {{ title || defaultTitle }}
        </view>
      </view>

      <!--  右侧 -->
      <view class="nav-bar-right">
        <view v-if="hasRight" @click="handleClickRight">
          <slot name="right">
            <uni-icons type="search" size="24" />
          </slot>
        </view>
      </view>
    </div>
    <div class="nav-placeholder" />
  </view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getNavigationBarTitle } from '@/utils/uniUtils'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  titleStyle: {
    type: Object,
    default: () => ({})
  },
  navStyle: {
    type: Object,
    default: () => ({})
  },
  hasLeft: {
    type: Boolean,
    default: false
  },
  hasLeftWrapper: {
    type: Boolean,
    default: true
  },
  hasTitle: {
    type: Boolean,
    default: true
  },
  hasRight: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['clickLeft', 'clickCenter', 'clickRight'])

const defaultTitle = ref()

onMounted(() => {
  if (!props.title) {
    const title = getNavigationBarTitle()
    defaultTitle.value = title
  }
})

const handleClickLeft = () => {
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

  .nav-bar-body {
    position: fixed;
    top: var(--status-bar-height);
    left: 0;
    width: 100%;
    background-color: #fff;
    height: $nav-height;
    padding: 0 $page-spacing;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 999999;
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
      font-size: $font-large;
      color: #111;
    }
  }
  .nav-bar-right {
    flex: 1;
    text-align: right;
  }
}
</style>
