<template>
  <meta hide bounce="false" softinputMode="adjustResize" />
  <div class="articleEdit" w-710 ml-20 @touchmove="move" @touchend="up($event)">
    <div class="head" w-710 fixed top-0 left-20 z-10 bg-white :style="'padding-top:' + top">
      <div v-if="titleShowFlag" class="titleInput" shadow-box w-full h-92 mt-20 flex items-center>
        <input v-model="titleText" class="uni-input" h-80 pl-20 flex-1 text-32 placeholder="为你的故事取个标题" />
        <image src="../../static/img/create.jpg" mode="" w-55 h-55 ml-4 mr-26 @click="saveOrRelease"></image>
      </div>
    </div>
    <div class="context" w-full mt-16 relative p-6 pb-30 :style="ctxHeight + rtop">
      <EditCenter
        :itemList="contextList.list"
        :touchTop="touchTop"
        :headHeigth="headHeigth"
        :imgFlag="imgFlag"
        @emitboxposition="onBoxPosition"
        @emitdelete="onDeleteOrPreviewItem"
        @uploadimg="uploadImg"
      ></EditCenter>
    </div>
    <div id="bottom" w-full pt-16 fixed bottom-0 left-0 bg-white>
      <div
        v-if="titleShowFlag"
        class="labelBox"
        w-710
        ml-20
        pt-13
        pb-13
        flex
        items-center
        pl-8
        pr-8
        flex-wrap
        style="background-color: #f5f5f5; border-radius: 20rpx"
      >
        <div
          v-for="(item, i) in labelList"
          :key="i"
          class="labelList"
          flex
          items-center
          h-45
          pl-10
          pr-10
          mt-6
          ml-5
          mr-10
          style="background-color: #e7dfdf; border-radius: 45rpx"
          @click="delLabel(i)"
        >
          <div class="val" text-24>
            {{ item }}
          </div>
          <div class="del" text-28 ml-4 style="font-weight: 700">×</div>
        </div>
        <input
          v-model="labelValue"
          class="uni-input"
          h-52
          mt-6
          pl-12
          flex-1
          text-22
          style="border: 1px solid #797979; border-radius: 26rpx; min-width: 50%"
          placeholder="在此输入标签,输入空格或回车完成标签"
          @confirm="addLabel"
          @input="checkBlank"
        />
      </div>
      <div class="funList" pt-20 pb-30 flex items-center relative>
        <image src="../../static/img/models.jpeg" mode="" w-70 h-60 ml-26 mr-6></image>
        <image
          src="../../static/img/text.jpeg"
          mode=""
          w-70
          h-60
          ml-26
          mr-6
          @click="addItemFun('text')"
          @longpress="createMoveImg()"
          @touchstart="start($event, 'text')"
        ></image>
        <image
          src="../../static/img/addimg.jpeg"
          mode=""
          w-70
          h-58
          ml-26
          mr-6
          @click="addItemFun('img')"
          @longpress="createMoveImg()"
          @touchstart="start($event, 'img')"
        ></image>
        <div
          v-if="!titleShowFlag"
          class="button"
          w-160
          h-60
          absolute
          right-28
          style="border: 2px solid #797979; text-align: center; line-height: 60rpx; border-radius: 10rpx"
          @click="saveOrRelease()"
        >
          确认发布
        </div>
      </div>
    </div>
    <div v-show="imgFlag" class="fixedBox" fixed :style="{ left: clientData.left, top: clientData.top }">
      <image :src="imgUrl" mode="" w-105 h-88></image>
    </div>
  </div>
  <uni-popup ref="alertDialog" type="dialog">
    <uni-popup-dialog
      type="warn"
      :cancelText="dialogInfo.cancelText"
      :confirmText="dialogInfo.confirmText"
      title="提示"
      :content="dialogInfo.content"
      @confirm="dialogConfirm"
      @close="dialogClose"
    ></uni-popup-dialog>
  </uni-popup>
  <uni-popup ref="releaseDialog" type="dialog">
    <uni-popup-dialog
      type="info"
      cancelText="取消"
      confirmText="发布"
      title="提示"
      content="是否确认发布"
      @confirm="releaseDialogConfirm"
      @close="releaseDialogClose"
    ></uni-popup-dialog>
  </uni-popup>
</template>

<script setup lang="ts">
import EditCenter from './components/EditCenter.vue'
import { TextEncoder } from 'text-encoding'
let img = 'https://0-1-0test.oss-cn-beijing.aliyuncs.com/static/img/default.jpg'

