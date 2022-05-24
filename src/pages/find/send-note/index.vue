<template>
  <div class="send-note-page">
    <NavBar has-left has-right>
      <template #right>
        <button class="nav-button" @click="handleSend">发布</button>
      </template>
    </NavBar>

    <form class="send-note-page-form" @submit="formSubmit" @reset="formReset">
      <!-- 标题 -->
      <view class="form-item border">
        <input
          v-model="form.title"
          class="form-input"
          placeholder-class="placeholder-class"
          placeholder="请输入标题"
          :clearable="false"
        />
      </view>

      <!-- 内容 -->
      <view class="form-item">
        <AppTextarea
          v-model="form.content"
          :clearable="false"
          auto-height
          type="textarea"
          placeholder="请输入笔记内容"
        />
      </view>

      <!-- 话题列表 -->
      <TagList :tag-list="tagList" />

      <!-- 添加话题 -->
      <view class="form-item">
        <input
          v-model="form.tag"
          type="text"
          confirm-type="done"
          class="tag-input"
          placeholder-class="placeholder-class tag-placeholder-class"
          placeholder="#添加话题"
          :clearable="false"
          @confirm="handleTagInputConfirm"
        />
      </view>

      <!-- 工具栏 -->
      <view class="form-item">
        <image
          class="image"
          src="@/static/image/send-note/image.png"
          mode="aspectFill"
          @click="handleSelectImage"
        />
        <image
          class="video"
          src="@/static/image/send-note/video.png"
          mode="aspectFill"
          @click="handleSelectVideo"
        />
      </view>

      <!-- 图片区域 -->
      <ImageList :image-list="imageList" />

      <!-- 视频区域 -->
      <AppVideo :src="src" />
    </form>
  </div>
</template>

<script setup>
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { reactive, toRefs } from 'vue'
import NavBar from '@/components/NavBar'
import AppTextarea from '@/components/AppTextarea'
import TagList from '@/components/TagList'
import ImageList from '@/components/ImageList'
import AppVideo from '@/components/AppVideo'
import { chooseImage, chooseVideo } from '@/utils/uniUtils'

const state = reactive({
  form: {
    title: '',
    content: '',
    tag: ''
  },
  tagList: [],
  imageList: [...new Array(4)],
  src: ''
})
console.log(state)

onPullDownRefresh(() => {
  uni.showToast({
    title: '刷新成功',
    icon: 'success'
  })
  uni.stopPullDownRefresh()
})

const handleSend = () => {
  console.log('发布')
}
const formSubmit = () => {
  console.log('发布')
}
const formReset = () => {
  console.log('发布')
}
const handleSelectImage = async () => {
  const data = await chooseImage()
  console.log(data)
}
const handleSelectVideo = async () => {
  const data = await chooseVideo()
  console.log(data)
}

const handleTagInputConfirm = ({ detail }) => {
  state.tagList.push(detail.value)
  state.form.tag = ''
  console.log(e)
}
const { form, tagList, imageList, src } = toRefs(state)
</script>

<style lang="scss" scoped>
@import 'variables';
@import 'mixin';
.send-note-page {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;
  background-color: #fff;
  min-height: 100vh;
  :deep(.nav-bar-right-content) {
    display: flex;
    justify-content: flex-end;
  }
  .nav-button {
    height: 52rpx;
    line-height: 52rpx;
    background: #485bf7;
    border-radius: 6rpx;
    text-align: center;
    font-size: $font-middle;
    color: #fff;
  }
  .send-note-page-body {
    margin-top: $page-spacing;
  }
  .send-note-page-form {
    margin-top: $page-spacing;
    .form-item {
      margin-top: $page-spacing;
      .form-input {
        padding: $item-spacing 0;
        color: $font-color-main;
        font-weight: 700;
      }
      .tag-input {
        width: 186rpx;
        height: 60rpx;
        background: #f8f8fa;
        border-radius: 6rpx;
        padding: 0 20rpx;
        box-sizing: border-box;
      }
      .image {
        width: 48rpx;
        height: 42rpx;
        margin-right: $page-spacing;
      }
      .video {
        width: 57rpx;
        height: 41rpx;
      }
      :deep(.title-placeholder-class) {
        color: $font-color-sub;
        font-weight: 700;
        font-size: $font-base;
      }
      :deep(.tag-placeholder-class) {
        color: $font-color-main;
        font-size: $font-base;
      }
    }
    .border {
      border-bottom: 1rpx solid $divide-line-color;
    }
  }
}
</style>
