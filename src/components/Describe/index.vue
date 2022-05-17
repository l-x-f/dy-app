<template>
  <view class="describe">
    <view v-for="item in describeList" :key="item.content" class="item">
      <uni-icons
        v-if="hasStar"
        type="star-filled"
        size="12"
        color="rgba(0,0,0,0.5)"
      />
      <text class="content">
        {{ item.content }}
      </text>
    </view>
  </view>
</template>

<script setup>
/* eslint-disable */
const props = defineProps({
  // 是否需要星号
  hasStar: {
    type: Boolean,
    default: true
  },
  // 描述列表
  describeList: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.describe {
  margin-top: $item-spacing;
  padding: 24rpx;
  background-color: $page-bg-color;
  border-radius: $border-radius;
  .item {
    font-size: $font-small;
    color: $font-color-sub;

    .content {
      margin-left: 6rpx;
    }
  }
  .item + .item {
    margin-top: 16rpx;
  }
}
</style>
