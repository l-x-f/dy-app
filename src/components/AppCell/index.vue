<template>
  <view class="cell-wrapper">
    <view class="cell-body">
      <view
        v-for="(item, index) in cellList"
        :key="index"
        class="cell-item"
        :index="index"
        :title="item.text"
        @click="clickItem(item, index)"
      >
        <view class="title">{{ item.text }}</view>
        <view class="right">
          <view v-if="item.value" class="value">{{ item.value }}</view>
          <div v-if="item.hasRightIcon !== false" class="icons-wrapper">
            <uni-icons
              class="icons"
              type="forward"
              size="20"
              color="rgba(0,0,0,0.5)"
            />
          </div>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
/* eslint-disable  @typescript-eslint/no-unused-vars */
/* eslint-disable  no-unused-vars */
const props = defineProps({
  // 标题
  cellList: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['clickItem'])

// 点击
const clickItem = (item, index) => {
  emit('clickItem', item, index)
}
</script>

<style lang="scss" scoped>
@import 'variables';
.cell-wrapper {
  border-radius: $border-radius;
  margin-top: $item-spacing;
  padding: 0 $item-spacing;
  .cell-body {
    flex-wrap: wrap;
    border-top: 1rpx solid $divide-line-color;
    .cell-item {
      padding: 23rpx 0;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      justify-content: space-between;
      position: relative;
      border-bottom: 1rpx solid $divide-line-color;
      .title {
        font-size: $font-middle;
      }
      .right {
        display: flex;
        align-items: center;
        .value {
          font-size: $font-middle;
          color: $font-color-sub;
          padding-right: 20rpx;
        }
      }
    }
    .cell-item:last-child {
      &::after {
        display: none;
      }
    }
  }
}
</style>
