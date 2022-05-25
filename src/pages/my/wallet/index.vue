<template>
  <div class="my-wallet-page">
    <NavBar
      has-left
      :nav-wrapper-style="{ backgroundColor: navTransparentBackgroundColor }"
      :fixed-nav-wrapper-style="{
        backgroundColor: '#9864f8'
      }"
      :title-style="{ color: navFixedColor }"
      :fixed-title-style="{ color: navFixedColor }"
      :has-placeholder="false"
    />

    <!-- 导航背景 -->
    <div class="nav-bar-image">
      <div class="card-content">
        <div class="title-wrapper">
          <text class="label">余额</text>
          <text class="value">￥600</text>
        </div>
        <div class="sub-wrapper">
          <div class="left">
            <text class="label">待结算</text>
            <text class="value">￥600</text>
          </div>
          <div class="right" @click="handleWithdrawal">提现</div>
        </div>
      </div>
    </div>
    <!--绑定银行卡  -->
    <div v-if="true" class="card-footer" @click="bindBankCard">
      <div class="left">您尚未绑定银行卡</div>
      <div class="right">
        <text>立即绑定</text>
        <uni-icons class="icons" type="forward" size="20" color="#fff" />
      </div>
    </div>

    <!-- 主功能区 -->
    <div class="main">
      <div class="main-container">
        <div class="title-wrapper">
          <text class="label">总收益</text>
          <text class="value">￥600</text>
        </div>

        <view class="sub-title-wrapper">
          <view class="sub-title-item">
            <text class="label">今日收益</text>
            <text class="value today">+123</text>
          </view>
          <view class="sub-title-item">
            <text class="label">昨日收益</text>
            <text class="value">+112</text>
          </view>
        </view>
        <view class="item-wrapper">
          <view class="item-body">
            <view
              v-for="(item, index) in list"
              :key="index"
              class="item-item"
              :index="index"
              :title="item.text"
              :class="{
                'has-border': index === 1
              }"
              @click="item.click"
            >
              <image
                :src="'/static/image/wallet/' + item.icon + '.png'"
                mode="aspectFill"
                class="icon-image"
              />
              <view class="title">{{ item.text }}</view>
              <div class="icons-wrapper">
                <view class="value">
                  {{ item.count }}
                  <text v-if="item.add" class="add"> +{{ item.add }}</text>
                </view>
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
      </div>
    </div>

    <!-- 收益排行 -->
    <div class="income-ranking">
      <div class="top">
        <text class="title">收益排行</text>
        <Tab v-model="state.tabIndex" class="tab" :tab-list="tabList" />
      </div>
      <SwiperScroll>
        <div class="income-ranking-wrapper">
          <view
            v-for="(item, index) in 10"
            :key="item"
            class="income-ranking-item"
            @click="handleToDetails(item)"
          >
            <image
              src="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
              class="income-ranking-item-image"
              mode="aspectFill"
            />
            <view v-if="index <= 2" class="income-ranking-item-icon-wrapper">
              <image
                :src="'/static/image/wallet/no' + (index + 1) + '.png'"
                class="income-ranking-item-icon"
                mode="aspectFill"
              />
              <text class="text">no.{{ index + 1 }}</text>
            </view>

            <view class="income-ranking-title">安安超努力</view>
            <view class="income-wrapper">
              <view class="value"> +2000 </view>
              <view class="label"> 昨日收益 </view>
            </view>
          </view>
        </div>
      </SwiperScroll>
    </div>

    <!-- 联系客服 -->
    <div class="customer-service" @click="handleToCustomerService">
      <div class="customer-service-content">
        <image
          class="image"
          src="/static/image/customer-service.png"
          mode="aspectFill"
        />
        <text class="text">联系客服</text>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import variables from 'variables'
import NavBar from '@/components/NavBar'
import Tab from '@/components/Tab'
import SwiperScroll from '@/components/SwiperScroll'
import { usePageScroll } from '@/hooks'

const { navFixedColor, navTransparentBackgroundColor } = variables

// 触发页面滚动
usePageScroll()

const state = reactive({ result: '', tabIndex: 0 })
console.log(state)
const tabList = ref([{ title: '昨日' }, { title: '本周' }, { title: '本月' }])
onPullDownRefresh(() => {
  uni.showToast({
    title: '刷新成功',
    icon: 'success'
  })
  uni.stopPullDownRefresh()
})
const bindBankCard = data => {
  console.log(data)
  uni.navigateTo({ url: `/pages/my/wallet/bank-card` })
}
const handleToCustomerService = () => {
  uni.navigateTo({ url: `/pages/my/customer-service/index` })
}
const list = [
  {
    text: '推广收益',
    icon: 'recommend-income',
    count: 200,
    add: '70.0',
    click: () => {
      uni.navigateTo({ url: `/pages/my/wallet/recommend-income` })
    }
  },
  {
    text: '课程收益',
    icon: 'course',
    count: 200,
    add: '10.0',
    click: () => {
      uni.navigateTo({ url: `/pages/my/wallet/course-income` })
    }
  },
  {
    text: '提现记录',
    icon: 'withdrawal-record',
    click: () => {
      uni.navigateTo({ url: `/pages/my/wallet/withdrawal-record` })
    }
  },
  {
    text: '银行卡/支付宝',
    icon: 'pay',
    click: () => {
      uni.navigateTo({ url: `/pages/my/wallet/bank-card` })
    }
  }
]

const handleWithdrawal = () => {
  console.log('提现')
}
</script>

