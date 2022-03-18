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
      @touchmove.stop.prevent
    >
      <div
        :style="{ height: open ? oHeight + 'px' : app.Global.navBarHeight + 'px' }"
        relative
        mxsm
        shadow-box
        pxsm
        flex
        flex-grow
        flex-col
      >
        <div :style="{ height: app.Global.navBarHeight + 'px' }" flex-center justify-start>
          <div flex-center>
            <image
              :style="{ height: navHpx(mp ? 0.5 : 0.6), width: navHpx(mp ? 0.5 : 0.6) }"
              class="smooth"
              src="http://q2.qlogo.cn/headimg_dl?dst_uin=2490445193&spec=100&v=0.5662477152747005"
              @click="profile = !profile"
              @touchstart="createTick"
              @touchmove="clearTick"
              @touchend="clearTick"
            ></image>
          </div>
          <div relative h-full flex-grow mxsm>
            <input
              v-model="dValue"
              class="ab"
              :class="{ hide: profile }"
              h-full
              w-full
              :placeholder="'搜索思潮'"
              :style="{ fontSize: navHpx(mp ? 0.35 : 0.3) }"
              @focus=";(bHeight = $event.detail['height']), (focus = true)"
            />
            <div class="ab" :class="{ hide: !profile }" flex items-center bg-white> 123 </div>
          </div>
          <div flex-center :style="{ fontSize: navHpx(mp ? 0.5 : 0.5) }">
            <div
              i-ri-close-fill
              class="x"
              :class="{ act: open || menu }"
              @click.prevent.stop="rightBtn"
            ></div>
          </div>
        </div>
        <div flex-grow relative overflow-hidden>
          <scroll-view scroll-y class="ab history" :class="{ hide: !focus }" @touchend.prevent>
            <!-- 搜索记录和推荐 -->
            <div py30>111111111111111111111</div>
            <div py30>111111111111111111111</div>
            <div py30>111111111111111111111</div>
            <div py30>111111111111111111111</div>
            <div py30>111111111111111111111</div>
            <div py30>111111111111111111111</div>
          </scroll-view>
          <scroll-view scroll-y class="ab profile" :class="{ hide: !profile }">
            <!-- 个人信息 -->
          </scroll-view>
        </div>
        <div
          shadow-box
          class="menu"
          :class="{ act: menu }"
          :style="{ right: app.Global.capsuleWidth && -app.Global.capsuleWidth + 10 + 'px' }"
        ></div>
      </div>
    </div>
  </Sticker>
  <div v-show="open || menu" class="mask" @click.stop="open = false" @touchmove.stop.prevent></div>
</template>

<script setup lang="ts">
  import Sticker from '@/components/Sticker.vue'
  import {} from '@/hooks'

  defineProps({
    scrolling: Boolean,
  })
  let { value, searched } = $(inject('searchInfo'))
  const dValue = computed({
    get: () => (open && !profile ? value || searched : searched),
    set: (val) => (value = val),
  })
  function navHpx(n) {
    return n * app.Global.navBarHeight + 'px'
  }

  var mp = true
  // #ifndef MP
  var mp = false
  // #endif

  let focus = $ref(false)
  let profile = $ref(false)
  let menu = $ref(false)
  let open = $computed({
    get: () => focus || profile,
    set: () => (focus = profile = menu = false),
  })
  watchEffect(() => profile && (focus = false))
  watch($$(open), () => (menu = false))
  function rightBtn() {
    if (menu == true) return (menu = false)
    if (!open) return (menu = true) //图标为 + , 未弹出 => 打开菜单
    if (profile) return (profile = false) // 图标为 x 关闭个人信息
    if (value) return (value = '') // 图标为 x 清空输入
    return (open = false) // 图标为 x 关闭弹窗
  }

  let bHeight = $ref(0)
  uni.onKeyboardHeightChange?.(({ height }) => {
    bHeight = height
    if (height) defaultHeight = oHeight as number
  })
  let defaultHeight = $ref(uni.upx2px(1000))
  let oHeight = $computed(() => {
    let height =
      app.Global.systemInfo.windowHeight -
        app.Global.systemInfo.statusBarHeight -
        bHeight -
        uni.upx2px(50) || defaultHeight
    return height > defaultHeight ? defaultHeight : height
  })

  let timer = null
  const createTick = () => (timer = setTimeout(toTest, 5000))
  const clearTick = () => clearTimeout(timer)
  const toTest = () => (uni.vibrateShort({}), app.to('test/index'))
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

  .ab {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 1;
    transition: opacity 0.3s ease;
    &.hide {
      pointer-events: none;
      opacity: 0;
    }
  }

  .menu {
    position: absolute;
    top: calc(100% - 60rpx);

    right: 0;
    width: 250rpx;
    height: 400rpx;
    opacity: 0;

    transition: all 0.3s ease;
    pointer-events: none;
    &.act {
      top: calc(100% + 20rpx);
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
  }
</style>
