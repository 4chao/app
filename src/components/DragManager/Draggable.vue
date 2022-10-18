<template>
  <slot>
    <div flex-center w100 h100 bg-gray></div>
  </slot>
</template>

<script setup lang="ts"></script>

<script module="render" lang="renderjs">
import { Draggable } from './DragManager'
export default {
  mounted() {
    console.log(this.$ownerInstance);
    new Draggable(this.$ownerInstance.$el)
  },
}
</script>

<style lang="scss">
.fab {
  position: fixed;
  width: 100rpx;
  height: 100rpx;
  right: 50rpx;
  bottom: 50rpx;
  box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.15);
  @apply bg-brand-pri text-white
  @apply rounded-full;
  @apply flex-center;
  z-index: 900;
}
</style>
