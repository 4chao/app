<template>
  <div class="FloatCard thin" flex-center :class="{ show: SectionActive }" @touchmove.stop.prevent>
    <div absolute left-0 right-0 top-0 flex-center pyxs @click="SectionActive = null">
      <div w40 h40 transform-scale-x-200 op-70 i-ri-arrow-down-s-line></div>
    </div>
    <div absolute left-0 bottom-full>
      <FloatComment />
    </div>
    <!-- <div mt flex-center-col text-50>
      <div flex-1 pxsm>
        <div i-ri-arrow-up-s-line></div>
      </div>
      <div flex-1 pxsm>
        <div i-ri-arrow-down-s-line></div>
      </div>
    </div> -->
    <div class="item">
      <div i-ri-heart-3-line></div>
      喜欢
    </div>
    <div class="item">
      <div i-ri-star-line></div>
      收藏
    </div>
    <div class="item">
      <div i-ri-pencil-ruler-line></div>
      编辑
    </div>
    <div class="item">
      <div i-ri-share-box-line></div>
      分享
    </div>
    <div class="item">
      <div i-ri-message-line></div>
      评论
    </div>
  </div>
</template>

<script setup lang="ts">
import FloatComment from './FloatComment.vue'
import { useCreationStatus } from './CreationStatus'
let { SectionActive } = $(useCreationStatus())
</script>

<style lang="scss">
.FloatCard {
  position: fixed;
  bottom: 30rpx;
  left: 30rpx;
  right: 30rpx;
  height: 200rpx;
  background: #fff;
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  transform: translateY(30%);
  transition: all 0.2s;
  &.show {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  overflow: visible;

  > .item {
    @apply flex-1;
    @apply flex-center-col;
    @apply text-20;
    @apply text-gray;
    @apply mt;
    > div,
    > view {
      @apply text-50;
      @apply mbxs;
      color: #000;
    }
  }
}
</style>
