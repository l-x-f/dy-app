<template>
  <div>{{ state.name }}</div>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({
  name: '首页'
})
</script>

<style lang="scss" scoped></style>
