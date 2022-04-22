<template>
  <meta hide />
  <sys :top="top">
    <template #fixed>
      <Search />
      <ArticleCreate />
    </template>
    <div ptsm></div>
    <!-- <u-input placeholder="输入baseUrl" v-model="app.User.baseUrl" /> -->
    <!-- <div ptsm></div> -->
    <ArticleCard v-for="i in 10" :key="i"></ArticleCard>
  </sys>
</template>

<script setup lang="ts">
import Search from './components/Search.vue'
import ArticleCreate from './components/ArticleCreate.vue'
import ArticleCard from './components/ArticleCard.vue'
import { useScroll } from '@/hooks'
useScroll(onPageScroll)
const scrolling = $ref(false)
const searchInfo = reactive({
  value: '',
  searched: '',
})
provide('searchInfo', searchInfo)

let top = $computed(() => {
  const { navBarHeight } = app.Global
  const { statusBarHeight } = app.Global.systemInfo
  return navBarHeight + statusBarHeight + uni.upx2px(30) + 'px'
})
// var top = $computed(() => th + 30)
</script>

<style lang="scss"></style>
