<template>
  <div class="setting-page">
    <NavBar has-left />

    <!-- 用户信息 -->
    <div class="user-info-wrapper">
      <view class="avatar" @click="handleUploadAvatar">
        <image
          src="/static/image/my/team.png"
          class="avatar-image"
          mode="aspectFill"
        />
        <text class="edit-image">点击更换头像</text>
      </view>
    </div>

    <!-- 常用功能 -->
    <AppCell :cell-list="settingList" @clickItem="handleClickCellItem" />
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar'
import AppCell from '@/components/AppCell'
import { chooseImage } from '@/utils/uniUtils'

const handleUploadAvatar = async () => {
  await chooseImage()
}
const handleClickCellItem = item => {
  item.click && item.click()
}

const settingList = [
  {
    text: '昵称',
    value: '刚哥自媒体',
    click: () => {
      uni.navigateTo({
        url: '/pages/my/setting/edit-user-info/edit-username'
      })
    }
  },
  {
    text: '手机号',
    value: '159*****6151',
    hasRightIcon: false
  },
  {
    text: '实名认证',
    value: '去认证',
    click: () => {
      uni.navigateTo({
        url: `/pages/my/setting/edit-user-info/real-name-authentication`
      })
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
  .user-info-wrapper {
    margin-top: 54rpx;
    .avatar {
      display: flex;
      flex-direction: column;
      align-items: center;
      .avatar-image {
        width: 118rpx;
        height: 118rpx;
        background: #c2c3c4;
        border-radius: 50%;
      }
      .edit-image {
        margin-top: 16rpx;
        font-size: $font-small;
        color: $font-color-sub;
      }
    }
  }

  :deep(.cell-wrapper) {
    .cell-body {
      border: 0;
      //   .cell-item {
      //     padding: 46rpx 0;
      //   }
    }
  }
}
</style>
