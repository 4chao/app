<template>
  <meta hide bounce="false" />
  <sys :top="top" bounce="none">
    <div class="nodeDetails" bounce="none" @touchend="touchUp($event)">
      <div class="navhead" flex w-710 ml-20>
        <div class="back" w-30 h-50>
          <image src="../../static/img/back.jpeg" w-30 h-50 mode=""></image>
        </div>
        <div class="userdata" flex items-center ml-20>
          <div class="avatar" style="border-radius: 50%; overflow: hidden"><image src="../../static/img/avatar.jpg" w-50 h-50 mode=""></image></div>
          <div class="nickname" ml-10>昵称</div>
        </div>
      </div>
      <div class="contentBox" w-750 :style="'height:' + ctxHeight + 'overflow: hidden;'" @touchstart="touchStart($event)">
        <div class="rollingBox" relative flex flex-wrap right-750 :style="'width: 300%; height: 300%;bottom:' + ctxHeight + 'transform:' + moveWidth">
          <div v-for="item in rendering.list" :key="item.index" w-710 ml-20 mr-20 :style="'height:' + ctxHeight + 'overflow-y: hidden;'">
            <scroll-view
              :scroll-top="scrollTop"
              scroll-y="true"
              class="scroll-Y"
              style="height: 100%"
              @scrolltoupper="toupper"
              @scrolltolower="lower"
              @scroll="contentScroll"
            >
              <div style="min-height: 100.5%" @touchmove="touchMove($event)">
                <div v-if="item.index == 0" class="title" mt-10 text-40 style="text-align: center">{{ titleAndLables.titleText }}</div>
                <ContentTemplate v-if="item.contentList.length > 0" :contextList="item.contentList" :titleFlag="false"></ContentTemplate>
                <div v-if="item.index == 0" class="labels" flex w-full ml--10 mt-2 flex-wrap>
                  <div
                    v-for="label in titleAndLables.lables"
                    :key="label"
                    class="oneLab"
                    text-24
                    ml-10
                    mt-8
                    pl-16
                    pr-16
                    pt-6
                    pb-6
                    style="background-color: #e7dfdf; border-radius: 40rpx"
                  >
                    {{ label }}
                  </div>
                </div>
                <div h-30 w-full></div>
              </div>
            </scroll-view>
          </div>
        </div>
      </div>
      <div class="bottomBox" fixed bottom-0 left-0 w-full p-16 bg-white>
        <div w-full h-62 flex items-center>
          <input
            class="uni-input"
            h-46
            pl-12
            flex-1
            text-22
            style="border: 1px solid #797979; border-radius: 20rpx; min-width: 50%"
            placeholder="发表评论"
          />
          <div class="funlist" flex items-center w-220 style="justify-content: space-around">
            <image src="../../static/img/givealike.jpeg" w-30 h-30 mode=""></image>
            <image src="../../static/img/collection.jpeg" w-30 h-30 mode=""></image>
            <image src="../../static/img/comments.jpeg" w-30 h-30 mode=""></image>
            <div w-1 h-60 bg-black></div>
            <image src="../../static/img/create.jpg" w-35 h-35 mode="" @click="createNode('BIND_BROTHER_CONTENT')"></image>
          </div>
        </div>
      </div>
    </div>
  </sys>
</template>

<script lang="ts" setup>
import { RefType } from 'vue/macros'

const { params } = useQuery()

