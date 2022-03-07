<template>
  <meta hide title="主页" />
  <sys>
    <template #fixed>
      <Sticker
        class="sticker"
        :style="{ height: uni.upx2px(100) + 'px' }"
        :limit="[-uni.upx2px(100), 0]"
      >
        <div>搜索条</div>
      </Sticker>
    </template>
    <div :style="{ height: uni.upx2px(100) + 'px' }"></div>
    <div flex-center-col pt40>
      {{ title }}
    </div>
    <div flex-center-col pt40>
      {{ title }}
    </div>
    <div flex-center-col pt40>
      {{ title }}
    </div>
    <div flex-center-col pt40>
      {{ title }}
    </div>
    <div flex-center-col pt40>
      {{ title }}
    </div>
  </sys>
</template>

<script setup lang="ts">
  import Sticker from '@/components/Sticker.vue'
  import { useScroll } from '@/hooks'
  const title = $ref('Hello')
  useScroll(onPageScroll)
</script>

<style lang="scss">
  .sticker {
    position: fixed;
    //#ifdef H5
    top: var(--safe-area-inset-top);
    //#endif
    top: var(--status-bar-height);
    left: 0;
    right: 0;
    z-index: 900;
    height: 100rpx;
    background: #66ccff;
  }
</style>
