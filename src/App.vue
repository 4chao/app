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
    uni.setKeepScreenOn({ keepScreenOn: true })
  })
  onHide(() => {
    console.log('App Hide')
    uni.setKeepScreenOn({ keepScreenOn: false })
  })
</script>
<style lang="scss">
  @import '@/styles/color-ui.css';
  @import 'uview-ui/index.scss';
  @import '@/style/index.scss';
</style>
