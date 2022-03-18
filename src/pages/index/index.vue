<template>
  <meta hide title="主页" title:微信="微信端主页" />
  <sys :top="top">
    <template #fixed>
      <Search :scrolling="scrolling"></Search>
    </template>
    <!-- #ifndef MP -->
    <div @touchstart="scrolling = true" @touchend="scrolling = false">
      <!-- #endif -->
      <div ptlg></div>
      <div psm shadow-box mxsm mb4>123</div>
      <!-- #ifndef MP -->
    </div>
    <!-- #endif -->
  </sys>
</template>

<script setup lang="ts">
  import Search from './com/Search.vue'
  import { useScroll } from '@/hooks'
  const title = $ref('Hello')
  useScroll(onPageScroll)
  const scrolling = $ref(false)
  const searchInfo = reactive({
    value: '',
    searched: '',
  })
  provide('searchInfo', searchInfo)

  let th = $computed(() => {
    const { navBarHeight } = app.Global
    const { statusBarHeight, windowWidth } = app.Global.systemInfo
    return ((navBarHeight + statusBarHeight) * 750) / windowWidth
  })
  var top = $computed(() => th + 30)
</script>

<style lang="scss"></style>
