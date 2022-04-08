<template>
  <meta hide title="主页" title:微信="微信端主页" />
  <sys :top="top">
    <template #fixed>
      <Search :scrolling="scrolling"></Search>
      <Fab @click="log"></Fab>
    </template>
    <!-- #ifndef MP -->
    <div @touchstart="scrolling = true" @touchend="scrolling = false">
      <!-- #endif -->
      <div ptsm></div>
      <div v-for="i in 100" :key="i" mxsm mxy mbxl>
        <div psm shadow-box mbxs>
          <div text-xl>标题</div>
        </div>
        <div text-right>123</div>
      </div>
      <div @click="app.to('login')">登录</div>
      <!-- #ifndef MP -->
    </div>
    <!-- #endif -->
  </sys>
</template>

<script setup lang="ts">
import Search from './components/Search.vue'
import Fab from './components/Fab.vue'
import { useScroll } from '@/hooks'
const title = $ref('Hello')
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
