<template>
  <!-- 视频区域 -->
  <view class="video-component">
    <video
      id="myVideo"
      post="https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg"
      class="video"
      src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"
      object-fit="cover"
    />
  </view>
</template>

<script setup>
import { onMounted, ref } from 'vue'
/* eslint-disable */
const props = defineProps({
  //
  src: {
    type: String,
    default: ''
  }
})
const videoContext = ref()
const show = ref(false)

onMounted(() => {
  videoContext.value = uni.createVideoContext('myVideo')
})
const handlePlay = () => {
  videoContext.value.play()
  show.value = false
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.video-component {
  width: 100%;
  background-color: #fff;
  position: relative;
  .video {
    width: 100%;
    object-fit: cover;
    border-radius: $border-radius;
    border: 1px solid $divide-line-color;

    :deep(.uni-video-cover-play-button) {
      width: 91px;
      height: 91px;
      background-image: url('/static/image/play.png');
    }
    :deep(.uni-video-cover-duration) {
      display: none;
    }
  }
}
</style>
