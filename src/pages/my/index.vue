<template>
  <div class="my-center">
    <NavBar />
    <!--个人信息-->
    <div class="my-wrapper">
      <div class="user-info-wrapper">
        <div class="avatar-wrapper">
          <image
            :src="userInfo.avatarUrl || '/static/image/my/team.png'"
            class="avatar"
            mode="aspectFill"
          />
        </div>

        <div class="user-info-body">
          <view class="name">
            {{ userInfo.nickName || '这是我自己' }}
          </view>
          <view class="phone">
            手机号 {{ userInfo.phone || '11315351351' }}
          </view>
        </div>
      </div>
      <div class="right">
        <image
          class="qr-code"
          src="@/static/image/my/qrcode.png"
          mode="aspectFill"
        />
        <text class="text"> 关注公众号</text>
      </div>
    </div>

    <!-- 微信号和邀请码栏 -->
    <view class="wechat-invite-code">
      <view class="wechat-invite-code-item">
        <text class="text"> 微信号：123456</text>
        <image class="image" src="@/static/image/edit.png" mode="aspectFill" />
      </view>
      <view class="wechat-invite-code-item">
        <text class="text">邀请码：123456</text>
        <image class="image" src="@/static/image/copy.png" mode="aspectFill" />
      </view>
    </view>

    <!-- 邀请海报 -->
    <view class="banner">
      <image
        class="member-bg"
        src="@/static/image/my/member-bg.png"
        mode="aspectFill"
      />
      <text class="title">邀请会员得奖励！</text>
      <view class="button">立即邀请</view>
    </view>

    <!-- 我的团队 -->
    <view class="team-section">
      <view class="section-body">
        <div class="section-item">
          <div class="label">今日新增</div>
          <div class="value">2000</div>
        </div>
        <div class="section-item">
          <div class="label">团队总人数</div>
          <div class="value">2000</div>
        </div>
        <div class="section-item">
          <div class="label">会员总人数</div>
          <div class="value">2000</div>
        </div>
      </view>
    </view>

    <!-- 我的钱包 -->
    <view class="my-wallet-section">
      <view class="my-wallet-section-body">
        <div
          v-for="item in myWalletList"
          :key="item.text"
          class="my-wallet-section-item"
          @click="handleNavigateTo(item.page)"
        >
          <image
            class="image"
            :src="'/static/image/my/' + item.icon + '.png'"
            mode="aspectFill"
          />
          <div class="title">{{ item.text }}</div>
        </div>
      </view>
    </view>

    <!-- 常用功能 -->
    <view class="function-wrapper">
      <view class="function-body">
        <view
          v-for="(item, index) in functionList"
          :key="index"
          class="function-item"
          :index="index"
          :title="item.text"
          @click="handleNavigateTo(item.page)"
        >
          <image
            class="image"
            :src="'/static/image/my/' + item.icon + '.png'"
            mode="aspectFill"
          />
          <view class="title">{{ item.text }}</view>
          <div class="icons-wrapper">
            <uni-icons class="icons" type="forward" size="20" color="#999" />
          </div>
        </view>
      </view>
    </view>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
import NavBar from '@/components/NavBar'

const store = useUserStore()
const { userInfo } = storeToRefs(store)

// 退出登录
const handleLogout = async () => {
  await store.logout()
  uni.showToast({
    title: '退出成功',
    icon: 'success'
  })
}
console.log(handleLogout)

const handleNavigateTo = page => {
  uni.navigateTo({ url: `/pages/my/${page}/index` })
}

// 常用功能
const functionList = [
  {
    icon: 'tutor',
    text: '导师入住',
    page: 'help'
  },
  {
    icon: 'help',
    text: '帮助中心',
    page: 'help'
  },
  {
    icon: 'customer-service',
    text: '联系客服',
    page: 'help'
  },
  {
    icon: 'setting',
    text: '设置',
    page: 'setting'
  }
]

