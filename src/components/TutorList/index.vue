<template>
  <div class="tutor-list-component">
    <view v-for="item in list" :key="item.id" class="tutor-list-wrapper">
      <div class="tutor-list-content">
        <div class="tutor-list-body">
          <div class="image-wrapper">
            <img :src="item.image" class="image" />
          </div>
          <div class="title-wrapper">
            <view class="title"> {{ item.title }} </view>
            <view
              class="sub-title"
              :class="{
                background: subTitleHasBackground
              }"
            >
              {{ item.subTitle }}
            </view>
          </div>
        </div>

        <div v-if="isButton" class="button-wrapper" @click="handleClickRight">
          <div class="button">查看</div>
        </div>
        <div v-else class="icons-wrapper" @click="handleClickRight">
          <uni-icons class="icons" type="forward" size="18" color="#999" />
        </div>
      </div>

      <div v-if="hasFooter" class="footer">
        <text class="footer-text">最近更新{{ item.count }}</text>
      </div>
    </view>
  </div>
</template>

<script setup>
/* eslint-disable  @typescript-eslint/no-unused-vars */
/* eslint-disable  no-unused-vars */

const props = defineProps({
  hasFooter: {
    type: Boolean,
    default: false
  },
  isButton: {
    type: Boolean,
    default: false
  },
  subTitleHasBackground: {
    type: Boolean,
    default: false
  },
  list: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.tutor-list-component {
  .background {
    background: #f0f0f2;
    border: 1px solid #c0bebe;
    border-radius: 6px;
    padding: 6rpx 11rpx;
    font-size: 23rpx !important;
  }
  .tutor-list-wrapper {
    margin-top: 31rpx;
    padding: 24rpx 35rpx;
    background-color: #fff;
    border-radius: $border-radius;
    .tutor-list-content {
      display: flex;
      justify-content: space-between;
      position: relative;
      align-items: center;

      .tutor-list-body {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex: 1;
        .image-wrapper {
          width: 94rpx;
          height: 94rpx;
          flex: 0 0 94rpx;
          .image {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            display: block;
          }
        }

        .title-wrapper {
          display: flex;
          flex-direction: column;
          margin-left: 16rpx;
          margin-top: -12rpx;

          .title {
            font-size: 33rpx;
            font-weight: 500;
            color: $font-color-base;
          }
          .sub-title {
            font-size: $font-base-lg;
            color: $font-color-sub;
          }
        }
      }

      .icons-wrapper {
        flex: 0 0 40rpx;
      }
      .button-wrapper {
        flex: 0 0 140rpx;

        .button {
          text-align: center;
          width: 140rpx;
          height: 63rpx;
          line-height: 63rpx;
          background: #fff;
          border: 1px solid #555;
          border-radius: 6px;
        }
      }
    }
    .footer {
      margin-top: 28rpx;
      .footer-text {
        font-size: 23rpx;
        color: #f58e2a;
      }
    }
  }
}
</style>
