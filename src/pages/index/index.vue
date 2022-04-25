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
      <Search />
    </view>

    <AppSection title="导师专栏" sub-title="为您推荐近期高人气导师">
      <scroll-view scroll-x>
        <div class="tutor-wrapper">
          <view v-for="item in 10" :key="item" class="tutor-item">
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
      </scroll-view>
    </AppSection>

    <AppSection title="最新发现" sub-title="发现最新热门话题" has-right-refresh>
      <div class="find-wrapper">
        <view v-for="item in 4" :key="item" class="find-item">
          <view class="find-item-body">
            <view class="find-item-image-wrapper">
              <img
                src="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
                class="find-item-image"
              />
            </view>

            <view class="find-item-right">
              <view class="find-item-title"> 豌豆的妈妈 </view>
              <view class="find-item-tag">
                <text class="find-item-tag-item"># 热门话题</text>
                <text class="find-item-tag-item"># 热门话题</text>
                <text class="find-item-tag-item"># 热门</text>
              </view>
              <view class="find-item-sub-title">
                一个精通短视频创作的 全职带娃宝妈，一个精 通短视频创作的全职...
              </view>
            </view>
          </view>
          <view class="find-item-footer">
            <view class="left">
              <text class="label">楼主</text>
              <text class="value">猫猫</text>
            </view>
            <view class="right">
              <text class="label">热度</text>
              <text class="value">398</text>
            </view>
          </view>
        </view>
      </div>
    </AppSection>

    <AppSection
      title="话题排行"
      sub-title="近期变现任务数据分析"
      date="3-14 17:10"
    >
      <div :border="true" class="topic-wrapper">
        <view v-for="(item, index) in 3" :key="index" class="topic-item">
          <div class="left">
            <img
              class="img"
              src="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
              alt=""
            />
          </div>
          <div class="right">
            <div class="title"># 星图任务</div>
            <div class="tag">
              <view class="tag-item">
                <div class="value">200</div>
                <div class="label">热度</div>
              </view>
              <view class="tag-item">
                <div class="value">200</div>
                <div class="label">热度</div>
              </view>
              <view class="tag-item">
                <div class="value">200</div>
                <div class="label">热度</div>
              </view>
            </div>
          </div>
          <div class="right-top" :class="'top-' + (index + 1)">
            <text class="right-top-text"> Top{{ item }} </text>
          </div>
        </view>
      </div>
    </AppSection>
  </div>
</template>

<script setup>
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { reactive } from 'vue'
import AppSwiper from '@/components/AppSwiper'
import AppSection from '@/components/AppSection'
import NavBar from '@/components/NavBar'
import Search from '@/components/Search'

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
  }

  .tutor-wrapper {
    display: flex;
    flex-wrap: nowrap;
    .tutor-item {
      position: relative;
      flex: 0 0 344rpx;
      width: 344rpx;
      height: 479rpx;
      padding-right: 10px;
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
        top: 282rpx;
        left: 0;
        font-size: $font-middle-lg;
        font-weight: bold;
        color: #fff;

        @include text-overflow-hidden;
      }
      .tutor-item-sub-title {
        box-sizing: border-box;
        position: absolute;
        top: 338rpx;
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
  .find-wrapper {
    .find-item {
      position: relative;
      height: 415rpx;
      background: #fff;
      border-radius: $border-radius;
      display: flex;
      flex-direction: column;
      padding: 45rpx 29rpx;
      margin-top: 42rpx;

      .find-item-body {
        display: flex;
        .find-item-image {
          width: 152rpx;
          height: 152rpx;
          box-sizing: border-box;
          background: #f7f7f7;
          border-radius: $border-radius;
          object-fit: cover;
        }
        .find-item-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-left: 51rpx;
          .find-item-title {
            box-sizing: border-box;
            font-size: $font-middle-lg;
            font-weight: bold;
            color: $font-color-base;
            line-height: 42px;

            @include text-overflow-hidden;
          }
          .find-item-tag {
            margin-top: 23rpx;

            .find-item-tag-item {
              padding: 9rpx 10rpx;
              display: inline-flex;
              font-size: $font-sub-sm;
              font-weight: 300;
              color: $font-color-base;
              background: #f7f9fd;
              border-radius: 6rpx;
              margin-right: 22rpx;
            }
          }
          .find-item-tag-item:last-child {
            margin-right: 0;
          }
          .find-item-sub-title {
            margin-top: 27rpx;
            font-size: 29rpx;
            font-weight: 400;
            color: $font-color-sub;
            line-height: 44rpx;

            @include multiline-text-overflow-hidden(2);
          }
        }
      }
      .find-item-footer {
        margin-top: 40rpx;
        display: flex;
        justify-content: space-between;

        .label {
          font-size: $font-sm;
          font-weight: 400;
          color: $font-color-green;
          padding-right: 5px;
        }
        .value {
          font-size: 29rpx;
          font-weight: 400;
          color: $font-color-base;
        }
      }
    }
  }
  .topic-wrapper {
    .topic-item {
      height: 238rpx;
      background: #fff;
      border-radius: $border-radius;
      padding: 31rpx 25rpx;
      box-sizing: border-box;
      display: flex;
      position: relative;
      overflow: hidden;
      .left {
        flex: 0 0 175rpx;
        .img {
          width: 175rpx;
          height: 175rpx;
          background: #c2c3c4;
          border-radius: $border-radius;
        }
      }
      .right {
        flex: 1;
        padding-left: 31rpx;
        display: flex;
        flex-direction: column;
        .title {
          font-size: $font-large;
          font-weight: bold;
          color: $font-color-base;
        }
        .tag {
          margin-top: 16rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 88rpx;
          background: #f7f9fd;
          border-radius: 10rpx;
          padding: 16rpx 20rpx;
          .tag-item {
            display: flex;
            flex-direction: column;

            .label {
              margin-top: 12rpx;
              font-size: $font-sub-sm;
              font-weight: 400;
              color: $font-color-green;
            }
            .value {
              font-size: $font-middle-lg;
              font-weight: 500;
              color: $font-color-base;
            }
          }
        }
      }
      .right-top {
        width: 135rpx;
        height: 48px;
        line-height: 48px;
        background: linear-gradient(0deg, #e2a54e 0%, #fff 100%);
        border-radius: 24px;
        position: absolute;
        top: -24px;
        right: -12px;
        text-align: center;

        .right-top-text {
          position: absolute;
          bottom: -12px;
          left: 12px;
          font-size: $font-middle-lg;
          font-weight: 500;
          color: #fff;
        }
      }
      .top-1 {
        background: linear-gradient(0deg, #e2a54e 0%, #fff 100%);
      }
      .top-2 {
        background: linear-gradient(0deg, #9a9fac 0%, #fff 100%);
      }
      .top-3 {
        background: linear-gradient(0deg, #d88a60 0%, #fff 100%);
      }
    }
  }
}
</style>
