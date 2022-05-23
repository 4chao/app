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
      <div shadow-box class="menubar" :class="{ act: menu }" :style="{ right: mp ? '40rpx' : '20rpx' }">
        <view @click="app.to('#article/new')">
          <view i-ri-ball-pen-line></view>
          新的创作
        </view>
        <view>
          <view i-ri-qr-scan-2-line></view>
          扫一扫
        </view>
      </div>
      <div :style="{ height: oHeight + 'px' }" relative flex flex-grow flex-col pointer-events-none>
        <div
          shadow-box
          pointer-events-auto
          mxsm
          pxsm
          flex-center
          justify-start
          :style="{ height: app.Global.navBarHeight + 'px' }"
          class="wave"
          :class="{ active: open }"
        >
          <div flex-center @longpress="app.to('#test')">
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
              @click="app.to('#user/login').then(msg => msg && app.toast(msg))"
            >
              登录
            </div>
          </div>
          <div relative h-full flex-grow mxsm>
            <input
              v-model="dValue"
              class="ab"
              :class="{ hide: profile }"
              auto-blur
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
                  <!-- <div>徽章</div> -->
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
                @click="app.to('#user/setting').then(msg => msg && app.toast(msg))"
              >
                <div i-ri-settings-2-line></div>
              </div>
            </div>
          </div>
          <div flex-center :style="{ fontSize: navHpx(mp ? 0.5 : 0.5) }">
            <div i-ri-close-fill class="x" :class="{ act: open || menu }" @click.prevent.stop="rightBtn"></div>
          </div>
        </div>
        <div flex-grow relative pointer-events-none>
          <scroll-view scroll-y class="ab history shadow-box" :class="{ hide: !focus }" @touchend.prevent>
            <!-- 搜索记录和推荐 -->
            <div py30>111111111111111111111</div>
            <div py30>111111111111111111111</div>
            <div py30>111111111111111111111</div>
            <div py30>111111111111111111111</div>
            <div py30>111111111111111111111</div>
            <div py30>111111111111111111111</div>
          </scroll-view>
          <div class="ab profile" :class="{ hide: !profile }">
            <div class="lay" flex h600 mbsm>
              <div shadow-box h-full w400>TODO:个人卡片</div>
              <div class="lay" h-full psm>
                <div>TODO:历史记录,个人收藏等私密信息</div>
              </div>
            </div>
            <div shadow-box mbsm pylg flex-center justify-around text-25>
              <!-- <div border border-dashed mbsm pylg flex-center justify-around> -->
              <div flex-center-col>
                <div w40 h40 mbxs i-ri-chat-heart-line></div>
                回复我的
              </div>
              <div flex-center-col>
                <div w40 h40 mbxs i-ri-thumb-up-line></div>
                收到的赞
              </div>
              <div flex-center-col>
                <div w40 h40 mbxs i-ri-mail-line></div>
                我的私信
              </div>
              <div flex-center-col>
                <div w40 h40 mbxs i-ri-notification-4-line></div>
                系统通知
              </div>
            </div>
            <ArticleCardRecentlyEdited></ArticleCardRecentlyEdited>
            <!-- <div flex-center class="rowFn">
              <div
                v-for="e in rowFn.map(e => e.split('|'))"
                flex-1
                flex-center-col
                pysm
                class="wave click"
              >
                <div text-24>{{ e[0] }}</div>
                <div text-22>123</div>
              </div>
            </div>
            <div msm text-right text-20 text-gray fira>个人主页 -></div> -->

            <!-- <scroll-view scroll-x enable-flex class="rowProj">
              <div flex>
                <div fira>&#xEE03;&#xEE04;&#xEE04;&#xEE04;&#xEE01;&#xEE02;</div>
                <div bg-green mxy p40></div>
                <div bg-green mxy p40></div>
                <div bg-green mxy p40></div>
                <div bg-green mxy p40></div>
                <div bg-green mxy p40></div>
                <div bg-green mxy p40></div>
                <div bg-green mxy p40></div>
                <div bg-green mxy p40></div>
                <div bg-green mxy p40></div>
                <div bg-green mxy p40></div>
                <div bg-green mxy p40></div>
                <div bg-green mxy p40></div>
              </div>
            </scroll-view> -->

            <!-- <div absolute top-full left-0 right-0 text-18 ptxs flex-center text-gray-6 fira>
              <div>2022-04-15 加入思潮</div>
              <div flex-1></div>
              <div>v0.0.34:65335</div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </Sticker>
  <div class="mask" :class="{ show: open || menu }" @click.stop="open = false" @touchmove.stop.prevent></div>
  <div id="renderHelper" :data-open="open || menu"></div>
