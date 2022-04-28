<template>
  <div class="tutor-page">
    <NavBar :title-style="{ fontWeight: 400 }" />

    <view class="search-wrapper">
      <Search />
    </view>

    <!-- 是导师才有 -->
    <TutorList :list="data.slice(0, 1)" @clickItem="handleToDetails" />

    <AppSection
      title="你可能感兴趣"
      sub-title="向您推荐你可能感兴趣的导师"
      has-right-refresh
    >
      <TutorList
        :list="data"
        class="interested"
        sub-title-has-background
        is-button
      />
    </AppSection>

    <AppSection title="导师" sub-title="你关注的导师">
      <TutorList :list="data" has-footer sub-title-has-background is-button />
    </AppSection>
  </div>
</template>

<script setup>
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { reactive } from 'vue'
import AppSection from '@/components/AppSection'
import NavBar from '@/components/NavBar'
import Search from '@/components/Search'
import TutorList from '@/components/TutorList'

const state = reactive({
  result: ''
})
console.log(state)

const data = [...new Array(3)].map((_, index) => ({
  id: index,
  title: '豌豆的妈妈',
  subTitle: '一个精通短视频创作的',
  image:
    'https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000',
  count: index
}))

onPullDownRefresh(() => {
  uni.showToast({
    title: '刷新成功',
    icon: 'success'
  })
  uni.stopPullDownRefresh()
})

const handleToDetails = item => {
  uni.navigateTo({ url: '/pages/tutor/details?id=' + item.id })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.tutor-page {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;
  .search-wrapper {
    margin-top: 33rpx;
  }
}
</style>
