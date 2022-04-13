<template>
  <div class="my-center">
    <!--个人信息-->
    <div class="my-wrapper">
      <div class="avatar-wrapper">
        <img :src="userInfo.head || defaultAvatar" class="avatar" />
      </div>
      <div v-if="isLogin" class="name-wrapper">
        <span class="name">
          {{ userInfo.nickname }}
        </span>
      </div>
    </div>

    <AppSection title="订单管理" arrow />
    <AppSection title="帮助中心" arrow />
    <AppSection title="联系客服" arrow />
    <AppSection title="设置" arrow />

    <div v-if="isLogin" class="login-out">
      <button type="primary" @click="handleLogout">退出登录</button>
    </div>
  </div>
</template>

<script setup>
import defaultAvatar from '@/static/defaultImage.png'
import AppSection from '@/components/AppSection'

const userInfo = {
  head: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/66211cd0-4f31-11eb-bd01-97bc1429a9ff.png',
  nickname: '小明'
}

const isLogin = true

const handleLogout = () => {
  uni.navigateTo({
    url: '/pages/login/index'
  })
}
</script>

<style lang="scss" scoped>
.my-center {
  height: 100%;
  background: #f5f5f5;
  overflow: hidden;

  .my-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    height: 150px;
    text-align: center;
    opacity: 0.77;
    background: #fff;

    .avatar-wrapper {
      box-sizing: border-box;
      width: 65px;
      height: 65px;
      margin: 0 auto;
      padding: 3px;
      background: #fff;
      border-radius: 50%;

      .avatar {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 50%;
      }
    }

    .name-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      font-size: 28rpx;

      .name {
        padding-right: 4px;
        color: #333;
        line-height: 25px;
      }

      .iconfont {
        line-height: 25px;
      }
    }

    .btn-box {
      width: 100%;
    }
  }

  .login-out {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 50rpx;
  }
}
</style>
