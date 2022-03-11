<template>
  <!-- 本组件将由uni-provider插件自动混入到每一个页面中 -->
  <MescrollBody
    :up="{ use: enableUp }"
    :down="{ use: enableDown }"
    :top="top"
    @init="mescroll = $event"
    @up="fetch"
    @down="enableUp ? $event.resetUpScroll() : fetch($event)"
  >
    <slot></slot>
  </MescrollBody>
  <slot name="fixed"></slot>
  <!-- #ifndef MP -->
  <Paint></Paint>
  <!-- #endif -->
</template>

<script setup lang="ts">
  import MescrollBody from 'mescroll-uni/mescroll-body.vue'
  // #ifndef MP
  import Paint from '@/components/Paint.vue'
  // #endif
  import { useQuery, ScrollSymbol, ScrollOptions } from '@/hooks'

  defineProps({
    top: Number,
  })

  const { t } = $(useQuery())
  onUnload(() => uni.$off(t)) // 页面卸载,解绑回调事件
  const Scroll = inject<ScrollOptions>(ScrollSymbol) || ({} as ScrollOptions)
  const { mescroll, fetch, enable } = $(Scroll)
  let enableUp = $computed(() => ['all', 'up'].some((e) => e == enable)) // 开启上拉加载
  let enableDown = $computed(() => ['all', 'down'].some((e) => e == enable)) // 开启下拉刷新

  // #ifdef never
  let render
  // #endif
</script>

<style></style>
