<template>
  <Draggable>
    <div class="fab">
      <div i-fluent-add-28-regular w70 h70></div>
    </div>
  </Draggable>
  <div class="toolbar" :class="{ hide }">
    <div i-fluent-add-28-regular w70 h70 mx30></div>
    <div i-fluent-add-28-regular w70 h70 mx30></div>
    <div i-fluent-add-28-regular w70 h70 mx30></div>
  </div>
</template>

<script lang="ts" setup>
let hide = $ref(false)
</script>

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
