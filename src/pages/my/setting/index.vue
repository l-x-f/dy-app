<template>
  <div class="setting-page">
    <NavBar has-left />

    <!-- 常用功能 -->
    <AppCell :cell-list="settingList" @clickItem="handleClickItem" />
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar'
import AppCell from '@/components/AppCell'

import { useUserStore } from '@/store'

const handleToEdit = () => {
  uni.showToast({
    title: '此功能正在开发，敬请期待！',
    icon: 'none'
  })
}

const store = useUserStore()

// 退出登录
const handleLogout = async () => {
  await store.logout()
  uni.showToast({
    title: '退出成功',
    icon: 'success'
  })
}
console.log(handleLogout)

const handleClickItem = item => {
  item.click && item.click()
}

const settingList = [
  {
    text: '编辑资料',
    click: () => {
      uni.navigateTo({ url: '/pages/my/setting/edit-user-info/index' })
    }
  },
  {
    text: '意见反馈',
    click: handleToEdit
  },
  {
    text: '账号注销',
    click: handleToEdit
  },
  {
    text: '检查更新',
    click: handleToEdit
  },
  {
    text: '清除缓存',
    click: handleLogout
  },
  {
    text: '关于我们',
    click: () => {
      uni.navigateTo({ url: '/pages/web-view/index' })
    }
  }
]
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.setting-page {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;
  background-color: #fff;
  height: 100vh;
  overflow: hidden;
}
</style>
