<template>
  <meta hide title="主页" />
  <sys :top="app.Global.navBarHeight * 2 + app.Global.systemInfo.statusBarHeight">
    <template #fixed>
      <Search :scrolling="scrolling"></Search>
    </template>
    <!-- #ifndef MP -->
    <div @touchstart="scrolling = true" @touchend="scrolling = false">
      <!-- #endif -->
      <div flex-center-col pt40>
        {{ searchValue }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
      <div flex-center-col pt40>
        {{ title }}
      </div>
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
  const searchValue = $ref('123')
  provide('searchValue', $$(searchValue))
</script>

<style lang="scss"></style>
