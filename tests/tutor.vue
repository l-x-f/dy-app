<template>
  <div>
    <AppSwiper :list="bannerList" />
    <Watermark watermark="我是水印" />
    <HtmlParse :html="rich" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import AppSwiper from '@/components/AppSwiper'
import HtmlParse from '@/components/HtmlParse'
import Watermark from '@/components/Watermark'

const bannerList = ref([
  {
    img: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg'
  },
  {
    img: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg'
  },
  {
    img: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg'
  },
  {
    img: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg'
  }
])

const rich = 'https://static-1252186245.cos.ap-nanjing.myqcloud.com/a.html'

onPullDownRefresh(() => {
  uni.showToast({
    title: '刷新成功',
    icon: 'success'
  })
  uni.stopPullDownRefresh()
})
</script>

<style lang="scss" scoped>
 @import 'variables';
.follow-page {
  box-sizing: border-box;
  padding-bottom: $page-bottom;
}
</style>
