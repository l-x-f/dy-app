<template>
  <view class="component-swiper">
    <swiper
      class="swiper"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      :indicator-dots="config.indicatorDots"
      :indicator-color="config.indicatorColor"
      :indicator-active-color="config.indicatorActiveColor"
    >
      <swiper-item
        v-for="(item, index) in list"
        :key="item[imageKey]"
        class="swiper-item-wrapper"
      >
        <view class="swiper-item">
          <image
            v-if="hasErrorList[index]"
            width="150"
            class="error-image"
            mode="aspectFit"
            :src="defaultImage"
          />
          <image
            v-else
            class="image"
            :src="item[imageKey] || defaultImage"
            mode="aspectFill"
            @error="handleError(index)"
          />
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
import { reactive, watch, toRefs } from 'vue'
import { getImgUrl } from '@/utils/image'

const defaultImage = getImgUrl('defaultImage')

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  imageKey: {
    type: String,
    default: 'img'
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 5000
  },
  duration: {
    type: Number,
    default: 500
  }
})

const state = reactive({
  config: {
    indicatorDots: true,
    indicatorColor: 'rgba(0, 0, 0, .3)',
    indicatorActiveColor: '#fff'
  },
  hasErrorList: []
})

watch(
  () => props.list,
  () => {
    state.hasErrorList = this.list.map(() => false)
  }
)

const handleError = index => {
  state.handleError[index] = true
}

const { config, hasErrorList } = toRefs(state)
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.component-swiper {
  width: 100%;
  height: 292rpx;
  overflow: hidden;
  .swiper {
    width: 100%;
    height: 100%;

    .swiper-item-wrapper {
      border-radius: $border-radius;
      overflow: hidden;
    }
    .swiper-item {
      width: 100%;
      height: 100%;
      text-align: center;
      border-radius: $border-radius;
      .image {
        width: 100%;
        height: 100%;
        border-radius: $border-radius;
        object-fit: cover;
      }
      .error-image {
        width: 30%;
        height: 100%;
      }
    }
  }
}
</style>
