<template>
  <div class="tutor-list-component">
    <view
      v-for="item in list"
      :key="item.id"
      class="tutor-list-item"
      @click="handleClickItem(item)"
    >
      <div class="tutor-list-content">
        <div class="tutor-list-body">
          <div class="image-wrapper">
            <image :src="item.image" class="image" mode="aspectFill" />
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
        <div class="icons-wrapper" @click.stop="handleClickRight(item)">
          <uni-icons class="icons" type="forward" size="20" color="#9A9A9A" />
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

const emit = defineEmits(['clickItem', 'clickRight'])

const handleClickItem = item => {
  emit('clickItem', item)
}
const handleClickRight = item => {
  emit('clickRight', item)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.tutor-list-component {
  .background {
    background: #f0f0f2;
    border: 1rpx solid #c0bebe;
    border-radius: 6px;
    padding: 6rpx 11rpx;
    font-size: 23rpx !important;
  }
  .tutor-list-item {
    background-color: #fff;
    border-bottom: 1rpx solid $divide-line-color;
    padding: 23rpx 0;

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
          width: 84rpx;
          height: 84rpx;
          flex: 0 0 84rpx;
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
          margin-left: 20rpx;
          margin-top: -12rpx;

          .title {
            font-size: $font-middle;
            font-weight: 500;
            color: $font-color-main;
          }
          .sub-title {
            margin-top: 16rpx;
            font-size: $font-middle;
            color: $font-color-sub;
          }
        }
      }
      .icons-wrapper {
        padding: 30rpx;
        padding-right: 0;
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
          border: 1rpx solid $border-color;
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
