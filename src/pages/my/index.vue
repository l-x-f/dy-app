<template>
  <div class="my-center">
    <!--个人信息-->
    <div class="my-wrapper">
      <div class="avatar-wrapper">
        <img :src="userInfo.avatarUrl || defaultAvatar" class="avatar" />
      </div>
      <div class="name-wrapper">
        <span class="name">
          {{ userInfo.nickName || defaultNickName }}
        </span>
      </div>
    </div>
    <AppSection title="订单管理" arrow @click="handleToEdit" />
    <AppSection title="帮助中心" arrow @click="handleToEdit" />
    <AppSection title="联系客服" arrow @click="handleToEdit" />
    <AppSection title="设置" arrow @click="handleToEdit" />

    <div class="login-out">
      <button type="primary" @click="handleLogout">退出登录</button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import AppSection from '@/components/AppSection'
import { useUserStore } from '@/store'

const defaultAvatar =
  'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/66211cd0-4f31-11eb-bd01-97bc1429a9ff.png'
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
    title: '此功能正在开发，尽情期待！',
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
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
      width: 94rpx;
      height: 94rpx;
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
    padding: 0 20px;
    box-sizing: border-box;
    bottom: 50rpx;
  }
}
</style>
