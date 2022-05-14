<template>
  <!-- 本组件将由uni-provider插件自动混入到每一个页面中 -->
  <MescrollBody
    :up="{ use: enableUp, page: { num: -1, size: 10 } }"
    :down="{ use: enableDown }"
    :top="top"
    :bottom="bottom"
    safearea
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
  top: String,
  bottom: String,
})

const { id } = $(useQuery())

// 页面卸载,解绑回调事件
onUnload(() => uni.$off(id + '_resolve'))
onUnload(() => uni.$off(id + '_reject'))
onUnload(() => uni.$off(id + '_query'))

// mescroll 提供上拉加载下拉刷新能力
// 文档: https://www.mescroll.com/uni.html
const { mescroll, fetch, enable } = $(inject<Partial<ScrollOptions>>(ScrollSymbol, {}))
let enableUp = $computed(() => ['all', 'up'].some(e => e == enable))
let enableDown = $computed(() => ['all', 'down'].some(e => e == enable))
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style></style>
