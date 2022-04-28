<template>
  <div>
    <div class="find-wrapper">
      <view v-for="item in 4" :key="item" class="find-item">
        <view v-if="hasClassification" class="classification">
          <view class="angle" />
          <view class="content">
            <text class="content-text"> 优质</text>
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
  </div>
</template>

<script setup>
const props = defineProps({
  // 数据
  list: {
    type: Array,
    default: () => []
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
    padding: 45rpx 29rpx;
    margin-top: $item-spacing;
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
          font-size: $font-sm;
          font-weight: 500;
          color: #fff;
        }
      }
    }
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
</style>
