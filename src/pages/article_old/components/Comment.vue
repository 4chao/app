<template>
  <uni-popup ref="popup" type="bottom" @maskClick="CommentShow = false">
    <div class="content">
      <text>人生若只如初见，何事秋风悲画扇</text>
    </div>
  </uni-popup>
</template>

<script setup lang="ts">
import { useCreationStatus } from './CreationStatus'
let { CommentShow } = $(useCreationStatus())

let popup = $ref(null)

watch($$(CommentShow), () => popup[CommentShow ? 'open' : 'close']())

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
  background: white;
  border-radius: 10rpx 10rpx 0 0;
}
</style>
