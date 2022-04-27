<template>
  <div class="tutor-details-page">
    <NavBar
      :title-style="navTitleStyle"
      :nav-style="navStyle"
      :has-placeholder="hasPlaceholder"
      has-left
      has-right
      right-icon="more"
      title-image="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000 "
    />

    <view class="search-wrapper">
      <Search />
    </view>

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
import { onPullDownRefresh, onPageScroll } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import AppSection from '@/components/AppSection'
import NavBar from '@/components/NavBar'
import Search from '@/components/Search'
import TutorList from '@/components/TutorList'
import { useAppStore } from '@/store'

const store = useAppStore()
const { systemInfo } = storeToRefs(store)

const state = reactive({ result: '' })
console.log(state)

const data = [...new Array(3)].map((_, index) => ({
  id: index,
  title: '豌豆的妈妈',
  subTitle: '一个精通短视频创作的',
  image:
    'https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000',
  count: index
}))

const DefaultNavStyle = {
  height: '169px',
  position: 'static',
  backgroundImage:
    'url(https://tse1-mm.cn.bing.net/th/id/R-C.d042a67e2697965d3fc92dcc2dd442cb?rik=gNLpj0wl9CcKRQ&riu=http%3a%2f%2fup.bizhizu.com%2fpic%2fba%2f03%2f2a%2fba032adbaf5967418e74177c7d37fc2d.jpg&ehk=dc9BFzyrx0FoPcMNXt6wnMFilhT1LxT5ACCL4y2taR4%3d&risl=&pid=ImgRaw&r=0)'
}
const FixedNavStyle = {
  height: '44px',
  position: 'fixed',
  backgroundImage: ''
}
const DefaultNavTitleStyle = {
  fontWeight: 400,
  color: '#fff'
}
const FixedNavTitleStyle = {
  fontWeight: 400,
  color: '#333'
}

const navHeight = systemInfo.value.statusBarHeight + 169
const navStyle = ref({ ...DefaultNavStyle })
const navTitleStyle = ref({ ...DefaultNavTitleStyle })
const hasPlaceholder = ref(false)

onPageScroll(data => {
  if (data.scrollTop > navHeight) {
    navStyle.value = FixedNavStyle
    navTitleStyle.value = FixedNavTitleStyle
    hasPlaceholder.value = true
  } else {
    navStyle.value = DefaultNavStyle
    navTitleStyle.value = DefaultNavTitleStyle
    hasPlaceholder.value = false
  }
})
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
.tutor-details-page {
  box-sizing: border-box;
  .search-wrapper {
    margin-top: 33rpx;
    padding: 0 $page-spacing $page-bottom;
  }
}
</style>
