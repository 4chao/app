<template>
  <Sticker
    class="sticker"
    :style="{
      top: app.Global.systemInfo.statusBarHeight + 'px',
    }"
    :limit="[-app.Global.navBarHeight - app.Global.systemInfo.statusBarHeight - uni.upx2px(10), 0]"
    :focus="scrolling"
  >
    <div
      :style="{
        height: app.Global.navBarHeight + 'px',
        marginRight: -app.Global.capsuleMarginRight + 'px',
        padding: mp ? '10rpx 0' : '20rpx 0 0 0',
        paddingRight: app.Global.capsuleWidth + 'px',
      }"
      flex
    >
      <div h-full mxsm flex-grow flex-center justify-start shadow-box pxsm>
        <div flex-center>
          <image
            :style="{ height: navHpx(mp ? 0.5 : 0.6), width: navHpx(mp ? 0.5 : 0.6) }"
            class="smooth"
            src="http://q2.qlogo.cn/headimg_dl?dst_uin=2490445193&spec=100&v=0.5662477152747005"
          ></image>
        </div>
        <input mxsm h-full placeholder="搜索思潮" />
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
  function navHpx(n) {
    return n * app.Global.navBarHeight + 'px'
  }

  var mp = true
  // #ifndef MP
  var mp = false
  // #endif
</script>

<style lang="scss" scoped></style>
