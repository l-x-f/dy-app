<template>
  <div class="component-html-parse">
    <rich-text :nodes="state.content" />
  </div>
</template>

<script setup>
import { watch, reactive } from 'vue'
import { uniRequest } from '@/utils/uniUtils'

const props = defineProps({
  html: {
    type: String,
    default: ''
  }
})

const state = reactive({ content: '' })

const getHtml = async html => {
  if (typeof html === 'string' && html.endsWith('.html')) {
    try {
      const { data } = await uniRequest({ url: html, method: 'get' })
      state.content = data
    } catch (error) {
      state.content = 'serverError'
    }
  } else {
    state.content = html
  }
}

watch(
  () => props.html,
  val => {
    val && getHtml(val)
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss">
.html-parse {
  user-select: text;
  padding-top: 10rpx;
  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }
  strong {
    font-weight: bold;
  }
}
</style>
