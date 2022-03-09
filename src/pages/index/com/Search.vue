<template>
  <Sticker
    class="sticker"
    :style="{
      top: app.Global.systemInfo.statusBarHeight + 'px',
    }"
    :limit="[-app.Global.navBarHeight - app.Global.systemInfo.statusBarHeight, 0]"
    :focus="scrolling"
  >
    <div
      :style="{
        height: app.Global.navBarHeight + 'px',
        paddingRight: app.Global.capsuleWidth + 'px',
        marginRight: -app.Global.capsuleMarginRight + 'px',
      }"
      flex
    >
      <div h-full mxsm flex-grow flex-center>
        <u-input v-model="value" placeholder="请输入内容" border="surround"></u-input>
      </div>
    </div>
  </Sticker>
</template>

<script setup lang="ts">
  import Sticker from '@/components/Sticker.vue'
  import {} from '@/hooks'

  defineProps({
    scrolling: Boolean,
  })
  const value = inject('searchValue')
</script>

<style lang="scss"></style>
