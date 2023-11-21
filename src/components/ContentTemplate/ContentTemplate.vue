<template>
  <div class="editCenter" style="overflow: hidden">
    <div v-if="titleFlag" class="conterTitle" w-full text-center text-36 mt-12>{{ title }}</div>
    <div v-for="(item, i) in contextList" id="item" :key="item.id" mt-12>
      <div v-if="item.type === 'text'" class="textItem" v-html="textToHtml(item.textValue)"></div>
      <div v-if="item.type === 'img'" class="imgList">
        <div v-show="item.list.length == 1" class="img1" w-full @click="previewImg(i, 0)">
          <image :src="item.list[0]" mode="widthFix" style="width: 100%"></image>
        </div>
        <div v-show="item.list.length == 2" class="img1" w-full flex>
          <div
            v-for="(one, index2) in item.list"
            :key="one"
            class="imgbox"
            flex-1
            h-440
            ml-2
            mr-2
            style="overflow: hidden"
            @click="previewImg(i, index2)"
          >
            <image :src="one" mode="aspectFill" style="height: 440rpx"></image>
          </div>
        </div>
        <div v-show="item.list.length == 3" class="img1" w-full flex flex-wrap>
          <div class="imgbox" h-360 ml-1 mr-1 mb-4 style="overflow: hidden; min-width: 100%" @click="previewImg(i, 0)">
            <image :src="item.list[0]" mode="widthFix" w-full h-360></image>
          </div>
          <div class="imgbox" flex-1 h-440 ml-2 mr-2 style="overflow: hidden" @click="previewImg(i, 1)">
            <image :src="item.list[1]" mode="aspectFill" h-440></image>
          </div>
          <div class="imgbox" flex-1 h-440 ml-2 mr-2 style="overflow: hidden" @click="previewImg(i, 2)">
            <image :src="item.list[2]" mode="aspectFill" h-440></image>
          </div>
        </div>
        <div v-show="item.list.length == 4" class="img1" w-full flex flex-wrap>
          <div
            v-for="(one, index2) in item.list"
            :key="one"
            class="imgbox"
            h-330
            ml-2
            mr-2
            m-4
            style="overflow: hidden; max-width: 49%"
            @click="previewImg(i, index2)"
          >
            <image :src="one" mode="aspectFill" h-330></image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Iitem {
  id: string
  type: string
  textValue?: string
  list?: string[]
}
let props = defineProps<{
  contextList: Iitem[]
  titleFlag: boolean
  title?: string
}>()

onMounted(() => {})

const textToHtml = textValue => {
  let newString = textValue.replace(/\n/g, '_@').replace(/\r/g, '_#')
  newString = newString.replace(/<[^>]+>/g, '')
  newString = newString.replace(/_@/g, '<br/>') // IE9、FF、chrome
  newString = newString.replace(/\s/g, '&nbsp;')
  return `<p style="fontSize:${32 / 32}rem;">${newString}</p>`
}

const previewImg = (index1: number, index2: number) => {
  if (props.titleFlag) {
    return
  }
  uni.previewImage({
    current: index2,
    urls: props.contextList[index1].list,
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
