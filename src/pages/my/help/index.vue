<template>
  <div class="help-page">
    <NavBar has-left />
    <HtmlParse :html="rich" />
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar'
import HtmlParse from '@/components/HtmlParse'

const rich = 'https://static-1252186245.cos.ap-nanjing.myqcloud.com/index.html'
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.help-page {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;
  background-color: #fff;
}
</style>
