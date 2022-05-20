<template>
  <div class="edit-price">
    <NavBar has-left has-right>
      <template #right>
        <view class="nav-button" @click="handleSubmit">修改</view>
      </template>
    </NavBar>

    <!-- 表单 -->
    <view class="form-wrapper">
      <uni-forms
        ref="form"
        :model-value="formData"
        :rules="rules"
        :label-width="80"
      >
        <uni-forms-item label="年费价格" name="name">
          <input
            v-model="formData.price"
            type="number"
            placeholder="请输入年费价格"
          />
        </uni-forms-item>
        <uni-forms-item label="分销设置" name="name">
          <switch
            :checked="formData.checked"
            color="#485bf7"
            @change="switchChange"
          />
        </uni-forms-item>
        <uni-forms-item label="直推返佣" name="distribution">
          <input
            v-model="formData.distribution"
            class="input"
            type="number"
            placeholder="请输入直推返佣"
          />
        </uni-forms-item>
        <uni-forms-item label="间推返佣" name="indirectDistribution">
          <input
            v-model="formData.indirectDistribution"
            class="input"
            type="number"
            placeholder="请输入间推返佣"
          />
        </uni-forms-item>
      </uni-forms>
    </view>
  </div>
</template>

<script setup>
import { toRefs, reactive } from 'vue'
import NavBar from '@/components/NavBar'

const state = reactive({
  // 表单数据
  formData: {
    price: '',
    checked: true,
    distribution: '',
    indirectDistribution: ''
  }
})

// 监听switch
const switchChange = async () => {
  state.formData.checked = !state.formData.checked
}
// 提交表单
const handleSubmit = async () => {
  console.log('提交表单')
}

const { formData, rules } = toRefs(state)
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.edit-price {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;
  background-color: #fff;
  min-height: 100vh;

  .nav-button {
    font-size: $nav-font-size;
    color: $font-color-main;
    font-weight: 500;
  }
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
      border-bottom: 1rpx solid $divide-line-color;
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
}
</style>
