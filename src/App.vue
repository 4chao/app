<script setup lang="ts">
async function init() {
  await Promise.wait(3000)
  app.Global.getSystemInfo()
}
onLaunch(() => {
  init()
  console.log('App Launch')
})

onShow(() => {
  console.log('App Show')
  // #ifdef APP-PLUS
  uni.setKeepScreenOn({ keepScreenOn: true })
  // #endif
})
onHide(() => {
  console.log('App Hide')
  // #ifdef APP-PLUS
  uni.setKeepScreenOn({ keepScreenOn: false })
  // #endif
})
console.log(__filename)
</script>
<style lang="scss">
// #ifndef APP-NVUE
@import '@/styles/color-ui.css';
@import '@/styles/index.scss';
// #endif
</style>
