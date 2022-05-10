<template>
  <div class="help-page">
    <NavBar has-left />
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar'
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.help-page {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;
  background-color: #fff;
  height: 100vh;
  overflow: hidden;
}
</style>
