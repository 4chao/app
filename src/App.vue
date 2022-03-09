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
  })
  onHide(() => {
    console.log('App Hide')
  })
</script>
<style lang="scss">
  @import 'uview-ui/index.scss';
  page {
    --safe-area-inset-top: 0px;
    --safe-area-inset-right: 0px;
    --safe-area-inset-bottom: 0px;
    --safe-area-inset-left: 0px;
  }

  @supports (top: constant(safe-area-inset-top)) {
    page {
      --safe-area-inset-top: constant(safe-area-inset-top);
      --safe-area-inset-right: constant(safe-area-inset-right);
      --safe-area-inset-bottom: constant(safe-area-inset-bottom);
      --safe-area-inset-left: constant(safe-area-inset-left);
    }
  }

  @supports (top: env(safe-area-inset-top)) {
    page {
      --safe-area-inset-top: env(safe-area-inset-top);
      --safe-area-inset-right: env(safe-area-inset-right);
      --safe-area-inset-bottom: env(safe-area-inset-bottom);
      --safe-area-inset-left: env(safe-area-inset-left);
    }
  }
</style>
