<template>
  <div class="find-page">
    <NavBar has-right />
    <view class="swiper-wrapper">
      <AppSwiper :list="bannerList" />
    </view>
    <FindList />

    <view class="fab-button" @click="handleToSendNote">+</view>
  </div>
</template>

<script setup>
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { reactive } from 'vue'
import AppSwiper from '@/components/AppSwiper'
import NavBar from '@/components/NavBar'
import FindList from '@/components/FindList'

const state = reactive({
  result: ''
})
console.log(state)

const data = [
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
]

onPullDownRefresh(() => {
  uni.showToast({
    title: '刷新成功',
    icon: 'success'
  })
  uni.stopPullDownRefresh()
})
// 去发布笔记
const handleToSendNote = () => {
  uni.navigateTo({ url: '/pages/find/send-note/index' })
}
const bannerList = data.map(item => ({ img: item }))
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.find-page {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;
  .swiper-wrapper {
    margin-top: $item-spacing;
  }
  .fab-button {
    position: fixed;
    z-index: 99;
    right: $page-spacing;
    bottom: calc(50px + $page-spacing);
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 60rpx;
    color: #fff;
  }
}
</style>
