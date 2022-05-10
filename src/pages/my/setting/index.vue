<template>
  <div class="setting-page">
    <NavBar has-left />

    <!-- 常用功能 -->
    <view class="setting-wrapper">
      <view class="setting-body">
        <view
          v-for="(item, index) in settingList"
          :key="index"
          class="setting-item"
          :index="index"
          :title="item.text"
          @click="item.click"
        >
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
import NavBar from '@/components/NavBar'

const handleToEdit = () => {
  uni.showToast({
    title: '此功能正在开发，敬请期待！',
    icon: 'none'
  })
}

const settingList = [
  {
    text: '编辑资料',
    click: handleToEdit
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
    click: handleToEdit
  },
  {
    text: '关于我们',
    click: handleToEdit
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

  .setting-wrapper {
    border-radius: $border-radius;
    margin-top: 20rpx;
    padding: 0 32rpx;
    .setting-body {
      flex-wrap: wrap;
      border-top: 1px solid $divide-line-color;
      .setting-item {
        padding: 23rpx 0;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        position: relative;
        border-bottom: 1px solid $divide-line-color;
        .title {
          font-size: $font-middle;
        }
        .icons-wrapper {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
      }
      .setting-item:last-child {
        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
