<template>
  <div class="index-page">
    <view>
      <AppSwiper :list="bannerList" />
    </view>

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

    <AppSection title="导师专栏">
      <uni-list :border="true">
        <uni-list-chat
          v-for="(item, index) in 3"
          :key="index"
          title="导师"
          avatar="https://img.36krcdn.com/20200406/v2_d2c6a686b4074a1eb43603e67d6ba204_img_png"
          note="您收到一条新的消息"
          time="2020-02-02 20:20"
        />
      </uni-list>
    </AppSection>

    <AppSection title="最新发现">
      <uni-list :border="true">
        <uni-list-chat
          v-for="(item, index) in 3"
          :key="index"
          title="发现"
          avatar="https://img.36krcdn.com/20200410/v2_747fc8a18fde4da4b1ba1080d8e6aa04_img_000"
          note="您收到一条新的消息"
          time="2020-02-02 20:20"
        />
      </uni-list>
    </AppSection>

    <AppSection title="话题排行">
      <uni-list :border="true">
        <uni-list-chat
          v-for="(item, index) in 3"
          :key="index"
          title="话题"
          avatar="https://img.36krcdn.com/20200410/v2_6905947498bc4ec0af228afed409f771_img_png?x-oss-process=image/resize,m_mfit,w_520,h_300/crop,w_520,h_300,g_center"
          note="您收到一条新的消息"
          time="2020-02-02 20:20"
        />
      </uni-list>
    </AppSection>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import AppSwiper from '@/components/AppSwiper'
import AppSection from '@/components/AppSection'
// import ScanCode from '@/components/ScanCode'

import { scanCode } from '@/utils/uniUtils'

const state = reactive({
  result: ''
})

/**
 * 扫码
 */
const scan = async () => {
  state.result = await scanCode()
}

const data = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
]
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

const bannerList = data.map(item => ({ img: item }))
</script>

<style lang="scss" scoped>
.index-page {
  box-sizing: border-box;
  padding-bottom: 100px;
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
