<template>
  <meta hide:app hide:h5 title="创作详情" />
  <sys bottom="100rpx">
    <template #fixed>
      <!-- <u-loading-page :loading="!ready" loading-text="加载思潮..." fixed z-99></u-loading-page> -->
      <div v-show="!ready" fixed z-97 inset-0 bg-white></div>
      <uni-transition fixed z-98 :show="!ready">
        <div fixed z-98 inset-0 bg-white>
          <Loadding />
        </div>
      </uni-transition>
      <div v-show="!initFail">
        <uni-transition :show="footer == 'editing'"><FooterEditing /></uni-transition>
        <uni-transition :show="footer == 'reading'"><FooterReading /></uni-transition>
        <Float />
        <Comment fixed z-110 />
      </div>
    </template>
    <Nav>{{ Meta.title || '' }}</Nav>
    <div v-if="initFail" pt300>加载失败</div>
    <div v-else>
      <div mxsm mblg>{{ Meta.description }}</div>
      <div v-for="item in Sections" :key="item.uuid">
        <Section :data="item" />
      </div>
    </div>
  </sys>
</template>

<script setup lang="ts">
import { initCreationStatus } from './components/CreationStatus'
import Nav from './components/Nav.vue'
import Section from './components/Section.vue'
import Float from './components/Float.vue'
import FooterEditing from './components/FooterEditing.vue'
import FooterReading from './components/FooterReading.vue'
import Comment from './components/Comment.vue'

let { Meta, Sections, SectionActive, SectionHighlight, editMode } = $(initCreationStatus())

let project_id = 1
let { loading, ready, error } = $(
  useScroll(onPageScroll)
    .onLoad(page => api.getProject({ id: project_id }).then(res => (Meta = res)))
    .onFetch(async page => {
      let pageData = { page: page.num, size: page.size, last_time: page.time }
      const { data, total } = await api.getProjectParagraph({ project_id, ...pageData })
      if (page.num == 0) Sections = []
      Sections = Sections.concat(data)
      page.endBySize(data.length, total, page.time)
    }),
)

let initFail = $computed(() => error && !Sections.length)
watchEffect(() => console.log(error, !Sections.length))

let footer = $computed(() => {
  if (editMode) {
    return 'editing'
  } else {
    if (SectionActive) return 'none'
    return 'reading'
  }
})
</script>

<style lang="scss"></style>
