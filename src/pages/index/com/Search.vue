<template>
  <Sticker
    class="sticker"
    :style="{
      top: app.Global.systemInfo.statusBarHeight + 'px',
    }"
    :limit="[-app.Global.navBarHeight - app.Global.systemInfo.statusBarHeight - uni.upx2px(30), 0]"
    :focus="scrolling"
  >
    <div
      :style="{
        height: app.Global.navBarHeight + 'px',
        marginRight: -app.Global.capsuleMarginRight + 'px',
        padding: mp ? '' : '20rpx 0 0 0',
        paddingRight: app.Global.capsuleWidth + 'px',
      }"
      flex
    >
      <div
        :style="{ height: open ? oHeight + 'px' : app.Global.navBarHeight + 'px' }"
        mxsm
        shadow-box
        pxsm
        flex-grow
      >
        <div :style="{ height: app.Global.navBarHeight + 'px' }" flex-center justify-start>
          <div flex-center>
            <image
              :style="{ height: navHpx(mp ? 0.5 : 0.6), width: navHpx(mp ? 0.5 : 0.6) }"
              class="smooth"
              src="http://q2.qlogo.cn/headimg_dl?dst_uin=2490445193&spec=100&v=0.5662477152747005"
            ></image>
          </div>

          <input
            v-model="value"
            h-full
            flex-grow
            mxsm
            placeholder="搜索思潮"
            :style="{ fontSize: navHpx(mp ? 0.35 : 0.3) }"
            @focus=";(bHeight = $event.detail['height']), (open = true)"
          />
          <div flex-center :style="{ fontSize: navHpx(mp ? 0.5 : 0.5) }">
            <div
              i-ri-close-fill
              class="x"
              :class="{ act: open }"
              @click.prevent.stop="
                () => (open ? (value ? (value = '') : (open = false)) : (menu = true))
              "
            ></div>
          </div>
        </div>
      </div>
    </div>
  </Sticker>
  <div v-show="open" class="mask" @click.stop="open = false"></div>
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

  let open = $ref(false)
  let bHeight = $ref(0)
  uni.onKeyboardHeightChange?.(({ height }) => {
    bHeight = height
  })
  let defaultHeight = $ref(uni.upx2px(10000))
  let oHeight = $computed(() => {
    let height =
      app.Global.systemInfo.windowHeight -
        app.Global.systemInfo.statusBarHeight -
        bHeight -
        uni.upx2px(50) || defaultHeight
    return height > defaultHeight ? defaultHeight : height
  })

  let menu = $ref(false)
</script>

<style lang="scss" scoped>
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 899;
    // background-color: rgba(0, 0, 0, 0.5);
  }
  .sticker {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 900;
  }
  .shadow-box,
  [data-shadow-box],
  [shadow-box] {
    transition: height 0.5s ease;
  }

  .x {
    transform: rotate(-45deg);
    transition: all 0.5s ease;

    &.act {
      transform: rotate(180deg);
    }
  }
</style>
