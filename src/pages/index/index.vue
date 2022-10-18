<template>
  <meta hide />
  <sys :top="top">
    <template #fixed>
      <Search />
    </template>
    <div id="articles" ptsm>
      <ArticleCard v-for="item in List" :key="item.id" :data="item" />
    </div>
  </sys>
</template>

<script setup lang="ts">
import Search from './components/Search.vue'
import Fab from './components/Fab.vue'
let { indexList: List } = $(app.Data)
useScroll(onPageScroll)
  .onLoad(page => {})
  .onFetch(async page => {
    let pageData = { page: page.num, size: page.size, last_time: page.time }
    const { data, total } = await api.getProjectPage(pageData)
    if (page.num == 0) List = []
    List = List.concat(data)
    page.endBySize(data.length, total, page.time)
  })

const searchInfo = reactive({
  value: '',
  searched: '',
})
provide('searchInfo', searchInfo)

let top = $computed(() => {
  const { navBarHeight } = app.Global
  const { statusBarHeight } = app.Global.systemInfo
  return navBarHeight + statusBarHeight + uni.upx2px(30) + 'px'
})
</script>

<style lang="scss"></style>
