<template>
  <div class="editCenter">
    <div v-for="(item, i) in itemList" id="item" :key="item.id">
      <div v-if="item.type === 'text'" class="textItem" @longpress="deleteItem(i, 0)">
        <view class="uni-textarea">
          <textarea v-model="item.textValue" auto-height text-28 placeholder="此处编写内容......" />
        </view>
        <div :class="item.colorFlag ? 'checkedIn' : 'insertion'" w-full style="height: 20px"></div>
      </div>
      <div v-if="item.type === 'img'" ref="imgitem" class="imgList">
        <div v-show="item.list.length == 1" class="img1" w-full @longpress="deleteItem(i, 0)">
          <image :src="item.list[0]" mode="widthFix" style="width: 100%" @click="uploadImg(i, 0)"></image>
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
            @click="uploadImg(i, index2)"
            @longpress="deleteItem(i, index2)"
          >
            <image :src="one" mode="aspectFill"></image>
          </div>
        </div>
        <div v-show="item.list.length == 3" class="img1" w-full flex flex-wrap>
          <div class="imgbox" h-360 ml-1 mr-1 mb-4 style="overflow: hidden; min-width: 100%" @click="uploadImg(i, 0)" @longpress="deleteItem(i, 0)">
            <image :src="item.list[0]" mode="widthFix" w-full></image>
          </div>
          <div class="imgbox" flex-1 h-440 ml-2 mr-2 style="overflow: hidden" @click="uploadImg(i, 1)" @longpress="deleteItem(i, 1)">
            <image :src="item.list[1]" mode="aspectFill"></image>
          </div>
          <div class="imgbox" flex-1 h-440 ml-2 mr-2 style="overflow: hidden" @click="uploadImg(i, 2)" @longpress="deleteItem(i, 2)">
            <image :src="item.list[2]" mode="aspectFill"></image>
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
            @click="uploadImg(i, index2)"
            @longpress="deleteItem(i, index2)"
          >
            <image :src="one" mode="aspectFill"></image>
          </div>
        </div>
        <div :class="item.colorFlag ? 'checkedIn' : 'insertion'" w-full style="height: 20px"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['emitboxposition', 'emitdelete', 'uploadimg'])
interface Iitem {
  id: string
  type: string
  textValue?: string
  list?: string[]
  colorFlag: boolean
}
let props = defineProps<{
  itemList: Iitem[]
  touchTop: number
  headHeigth: number
  imgFlag: boolean
}>()
let imgitem = ref(null)
onMounted(() => {
  console.log(imgitem.value)
})

let { itemList } = toRefs(props)

watch(
  () => props.touchTop,
  (newData, oldData) => {
    watchMove()
  },
)
let itemStyleList = []
watch(
  () => props.imgFlag,
  (newData, oldData) => {
    if (newData) {
      query
        .selectAll('#item')
        .boundingClientRect(data => {
          itemStyleList = data
        })
        .exec()
    }
  },
)
const query = uni.createSelectorQuery()
const watchMove = () => {
  const { windowHeight } = app.Global.systemInfo
  let list = []
  for (let i = 0; i < itemStyleList.length; i++) {
    if (itemStyleList[i].top + itemStyleList[i].height > props.headHeigth && itemStyleList[i].top < windowHeight) {
      itemStyleList[i].index = i
      list.push(itemStyleList[i])
      emits('emitboxposition', list)
    }
  }
}

const uploadImg = (index1: number, index2: number) => {
  emits('uploadimg', index1, index2)
}

const deleteItem = (index1, index2) => {
  emits('emitdelete', index1, index2)
}
</script>

<style lang="scss">
.checkedIn {
  background-color: blue;
}
</style>
