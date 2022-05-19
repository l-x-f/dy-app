<template>
  <div class="real-name-authentication">
    <NavBar has-left />
    <!-- 标题 -->
    <view class="title">请完善以下信息</view>
    <!-- 描述 -->
    <Describe :describe-list="describeList" :has-star="false" />

    <!-- 表单 -->
    <view class="form-wrapper">
      <uni-forms
        ref="form"
        :model-value="formData"
        :rules="rules"
        :label-width="110"
      >
        <uni-forms-item label="真实姓名" name="name" required>
          <input
            v-model="formData.name"
            type="text"
            placeholder="请输入真实姓名"
          />
        </uni-forms-item>
        <uni-forms-item label="身份证号" name="idCard" required>
          <input
            v-model="formData.idCard"
            class="input"
            type="idcard"
            placeholder="请输入身份证号"
          />
        </uni-forms-item>
        <uni-forms-item label="身份证" name="idCard" required class="id-card">
          <view class="form-item" @click="handleChooseImage('front')">
            <div class="image-wrapper">
              <image
                class="id-card-img"
                src="@/static/image/wallet/front.png"
                alt=""
                mode="aspectFit"
              />
            </div>

            <view class="image-label">上传身份证人像面</view>
          </view>
          <view class="form-item" @click="handleChooseImage('back')">
            <div class="image-wrapper">
              <image
                class="id-card-img"
                src="@/static/image/wallet/back.png"
                alt=""
                mode="aspectFit"
              />
            </div>
            <view class="image-label">上传身份证国徽面</view>
          </view>
        </uni-forms-item>
        <uni-forms-item label="身份证" name="idCard" required class="id-card">
          <view class="form-item" @click="handleChooseImage('hold')">
            <div class="image-wrapper">
              <image
                class="id-card-img"
                src="@/static/image/wallet/hold.png"
                alt=""
                mode="aspectFit"
              />
            </div>
            <view class="image-label">上传手持身份证照片</view>
          </view>
          <view class="form-item no-bg">
            请确保“身份证”相关 信息全部清晰; 请确保露出您的手臂</view
          >
        </uni-forms-item>

        <button type="primary" class="submit-button" @click="handleSubmit">
          提交
        </button>
      </uni-forms>
    </view>
  </div>
</template>

<script setup>
import { ref, toRefs, reactive } from 'vue'
import NavBar from '@/components/NavBar'
import Describe from '@/components/Describe'
import { chooseImage } from '@/utils/uniUtils'

const describeList = ref([
  {
    content:
      '为了保证任务的有效性,提交个人实名信息必须真实有效,认证通过后可创建任务.'
  }
])
const form = ref()

const state = reactive({
  tabIndex: 0,
  currentIndex: '',
  currentItem: {},
  visible: false,
  checked: [true],
  // 表单数据
  formData: {
    name: '',
    idCard: '',
    front: '',
    back: '',
    hold: ''
  },
  rules: {
    name: {
      rules: [
        {
          required: true,
          errorMessage: '请输入姓名'
        }
      ]
    },
    idCard: {
      rules: [
        {
          required: true,
          errorMessage: '请输入身份证号'
        }
      ]
    }
  }
})

// 提交表单
const handleSubmit = async () => {
  await form.value.validate()
}
// 提交表单
const handleChooseImage = async type => {
  const data = await chooseImage({ count: 1 })
  state.formData[type] = data
}

const { formData, rules } = toRefs(state)
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.real-name-authentication {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;
  background-color: #fff;
  min-height: 100vh;
  :deep(.describe) {
    .item {
      line-height: 40rpx;
    }
  }
  .title {
    font-size: $font-large-title;
    font-weight: 500;
    margin: 60rpx 0 32rpx;
  }
  .form-wrapper {
    :deep(.uni-forms-item__label) {
      .label-text {
        color: $font-color-main;
        font-size: $font-middle;
      }
    }
    :deep(.uni-error-message) {
      bottom: -13px;
    }
    .uni-forms-item {
      padding: 23rpx 0;
      border-bottom: 1px solid $divide-line-color;
    }
    :deep(.uni-forms-item__inner) {
      padding: 0;
      align-items: center;
    }
    :deep(.uni-forms-item__content) {
      min-height: unset;
    }
    :deep(.input-value-border) {
      border: 0;
    }
  }
  .id-card {
    :deep(.uni-forms-item__inner) {
      flex-direction: column;
      align-items: flex-start;
    }
    :deep(.uni-forms-item__content) {
      display: flex;
      justify-content: space-between;
    }
    .form-item {
      flex: 0 0 50%;

      .image-wrapper {
        height: 256rpx;
        background: #f5f8fe;
        border-radius: $border-radius;
        padding: 45rpx 50rpx;
        box-sizing: border-box;
        .id-card-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .image-label {
        margin-top: 24rpx;
        color: $font-color-sub;
        font-size: $font-small;
      }
    }
    .form-item:nth-of-type(odd) {
      margin-right: $item-spacing;
    }
    .no-bg {
      padding: 45rpx 50rpx;
      box-sizing: border-box;

      background-color: #fff;
      font-size: $font-small;
      color: $font-color-sub;
    }
  }
  .submit-button {
    margin-top: 50rpx;
  }
}
</style>
