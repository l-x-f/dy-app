<template>
  <div>
    <NavBar has-left />
    <web-view
      :webview-styles="state.webviewStyles"
      src="https://static-1252186245.cos.ap-nanjing.myqcloud.com/index.html"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import variables from 'variables'
import NavBar from '@/components/NavBar'

const { primaryColor } = variables

const state = reactive({
  webviewStyles: {
    progress: {
      color: primaryColor
    }
  }
})
</script>

<style lang="" scoped></style>
