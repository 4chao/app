<template>
  <div class="droppable"></div>
</template>

<script setup lang="ts"></script>

<script module="render" lang="renderjs">
import { Droppable } from './DragManager'
export default {
  mounted() {
    console.log(this.$ownerInstance);
    new Droppable(this.$ownerInstance.$el)
  },
}
</script>

<style lang="scss" scoped>
.droppable {
  height: 30rpx;
  transition: 1s all cubic-bezier(0, 0.75, 0.25, 1);
  background-color: rgba(0, 0, 0, 0);
  &[data-active='true'] {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
