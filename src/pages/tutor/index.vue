<template>
  <div class="tutor-page">
    <!--  :nav-style="{ backgroundColor: 'transparent' }" -->
    <NavBar :title-style="{ fontWeight: 400 }" />

    <view class="search-wrapper">
      <Search />
    </view>

    <TutorList />

    <AppSection
      title="你可能感兴趣"
      sub-title="向您推荐你可能感兴趣的导师"
      has-right-refresh
    >
      <TutorList class="interested" sub-title-has-background is-button />
    </AppSection>

    <AppSection title="导师" sub-title="你关注的导师">
      <TutorList
        class="interested"
        has-footer
        sub-title-has-background
        is-button
      />
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

onPullDownRefresh(() => {
  uni.showToast({
    title: '刷新成功',
    icon: 'success'
  })
  uni.stopPullDownRefresh()
})
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
