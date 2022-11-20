<template>
  <Draggable>
    <Fab></Fab>
  </Draggable>
  <div class="toolbar" :class="{ hide }">
    <div i-fluent-add-28-regular w70 h70 mx30></div>
    <div i-fluent-add-28-regular w70 h70 mx30></div>
    <div i-fluent-add-28-regular w70 h70 mx30></div>
  </div>
</template>

<script lang="ts" setup>
import Fab from './Fab.vue'
let hide = $ref(false)
</script>

<style lang="scss">
$zIndex: 900;

.toolbar {
  position: fixed;
  height: 100rpx;
  right: 180rpx;
  bottom: 50rpx;
  box-shadow: 0px 2px 50px 1px rgba(0, 0, 0, 0.07);
  background-color: #fff;
  @apply bg-white text-black;
  @apply rounded-full;
  @apply flex-center;
  z-index: $zIndex - 1;
  transition: opacity 0.3s ease-in-out;

  .hide {
    opacity: 0;
  }
}
</style>
