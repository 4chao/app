<script setup lang="ts">
async function init() {
  for (let i = 0; i < 3; i++) await Promise.wait(3000), app.Global.getSystemInfo()
}
onLaunch(() => {
  console.log('App Launch')
  init()
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
</script>
<style lang="scss">
// #ifndef APP-NVUE
@import 'uview-ui/index.scss';
@import '@/styles/color-ui.css';
@import '@/styles/index.scss';
// #endif
</style>
