<template>
  <div class="bank-card">
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

        <view>
          <TransitionTab v-model="state.tabIndex" :tab-list="tabList" />
        </view>
        <uni-forms-item
          v-if="state.tabIndex === 0"
          label="开户银行"
          name="bank"
          required
        >
          <input
            v-model="formData.bank"
            placeholder="请选择开户银行"
            disabled
            @click="handleOpenPopup"
          />
        </uni-forms-item>
        <uni-forms-item
          v-if="state.tabIndex === 0"
          label="银行卡号"
          name="bankCard"
          required
        >
          <input
            v-model="formData.bankCard"
            class="input"
            type="text"
            placeholder="请输入银行卡号"
          />
        </uni-forms-item>
        <uni-forms-item
          v-if="state.tabIndex === 1"
          label="支付宝账号"
          name="bankCard"
          required
        >
          <input
            v-model="formData.alipay"
            class="input"
            type="text"
            placeholder="请输入支付宝账号"
          />
        </uni-forms-item>
        <uni-forms-item label="预留手机号" name="phone" required>
          <input
            v-model="formData.phone"
            class="input"
            type="text"
            placeholder="需与开户预留号码一致"
          />
        </uni-forms-item>
        <view class="user-agreement">
          <uni-data-checkbox
            v-model="checked"
            class="485bf7"
            multiple
            :localdata="checkList"
            selected-color="#485bf7"
          />
          <text class="text">
            本人承诺已阅读并同意
            <text class="agreement" @click="handleToAgreement">
              《灵活用工平台综合服务协议》
            </text>
            和,
            <text class="agreement" @click="handleToAgreement">
              《电签服务协议》
            </text>
            本人按照协议内容向贵司提供相应服务.
          </text>
        </view>
        <button type="primary" @click="handleSubmit">提交</button>
      </uni-forms>
    </view>

    <!-- 选择银行卡弹窗 -->
    <Popup
      v-model:visible="visible"
      @confirm="handlePopupConfirm"
      @close="handlePopupClose"
    >
      <view class="popup-content">
        <view
          v-for="(item, index) in cardList"
          :key="item.name"
          class="card-list-item"
          :class="currentIndex === index ? 'card-list-item-active' : ''"
          @click="handleSelectBank(item, index)"
        >
          <image
            src="/static/image/bank-card.png"
            mode="aspectFill"
            class="image"
          />
          <text class="text">{{ item.name }}</text>
          <uni-icons
            v-if="currentIndex === index"
            type="checkmarkempty"
            size="20"
            color="#485bf7"
          />
        </view>
      </view>
    </Popup>

    <!-- 提交确认信息弹窗 -->
    <Dialog
      v-model="dialogVisible"
      has-close
      close-text="返回编辑"
      title="确认信息"
    >
      <view class="form-wrapper dialog-form-wrapper">
        <uni-forms
          ref="form"
          :model-value="formData"
          :rules="rules"
          :label-width="110"
        >
          <uni-forms-item label="真实姓名" name="name">
            <input
              v-model="formData.name"
              type="text"
              disabled
              placeholder="请输入真实姓名"
            />
          </uni-forms-item>
          <uni-forms-item label="身份证号" name="idCard">
            <input
              v-model="formData.idCard"
              class="input"
              type="idcard"
              disabled
              placeholder="请输入身份证号"
            />
          </uni-forms-item>
          <uni-forms-item
            v-if="state.tabIndex === 0"
            label="开户银行"
            name="bank"
          >
            <input
              v-model="formData.bank"
              placeholder="请选择开户银行"
              disabled
            />
          </uni-forms-item>
          <uni-forms-item
            v-if="state.tabIndex === 0"
            label="银行卡号"
            name="bankCard"
          >
            <input
              v-model="formData.bankCard"
              class="input"
              type="text"
              disabled
              placeholder="请输入银行卡号"
            />
          </uni-forms-item>
          <uni-forms-item
            v-if="state.tabIndex === 1"
            label="支付宝账号"
            name="bankCard"
          >
            <input
              v-model="formData.alipay"
              class="input"
              type="text"
              disabled
              placeholder="请输入支付宝账号"
            />
          </uni-forms-item>
          <uni-forms-item label="预留手机号" name="phone">
            <input
              v-model="formData.phone"
              class="input"
              disabled
              type="text"
              placeholder="需与开户预留号码一致"
            />
          </uni-forms-item>
        </uni-forms>
      </view>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, toRefs, reactive } from 'vue'