// 我的钱包
const myWalletList = [
  {
    icon: 'wallet',
    text: '我的钱包',
    page: 'wallet'
  },
  {
    icon: 'focus',
    text: '我的关注',
    page: 'focus'
  },
  {
    icon: 'word',
    text: '我的口令',
    page: 'word'
  },
  {
    icon: 'team',
    text: '我的团队',
    page: 'team'
  }
]
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.my-center {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;
  .my-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40rpx 0;
    border-bottom: 1px solid $divide-line-color;
    .user-info-wrapper {
      display: flex;
      .avatar-wrapper {
        .avatar {
          width: 90rpx;
          height: 90rpx;
          border-radius: 50%;
          background: #fff;
        }
      }
      .user-info-body {
        padding-left: 20rpx;
        .name {
          font-size: $font-large-title;
          font-weight: 500;
          color: $font-color-main;
        }
        .phone {
          font-size: $font-base;
          color: $font-color-sub;
        }
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .qr-code {
        width: 40rpx;
        height: 40rpx;
      }
      .text {
        font-size: $font-small;
        color: $font-color-sub;
        margin-top: 12rpx;
      }
    }
  }

  .wechat-invite-code {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: $item-spacing 0;
    .wechat-invite-code-item {
      .text {
        margin-right: 10rpx;
        vertical-align: top;
      }
      .image {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
  .banner {
    position: relative;
    margin-top: $item-spacing;
    width: 100%;
    height: 114rpx;
    border-radius: $border-radius;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    .member-bg {
      position: absolute;
      width: 100%;
      height: 114rpx;
      border-radius: $border-radius;
    }
    .title {
      position: absolute;
      top: 50%;
      left: 85rpx;
      transform: translateY(-50%);
      font-size: 29rpx;
      font-weight: 900;
      font-style: italic;
      color: #fff1d6;
      word-spacing: 2px;
      letter-spacing: 2px;
    }
    .button {
      position: absolute;
      top: 50%;
      right: 20rpx;
      transform: translateY(-50%);
      text-align: center;
      width: 144rpx;
      height: 42rpx;
      background: linear-gradient(0deg, #fff1d7 0%, #fee2b3 100%);
      border-radius: 21rpx;
      padding: 10rpx 27rpx;
    }
  }
  .team-section {
    margin-top: $item-spacing;
    background-color: #fff;
    border-radius: $border-radius;
    padding: $item-spacing 62rpx;
    box-sizing: border-box;
    .section-body {
      display: flex;
      justify-content: space-around;
      text-align: center;
      .section-item {
        padding-bottom: 6rpx;
        .label {
          font-size: $font-base;
          color: $font-color-sub;
        }
        .value {
          font-size: $font-title;
          font-weight: bold;
          color: $font-color-main;
          margin-top: 24rpx;
        }
      }
    }
  }

  .my-wallet-section {
    margin-top: $item-spacing;
    background-color: #fff;
    border-radius: $border-radius;
    padding: $item-spacing 40rpx;
    box-sizing: border-box;
    .my-wallet-section-body {
      display: flex;
      justify-content: space-around;
      text-align: center;
      .my-wallet-section-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .image {
          width: 68rpx;
          height: 68rpx;
        }
        .title {
          font-size: $font-small;
          color: $font-color-sub;
          margin-top: 16rpx;
        }
      }
    }
  }
  .function-wrapper {
    background-color: #fff;
    border-radius: $border-radius;
    margin-top: $item-spacing;
    padding: 0 $item-spacing;
    .function-body {
      flex-wrap: wrap;
      .function-item {
        padding: 23rpx 0;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        position: relative;
        .image {
          width: 60rpx;
          height: 60rpx;
        }
        .title {
          padding-left: 30rpx;
        }
        .icons-wrapper {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 85rpx;
          width: 82%;
          height: 1px;
          background-color: $divide-line-color;
        }
      }
      .function-item:last-child {
        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
