<template>
  <div class="fab" :class="{ hide }">
    <div i-ri-add-fill w57 h57></div>
  </div>
</template>

<script setup lang="ts">
import {} from '@/hooks'
import { throttle } from 'lodash'
let hide = $ref(false)
let scrollTop = $ref(0)
onPageScroll(throttle(e => (scrollTop = e.scrollTop), 100))
watch($$(scrollTop), (n, o) => (hide = n > o))
</script>

<style lang="scss">
.fab {
  position: fixed;
  right: 50rpx;
  bottom: 50rpx;
  width: 100rpx;
  height: 100rpx;
  background-color: #edf7ff;
  box-shadow: 0 2rpx 10rpx rgba(14, 53, 66, 0.2);
  @apply rounded-full;
  @apply flex-center;
  // @apply text-white;
  z-index: 900;
  transition: all 0.5s ease;

  &.hide {
    box-shadow: 0 0 0rpx rgba(0, 0, 0, 0.1);
    transform: rotate(225deg) scale(0);
  }
}
</style>
