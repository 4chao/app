<template>
  <meta hide title="主页" />
  <sys>
    <template #fixed>
      <Search :scrolling="scrolling"></Search>
    </template>
    <div @touchstart="scrolling = true" @touchend="scrolling = false">
      <div
        :style="{ paddingTop: 'var(--status-bar-height)', height: app.Global.navBarHeight + 'px' }"
      ></div>
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
    </div>
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

<style lang="scss">
  .sticker {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 900;
  }
</style>
