<template>
  <div class="find-page">
    <AppSection title="工具">
      <view class="utils-wrapper">
        <view
          v-for="item in utils"
          :key="item.text"
          :index="index"
          class="utils-item"
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
import AppSection from '@/components/AppSection'
const utils = [
  {
    text: '扫一扫',
    icon: 'scan'
  },
  {
    text: '口令',
    icon: 'search'
  },
  {
    text: '发现',
    icon: 'paperplane-filled'
  }
]
</script>

<style lang="scss" scoped>
.find-page {
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
