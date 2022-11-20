<template>
  <div class="fab">
    <div i-fluent-add-28-regular w70 h70></div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
$zIndex: 900;

.fab {
  position: fixed;
  width: 100rpx;
  height: 100rpx;
  right: 50rpx;
  bottom: 50rpx;
  box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.15);
  @apply bg-brand-pri text-white;
  @apply rounded-full;
  @apply flex-center;
  z-index: $zIndex;
}
</style>
