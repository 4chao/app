<template>
  <div class="worksContent">
    <div class="headImg" w-full style="overflow: hidden; max-height: 750rpx">
      <image :src="getValueOrUrl(context.contentText, 'url')" mode="widthFix" style="width: 100%"></image>
    </div>
    <div class="title" text-36>{{ context.titleText }}</div>
    <div class="userData" flex items-center>
      <div class="avatar" w-60 h-60 style="overflow: hidden; border-radius: 50%">
        <image src="../../static/img/avatar.jpg" mode="widthFix" style="width: 100%; height: 100%"></image>
      </div>
      <div class="username" ml-18 text-28>{{ context.username }}</div>
    </div>
    <div class="time" text-22>2023年12月1日</div>
    <div class="value" mt-6 text-28 v-html="getValueOrUrl(context.contentText, 'value')"></div>
    <!-- <div class="labels"></div> -->
  </div>
</template>

<script setup lang="ts">
let props = defineProps<{
  context: RecommendationDto
}>()

onMounted(() => {})

const textToHtml = textValue => {
  let newString = textValue.replace(/\n/g, '_@').replace(/\r/g, '_#')
  newString = newString.replace(/<[^>]+>/g, '')
  newString = newString.replace(/_@/g, '<br/>') // IE9、FF、chrome
  newString = newString.replace(/\s/g, '&nbsp;')
  return `<p style="fontSize:${32 / 32}rem;">${newString}</p>`
}

const getValueOrUrl = (context: string, type: string) => {
  if (type == 'value') {
    return textToHtml(JSON.parse(context).value)
  } else if (type == 'url') {
    return JSON.parse(context).url
  }
}

const previewImg = () => {
  uni.previewImage({
    current: 0,
    urls: getValueOrUrl(props.context.contentText, 'url'),
    longPressActions: {
      itemList: ['发送给朋友', '保存图片'],
      success: function (data) {},
      fail: function (err) {
        console.log(err.errMsg)
      },
    },
  })
}
</script>

<style lang="scss"></style>
