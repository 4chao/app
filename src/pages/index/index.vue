<template>
  <meta hide />
  <sys :top="top">
    <div class="listbox" w-710 ml-20>
      <swiper class="swiper" w-full :vertical="true" :style="ctxHeight">
        <swiper-item v-for="(item, i) in contextList.list" :key="i" relative>
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
let list = reactive({ list: [contextList.list, contextList.list, contextList.list, contextList.list, contextList.list] })

let top = $computed(() => {
  const { statusBarHeight } = app.Global.systemInfo
  return statusBarHeight + 6 + 'px'
})

onMounted(() => {
  const { windowWidth } = app.Global.systemInfo
  pxRpx = (750 * 1) / windowWidth
  getContentList()
})

const getContentList = async () => {
  let data = await api.getPecommendation()
  contextList.list = data.recommendation
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
</script>

<style lang="scss" scoped>
.listbox {
  .foldbox {
    background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  }
}
</style>