let { params } = useQuery()
// 是否有标题
let titleShowFlag = $ref(false)
let bottomHeight = $ref(0) // 工具区高度
let pxRpx = $ref(0)
let titleText = $ref('') // 标题
const labelList = reactive<string[]>([]) // 标签list
let labelValue = $ref('') // 标签输入内容
// 内容list，编辑数据
let contextList = reactive({
  list: [
    {
      id: '1',
      type: 'text',
      textValue: '',
      list: [],
    },
  ],
})
let imgFlag = $ref(false)
// 默认图片
let imgUrl = $ref('../../static/img/addimg.jpeg')
let addType = $ref('img')
let clientData = $ref({
  left: '110px',
  top: '840px',
})
let touchTop = $ref(840)
// 头部高度
let headHeigth = $ref(0)
let itemStyleList = []
let alertDialog = ref()
let dialogInfo = reactive({
  content: '',
  cancelText: '',
  confirmText: '',
})
onLoad(() => {
  console.log('add load')
})
onMounted(() => {
  // 判断是否需要标题
  if (params._object.params.type == 'BIND_PARENT_TITLE') {
    titleShowFlag = true
  } else {
    titleShowFlag = false
  }
  // 获得底部高度
  setTimeout(() => {
    const { windowWidth } = app.Global.systemInfo
    pxRpx = (750 * 1) / windowWidth
    const query = uni.createSelectorQuery()
    query
      .select('#bottom')
      .boundingClientRect(data => {
        bottomHeight = parseInt(data.height)
      })
      .exec()
  }, 50)
})
// 系统头部高度
let top = $computed(() => {
  const { statusBarHeight } = app.Global.systemInfo
  return statusBarHeight + 'px;'
})
let rtop = $computed(() => {
  const { statusBarHeight } = app.Global.systemInfo
  const height = titleShowFlag ? 112 : 0
  return 'top:' + (height / pxRpx + statusBarHeight) + 'px;'
})
// 内容高度
let ctxHeight = $computed(() => {
  const { statusBarHeight } = app.Global.systemInfo
  const { windowHeight } = app.Global.systemInfo
  const height = titleShowFlag ? 102 : 0
  headHeigth = statusBarHeight - height / pxRpx
  return 'height:' + (windowHeight - bottomHeight - 10 - statusBarHeight - height / pxRpx) + 'px;'
})
// 添加标签的方法
const addLabel = () => {
  if (labelValue.trim() === '') {
    labelValue = ''
    return
  }
  if (labelList.length >= 7) {
    return
  }
  const encoder = new TextEncoder()
  const buffer = encoder.encode(labelValue.trim())
  let count = buffer.byteLength
  labelList.forEach(item => {
    let itemEncoder = new TextEncoder()
    const itemBuffer = encoder.encode(item)
    count = count + itemBuffer.byteLength
  })
  if (count > 66) {
    return
  }

  labelList.push(labelValue.trim())
  labelValue = ''
}

const checkBlank = () => {
  const str = labelValue.substring(labelValue.length - 1, labelValue.length)
  if (str === ' ') {
    addLabel()
  }
}

const delLabel = (i: number) => {
  labelList.splice(i, 1)
}

const addItemFun = (type: string) => {
  let date = new Date()
  contextList.list.push({
    id: date.toString(),
    type: type,
    textValue: '',
    list: type == 'img' ? [img] : [],
  })
}

const createMoveImg = () => {
  imgFlag = true
}

const start = (event, type) => {
  if (type === 'img') {
    imgUrl = '../../static/img/addimg.jpeg'
  } else if (type === 'text') {
    imgUrl = '../../static/img/text.jpeg'
  }
  addType = type
  clientData.left = parseInt(event.changedTouches[0].clientX) - 105 / pxRpx / 2 + 'px'
  clientData.top = parseInt(event.changedTouches[0].clientY) - 88 / pxRpx / 2 + 'px'
}

const move = event => {
  clientData.left = parseInt(event.changedTouches[0].clientX) - 105 / pxRpx / 2 + 'px'
  clientData.top = parseInt(event.changedTouches[0].clientY) - 88 / pxRpx / 2 + 'px'
  if (imgFlag) {
    touchTop = parseInt(event.changedTouches[0].clientY) - 105 / pxRpx / 2
  }
}

