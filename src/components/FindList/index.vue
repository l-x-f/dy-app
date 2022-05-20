<template>
  <div class="find-wrapper">
    <view
      v-for="item in list"
      :key="item"
      class="find-item"
      @click="handleClickItem(item, index)"
    >
      <view v-if="hasClassification" class="classification">
        <view class="angle" />
        <view class="content">
          <text class="content-text">优质</text>
        </view>
      </view>

      <view class="find-item-body">
        <view class="find-item-image-wrapper">
          <image
            src="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
            class="find-item-image"
            mode="aspectFill"
          />
          <text v-if="hasImageTag" class="find-item-image-text"
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
</template>

<script setup>
const props = defineProps({
  // 数据
  list: {
    type: Array,
    default: () => [...new Array(4)]
  },
  // 是否有右上角分类标签
  hasClassification: {
    type: Boolean,
    default: false
  },
  // 头像下是否有标签
  hasImageTag: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['clickItem'])

const handleClickItem = (item, index) => {
  emit('clickItem', item, index)
}
console.log(props)
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';
.find-wrapper {
  .find-item {
    position: relative;
    background: #fff;
    border-radius: $border-radius;
    display: flex;
    flex-direction: column;
    margin-top: $item-spacing;
    padding: 28rpx 24rpx;

    .classification {
      position: absolute;
      top: 0;
      right: 0;
      .angle {
        width: 0;
        height: 0;
        border: 24rpx solid #c59e79;
        border-left-color: #fff;
        position: absolute;
      }

      .content {
        width: 110rpx;
        height: 48rpx;
        background: #c59e79;
        border-top-right-radius: 17px;
        .content-text {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 30rpx;
          font-size: $font-small;
          font-weight: 500;
          color: #fff;
        }
      }
    }
    .find-item-body {
      display: flex;
      border-bottom: 1rpx solid $divide-line-color;
      padding-bottom: $item-spacing;

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
          color: $font-color-main;
        }
      }
      .find-item-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-left: 24rpx;
        .find-item-title {
          box-sizing: border-box;
          font-size: $font-middle;
          font-weight: bold;
          color: $font-color-main;

          @include text-overflow-hidden;
        }
        .find-item-tag {
          margin-top: 23rpx;
          .find-item-tag-item {
            padding: 13rpx 15rpx;
            display: inline-flex;
            font-size: $font-small;
            color: $font-color-sub;
            background-color: #f3f3f3;
            border-radius: 7rpx;
            margin-right: 16rpx;
          }
        }
        .find-item-tag-item:last-child {
          margin-right: 0;
        }
        .find-item-sub-title {
          margin-top: $item-spacing;
          font-size: $font-base;
          color: $font-color-sub;
          line-height: 44rpx;

          @include multiline-text-overflow-hidden(2);
        }
      }
    }
    .find-item-footer {
      margin-top: 28rpx;
      display: flex;
      justify-content: space-between;
      .label {
        font-size: $font-small;
        color: $font-color-sub;
        padding-right: 8rpx;
      }
      .value {
        font-size: $font-small;
        color: $font-color-main;
        font-weight: bolder;
      }
    }
  }
}
</style>
