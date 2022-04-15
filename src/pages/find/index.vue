<template>
  <div class="find-page">
    <AppSection title="工具">
      <view class="utils-wrapper">
        <view
          v-for="item in utils"
          :key="item.text"
          class="utils-item"
          @click="item.on"
        >
          <view class="grid-item-box" style="background-color: #fff">
            <uni-icons :type="item.icon" :size="30" color="#777" />
            <text class="text">
              {{ item.text }}
            </text>
          </view>
        </view>
      </view>
    </AppSection>

    <AppSection title="发现">
      <uni-list :border="true">
        <uni-list-chat
          v-for="(item, index) in state.count"
          :key="index"
          title="发现"
          avatar="https://img.36krcdn.com/20200410/v2_6905947498bc4ec0af228afed409f771_img_png?x-oss-process=image/resize,m_mfit,w_520,h_300/crop,w_520,h_300,g_center"
          note="您收到一条新的消息"
          time="2020-02-02 20:20"
        />
      </uni-list>
    </AppSection>

    <uni-load-more :status="state.status" />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import AppSection from '@/components/AppSection'

import { scanCode } from '@/utils/uniUtils'

const statusMap = {
  more: 'more',
  noMore: 'noMore',
  loading: 'loading'
}
const state = reactive({
  result: '',
  count: 10,
  status: statusMap.more
})

/**
 * 扫码
 */
const scan = async () => {
  state.result = await scanCode()
  uni.showToast({
    title: '扫码成功,扫码结果为: ' + state.result,
    duration: 3000,
    icon: 'none'
  })
}

const utils = [
  {
    text: '扫一扫',
    icon: 'scan',
    on: scan
  },
  {
    text: '口令',
    icon: 'search',
    on: scan
  },
  {
    text: '发现',
    icon: 'paperplane-filled',
    on: scan
  }
]

onPullDownRefresh(() => {
  uni.showToast({
    title: '刷新成功',
    icon: 'success'
  })
  uni.stopPullDownRefresh()
})

onReachBottom(() => {
  state.status = statusMap.loading
  setTimeout(() => {
    state.count += 10
    uni.showToast({
      title: '加载成功',
      icon: 'success'
    })
  }, 1500)
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.find-page {
  padding-bottom: $page-bottom;
  .utils-wrapper {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .utils-item {
      width: 30%;
      height: 80px;
      .grid-item-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
    }
  }
}
</style>
