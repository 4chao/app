<template>
  <meta hide title="主页" title:微信="微信端主页" />
  <sys :top="top">
    <template #fixed>
      <Search />
      <!-- <Fab @click="log"></Fab> -->
    </template>
    <div ptsm></div>
    <div @click="app.to('login').then(() => $u.toast('登录成功'))">登录</div>
    <ArticleCard v-for="i in 10" :key="i"></ArticleCard>
  </sys>
</template>

<script setup lang="ts">
import Search from './components/Search.vue'
// import Fab from './components/Fab.vue'
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
