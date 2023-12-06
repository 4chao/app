<template>
  <meta hide bounce="false" softinputMode="adjustResize" />
  <div class="worksEdit" w-700 ml-25 :style="'margin-top:' + top">
    <div class="head" flex justify-between>
      <div class="left">返回</div>
      <div class="right" @click="saveOrRelease">发布</div>
    </div>
    <div class="contentbox">
      <div
        class="uploadBox"
        mt-30
        w-200
        h-200
        text-center
        text-24
        relative
        style="border: 3rpx dashed #cdd0d6; border-radius: 6rpx; background-color: #f4f5f7; line-height: 200rpx; overflow: hidden"
        @click="uploadFun"
      >
        上传图片/视频
        <image :src="contentData.data.url" mode="widthFix" absolute left-0 style="width: 100%; top: 50%; transform: translateY(-50%)"></image>
      </div>
      <div class="title">
        <input v-model="titleText" class="uni-input" h-80 flex-1 text-32 placeholder="为你的作品取个标题" />
      </div>
      <div class="worksValue">
        <textarea v-model="contentData.data.value" placeholder="输入作品内容" style="width: 90%" />
      </div>
      <div class="labels" flex flex-wrap>
        <div
          v-for="(item, i) in labelList"
          :key="item"
          class="one"
          flex
          items-center
          mt-10
          mr-6
          style="padding: 4rpx 12rpx; background-color: #e7dfdf; border-radius: 40rpx"
          @click="delLabel(i)"
        >
          <div class="val" text-24>{{ item }}</div>
          <div class="del" text-28 ml-4 style="font-weight: 700">×</div>
        </div>
      </div>
      <div class="labelsInput" mt-30>
        <input v-model="labelValue" class="uni-input" placeholder="输入标签,输入空格或回车完成标签" @confirm="addLabel" @input="checkBlank" />
      </div>
    </div>
  </div>
  <uni-popup ref="releaseDialog" type="dialog">
    <uni-popup-dialog
      type="info"
      cancelText="取消"
      confirmText="发布"
      title="提示"
      content="是否确认发布"
      @confirm="releaseDialogConfirm"
    ></uni-popup-dialog>
  </uni-popup>
</template>

<script lang="ts" setup>
import { TextEncoder } from 'text-encoding'
let top = $computed(() => {
  const { statusBarHeight } = app.Global.systemInfo
  return statusBarHeight + 5 + 'px;'
})

const labelList = reactive<string[]>([]) // 标签list
let labelValue = $ref('')
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

let titleText = $ref('')
let contentData = reactive({
  data: {
    url: '',
    value: '',
  },
})

// 上传图片
const uploadFun = () => {
  uni.chooseImage({
    count: 1, //默认9
    sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album'], //从相册选择或拍摄
    success: async chooseImageRes => {
      console.log(111)
      const tempFilePaths = chooseImageRes.tempFilePaths
      const file = chooseImageRes.tempFiles[0]

      // if (file.type != 'image/jpeg' && file.type != 'image/png') {
      //   return
      // }
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
          let data = JSON.parse(res.data)
          let { url } = data.data
          contentData.data.url = url
        },
      })
    },
  })
}

let releaseDialog = ref()
const saveOrRelease = () => {
  releaseDialog.value.open()
}

const releaseDialogConfirm = async () => {
  try {
    api.createTitleAndContent({
      titleText,
      labels: labelList,
      contentText: JSON.stringify(contentData.data),
      contentStruct: '',
      isWork: true,
    })
    app.back({
      createFlag: true,
    })
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss"></style>
