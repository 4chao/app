<template>
  <meta hide bounce="false" softinputMode="adjustResize" />
  <div class="articleEdit" w-710 ml-20>
    <div class="head" w-710 fixed top-0 left-20 z-10 bg-white :style="'padding-top:' + top">
      <div v-if="titleShowFlag" class="titleInput" shadow-box w-full h-92 mt-20 flex items-center>
        <input class="uni-input" h-80 pl-20 flex-1 text-32 placeholder="为你的故事取个标题" />
        <image src="../../static/img/create.jpg" mode="" w-55 h-55 ml-4 mr-26></image>
      </div>
    </div>
    <div class="context" w-full mt-16 relative p-6 pb-30 :style="ctxHeight + rtop" @click="flag = true">
      <view class="uni-textarea">
        <textarea v-model="textValue" :focus="flag" auto-height text-28 placeholder="说出你的故事......" @blur="textareaBlur" @input="inputcontext" />
      </view>
    </div>
    <div id="bottom" w-full pt-20 fixed bottom-0 left-0 bg-white>
      <div class="labelBox" w-710 ml-20 h-78 flex items-center pl-8 pr-8 style="background-color: #f5f5f5; border-radius: 20rpx">
        <div
          v-for="(item, i) in labelList"
          :key="i"
          class="labelList"
          flex
          items-center
          h-45
          pl-10
          pr-10
          ml-5
          mr-10
          style="background-color: #e7dfdf; border-radius: 45rpx"
          @click="delLabel(i, item)"
        >
          <div class="val" text-24>
            {{ item.value }}
          </div>
          <div class="del" text-28 ml-4 style="font-weight: 700">×</div>
        </div>
        <input
          v-model="labelValue"
          class="uni-input"
          h-52
          pl-12
          flex-1
          text-22
          style="border: 1px solid #797979; border-radius: 26rpx"
          placeholder="在此输入标签,输入空格或回车完成标签"
          @confirm="addLabel"
          @input="checkBlank"
        />
      </div>
      <div class="funList" pt-20 pb-30 flex items-center>
        <image src="../../static/img/models.jpeg" mode="" w-70 h-60 ml-26 mr-6></image>
        <image src="../../static/img/text.jpeg" mode="" w-70 h-60 ml-26 mr-6></image>
        <image src="../../static/img/addimg.jpeg" mode="" w-70 h-58 ml-26 mr-6></image>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ILabel {
  value: string
}
let flag = $ref(false)
let textValue = $ref('')
let titleShowFlag = $ref(true)
let bottomHeight = $ref(104)
let pxRpx = $ref(0)
const labelList = reactive<ILabel[]>([])
let labelValue = $ref('')
onMounted(() => {
  const { windowWidth } = app.Global.systemInfo
  pxRpx = (750 * 1) / windowWidth
  const query = uni.createSelectorQuery().in(this)
  query
    .select('#bottom')
    .boundingClientRect(data => {
      bottomHeight = data.height
    })
    .exec()
})
let top = $computed(() => {
  const { navBarHeight } = app.Global
  const { statusBarHeight } = app.Global.systemInfo
  return statusBarHeight + 'px;'
})
let rtop = $computed(() => {
  const { statusBarHeight } = app.Global.systemInfo
  const height = titleShowFlag ? 112 : 0
  return 'top:' + (height / pxRpx + statusBarHeight) + 'px;'
})
let ctxHeight = $computed(() => {
  const { statusBarHeight } = app.Global.systemInfo
  const { windowHeight } = app.Global.systemInfo
  const height = titleShowFlag ? 102 : 0
  return 'height:' + (windowHeight - bottomHeight - 30 - statusBarHeight - height / pxRpx) + 'px;'
})

const addLabel = () => {
  if (labelValue.trim() === '') {
    labelValue = ''
    return
  }
  if (labelList.length >= 3) {
    return
  }
  let count = labelValue.trim().length
  labelList.forEach(item => {
    count = count + item.value.length
    console.log(count)
  })
  if (count > 12) {
    return
  }

  labelList.push({ value: labelValue.trim() })
  labelValue = ''
}

const checkBlank = () => {
  const str = labelValue.substring(labelValue.length - 1, labelValue.length)
  if (str === ' ') {
    addLabel()
  }
}

const delLabel = (i: number, item: ILabel) => {
  labelList.splice(i, 1)
}

const textareaBlur = () => {
  flag = false
}
const inputcontext = () => {
  console.log(textValue)
}
</script>

<style lang="scss">
.articleEdit {
  .context {
    overflow-y: auto;
  }
}
</style>
