<template>
  <div class="droppable" :data-id="id" relative>
    <slot>
      <div h30></div>
    </slot>
    <div contents class="normal"><slot name="normal"></slot></div>
    <div contents class="active"><slot name="active"></slot></div>
  </div>
</template>

<script setup lang="ts">
const { id = 'unknown' } = defineProps<{
  id?: string
}>()

// #ifdef never
var render
// #endif
</script>

<script module="render" lang="renderjs">
import { Droppable } from './DragManager'
export default {
  mounted() {
    console.log(this.$ownerInstance);
    new Droppable(this.$ownerInstance.$el)
  },
  methods: {
    getId(...args) {
      console.log(args);
    }
  }
}
</script>

<style lang="scss" scoped>
.droppable {
  transition: 0.5s all cubic-bezier(0, 0.75, 0.25, 1);
  background-color: rgba(0, 0, 0, 0);
  &[data-active='true'] {
    background-color: rgba(0, 0, 0, 0.05);
    .normal {
      display: none;
    }
  }
  &:not([data-active='true']) {
    .active {
      display: none;
    }
  }
}
</style>
