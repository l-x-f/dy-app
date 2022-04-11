<template>
  <div>{{ state.name }}</div>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({
  name: '关注'
})
</script>

<style lang="scss" scoped></style>