import NavBar from '@/components/NavBar'
import Describe from '@/components/Describe'
import Popup from '@/components/Popup'
import Dialog from '@/components/Dialog'
import TransitionTab from '@/components/TransitionTab'

const describeList = ref([
  {
    content:
      '为了您的资金安全，大额提现会通过第三方支付代发.请填写实名信息和银行卡进行验证由于银行限额,每人每月限额10万元,如需提现更多,您可以绑定亲属实名信息用于周转.'
  }
])
const form = ref()
const checkList = [{ value: true, text: '' }]
const cardList = ref(
  [...new Array(100)].map((item, index) => ({
    name: '建设银行' + index,
    value: `${index}`
  }))
)
const tabList = ref([
  {
    title: '银行卡号'
  },
  {
    title: '支付宝'
  }
])
const state = reactive({
  tabIndex: 0,
  currentIndex: '',
  currentItem: {},
  visible: false,
  dialogVisible: false,
  checked: [true],
  // 表单数据
  formData: {
    name: '',
    idCard: '',
    bank: '',
    bankCard: '',
    alipay: '',
    phone: ''
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
    },
    bank: {
      rules: [
        {
          required: true,
          errorMessage: '请选择银行'
        }
      ]
    },
    bankCard: {
      rules: [
        {
          required: true,
          errorMessage: '请输入银行卡号'
        }
      ]
    },
    alipay: {
      rules: [
        {
          required: true,
          errorMessage: '请输入支付宝账号'
        }
      ]
    },
    phone: {
      rules: [
        {
          required: true,
          errorMessage: '请输入手机号码'
        }
      ]
    }
  }
})
// 打开选择银行卡弹窗
const handleOpenPopup = () => {
  state.visible = true
}
// 选择银行卡
const handleSelectBank = (item, index) => {
  state.currentItem = item
  state.currentIndex = index
}
// 确认选择银行卡
const handlePopupConfirm = () => {
  state.formData.bank = state.currentItem.name
}
// 取消选择银行卡
const handlePopupClose = () => {
  state.formData.bank = ''
  state.currentIndex = ''
}
// 提交表单
const handleSubmit = async () => {
  await form.value.validate()
  state.dialogVisible = true
}
// 去协议页面
const handleToAgreement = () => {
  console.log('去协议页面')
}
const { formData, rules, checked, visible, dialogVisible, currentIndex } =
  toRefs(state)
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.bank-card {
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

    .user-agreement {
      margin-top: 32rpx;
      margin-bottom: 93rpx;

      :deep(.uni-data-checklist) {
        display: inline-block;
        vertical-align: middle;
      }
      :deep(.checklist-box) {
        margin: 0;
      }
      .text {
        font-size: $font-small;
        color: $font-color-sub;
        line-height: 40rpx;
        vertical-align: middle;
      }
      .agreement {
        color: $primary-color;
      }
    }
  }
  .dialog-form-wrapper {
    .uni-forms-item {
      padding: 10rpx 23rpx;
      margin: 23rpx 0;
      border-bottom: 0;
      background-color: $page-bg-color;
      border-radius: $border-radius;
    }
    :deep(.uni-forms-item__label) {
      .label-text {
        color: $font-color-sub;
        font-size: $font-middle;
      }
    }
    :deep(.uni-input-input) {
      color: #2466b7;
      text-align: right;
    }

    :deep(.uni-forms-item__inner) {
      justify-content: space-between;
    }
  }
  .popup-content {
    margin-top: $item-spacing;
    padding: $page-spacing;
    background-color: #fff;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
    .card-list-item {
      padding: $page-spacing 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid $divide-line-color;
      .image {
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
      }
      .text {
        display: inline-block;
        margin-left: 16rpx;
      }
    }
    .card-list-item-active {
      color: $primary-color;
      position: relative;
      .uni-icons {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