<style lang="scss" scoped>
@import 'variables';
@import 'mixin';
.my-wallet-page {
  box-sizing: border-box;
  padding-bottom: $page-bottom;
  min-height: 100vh;
  .nav-bar-image {
    width: 100%;
    background-image: url('@/static/image/wallet.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding-top: calc($nav-height + var(--status-bar-height));
  }
  .card-content {
    padding: 50rpx $page-spacing 70rpx;
    color: #fff;
    .title-wrapper {
      display: flex;
      flex-direction: column;
      .label {
        font-size: $font-base;
      }
      .value {
        margin-top: 24rpx;
        font-size: 58rpx;
        font-weight: bold;
      }
    }

    .sub-wrapper {
      display: flex;
      justify-content: space-between;
      margin-top: 50rpx;
      .left {
        .label {
          font-size: $font-base;
        }
        .value {
          font-size: 50rpx;
          font-weight: bold;
          margin-left: 39rpx;
        }
      }
      .right {
        width: 171rpx;
        height: 64rpx;
        text-align: center;
        line-height: 64rpx;
        background: #fff;
        border-radius: $border-radius;
        font-size: $font-base;
        color: $font-color-main;
      }
    }
  }
  .card-footer {
    margin-top: -20rpx;
    padding: 26rpx $page-spacing;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(45deg, #6f2bec 0%, #a073f4 100%);
    border-radius: 0 0 $border-radius $border-radius;
    .right {
      display: flex;
      align-items: center;
      .icons {
        margin-left: 16rpx;
      }
    }
  }
  .main {
    margin-top: $item-spacing;
    padding: 0 $page-spacing;

    .main-container {
      background-color: #fff;

      border-radius: $border-radius;
      .title-wrapper {
        display: flex;
        flex-direction: column;
        border-bottom: 1rpx solid $divide-line-color;
        padding: $page-spacing $page-spacing 36rpx;
        .value {
          font-size: 44rpx;
          font-weight: bold;
          margin-top: 36rpx;
        }
      }
      .sub-title-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1rpx solid $divide-line-color;
        box-sizing: border-box;
        .sub-title-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex: 1;
          padding: 29rpx $page-spacing;
          .label {
            font-size: $font-base;
            color: $font-color-sub;
            vertical-align: middle;
          }
          .today {
            font-weight: bold;
            color: $warn-color;
          }
          .value {
            font-size: $font-base;
            padding-right: 36rpx;
            vertical-align: middle;
            font-weight: bold;
          }
        }
        .sub-title-item + .sub-title-item {
          padding-left: 36rpx;
          border-left: 1rpx solid $divide-line-color;
        }
      }

      .item-wrapper {
        border-radius: $border-radius;
        .item-body {
          flex-wrap: wrap;
          .item-item {
            padding: 32rpx $page-spacing;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            position: relative;
            background-color: #fcfcfd;
            .icon-image {
              width: 50rpx;
              height: 50rpx;
            }
            .title {
              font-size: $font-middle;
              margin-left: 32rpx;
            }
            .icons-wrapper {
              display: flex;
              align-items: center;
              font-weight: bold;
              position: absolute;
              top: 50%;
              right: $page-spacing;
              transform: translateY(-50%);
              .value {
                position: relative;
                margin-right: 16rpx;
                margin-top: -16rpx;
                .add {
                  position: absolute;
                  bottom: -34rpx;
                  left: 0;
                  font-size: $font-small;
                  color: $warn-color;
                  font-weight: 300;
                }
              }
            }
          }
          .has-border {
            border-bottom: 1rpx solid $divide-line-color;
          }
          .item-item:last-child {
            border-bottom: 0;
            &::after {
              display: none;
            }
          }
        }
      }
    }
  }
  .income-ranking {
    margin-top: 50rpx;
    padding: 0 $page-spacing;
    .top {
      display: flex;
      justify-content: space-between;
      .title {
        font-size: $font-large;
      }
      .tab {
        flex: 0 0 300rpx;
        border-radius: 0;
        padding: 15rpx;
      }
    }
    .income-ranking-wrapper {
      display: flex;
      flex-wrap: nowrap;
      margin-top: 32rpx;
      .income-ranking-item {
        position: relative;
        flex: 0 0 216rpx;
        width: 216rpx;
        // height: 294rpx;
        margin-right: 10px;
        box-sizing: border-box;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 50rpx $page-spacing 28rpx;
        border-radius: $border-radius;
        .income-ranking-item-image {
          width: 75rpx;
          height: 75rpx;
          box-sizing: border-box;
          border-radius: 50%;
          object-fit: cover;
        }

        .income-ranking-item-icon-wrapper {
          position: absolute;
          top: 0;
          right: 0;
          .income-ranking-item-icon {
            width: 94rpx;
            height: 34rpx;
            object-fit: cover;
          }
          .text {
            position: absolute;
            top: 45%;
            right: 50%;
            transform: translate(50%, -50%);
            font-size: $font-small;
            color: #fff;
          }
        }

        .income-ranking-title {
          margin-top: $item-spacing;

          @include text-overflow-hidden;
        }
        .income-wrapper {
          margin-top: 36rpx;
          .value {
            color: $warn-color;
          }
          .label {
            font-size: $font-small;
            color: $font-color-sub;
            margin-top: 16rpx;
          }
        }
      }
    }
  }
  .customer-service {
    margin-top: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    .customer-service-content {
      width: 218rpx;
      height: 66rpx;
      background: #fff;
      border-radius: 12rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      .image {
        width: 30rpx;
        height: 30rpx;
      }
      .text {
        font-size: $font-small;
        color: $font-color-sub;
        margin-left: 10rpx;
      }
    }
  }
}
</style>
