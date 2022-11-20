<template>
  <FooterBase>
    <div class="footer" flex-center wfull hfull>
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
      <div class="item" @click="CommentShow = true">
        <div i-ri-message-line></div>
        评论
      </div>
    </div>
  </FooterBase>
</template>

<script setup lang="ts">
import FooterBase from './FooterBase.vue'
import { useCreationStatus } from './CreationStatus'
let { CommentShow } = $(useCreationStatus())
</script>

<style lang="scss" scoped>
.footer {
  .item {
    @apply flex-1;
    @apply flex-center-col;
    @apply text-20;
    @apply text-gray;
    > div,
    > view {
      @apply text-45;
      color: #000;
    }
  }
}
</style>
