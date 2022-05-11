<template>
  <div class="word-page">
    <NavBar
      has-left
      :nav-wrapper-style="{
        backgroundColor
      }"
    />

    <!-- 描述 -->
    <view class="desc">
      <view v-for="item in descList" :key="item.content" class="item">
        <uni-icons type="star-filled" size="12" color="rgba(0,0,0,0.5)" />
        <text class="content">
          {{ item.content }}
        </text>
      </view>
    </view>

    <!-- 口令列表 -->
    <view class="word-wrapper">
      <view class="word-body">
        <view
          v-for="(item, index) in wordList"
          :key="index"
          class="word-item"
          :index="index"
          :title="item.text"
          @longpress="handleDelete(item, index)"
        >
          <view class="word-item-body">
            <image class="image" :src="item.avatar" mode="aspectFill" />
            <view class="title-wrapper">
              <div class="name">{{ item.text }}</div>
              <div class="word">{{ item.word }}</div>
            </view>
            <div class="date">{{ item.day }}天后 失效</div>
          </view>
          <view class="word-item-footer">
            累计搜索：
            <text class="count">{{ item.searchTotalCount }}</text> 次，
            今日搜索：
            <text class="count"> {{ item.searchTodayCount }} </text>次
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script setup>
import { onPageScroll } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import NavBar from '@/components/NavBar'
import { useAppStore } from '@/store'

const store = useAppStore()
const { systemInfo } = storeToRefs(store)
const DefaultColor = 'transparent'
const FixedColor = '#fff'
const navHeight = systemInfo.value.statusBarHeight
const backgroundColor = ref(DefaultColor)
onPageScroll(data => {
  if (data.scrollTop > navHeight) {
    backgroundColor.value = FixedColor
  } else {
    backgroundColor.value = DefaultColor
  }
})

// 描述
const descList = [
  { content: '口令超过90天未被其他用户使用，系统将自动回收' },
  { content: '每个用户最多生成10个口令' },
  { content: '长按可删除口令' }
]

// 口令列表
const wordList = ref(
  [...new Array(5)].map((_, index) => ({
    id: index,
    avatar:
      'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    text: '发芽的树',
    word: '120562' + index,
    day: 20 * index,
    searchTotalCount: 100 + index * 4,
    searchTodayCount: 215 - index * 2
  }))
)

// 删除口令
const handleDelete = (item, index) => {
  uni.showModal({
    title: '提示',
    content: `确定删除 ${item.word} 口令吗？`,
    success: function (res) {
      if (res.confirm) {
        wordList.value.splice(index, 1)
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.word-page {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;

  .desc {
    margin-top: $item-spacing;
    padding: 24rpx;
    height: 166rpx;
    background-color: #fff;
    border-radius: $border-radius;
    .item {
      font-size: $font-small;
      color: $font-color-sub;
      margin-top: 16rpx;
      .content {
        margin-left: 6rpx;
      }
    }
  }

  .word-wrapper {
    margin-top: $item-spacing;
    .word-body {
      .word-item {
        margin-top: $item-spacing;
        padding: 24rpx $item-spacing;
        border-radius: $border-radius;
        background-color: #fff;
        box-sizing: border-box;
        position: relative;

        .word-item-body {
          display: flex;
          align-items: center;
          .image {
            width: 70rpx;
            height: 70rpx;
            border-radius: 50%;
          }
          .title-wrapper {
            margin-left: 19rpx;
            .name {
              font-size: $font-base;
              color: $font-color-main;
            }
            .word {
              margin-top: 16rpx;
              font-size: $font-small;
              color: $font-color-sub;
            }
          }
          .date {
            font-size: $font-small;
            color: $font-color-sub;
            position: absolute;
            top: 50%;
            right: 24rpx;
            transform: translateY(-50%);
          }
        }
        .word-item-footer {
          margin-top: 40rpx;
          font-size: $font-small;
          color: $font-color-sub;
          .count {
            color: #3079c4;
          }
        }
      }
    }
  }
}
</style>
