<template>
  <div class="find-page">
    <NavBar
      :title-style="{
        fontWeight: 500
      }"
      has-right
    />
    <view class="swiper-wrapper">
      <AppSwiper :list="bannerList" />
    </view>

    <div class="find-wrapper">
      <view v-for="item in 3" :key="item" class="find-item">
        <view class="find-item-body">
          <view class="find-item-image-wrapper">
            <img
              src="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
              class="find-item-image"
            />

            <text class="find-item-image-text"
              >{{ item % 2 === 0 ? '我的导师' : '我的关注' }}
            </text>
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
  </div>
</template>

<script setup>
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { reactive } from 'vue'
import AppSwiper from '@/components/AppSwiper'

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
.find-page {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;

  .swiper-wrapper {
    margin-top: 42rpx;
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
        .find-item-image-wrapper {
          display: flex;
          flex-direction: column;
          .find-item-image {
            width: 152rpx;
            height: 152rpx;
            box-sizing: border-box;
            background: #f7f7f7;
            border-radius: $border-radius;
            object-fit: cover;
          }
          .find-item-image-text {
            margin-top: 21rpx;
            display: inline-block;
            padding: 7rpx 14rpx;
            background: #f0f0f2;
            border-radius: 6px;
            color: $font-color-base;
          }
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
}
</style>
