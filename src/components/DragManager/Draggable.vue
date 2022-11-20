<template>
  <slot>
    <div flex-center w100 h100 bg-gray></div>
  </slot>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default {
  emits: ['onPanend'],
  mounted() {
    setTimeout(() => {
      let a = 'alert(window.aa)'
      // console.log(getCurrentPages().pop()['$getAppWebview']().evalJS(a))
    }, 1000)
  },
  methods: {
    onPanend(id: string) {
      this.$emit('onPanend', id)
    },
  },
}
</script>

<script module="render" lang="renderjs">
import { Draggable } from './DragManager'
export default {
  mounted() {
    window.aa = 11223344
    console.log(this.$ownerInstance);
    const dragger = new Draggable(this.$ownerInstance.$el)
    dragger.onPanend = (id) => this.$ownerInstance.callMethod('onPanend', id)
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
