<template>
  <div class="index-page">
    <NavBar
      title="欢迎使用创作者!"
      :has-left-wrapper="false"
      :title-style="{
        fontWeight: 500,
        textAlign: 'left'
      }"
    />
    <view class="swiper-wrapper">
      <AppSwiper :list="bannerList" />
    </view>

    <view class="search-wrapper">
      <input
        class="search-input"
        placeholder="请输入创作者口令"
        placeholder-class="search-placeholder"
      />
      <img class="search-image" src="/static/image/search.png" alt="" />
    </view>

    <AppSection title="导师专栏" sub-title="为您推荐近期高人气导师">
      <div class="tutor-wrapper">
        <view v-for="item in 2" :key="item" class="tutor-item">
          <img
            src="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
            class="tutor-item-image"
          />
          <view class="tutor-item-cover" />
          <view class="tutor-item-title"> 豌豆的妈妈 </view>
          <view class="tutor-item-sub-title">
            一个精通短视频创作的 全职带娃宝妈，一个精 通短视频创作的全职...
          </view>
        </view>
      </div>
    </AppSection>

    <AppSection title="最新发现" sub-title="发现最新热门话题" has-right-refresh>
      <div class="topic-wrapper">
        <view v-for="item in 2" :key="item" class="topic-item">
          <view class="topic-item-body">
            <view class="topic-item-image-wrapper">
              <img
                src="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
                class="topic-item-image"
              />
            </view>

            <view class="topic-item-cover" />
            <view class="topic-item-title"> 豌豆的妈妈 </view>
            <view class="topic-item-sub-title">
              一个精通短视频创作的 全职带娃宝妈，一个精 通短视频创作的全职...
            </view>
            <view class="topic-item-footer">footer</view>
          </view>
        </view>
      </div>
    </AppSection>

    <AppSection title="话题排行">
      <uni-list :border="true">
        <uni-list-chat
          v-for="(item, index) in 3"
          :key="index"
          title="话题"
          avatar="https://img.36krcdn.com/20200410/v2_6905947498bc4ec0af228afed409f771_img_png?x-oss-process=image/resize,m_mfit,w_520,h_300/crop,w_520,h_300,g_center"
          note="您收到一条新的消息"
          time="2020-02-02 20:20"
        />
      </uni-list>
    </AppSection>
  </div>
</template>

<script setup>
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { reactive } from 'vue'
import AppSwiper from '@/components/AppSwiper'
import AppSection from '@/components/AppSection'
import NavBar from '@/components/NavBar'

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

const bannerList = data.map(item => ({ img: item }))
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.index-page {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;

  .swiper-wrapper {
    margin-top: 42rpx;
  }

  .search-wrapper {
    margin-top: 42rpx;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    .search-input {
      box-sizing: border-box;
      width: 100%;
      height: 106rpx;
      box-shadow: 0 11px 42px 0 rgba(70, 87, 224, 0.18);
      border-radius: $border-radius;
      padding: 0 $page-spacing;
    }
    .search-image {
      width: 42rpx;
      height: 42rpx;
      position: absolute;
      top: 50%;
      right: $page-spacing;
      transform: translateY(-50%);
    }
    :deep(.search-placeholder) {
      font-size: $font-middle;
      color: $font-color-base;
    }
  }

  .tutor-wrapper {
    display: flex;
    width: 100%;
    height: 479rpx;
    .tutor-item {
      position: relative;
      flex: 1;
      width: 50%;
      height: 100%;
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
        height: 247rpx;
        background: linear-gradient(0deg, #020202 0%, rgba(1, 1, 1, 0) 100%);
        opacity: 0.6;
        border-radius: $border-radius;
      }

      .tutor-item-title {
        box-sizing: border-box;
        width: 100%;
        padding: 0 27rpx;
        position: absolute;
        top: 252rpx;
        left: 0;
        font-size: $font-middle-lg;
        font-weight: bold;
        color: #fff;

        @include text-overflow-hidden;
      }
      .tutor-item-sub-title {
        box-sizing: border-box;
        position: absolute;
        top: 308rpx;
        left: 0;
        padding: 0 27rpx;
        width: 100%;
        font-size: $font-base-lg;
        color: #fff;
        line-height: 1.5em;

        @include multiline-text-overflow-hidden;
      }
    }
    .tutor-item:nth-of-type(odd) {
      .tutor-item-image {
        padding-right: 5px;
      }
    }
    .tutor-item:nth-of-type(even) {
      .tutor-item-image {
        padding-left: 5px;
      }
    }
  }
  .topic-wrapper {
    display: flex;
    width: 100%;
    height: 435rpx;
    .topic-item {
      position: relative;
      flex: 1;
      width: 50%;
      height: 100%;

      .topic-item-body {
        .topic-item-image {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          background: #f7f7f7;
          border-radius: $border-radius;
          object-fit: cover;
        }

        .topic-item-cover {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 247rpx;
          background: linear-gradient(0deg, #020202 0%, rgba(1, 1, 1, 0) 100%);
          opacity: 0.6;
          border-radius: $border-radius;
        }

        .topic-item-title {
          box-sizing: border-box;
          width: 100%;
          padding: 0 27rpx;
          position: absolute;
          top: 252rpx;
          left: 0;
          font-size: $font-middle-lg;
          font-weight: bold;
          color: #fff;

          @include text-overflow-hidden;
        }
        .topic-item-sub-title {
          box-sizing: border-box;
          position: absolute;
          top: 308rpx;
          left: 0;
          padding: 0 27rpx;
          width: 100%;
          font-size: $font-base-lg;
          color: #fff;
          line-height: 1.5em;

          @include multiline-text-overflow-hidden;
        }
      }
    }
  }
}
</style>
