<template>
  <meta hide />
  <sys :top="top">
    <template #fixed>
      <Search />
      <Fab />
      <ArticleCreate />
    </template>
    <div id="articles" ptsm><ArticleCard v-for="item in List" :key="item.id" :data="item" /></div>
  </sys>
</template>

<script setup lang="ts">
import Search from './components/Search.vue'
import Fab from './components/Fab.vue'
import ArticleCreate from './components/ArticleCreate.vue'
import ArticleCard from './components/ArticleCard.vue'
import { useScroll } from '@/hooks'
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
const scrolling = $ref(false)
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
// var top = $computed(() => th + 30)
</script>

<style lang="scss"></style>
