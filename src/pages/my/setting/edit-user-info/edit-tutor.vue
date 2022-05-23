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

      <!-- 价格编辑 -->
      <view class="edit-wrapper">
        <view v-for="item in editList" :key="item.text" class="edit-item">
          <view class="edit-item-title">{{ item.text }}</view>
          <view class="edit-item-value">
            <div class="value">{{ item.value }}元</div>
            <div class="edit" @click="handleEdit(item)">
              <text class="edit-text">编辑</text>
              <image
                src="/static/image/my/edit.png"
                class="edit-image"
                mode="aspectFill"
              />
            </div>
          </view>
        </view>
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

const handleEdit = () => {
  uni.navigateTo({ url: '/pages/my/setting/edit-user-info/edit-price' })
}

const handleUploadAvatar = async () => {
  await chooseImage()
}
const handleClickCellItem = item => {
  item.click && item.click()
}

const editList = [
  {
    text: '年费价格',
    value: '600'
  },
  {
    text: '分销价格',
    value: '30-60'
  }
]

const settingList = [
  {
    text: '导师名称',
    value: '刚哥自媒体',
    click: () => {
      uni.navigateTo({
        url: '/pages/my/setting/edit-user-info/edit-username'
      })
    }
  },
  {
    text: '个人简介',
    value: '去设置',
    click: () => {
      uni.navigateTo({ url: '/pages/my/setting/edit-user-info/edit-desc' })
    }
  },
  {
    text: '主页背景',
    value: '更换背景图片',
    click: () => {
      uni.navigateTo({
        url: '/pages/my/setting/edit-user-info/edit-background'
      })
    }
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
  .edit-wrapper {
    margin-top: 40rpx;
    display: flex;
    justify-content: space-between;
    .edit-item {
      flex: 1;
      padding: 29rpx 32rpx;
      background: #f8f8fa;
      border-radius: $border-radius;
    }
    .edit-item-title {
      font-size: $font-small;
      color: $font-color-sub;
    }
    .edit-item-value {
      display: flex;
      justify-content: space-between;
      margin-top: 16rpx;
      .value {
        font-size: $font-large;
        font-weight: 500;
      }
      .edit {
        display: flex;
        align-items: center;

        .edit-text {
          display: inline-block;
          margin-right: 16rpx;
          font-size: $font-small;
          color: $font-color-sub;
        }
        .edit-image {
          width: 31rpx;
          height: 31rpx;
        }
      }
    }
  }

  .edit-item + .edit-item {
    margin-left: 10rpx;
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
