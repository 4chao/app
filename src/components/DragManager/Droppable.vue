<template>
  <div class="droppable">
    <slot>
      <div h30></div>
    </slot>
  </div>
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
  transition: 0.5s all cubic-bezier(0, 0.75, 0.25, 1);
  background-color: rgba(0, 0, 0, 0);
  &[data-active='true'] {
    background-color: rgba(0, 0, 0, 0.05);
  }
}
</style>
