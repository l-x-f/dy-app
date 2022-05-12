<template>
  <div class="tutor-page">
    <NavBar :title-style="{ fontWeight: 400 }" />

    <view class="search-wrapper">
      <Search />
    </view>

    <!-- 是导师才有 -->
    <TutorList :list="data.slice(0, 1)" @clickItem="handleToDetails" />

    <AppSection title="你可能感兴趣" has-right-refresh>
      <TutorList :list="data" class="interested" @clickItem="handleToDetails" />
    </AppSection>

    <AppSection title="导师">
      <TutorList :list="data" @clickItem="handleToDetails" />
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

// 去导师详情
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
  background: #fff;
  .search-wrapper {
    margin-top: $item-padding-spacing;
    margin-bottom: 23rpx;

    :deep(.search-input) {
      box-shadow: none !important;
      background-color: $page-bg-color !important;
    }
  }

  :deep(.components-section) {
    .title-wrapper {
      .title {
        font-size: $font-small !important;
        color: $font-color-sub;
      }
    }
    .section-body {
      padding-bottom: 0;
    }
  }
}
</style>
