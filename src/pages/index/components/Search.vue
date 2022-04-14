<template>
  <Sticker
    class="sticker"
    :style="{ top: app.Global.systemInfo.statusBarHeight + 'px' }"
    :back="-app.Global.navBarHeight - app.Global.systemInfo.statusBarHeight - pa"
  >
    <div
      :style="{
        height: app.Global.navBarHeight + 'px',
        marginRight: -app.Global.capsuleMarginRight + 'px',
        padding: mp ? '' : '20rpx 0 0 0',
        paddingRight: app.Global.capsuleWidth + 'px',
      }"
      relative
      flex
      @touchmove.stop.prevent
    >
      <div
        shadow-box
        class="menu"
        :class="{ act: menu }"
        :style="{ right: mp ? '40rpx' : '20rpx' }"
      ></div>
      <div :style="{ height: oHeight + 'px' }" relative flex flex-grow flex-col pointer-events-none>
        <div
          shadow-box
          pointer-events-auto
          mxsm
          pxsm
          :style="{ height: app.Global.navBarHeight + 'px' }"
          flex-center
          justify-start
        >
          <div flex-center @touchstart="createTick" @touchmove="clearTick" @touchend="clearTick">
            <image
              v-show="app.User.isLogin"
              :style="{ height: navHpx(mp ? 0.6 : 0.6), width: navHpx(mp ? 0.6 : 0.6) }"
              class="smooth"
              src="https://q2.qlogo.cn/headimg_dl?dst_uin=2490445193&spec=100&v=0.5662477152747005"
              @click="profile = !profile"
            ></image>
            <div
              v-show="!app.User.isLogin"
              :style="{ height: navHpx(mp ? 0.6 : 0.6), width: navHpx(mp ? 0.6 : 0.6) }"
              class="smooth login-btn"
              flex-center
              text-20
              font-bold
              text-white
              @click="app.to('login').then(msg => msg && $u.toast(msg))"
            >
              登录
            </div>
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
            <div class="ab" :class="{ hide: !profile }" flex-center bg-white>
              <div flex-1 flex flex-col justify-center>
                <div flex items-center>
                  <span text-38 mrxs>{{ app.User.userInfo.username }}</span>
                  <span text-20 text-gray self-end pb4>#{{ app.User.userInfo.id }}</span>
                  <div flex-1></div>
                  <!-- TODO: 上线前搞个内测徽章 -->
                  <div>徽章</div>
                </div>
                <div flex items-center text-24 text-gray-500>
                  <div i-ri-edit-2-fill mrxs shrink-0></div>
                  <div v-if="app.User.userInfo.signature == '$Default'">点此设置签名...</div>
                  <div v-else line-clamp-1 break-all>
                    {{ app.User.userInfo.signature }}
                  </div>
                </div>
              </div>
              <div style="height: 60%" w-1px mlsm mrxs bg-gray-200></div>
              <div
                flex-center
                mlsm
                :style="{ fontSize: navHpx(mp ? 0.35 : 0.35) }"
                @click="app.to('setting')"
              >
                <div i-ri-settings-2-line></div>
              </div>
            </div>
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
        <div flex-grow relative pointer-events-none>
          <scroll-view
            scroll-y
            class="ab history"
            :class="{ hide: !focus }"
            border-1
            @touchend.prevent
          >
            <!-- 搜索记录和推荐 -->
            <div py30>111111111111111111111</div>
            <div py30>111111111111111111111</div>
            <div py30>111111111111111111111</div>
            <div py30>111111111111111111111</div>
            <div py30>111111111111111111111</div>
            <div py30>111111111111111111111</div>
          </scroll-view>
          <div
            class="ab profile"
            :class="{ hide: !profile }"
            :style="{ height: profileHeight + 'px' }"
            fira
            border-1
          >
            <div>&#xEE03;&#xEE04;&#xEE04;&#xEE04;&#xEE01;&#xEE02;</div>
          </div>
        </div>
      </div>
    </div>
  </Sticker>
  <div
    class="mask"
    :class="{ show: open || menu }"
    @click.stop="open = false"
    @touchmove.stop.prevent
  ></div>
  <div id="renderHelper" :data-open="open || menu"></div>
</template>

<script setup lang="ts">
import Sticker from '@/components/Sticker.vue'
import {} from '@/hooks'

let { value, searched } = $(inject('searchInfo'))
const dValue = computed({
  get: () => (open && !profile ? value || searched : searched),
  set: val => (value = val),
})
function navHpx(n) {
  return n * app.Global.navBarHeight + 'px'
}

let pa = uni.upx2px(30)

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
let profileHeight = $ref(uni.upx2px(500))
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
const toTest = () => (uni.vibrateShort({}), app.to('#test'))

// #ifdef never
let renderBiz: any
// #endif
</script>

<script module="renderBiz" lang="renderjs">
export default {
  mounted() {
    let el = document.querySelector('.mescroll-body')
    // let mask = document.querySelector('.mask')
    el['style'].transition = 'transform 0.3s'
    // mask['style'].transition = 'backdrop-filter 0.3s'
    new MutationObserver(([{target}])=>{
      if(target['dataset'].open == 'true') {
        // mask['style'].backdropFilter = 'blur(0.94rem) opacity(1)'
        el['style'].transform = 'scale(0.9)'
        el['style'].transformOrigin = 'center ' + (document.documentElement.scrollTop + document.documentElement.clientHeight / 2) + 'px'
      } else {
        // mask['style'].backdropFilter = 'blur(0.94rem) opacity(0)'
        el['style'].transform = 'none'
        el['style'].transformOrigin = 'center ' + (document.documentElement.scrollTop + document.documentElement.clientHeight / 2) + 'px'
      }
    }).observe(document.querySelector('#renderHelper'), {
      attributes: true,
    })
  },
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: -200px;
  right: 0;
  bottom: 0;
  z-index: 899;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.5);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;

  &.show {
    opacity: 1;
    pointer-events: auto;
  }
}

.sticker {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 900;
}
// .shadow-box,
// [data-shadow-box],
// [shadow-box] {
//   transition: height 0.5s ease;
// }

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
  pointer-events: auto;
  &.hide {
    pointer-events: none;
    opacity: 0;
  }
}

.history,
.profile {
  top: 20rpx;
  left: 20rpx;
  width: calc(750rpx - 40rpx);
}

.menu {
  position: absolute;
  top: calc(100% - 60rpx);

  right: 20rpx;
  width: 250rpx;
  height: 400rpx;
  opacity: 0;

  transition: all 0.3s ease;
  pointer-events: none;
  &.act {
    top: calc(100% + 40rpx);
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
}
.login-btn {
  background-image: linear-gradient(to top, #18b471 0%, #4ccfa6 100%);
}
</style>
