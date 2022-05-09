<template>
  <div class="my-center">
    <NavBar />
    <!--个人信息-->
    <div class="my-wrapper">
      <div class="user-info-wrapper">
        <div class="avatar-wrapper">
          <image
            :src="userInfo.avatarUrl || defaultAvatar"
            class="avatar"
            mode="aspectFill"
          />
        </div>

        <div class="user-info-body">
          <view class="name">
            {{ userInfo.nickName || defaultNickName }}
          </view>
          <view class="phone"> 手机号 11315351351 </view>
        </div>
      </div>
      <div class="right">
        <image
          class="qr-code"
          src="@/static/image/my/qrcode.png"
          mode="aspectFill"
        />
        <text class="text">我的关注</text>
      </div>
    </div>

    <view class="banner">
      <image
        class="member-bg"
        src="@/static/image/my/member-bg.png"
        mode="aspectFill"
      />
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
          <view class="grid-item-box" @click="item.click">
            <image
              v-if="item.icon"
              :src="'/static/image/my/' + item.icon + '.png'"
              class="image"
              mode="aspectFill"
            />
            <view class="text">{{ item.text }}</view>
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
import NavBar from '@/components/NavBar'
import defaultAvatar from '@/static/image/avatar.png'

const defaultNickName = '暂无昵称'
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

const handleToEdit = () => {
  uni.showToast({
    title: '此功能正在开发，敬请期待！',
    icon: 'none'
  })
}

const list = [
  {
    icon: 'like',
    text: '我的喜欢',
    click: handleToEdit
  },
  {
    icon: 'focus',
    text: '我的关注',
    click: handleToEdit
  },
  {
    icon: 'word',
    text: '我的口令',
    click: handleToEdit
  },
  {
    icon: 'help',
    text: '帮助中心',
    click: handleToEdit
  },
  {
    icon: 'tutor-in',
    text: '导师入住',
    click: handleToEdit
  },
  {
    icon: 'customer-service',
    text: '联系客服',
    click: handleToEdit
  },
  {
    icon: 'setting',
    text: '设置',
    click: handleLogout
  },
  {
    icon: '',
    text: ''
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
    margin-top: 74rpx;
    .user-info-wrapper {
      display: flex;
      .avatar-wrapper {
        .avatar {
          width: 94rpx;
          height: 94rpx;
          border-radius: 50%;
          background: #fff;
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
          font-size: $font-middle;
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
        width: 42px;
        height: 42px;
      }
      .text {
        font-size: $font-middle;
        color: $font-color-sub;
      }
    }
  }
  .banner {
    position: relative;
    margin-top: 31rpx;
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
          background-color: $danger-color;
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
            width: 60rpx;
            height: 60rpx;
          }
          .text {
            margin-top: 19rpx;
            font-size: 25rpx;
            font-weight: 400;
            color: $font-color-base;
          }
        }
      }
    }
  }
}
</style>
