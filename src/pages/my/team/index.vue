<template>
  <div class="team-page">
    <NavBar
      has-left
      :nav-wrapper-style="navWrapperStyle"
      :title-style="{ color: '#fff' }"
      :has-placeholder="false"
      @clickRight="handleShare"
    />

    <div class="nav-bar-background">
      <view class="team-card">
        <view class="team-item"> 100 </view>
        <view class="team-item"> 100 </view>
      </view>
    </div>
  </div>
</template>

<script setup>
import { onPullDownRefresh, onPageScroll } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import NavBar from '@/components/NavBar'
import { useAppStore } from '@/store'

const store = useAppStore()
const { systemInfo } = storeToRefs(store)
const DefaultNavWrapperStyle = {
  backgroundColor: 'transparent'
}
const FixedNavWrapperStyle = {
  backgroundColor: '#3d6cac'
}
const navHeight = systemInfo.value.statusBarHeight
const navWrapperStyle = ref({ ...DefaultNavWrapperStyle })
onPageScroll(data => {
  if (data.scrollTop > navHeight) {
    navWrapperStyle.value = FixedNavWrapperStyle
  } else {
    navWrapperStyle.value = DefaultNavWrapperStyle
  }
})

const state = reactive({ result: '' })
console.log(state)

onPullDownRefresh(() => {
  uni.showToast({
    title: '刷新成功',
    icon: 'success'
  })
  uni.stopPullDownRefresh()
})

// 去邀请分享页面
const handleShare = () => {
  uni.navigateTo({ url: `/pages/tutor/invite?id=${1}` })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.team-page {
  box-sizing: border-box;
  padding-bottom: $page-bottom;
  .nav-bar-background {
    height: 396rpx;
    padding-top: calc($nav-height + var(--status-bar-height));
    box-sizing: border-box;
    background: linear-gradient(0deg, #738db1 0%, #3d6cac 100%);
  }
}
</style>
