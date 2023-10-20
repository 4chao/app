<template>
  <meta hide />
  <div fixed :style="pdTop">用户中心</div>
  <Tabbar index="2"></Tabbar>
</template>

<script setup lang="ts">
let top = $computed(() => {
  const { navBarHeight } = app.Global
  console.log('打印的是navBarHeight' + navBarHeight)
  const { statusBarHeight } = app.Global.systemInfo
  console.log('打印的是statusBarHeight' + statusBarHeight)
  return statusBarHeight + uni.upx2px(30) + 'px'
})
let pdTop = $ref('top:' + top)
</script>

<style></style>
