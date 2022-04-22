<template>
  <u-popup :show="CommentShow" :round="10" @close="CommentShow = false" @touchmove.stop.prevent>
    <div class="content">
      <text>人生若只如初见，何事秋风悲画扇</text>
    </div>
  </u-popup>
</template>

<script setup lang="ts">
import {} from '@/hooks'
import { useCreationStatus } from './CreationStatus'
let { CommentShow } = $(useCreationStatus())

onBackPress(({ from }) => {
  if (from !== 'backbutton') return
  if (!CommentShow) return
  CommentShow = false
  return true
})
</script>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 300rpx);
}
</style>
