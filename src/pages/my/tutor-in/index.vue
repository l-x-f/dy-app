<template>
  <div class="tutor-in">
    <NavBar has-left />
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar'
</script>

<style lang="scss" scoped>
@import 'variables';
.tutor-in {
  box-sizing: border-box;
  padding: 0 $page-spacing $page-bottom;
  background-color: #fff;
}
</style>
