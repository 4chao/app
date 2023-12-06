<template>
  <meta hide bounce="false" />
  <sys :top="top" bounce="none">
    <div w-710 ml-20>
      <WorksTemplate :context="worksData"></WorksTemplate>
    </div>
  </sys>
  <div class="bottom" fixed bottom-0 left-0 w-full h-100 text-center text-38 style="line-height: 100rpx; border-top: 1px solid #797979">评论区</div>
</template>

<script lang="ts" setup>
const { params } = useQuery()

let worksData = reactive({
  titleUuid: '',
  titleText: '',
  contentUuid: '',
  contentText:
    '{"url":"https://0-1-0test.oss-cn-beijing.aliyuncs.com/IMAGE/ed04865e5f81461d8d1c3b06d1c496c2Screenshot_20231203-222226.png","value":"哈哈哈   哈\\n哈哈"}',
  userUuid: '',
  username: '',
  isWork: true,
})

// 获得系统顶部高度
let top = $computed(() => {
  const { statusBarHeight } = app.Global.systemInfo
  return statusBarHeight + 5 + 'px'
})

onMounted(() => {
  worksData.titleUuid = params._object.params.titleId
  worksData.contentUuid = params._object.params.contextId
  getWorksTitle()
  getWorksContent()
})

const getWorksTitle = async () => {
  let data = await api.getTitle({ uuid: worksData.titleUuid })
  worksData.titleText = data.titleText
}

const getWorksContent = async () => {
  let data = await api.getContent({ uuid: worksData.contentUuid })
  worksData.contentText = data.contentText
  worksData.userUuid = data.userUuid
  worksData.username = data.username
}
</script>

<style lang="less"></style>
