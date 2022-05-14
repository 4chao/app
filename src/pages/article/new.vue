<template>
  <meta title="新的创作" />
  <div pointer-events-none ptsm>
    <ArticleCard :data="cardData" transform-scale-90 />
  </div>
  <u-form ref="form">
    <u-form-item ref="item1" label="姓名" prop="userInfo.name" borderBottom>
      <u--input border="none"></u--input>
    </u-form-item>
  </u-form>
</template>

<script setup lang="ts">
import ArticleCard from '@/components/ArticleCard.vue'
import { merge } from 'lodash'
import {} from '@/hooks'

type Article = AwaitedReturnUnwarpPage<typeof api.getProjectPage>
let form = $ref(null)
let formData = $ref<Article>({})
let cardData = $computed(() => merge<Article, Article>({ title: '请输入标题' }, formData))
</script>

<style lang="scss">
.cu-form-group .title {
  min-width: calc(4em + 30rpx);
}
</style>