let navheadHeight = $ref(0) // 头部高度
let bottomBoxHeight = $ref(0) // 底部高度
let nodeList = reactive<INode[]>([]) // 记录节点数据
// 渲染数据
let rendering = reactive({ list: [{ index: 0, contentList: [] }] })
// 获得系统顶部高度
let top = $computed(() => {
  const { statusBarHeight } = app.Global.systemInfo
  return statusBarHeight + 5 + 'px'
})
// 当前节点的内容id
let curentContentUUid = $ref('')
onMounted(() => {
  // 此处获得页面head和bottom的高度
  setTimeout(() => {
    const query = uni.createSelectorQuery()
    query
      .select('.navhead')
      .boundingClientRect(data => {
        navheadHeight = parseInt(data.height)
      })
      .exec()
    query
      .select('.bottomBox')
      .boundingClientRect(data => {
        bottomBoxHeight = parseInt(data.height)
      })
      .exec()
  }, 50)
  curentContentUUid = params._object.params.contextId
  getTitle()
  getContent()
})
// 中间内容部分高度
let ctxHeight = $computed(() => {
  const { statusBarHeight } = app.Global.systemInfo
  const { windowHeight } = app.Global.systemInfo
  return windowHeight - statusBarHeight - navheadHeight - bottomBoxHeight - 5 + 'px;'
})

