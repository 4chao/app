<template>
  <!-- #ifdef H5 || APP-PLUS -->
  <div style="padding-top: var(--status-bar-height)"></div>
  <div
    fixed
    left-0
    flex-center
    z-100
    :style="{
      top: app.Global.systemInfo.statusBarHeight + 'px',
      paddingTop: '30rpx',
    }"
    @click="app.back"
  >
    <div w80 h80 flex-center>
      <div thin-500 bg-white rounded-full mlsm flex-center w60 h60>
        <div i-ri-arrow-left-s-line w40 h40></div>
      </div>
    </div>
  </div>
  <div class="title" text-40 leading-80 pt30 mxsm>
    <div inline-block w80></div>
    <slot />
  </div>
  <!-- #endif -->
  <!-- #ifndef H5 || APP-PLUS -->
  <div class="title" text-40 leading-80 pt30 mxsm>
    <slot />
  </div>
  <!-- #endif -->
</template>

<script setup lang="ts">
// import { useCreationStatus } from './CreationStatus'
// let {} = $(useCreationStatus())
</script>

<style lang="scss"></style>
