<template>
  <div class="my-center">
    <!--个人信息-->
    <div class="my-wrapper">
      <div class="user-info-wrapper">
        <div class="avatar-wrapper">
          <img :src="userInfo.avatarUrl || defaultAvatar" class="avatar" />
        </div>

        <div class="user-info-body">
          <view class="name">
            {{ userInfo.nickName || defaultNickName }}
          </view>
          <view class="phone"> 手机号 11315351351 </view>
        </div>
      </div>
      <div class="right">我的关注</div>
    </div>

    <view class="banner">
      <text class="title">邀请会员得奖励！</text>
      <view class="button">立即邀请</view>
    </view>

    <view class="section">
      <view class="section-title">财务信息</view>
      <view class="section-body">
        <div class="section-item">
          <div class="value">2000</div>
          <div class="label">今日新增</div>
        </div>
        <div class="section-item">
          <div class="value">2000</div>
          <div class="label">团队总人数</div>
        </div>
        <div class="section-item">
          <div class="button" @click="handleToEdit">我的钱包</div>
        </div>
      </view>
    </view>

    <view class="section">
      <view class="section-title">我的推广</view>
      <view class="section-body">
        <div class="section-item">
          <div class="value">2000</div>
          <div class="label">今日新增</div>
        </div>
        <div class="section-item">
          <div class="value">2000</div>
          <div class="label">团队总人数</div>
        </div>
        <div class="section-item">
          <div class="value">2000</div>
          <div class="label">会员总人数</div>
        </div>
      </view>
    </view>

    <view class="function-wrapper">
      <view class="title"> 常用功能</view>

      <view class="function-body">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="function-item"
          :index="index"
        >
          <view class="grid-item-box">
            <image
              v-if="item.url"
              src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/66211cd0-4f31-11eb-bd01-97bc1429a9ff.png"
              class="image"
              mode="aspectFill"
            />
            <view class="text">{{ item.text }}</view>
          </view>
        </view>
      </view>
    </view>

    <div class="login-out">
      <button type="primary" @click="handleLogout">退出登录</button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'

const defaultAvatar =
  'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/66211cd0-4f31-11eb-bd01-97bc1429a9ff.png'
const defaultNickName = '暂无昵称'
const store = useUserStore()

const { userInfo } = storeToRefs(store)

const list = [
  {
    url: '/static/c1.png',
    text: '我的喜欢',
    badge: '0',
    type: 'primary'
  },
  {
    url: '/static/c2.png',
    text: '我的关注',
    badge: '1',
    type: 'success'
  },
  {
    url: '/static/c3.png',
    text: '我的口令',
    badge: '99',
    type: 'warning'
  },
  {
    url: '/static/c4.png',
    text: '帮助中心',
    badge: '2',
    type: 'error'
  },
  {
    url: '/static/c5.png',
    text: '导师入住'
  },
  {
    url: '/static/c6.png',
    text: '联系客服'
  },
  {
    url: '/static/c7.png',
    text: '设置'
  },
  {
    url: '',
    text: ''
  }
]

// 退出登录
const handleLogout = async () => {
  await store.logout()
  uni.showToast({
    title: '退出成功',
    icon: 'success'
  })
}

const handleToEdit = () => {
  uni.showToast({
    title: '此功能正在开发，尽情期待！',
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.my-center {
  background: #f5f5f5;
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;
  .my-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 74rpx;
    .user-info-wrapper {
      display: flex;
      .avatar-wrapper {
        .avatar {
          width: 94rpx;
          height: 94rpx;
          border-radius: 50%;
        }
      }
      .user-info-body {
        padding-left: 23rpx;
        .name {
          font-size: 33rpx;
          font-weight: 500;
          color: $font-color-base;
        }
        .phone {
          font-size: $font-base-lg;
          color: $font-color-sub;
        }
      }
    }
    .right {
      font-size: $font-base-lg;
    }
  }

  .banner {
    margin-top: 31rpx;
    width: 100%;
    height: 114rpx;
    background: linear-gradient(9deg, #f4431a 0%, #fca637 100%);
    border-radius: $border-radius;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20rpx;
    box-sizing: border-box;
    .title {
      margin-left: 85rpx;
      font-size: 29rpx;
      font-weight: bold;
      font-style: italic;
      color: #fff1d6;
    }
    .button {
      text-align: center;
      width: 144rpx;
      height: 42rpx;
      background: linear-gradient(0deg, #fff1d7 0%, #fee2b3 100%);
      border-radius: 21rpx;
      padding: 10rpx 27rpx;
    }
  }

  .section {
    margin-top: 31rpx;
    background-color: #fff;
    border-radius: $border-radius;
    padding: 30rpx 41rpx;

    .section-title {
      font-size: 29rpx;
      font-family: Source Han Sans CN;
      color: $font-color-base;
    }

    .section-body {
      margin-top: 43rpx;
      display: flex;
      justify-content: space-around;

      .section-item {
        padding-bottom: 6rpx;
        .value {
          font-size: 48rpx;
          font-weight: bold;
          color: $font-color-base;
        }
        .label {
          font-size: 23rpx;
          color: $font-color-sub;
        }
        .button {
          width: 167rpx;
          height: 67rpx;
          line-height: 67rpx;
          background: #fc2b55;
          border-radius: 8px;
          text-align: center;
          font-size: 29rpx;
          font-weight: 500;
          color: #fff;
        }
      }
    }
  }

  .function-wrapper {
    margin-top: 56rpx;
    padding: 0 41rpx;
    .title {
      font-size: 29rpx;
      font-weight: 500;
      color: #333;
    }

    .function-body {
      display: flex;
      flex-wrap: wrap;
      margin-top: 44rpx;
      .function-item {
        width: 25%;
        flex: 0 0 25%;
        height: 100rpx;
        box-sizing: border-box;
        margin-bottom: 41rpx;
        display: flex;
        justify-content: center;

        .grid-item-box {
          display: flex;
          flex-direction: column;
          text-align: center;
          justify-content: center;
          align-items: center;
          .image {
            width: 46rpx;
            height: 46rpx;
          }
          .text {
            margin-top: 19rpx;
            font-size: 25rpx;
            font-weight: 400;
            color: #333;
          }
        }
      }
    }
  }

  .login-out {
    width: 100%;
    text-align: center;
    padding: 0 20px;
    box-sizing: border-box;
    bottom: 10rpx;
    left: 0;
  }
}
</style>