// 标题和标签数据
let titleAndLables = reactive({
  titleText: '',
  lables: [],
})
// 获得标题标签数据的方法
const getTitle = async () => {
  let data = await api.getTitle({
    uuid: params._object.params.titleId,
  })
  titleAndLables.titleText = data.titleText
  titleAndLables.lables = data.labels
}
// 获得第一个内容的方法
const getContent = async () => {
  let data = await api.getContent({
    uuid: params._object.params.contextId,
  })
  // 添加一个记录节点数据
  nodeList.push({
    index: 0,
    httpFlag: false,
    contentUuid: params._object.params.contextId,
    contentList: JSON.parse(data.contentText),
    beforeNode: -1,
    nextChild: -1,
    nextBrother: -1,
  })
  getOtherNode(nodeList[0], 'all')
}
// 节点位移的变量
let moveWidth = $ref('translate(0%,0%);')
// 获得兄弟节点子节点、拼接节点数据方法。
const getOtherNode = async (node: INode, type: string) => {
  curentContentUUid = node.contentUuid
  try {
    // 发送过请求的，不会重复请求
    if (!node.httpFlag) {
      let data = await api.getOtherNode({
        uuid: node.contentUuid,
      })
      // 处理兄弟节点
      if (type == 'all' || type == 'up') {
        for (let i = 0; i < data.brothers.length; i++) {
          let length = nodeList.length
          let beforeNode = i == 0 ? node.index : length - 1

          if (i > 0) nodeList[length - 1].nextBrother = length
          else nodeList[node.index].nextBrother = length
          nodeList.push({
            index: length,
            httpFlag: false,
            contentUuid: data.brothers[i].uuid,
            contentList: JSON.parse(data.brothers[i].contentText),
            beforeNode: beforeNode,
            nextChild: -1,
            nextBrother: -1,
          })
        }
      }
      // 处理子节点
      if (type == 'all' || type == 'left') {
        for (let i = 0; i < data.children.length; i++) {
          let length = nodeList.length
          let beforeNode = i == 0 ? node.index : length - 1
          if (i > 0) nodeList[length - 1].nextChild = length
          else nodeList[node.index].nextChild = length
          nodeList.push({
            index: length,
            httpFlag: false,
            contentUuid: data.children[i].uuid,
            contentList: JSON.parse(data.children[i].contentText),
            beforeNode: beforeNode,
            nextChild: -1,
            nextBrother: -1,
          })
        }
      }
    }
    nodeList[node.index].httpFlag = true
    // 下面拼接渲染数据
    let list = []
    for (let i = 0; i < 9; i++) {
      // 拼接父节点
      if (i === 1 && node.beforeNode !== -1 && nodeList[node.beforeNode].nextChild === node.index) {
        list.push(nodeList[node.beforeNode])
        continue
      }
      // 拼接借一个兄弟节点
      if (i === 3 && node.beforeNode !== -1 && nodeList[node.beforeNode].nextBrother === node.index) {
        list.push(nodeList[node.beforeNode])
        continue
      }
      // 当前节点
      if (i === 4) {
        list.push(nodeList[node.index])
        continue
      }
      // 下一个兄弟节点
      if (i === 5 && nodeList[node.index].nextBrother !== -1) {
        list.push(nodeList[nodeList[node.index].nextBrother])
        continue
      }
      // 子节点
      if (i === 7 && nodeList[node.index].nextChild !== -1) {
        list.push(nodeList[nodeList[node.index].nextChild])
        continue
      }
      list.push({ index: Math.random(), contentList: [] })
    }
    // 将拼接的数据赋给渲染list
    rendering.list = list
    moveWidth = 'translate(0%,0%);'
  } catch (error) {
    console.log(error)
  }
}
// 创建节点的方法（后续要添加代码）
const createNode = (type: string) => {
  app.to('/pages/articleEdit/articleEdit', {
    type: type,
    titleId: '',
    contextId: curentContentUUid,
  })
}
let ifToTop = $ref(true) // 内容是否滚到顶部
let ifToBottom = $ref(false) // 内容是否滚动到底部
let scrollTop = $ref(0)
let directionFlag = $ref('') // 滚动方法
let x1 = $ref(0)
let y1 = $ref(0)
let startMillTime = $ref(0) // 触屏开始的时间戳
// 触屏开始方法
const touchStart = event => {
  const date = new Date()
  startMillTime = date.getTime()
  directionFlag = ''
  x1 = event.touches[0].clientX
  y1 = event.touches[0].clientY
}
let x2 = $ref(0)
let y2 = $ref(0)
let oldScrollTop = $ref(0)
// 划动屏幕的方法
const touchMove = event => {
  x2 = event.touches[0].clientX - x1
  y2 = event.touches[0].clientY - y1
  // 判断划动方法
  if (directionFlag == '') {
    if (Math.abs(x2) > Math.abs(y2)) {
      directionFlag = x2 > 0 ? 'right' : 'left'
    } else {
      directionFlag = y2 > 0 ? 'down' : 'up'
    }
  }
  // 水平划动是
  if (directionFlag == 'right' || directionFlag == 'left') {
    if (directionFlag == 'right' && rendering.list[3].contentList.length === 0) {
      x2 = 0
      return
    }
    if (directionFlag == 'left' && rendering.list[5].contentList.length === 0) {
      // 没有兄弟节点时，进入编辑页面创建兄弟节点
      if (rendering.list[5].contentList.length === 0) {
        createNode('BIND_BROTHER_CONTENT')
      }
      x2 = 0
      return
    }
    const { windowWidth } = app.Global.systemInfo
    // 节点内容跟着划动走
    moveWidth = 'translate(' + (x2 / (windowWidth * 3)) * 100 + '%,0%);'
  } else if (directionFlag == 'down' || directionFlag == 'up') {
    // 以下两个if用于确定内容是否划动到顶部或者底部
    if ((!ifToTop && directionFlag == 'down') || (directionFlag == 'down' && rendering.list[1].contentList.length === 0)) {
      y2 = 0
      return
    }
    if ((!ifToBottom && directionFlag == 'up') || (directionFlag == 'up' && rendering.list[7].contentList.length === 0)) {
      y2 = 0
      return
    }
    const { windowWidth } = app.Global.systemInfo
    moveWidth = 'translate(0%,' + (y2 / (parseInt(ctxHeight) * 3)) * 100 + '%);'
  }
}
const touchUp = event => {
  const date = new Date()
  let time = date.getTime() - startMillTime
  const { windowWidth } = app.Global.systemInfo
  if (directionFlag == 'left') {
    if (rendering.list[5].contentList.length === 0) {
      createNode('BIND_PARENT_CONTENT')
    }
    if ((time < 300 && Math.abs(x2) > 50) || Math.abs(x2) > windowWidth * 0.5) {
      let current = (x2 / (windowWidth * 3)) * 100
      let timer = setInterval(() => {
        current = current - 0.6
        if (current <= -33.33) {
          scrollTop = 0
          ifToTop = true
          ifToBottom = false
          moveWidth = 'translate(-33.33%,0%);'
          getOtherNode(rendering.list[5] as INode, 'left')
          clearInterval(timer)
          return
        }
        moveWidth = 'translate(' + current + '%,0%);'
      }, 8)
    } else {
      let current = (x2 / (windowWidth * 3)) * 100
      rollbackFun(current, 'left')
    }
  }
  if (directionFlag == 'right') {
    if ((time < 300 && Math.abs(x2) > 50) || Math.abs(x2) > windowWidth * 0.5) {
      let current = (x2 / (windowWidth * 3)) * 100
      let timer = setInterval(() => {
        current = current + 0.6
        if (current >= 33.33) {
          scrollTop = 0
          ifToTop = true
          ifToBottom = false
          moveWidth = 'translate(33.33%,0%);'
          getOtherNode(rendering.list[3] as INode, 'right')
          clearInterval(timer)
          return
        }
        moveWidth = 'translate(' + current + '%,0%);'
      }, 8)
    } else {
      let current = (x2 / (windowWidth * 3)) * 100
      rollbackFun(current, 'right')
    }
  }
  if (directionFlag == 'up') {
    if (ifToBottom && rendering.list[7].contentList.length === 0) {
      createNode('BIND_PARENT_CONTENT')
    }
    if ((time < 300 && Math.abs(y2) > 50) || Math.abs(y2) > parseInt(ctxHeight) * 0.5) {
      let current = (y2 / (parseInt(ctxHeight) * 3)) * 100
      let timer = setInterval(() => {
        current = current - 0.7
        if (current <= -33.33) {
          scrollTop = 0
          ifToTop = true
          ifToBottom = false
          moveWidth = 'translate(0%,-33.33%);'
          getOtherNode(rendering.list[7] as INode, 'up')
          clearInterval(timer)
          return
        }
        moveWidth = 'translate(0%,' + current + '%);'
      }, 8)
    } else {
      let current = (y2 / (parseInt(ctxHeight) * 3)) * 100
      rollbackFun(current, 'up')
    }
  }
  if (directionFlag == 'down') {
    if ((time < 300 && Math.abs(y2) > 50) || Math.abs(y2) > parseInt(ctxHeight) * 0.5) {
      let current = (y2 / (parseInt(ctxHeight) * 3)) * 100
      let timer = setInterval(() => {
        current = current + 0.7
        if (current >= 33.33) {
          scrollTop = 0
          ifToTop = false
          ifToBottom = true
          moveWidth = 'translate(0%,33.33%);'
          getOtherNode(rendering.list[1] as INode, 'down')
          clearInterval(timer)
          return
        }
        moveWidth = 'translate(0%,' + current + '%);'
      }, 8)
    } else {
      let current = (y2 / (parseInt(ctxHeight) * 3)) * 100
      rollbackFun(current, 'down')
    }
  }
}

const rollbackFun = (current: number, type: string) => {
  let timer = setInterval(() => {
    let plusOrMinus = type == 'left' || type == 'up' ? 0.3 : -0.3
    current = current + plusOrMinus
    if ((type == 'left' || type == 'up') && current >= 0) {
      moveWidth = 'translate(0%,0%);'
      clearInterval(timer)
      return
    } else if ((type == 'right' || type == 'down') && current <= 0) {
      moveWidth = 'translate(0%,0%);'
      clearInterval(timer)
      return
    }
    moveWidth = type == 'up' || type == 'down' ? 'translate(0%,' + current + '%);' : 'translate(' + current + '%,0%);'
  }, 12)
}
const contentScroll = event => {
  if (event.detail.scrollTop < oldScrollTop) {
    oldScrollTop = event.detail.scrollTop
    ifToBottom = false
  } else if (event.detail.scrollTop > oldScrollTop) {
    oldScrollTop = event.detail.scrollTop
    ifToTop = false
  }
}
const toupper = () => {
  setTimeout(() => {
    ifToTop = true
  }, 200)
}
const lower = () => {
  setTimeout(() => {
    ifToBottom = true
  }, 200)
}
</script>

<style lang="scss" scoped></style>
