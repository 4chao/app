<template>
  <div v-for="i in 4" :key="i" class="commentCard thin-500">
    <div h40 w40 bg-gray rounded-full mrxs></div>
    <div text-25 mb2>这是一条评论这是一条评论</div>
  </div>
</template>

<script setup lang="ts">
import {} from '@/hooks'
import { whenever } from '@vueuse/core'
import { useCreationStatus, Section } from './CreationStatus'
let { SectionActive } = $(useCreationStatus())

let section = $ref<Section>(null)
whenever<Section>($$(SectionActive) as any, val => (section = val))
</script>

<style lang="scss" scoped>
.commentCard {
  @apply pxs;
  @apply mbsm;
  @apply bg-white;
  @apply flex-center;
}
</style>
