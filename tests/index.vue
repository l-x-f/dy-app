<template>
  <div>
    <AppSwiper :list="bannerList" />
    <Watermark watermark="我是水印" />
    <HtmlParse :html="rich" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppSwiper from '@/components/AppSwiper'
import HtmlParse from '@/components/HtmlParse'
import Watermark from '@/components/Watermark'

const bannerList = ref([
  {
    img: 'https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg'
  },
  {
    img: 'https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg'
  }
])

const rich = 'https://static-1252186245.cos.ap-nanjing.myqcloud.com/a.html'
</script>

<style lang="scss" scoped></style>
