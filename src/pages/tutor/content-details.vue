<template>
  <div class="content-details-page">
    <NavBar has-left has-right right-icon="more" @clickRight="handleShare">
      <template #right>
        <image
          class="nav-image"
          src="/static/image/share.png"
          mode="aspectFill"
        />
      </template>
    </NavBar>

    <!-- 主内容区 -->
    <view class="content-header">
      <view class="content-header-title">
        今天教大家一个新小程序，大家赶快认真学起来， 觉得好的话一定要点赞收藏
      </view>
      <view class="avatar-wrapper">
        <image
          class="image"
          src="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
          mode="aspectFill"
        />
        <view class="name"> 短发发发发 </view>

        <button v-if="focus" disabled class="btn">
          <span>已关注</span>
        </button>

        <button v-else type="danger" class="btn" @click="handleFocus">
          <span class="icon">+</span>
          <span>关注</span>
        </button>
      </view>

      <view class="tag-wrapper">
        <TagList :tag-list="tagList" />
      </view>

      <view class="content-header-details">
        <view class="content-details-title">内容详情</view>
        <view :class="{ content: true, 'content-hidden': state.contentHidden }">
          在东京奥运会上，中国跳水队夺得了7金5银的好成绩圆满完成了赛前制定的夺金任务。这些荣誉的背后，是中国跳水队全体运动员努力拼搏的
          在东京奥运会上，中国跳水队夺得了7金5银的好成绩圆满完成了赛前制定的夺金任务。这些荣誉的背后，是中国跳水队全体运动员努力拼搏的
          在东京奥运会上，中国跳水队夺得了7金5银的好成绩圆满完成了赛前制定的夺金任务。这些荣誉的背后，是中国跳水队全体运动员努力拼搏的
          在东京奥运会上，中国跳水队夺得了7金5银的好成绩圆满完成了赛前制定的夺金任务。这些荣誉的背后，是中国跳水队全体运动员努力拼搏的
          在东京奥运会上，中国跳水队夺得了7金5银的好成绩圆满完成了赛前制定的夺金任务。这些荣誉的背后，是中国跳水队全体运动员努力拼搏的
          在东京奥运会上，中国跳水队夺得了7金5银的好成绩圆满完成了赛前制定的夺金任务。这些荣誉的背后，是中国跳水队全体运动员努力拼搏的
          在东京奥运会上，中国跳水队夺得了7金5银的好成绩圆满完成了赛前制定的夺金任务。这些荣誉的背后，是中国跳水队全体运动员努力拼搏的
          在东京奥运会上，中国跳水队夺得了7金5银的好成绩圆满完成了赛前制定的夺金任务。这些荣誉的背后，是中国跳水队全体运动员努力拼搏的
          在东京奥运会上，中国跳水队夺得了7金5银的好成绩圆满完成了赛前制定的夺金任务。这些荣誉的背后，是中国跳水队全体运动员努力拼搏的
          在东京奥运会上，中国跳水队夺得了7金5银的好成绩圆满完成了赛前制定的夺金任务。这些荣誉的背后，是中国跳水队全体运动员努力拼搏的
          在东京奥运会上，中国跳水队夺得了7金5银的好成绩圆满完成了赛前制定的夺金任务。这些荣誉的背后，是中国跳水队全体运动员努力拼搏的
        </view>
      </view>
      <view class="content-header-footer">
        <view class="left">
          <text class="label">热度</text>
          <text class="value">398</text>
        </view>
        <view class="right">
          <text class="label">发布时间</text>
          <text class="value">2022-14-14 40</text>
        </view>
      </view>
    </view>

    <!-- 加入会员 -->
    <view class="join-member">
      <view class="join-member-content">
        <view class="title-wrapper">
          <text class="title">加入导师会员</text>
          <text class="sub-title">可查看全部内容</text>
        </view>
        <button class="join-button">立即加入</button>
      </view>
    </view>

    <view class="media-wrapper">
      <!-- 图片区域 -->
      <ImageList :image-list="imageList" />

      <!-- 视频区域 -->
      <AppVideo />
    </view>

    <!-- 博主 -->
    <div class="find-wrapper">
      <view class="find-item">
        <view class="find-item-body">
          <view class="find-item-image-wrapper">
            <image
              src="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
              class="find-item-image"
              mode="aspectFill"
            />
            <text class="find-item-image-text"> 398人已加入 </text>
          </view>
          <view class="find-item-right">
            <view class="find-item-title">
              豌豆的妈妈
              <div class="icons-wrapper">
                <uni-icons
                  class="icons"
                  type="forward"
                  size="18"
                  color="#999"
                />
              </div>
            </view>
            <view class="find-item-sub-title">
              一个精通短视频创作的 全职带娃宝妈，一个精 通短视频创作的全职...
            </view>
          </view>
        </view>
      </view>
    </div>

    <!-- 底部分享模块 -->
    <div class="footer-bar">
      <div class="footer-bar-content">
        <div class="like-wrapper" @click="handleLike">
          <image
            v-show="like"
            class="image"
            src="/static/image/liked.png"
            mode="aspectFill"
          />
          <image
            v-show="!like"
            class="image"
            src="/static/image/like.png"
            mode="aspectFill"
          />

          <text class="value">230</text>
        </div>
        <button type="primary" class="button" @click="handleShare">
          立即分享
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { reactive, toRefs } from 'vue'
import NavBar from '@/components/NavBar'
import TagList from '@/components/TagList'
import ImageList from '@/components/ImageList'
import AppVideo from '@/components/AppVideo'

