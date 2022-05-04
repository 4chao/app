<template>
  <u-popup :show="show" mode="center" @close="show = false" @touchmove.stop.prevent>
    <div class="content">
      <text>人生若只如初见，何事秋风悲画扇</text>
    </div>
  </u-popup>
</template>

<script setup lang="ts">
import {} from '@/hooks'
let show = $ref(false)
onBackPress(({ from }) => {
  if (from !== 'backbutton') return
  if (!show) return
  show = false
  return true
})
</script>

<style lang="scss" scoped></style>
