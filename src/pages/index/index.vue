<template>
  <meta hide bounce="false" />
  <sys :top="top">
    <div class="listbox" w-710 ml-20>
      <!-- <div v-show="laodingFlag" class="loading" fixed left-0 top-100 text-center mt-60>
        刷新......
      </div> -->
      <swiper class="swiper" w-full :vertical="true" :style="ctxHeight" bounce="none" :disable-touch="false" @change="changeFun">
        <swiper-item v-for="(item, i) in contextList.list" :key="i" relative @touchstart="touchStart($event)" @touchend="touchEnd($event)">
          <ContentTemplate :contextList="toJsonFun(item.contentText)" :titleFlag="true" :title="item.titleText"></ContentTemplate>
          <div
            class="foldbox"
            absolute
            bottom-0
            left-0
            w-full
            text-center
            h-170
            style="line-height: 170rpx"
            @click="toNodeDetails(item.titleUuid, item.contentUuid)"
          >
            查看更多
          </div>
        </swiper-item>
      </swiper>
    </div>
  </sys>
  <Tabbar :index="0"></Tabbar>
</template>

<script setup lang="ts">
let pxRpx = $ref(0)
let contextList = reactive({
  list: [],
})

let top = $computed(() => {
  const { statusBarHeight } = app.Global.systemInfo
  return statusBarHeight + 6 + 'px'
})

useScroll(onPageScroll)
  .onLoad(page => {})
  .onFetch(async page => {
    const data = await api.getPecommendation()
    contextList.list = data.recommendation
    page.endBySize(data.recommendation.length, 100, 1)
  })

onMounted(() => {
  const { windowWidth } = app.Global.systemInfo
  pxRpx = (750 * 1) / windowWidth
})

const getContentList = async () => {
  let data = await api.getPecommendation()
  contextList.list = data.recommendation
  laodingFlag = false
}

let ctxHeight = $computed(() => {
  const { statusBarHeight } = app.Global.systemInfo
  const { windowHeight } = app.Global.systemInfo
  return 'height:' + (windowHeight - statusBarHeight - 130 / pxRpx - 6) + 'px;'
})

const toNodeDetails = (titleId: string, contextId: string) => {
  app.to('/pages/nodeDetails/nodeDetails', {
    titleId: titleId,
    contextId: contextId,
  })
}

const toJsonFun = (str: string) => {
  return JSON.parse(str)
}
let currnetSwiper = $ref(0)
let y1 = $ref(0)
let y2 = $ref(0)
let laodingFlag = $ref(false)
const touchStart = event => {
  laodingFlag = true
  y1 = event.touches[0].clientY
}

const touchEnd = event => {
  if (currnetSwiper != 0) {
    return
  }
  y2 = event.changedTouches[0].clientY
  if (y2 > y1 + 80) {
    getContentList()
  }
}

const changeFun = event => {
  currnetSwiper = event.detail.current
}
</script>

<style lang="scss" scoped>
.listbox {
  .foldbox {
    background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  }
}
</style>
