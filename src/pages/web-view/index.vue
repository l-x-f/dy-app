<template>
  <div>
    <web-view
      :webview-styles="state.webviewStyles"
      src="https://static-1252186245.cos.ap-nanjing.myqcloud.com/index.html"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({
  webviewStyles: {
    progress: {
      color: '#FF3333'
    }
  }
})
</script>

<style lang="" scoped></style>
