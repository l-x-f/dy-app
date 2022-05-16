<template>
  <div class="bank-card">
    <NavBar has-left />

    <!-- 描述 -->
    <view class="desc">
      <view class="item">
        <uni-icons type="star-filled" size="12" color="rgba(0,0,0,0.5)" />
        <text class="content"> 长按删除银行卡 </text>
      </view>
    </view>

    <view class="card-list">
      <view
        v-for="(item, index) in carList"
        :key="index"
        class="card-list-item"
        @longpress="handleDelete(item, index)"
      >
        <image
          src="/static/image/bank-card.png"
          mode="aspectFill"
          class="image"
        />
        <view class="card-info">
          <text class="card-name"> {{ item.name }} </text>
          <text class="card-number"> 622202******1234 </text>
          <div class="footer">
            <text class="username"> 名字 </text>
            <text class="单日限额">单日限额 10000 </text>
          </div>
        </view>
      </view>

      <view class="add">
        <image src="/static/image/plus.png" mode="aspectFill" class="image" />
        <text class="add-text"> 添加银行卡 </text>
      </view>
    </view>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '@/components/NavBar'

const carList = ref([
  {
    name: '建设银行'
  },
  {
    name: '中国银行'
  },
  {
    name: '农业银行'
  }
])

// 删除口令
const handleDelete = (item, index) => {
  uni.showModal({
    title: '提示',
    content: `确定删除${item.name}银行卡吗？`,
    success: function (res) {
      if (res.confirm) {
        carList.value.splice(index, 1)
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
.bank-card {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;
  .desc {
    margin-top: $item-spacing;
    padding: 24rpx;
    // background-color: $page-bg-color;
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
  .card-list {
    width: 100%;
    .card-list-item {
      margin-top: $item-spacing;
      width: 100%;
      height: 300rpx;
      position: relative;
      .image {
        position: absolute;
        width: 100%;
        height: 300rpx;
        object-fit: cover;
      }
      .card-info {
        height: 300rpx;
        position: absolute;
        color: #fff;
        width: 100%;
        box-sizing: border-box;
        padding: 49rpx 40rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;

        .card-number {
          font-size: $font-large-title;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    .add {
      margin-top: $item-spacing;
      background-color: #fff;
      padding: 29rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: $border-radius;
      .image {
        width: 24rpx;
        height: 24rpx;
      }
      .add-text {
        font-size: $font-middle;
        margin-left: 21rpx;
      }
    }
  }
}
</style>
