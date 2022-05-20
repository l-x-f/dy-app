<template>
  <view class="index-page">
    <NavBar
      title="欢迎使用创作者!"
      :has-left-wrapper="false"
      :title-style="{
        fontWeight: 600,
        textAlign: 'left'
      }"
      :title-wrapper-style="{ 'justify-content': 'flex-start' }"
    />

    <!-- l轮播图 -->
    <view class="swiper-wrapper">
      <AppSwiper :list="bannerList" />
    </view>

    <!-- 搜索栏 -->
    <view class="search-wrapper">
      <Search />
    </view>

    <!-- 导师专栏 -->
    <AppSection title="导师专栏" sub-title="为您推荐近期高人气导师">
      <SwiperScrollX>
        <div class="tutor-wrapper">
          <view
            v-for="item in 10"
            :key="item"
            class="tutor-item"
            @click="handleToDetails(item)"
          >
            <image
              src="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
              class="tutor-item-image"
              mode="aspectFill"
            />
            <view class="tutor-item-cover" />

            <view class="title-wrapper">
              <view class="tutor-item-title"> 豌豆的妈妈 </view>
              <view class="tutor-item-sub-title">
                一个精通短视频创作的 全职带娃宝妈，一个精 通短视频创作的全职...
              </view>
            </view>
          </view>
        </div>
      </SwiperScrollX>
    </AppSection>

    <!-- 最新发现 -->
    <AppSection title="最新发现" sub-title="发现最新热门话题" has-right-refresh>
      <FindList @clickItem="handleToContentDetails" />
    </AppSection>
  </view>
</template>

<script setup>
import { onPullDownRefresh } from '@dcloudio/uni-app'
import AppSwiper from '@/components/AppSwiper'
import AppSection from '@/components/AppSection'
import NavBar from '@/components/NavBar'
import Search from '@/components/Search'
import FindList from '@/components/FindList'
import SwiperScrollX from '@/components/SwiperScrollX'

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

// 去导师详情页面
const handleToDetails = item => {
  uni.navigateTo({ url: '/pages/tutor/details?id=' + item })
}

// 去内容详情页面
const handleToContentDetails = () => {
  uni.navigateTo({ url: `/pages/tutor/content-details?id=${1}` })
}

const bannerList = data.map(item => ({ img: item }))
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';

.index-page {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;
  .swiper-wrapper {
    margin-top: $item-spacing;
  }
  .search-wrapper {
    margin-top: $item-spacing;
  }

  :deep(.uni-scroll-view-content) {
    -webkit-overflow-scrolling: touch;
  }
  .tutor-wrapper {
    display: flex;
    flex-wrap: nowrap;
    .tutor-item {
      position: relative;
      flex: 0 0 280rpx;
      width: 280rpx;
      height: 378rpx;
      margin-right: 10px;
      box-sizing: border-box;
      .tutor-item-image {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: #f7f7f7;
        border-radius: $border-radius;
        object-fit: cover;
      }
      .tutor-item-cover {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 200rpx;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%);
        opacity: 0.6;
        border-radius: $border-radius;
      }
      .title-wrapper {
        position: absolute;
        top: 200rpx;
        left: 0;
        padding: 0 17rpx;
        .tutor-item-title {
          box-sizing: border-box;
          width: 100%;
          font-size: $font-base;
          font-weight: bold;
          color: #fff;

          @include text-overflow-hidden;
        }
        .tutor-item-sub-title {
          box-sizing: border-box;
          width: 100%;
          font-size: $font-small;
          color: #fff;
          line-height: 1.5em;
          margin-top: 18rpx;

          @include multiline-text-overflow-hidden;
        }
      }
    }
  }
}
</style>