</template>

<script setup lang="ts">
import Sticker from '@/components/Sticker.vue'
import ArticleCardRecentlyEdited from './ArticleCardRecentlyEdited.vue'

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

onBackPress(({ from }) => {
  if (from !== 'backbutton') return
  if (!open) return
  open = false
  return true
})

let focus = $ref(false)
let profile = $ref(false)
let menu = $ref(true)
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
  let height = app.Global.systemInfo.windowHeight - app.Global.systemInfo.statusBarHeight - bHeight - uni.upx2px(50) || defaultHeight
  return height > defaultHeight ? defaultHeight : height
})
</script>

<script module="renderBiz" lang="renderjs">
export default {
  mounted() {
    let el = document.querySelector('.mescroll-body')
    let elc = document.querySelector('#articles')
    let helper = document.querySelector('#renderHelper')
    el['style'].transition = 'transform 1s cubic-bezier(0,.63,.27,1)'
    elc['style'].transition = 'transform 1s'
    elc['style'].transform = 'translate(0,0)'
    let a = { xAxis: 0, yAxis: 0 }
    // #ifdef APP-PLUS
    plus.accelerometer.watchAcceleration(setValue, (e) => console.log('watchAcceleration error: ', e), { frequency: 100 });
    // #endif
    function setValue(e) {
      if (e.xAxis) a = e
      el['style'].transformOrigin = 'center ' + (document.documentElement.scrollTop + document.documentElement.clientHeight / 2) + 'px'
      if (helper['dataset'].open == 'true') {
        el['style'].transform = 'scale(0.9)'
        elc['style'].transform = 'translate(' + +a.xAxis.toFixed(3) * 5 + 'px,' + -a.yAxis.toFixed(3) * 5 + 'px)'
      } else {
        el['style'].transform = 'scale(1)'
        elc['style'].transform = 'translate(0,0)'
      }
    }
    new MutationObserver(setValue).observe(helper, { attributes: true })
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
  backdrop-filter: blur(20rpx);
  background-color: rgba(255, 255, 255, 0.7);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;

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

  transition: opacity 0.3s ease;

  pointer-events: none;
  opacity: 0;

  &:not(.hide) {
    pointer-events: auto;
    opacity: 1;

    &.profile {
      pointer-events: none !important;

      :not(.lay) {
        pointer-events: auto !important;
      }
    }
  }
}

.history,
.profile {
  top: 20rpx;
  left: 20rpx;
  width: calc(750rpx - 40rpx);
  // border: #586270 1rpx solid;
  // border-radius: 10rpx;
}

.menubar {
  position: absolute;
  top: calc(100% - 60rpx);

  right: 20rpx;
  width: 300rpx;
  opacity: 0;

  transition: all 0.3s ease;
  pointer-events: none;
  padding: 10rpx 30rpx;
  font-size: 30rpx;

  > view {
    padding: 30rpx 10rpx;
    display: flex;
    align-items: center;

    > view {
      font-size: 40rpx;
      margin-right: 10rpx;
    }

    + view {
      border-top: #90a7be 1rpx solid;
    }
  }

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

.rowFn {
  > div + div {
    position: relative;

    //left border
    &::before {
      content: '';
      position: absolute;
      top: 35rpx;
      bottom: 35rpx;
      left: 0rpx;
      width: 0.5rpx;
      background-color: #90a7be;
      // opacity: 0.5;
    }
  }
}

.rowProj {
  display: flex;
}
</style>