const up = event => {
  const { windowHeight } = app.Global.systemInfo
  if (imgFlag) {
    if (event.changedTouches[0].clientY > headHeigth && event.changedTouches[0].clientY < windowHeight - bottomHeight) {
      let index = -1
      let flag = true
      for (let i = 0; i < itemStyleList.length; i++) {
        if (
          event.changedTouches[0].clientY > itemStyleList[i].top &&
          event.changedTouches[0].clientY < itemStyleList[i].top + itemStyleList[i].height - 50
        ) {
          index = itemStyleList[i].index
          break
        } else if (
          event.changedTouches[0].clientY > itemStyleList[i].top + itemStyleList[i].height - 50 &&
          event.changedTouches[0].clientY < itemStyleList[i].top + itemStyleList[i].height
        ) {
          index = itemStyleList[i].index
          flag = false
          break
        }
      }
      if (index == -1) {
        let date = new Date()
        contextList.list.push({
          id: date.toString(),
          type: addType,
          textValue: '',
          list: addType == 'img' ? [img] : [],
        })
      } else {
        if (addType === 'img' && flag && contextList.list[index].type !== 'text') {
          if (contextList.list[index].list.length === 4) {
            imgFlag = false
            return
          }
          contextList.list[index].list.push(img)
        } else {
          let date = new Date()
          contextList.list.splice(index + 1, 0, {
            id: date.toString(),
            type: addType,
            textValue: '',
            list: addType == 'img' ? [img] : [],
          })
        }
      }
    } else {
      let date = new Date()
      contextList.list.push({
        id: date.toString(),
        type: addType,
        textValue: '',
        list: addType == 'img' ? [img] : [],
      })
    }
  }
  imgFlag = false
}

const onBoxPosition = list => {
  itemStyleList = list
}

let deleteOrPreviewItemIndex = reactive({
  index1: -1,
  index2: -1,
})
const onDeleteOrPreviewItem = (index1: number, index2: number) => {
  deleteOrPreviewItemIndex.index1 = index1
  deleteOrPreviewItemIndex.index2 = index2
  if (contextList.list[index1].type === 'text') {
    messageToggle('是否确认删除这段文本', '取消', '确认')
  } else {
    messageToggle('请确认你要进行的操作', '删除', '预览')
  }
}
const dialogConfirm = () => {
  if (contextList.list[deleteOrPreviewItemIndex.index1].type === 'text') {
    contextList.list.splice(deleteOrPreviewItemIndex.index1, 1)
  } else {
    console.log('aasa')
    uni.previewImage({
      current: deleteOrPreviewItemIndex.index2,
      urls: contextList.list[deleteOrPreviewItemIndex.index1].list,
      longPressActions: {
        itemList: ['发送给朋友', '保存图片', '收藏'],
        success: function (data) {
          console.log(data)
        },
        fail: function (err) {
          console.log(err.errMsg)
        },
      },
    })
  }
}
const dialogClose = () => {
  if (contextList.list[deleteOrPreviewItemIndex.index1].type === 'img') {
    if (contextList.list[deleteOrPreviewItemIndex.index1].list.length === 1) {
      contextList.list.splice(deleteOrPreviewItemIndex.index1, 1)
    } else {
      contextList.list[deleteOrPreviewItemIndex.index1].list.splice(deleteOrPreviewItemIndex.index2, 1)
    }
  }
}
const messageToggle = (content: string, cancelText: string, confirmText: string) => {
  dialogInfo.content = content
  dialogInfo.cancelText = cancelText
  dialogInfo.confirmText = confirmText
  alertDialog.value.open()
}
const uploadImg = (index1: number, index2: number) => {
  uni.chooseImage({
    count: 1, //默认9
    sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album'], //从相册选择
    success: async chooseImageRes => {
      const tempFilePaths = chooseImageRes.tempFilePaths
      const file = chooseImageRes.tempFiles[0]
      console.log(file)

      // if (file.type != 'image/jpeg' && file.type != 'image/png') {
      //   return
      // }
      if (file.size > 1024 * 1024 * 8) {
        return
      }
      console.log(file.size)
      uni.uploadFile({
        url: import.meta.env.VITE_PROXY_URL + '/api/upload_file', //仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        header: {
          'MiaoA-User-Token': app.User.token,
        },
        name: 'file',
        formData: {
          fileType: 'IMAGE',
        },
        success: res => {
          console.log(res)
          let data = JSON.parse(res.data)
          let { url } = data.data
          contextList.list[index1].list[index2] = url
        },
      })
      console.log(444)
    },
  })
}
let releaseDialog = ref()
const saveOrRelease = () => {
  releaseDialog.value.open()
}
const releaseDialogConfirm = async () => {
  let uuid = ''
  if (titleShowFlag) {
    try {
      let data = await api.createContentTitle({
        titleText: titleText,
        labels: labelList,
      })
      uuid = data.uuid
    } catch (error) {
      console.log(error)
    }
  } else {
    uuid = params._object.params.contextId
  }
  try {
    let data = await api.createContent({
      uuid,
      createContentType: params._object.params.type,
      contentText: JSON.stringify(contextList.list),
      contentStruct: '',
    })
    app.back({
      createFlag: true,
      uuid: data.uuid,
      contentText: JSON.stringify(contextList.list),
    })
  } catch (error) {
    console.log(error)
  }
}
const releaseDialogClose = () => {}
</script>

<style lang="scss">
.articleEdit {
  .context {
    overflow-y: auto;
  }
}
</style>