const state = reactive({
  like: false,
  focus: false,
  contentHidden: true,
  imageList: [...new Array(4)],
  tagList: [
    '热门话题',
    '热门话题',
    '热门话题',
    '热门话题',
    '热门话题',
    '热门话题',
    '热门话题',
    '热门话题'
  ]
})

console.log(state)

const handleFocus = () => {
  state.focus = !state.focus
}
const handleLike = () => {
  state.like = !state.like
}

onPullDownRefresh(() => {
  uni.showToast({
    title: '刷新成功',
    icon: 'success'
  })
  uni.stopPullDownRefresh()
})

// 去邀请分享页面
const handleShare = () => {
  uni.navigateTo({ url: `/pages/tutor/invite?id=${1}` })
}
const { tagList, imageList, like, focus } = toRefs(state)
</script>

<style lang="scss" scoped>
@import 'variables';
@import 'mixin';

.nav-image {
  width: 36rpx;
  height: 36rpx;
}
.content-details-page {
  box-sizing: border-box;
  padding-bottom: 80px;
  .video {
    object-fit: cover;
    width: 100%;
    height: 386rpx;
    :deep(.uni-video-video) {
      width: 100%;
      object-fit: cover !important;
    }
  }
  .content-header {
    background-color: #fff;
    padding-top: $item-spacing;
    .content-header-title {
      font-size: 32rpx;
      font-weight: 500;
      padding: 0 $page-spacing;
      line-height: 1.5;
    }
    .avatar-wrapper {
      margin-top: 40rpx;
      background-color: #f8f8fa;
      display: flex;
      align-items: center;
      padding: 6rpx $page-spacing;
      position: relative;
      .image {
        width: 80rpx;
        height: 80rpx;
        background: #c2c3c4;
        border-radius: 50%;
      }
      .name {
        font-size: $font-middle;
        font-weight: 500;
        margin-left: $item-spacing;
      }
      .btn {
        position: absolute;
        top: 50%;
        right: $page-spacing;
        transform: translateY(-50%);
        vertical-align: baseline;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          display: inline-block;
          font-size: 20px;
          margin-right: 8rpx;
        }
      }
    }

    .content-header-details {
      padding: 28rpx $page-spacing 0;
      .content-details-title {
        font-size: $font-large;
        font-weight: 500;
      }
      .content {
        padding: 25rpx 0;
        font-size: $font-middle;
        border-bottom: 1rpx solid $divide-line-color;
        line-height: 56rpx;
      }
      .content-hidden {
        height: 282rpx;
        overflow: hidden;
        position: relative;
        border-bottom: 0;
        &::before {
          content: '';
          height: 282rpx;
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          background: linear-gradient(
            0deg,
            #fff 0%,
            rgba(255, 255, 255, 0.9) 50%,
            rgba(255, 255, 255, 0.5) 80%,
            rgba(255, 255, 255, 0) 100%
          );
        }
        &::after {
          width: 100%;
          text-align: center;
          position: absolute;
          bottom: 24rpx;
          left: 0;
          content: '部分内容已隐藏';
          font-size: $font-middle;
          font-weight: 500;
          color: #485bf7;
        }
      }
    }
    .content-header-footer {
      padding: 32rpx $page-spacing;
      display: flex;
      justify-content: space-between;
      .label {
        font-size: $font-small;
        color: $font-color-sub;
        padding-right: 8rpx;
      }
      .value {
        font-size: $font-small;
        color: $font-color-main;
        font-weight: bolder;
      }
    }
  }
  .tag-wrapper {
    margin: $page-spacing;
    background-color: #fff;
  }
  .join-member {
    margin-top: $item-spacing;
    background-color: #fff;
    padding: $page-spacing;
    height: 264rpx;
    box-sizing: border-box;

    .join-member-content {
      height: 100%;
      background: linear-gradient(-86deg, #e5bb97 0%, #fae3cd 100%);
      border-radius: $border-radius;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 $page-spacing;
      box-sizing: border-box;
      .title-wrapper {
        display: flex;
        flex-direction: column;
        .title {
          font-size: $font-large;
          color: $font-color-main;
          font-weight: 700;
        }
        .sub-title {
          font-size: $font-middle;
          color: $font-color-sub;
        }
      }
      .join-button {
        width: 185rpx;
        height: 65rpx;
        line-height: 65rpx;
        background: linear-gradient(90deg, #544b47 0%, #291d0f 100%);
        border-radius: 65rpx;
        font-size: $font-base;
        color: #f5dac1;
        &::after {
          display: none;
        }
      }
    }
  }
  .media-wrapper {
    margin-top: $item-spacing;
    background-color: #fff;
    padding: $page-spacing;
  }
  .find-wrapper {
    padding: 0 $page-spacing;
    .find-item {
      position: relative;
      background: #fff;
      border-radius: $border-radius;
      display: flex;
      flex-direction: column;
      margin-top: $item-spacing;
      padding: 28rpx 24rpx;
      .find-item-body {
        display: flex;
        .find-item-image-wrapper {
          display: flex;
          flex-direction: column;
          .find-item-image {
            width: 152rpx;
            height: 152rpx;
            box-sizing: border-box;
            background: #f7f7f7;
            border-radius: $border-radius;
            object-fit: cover;
          }
          .find-item-image-text {
            margin-top: 22rpx;
            display: inline-block;
            padding: 5rpx;
            background: #f0f0f2;
            border-radius: 6px;
            color: $font-color-main;
          }
        }
        .find-item-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-left: 24rpx;
          .find-item-title {
            box-sizing: border-box;
            font-size: $font-middle;
            font-weight: bold;
            color: $font-color-main;
            position: relative;

            @include text-overflow-hidden;
            .icons-wrapper {
              position: absolute;
              top: 50%;
              right: 0;
              transform: translateY(-50%);
            }
          }
          .find-item-sub-title {
            margin-top: $item-spacing;
            font-size: $font-base;
            color: $font-color-sub;
            line-height: 44rpx;

            @include multiline-text-overflow-hidden(2);
          }
        }
      }
    }
  }
  .footer-bar {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    .footer-bar-content {
      background-color: #fff;
      height: 113rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 25rpx;
      .like-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 63rpx;
        .image {
          width: 47rpx;
          height: 44rpx;
        }
        .value {
          display: inline-block;
          font-size: $font-small;
          color: $font-color-sub;
          margin-top: 10rpx;
        }
      }
      .button {
        flex: 0 0 548rpx;
        width: 548rpx;
        margin: 0;
      }
    }
  }
}
</style>
