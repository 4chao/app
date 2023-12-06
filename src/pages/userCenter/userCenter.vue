<template>
  <meta hide />
  <div class="userCenter" fixed w-710 h ml-20 pb-200 :style="pdTop + appHeight + 'overflow-y: auto'">
    <div class="head" h-320 bg-red relative>
      <div absolute top-10 right-10 text-28 @click="logout">退出登录</div>
      <div class="userdata" absolute bottom--50 left-25 flex>
        <div class="avatar" w-100 h-100 bg-blue style="border-radius: 50%"></div>
        <div class="right" w-400 ml-10>
          <div class="nickname" text-28 mt-4 style="font-weight: 700">大哈哈</div>
          <div class="introduction" text-20 mt-6 style="line-height: 24rpx">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
        </div>
      </div>
    </div>
    <div class="tipList" mt-80 flex justify-around>
      <div class="oneTip" flex items-center style="font-weight: 700">
        <div class="num" text-24 mt-2 style="line-height: 24rpx">9</div>
        <div class="label" text-24 ml-6>关注</div>
      </div>
      <div class="oneTip" flex items-center style="font-weight: 700">
        <div class="num" text-24 mt-2 style="line-height: 24rpx">99</div>
        <div class="label" text-24 ml-6>被关注</div>
      </div>
      <div class="oneTip" flex items-center style="font-weight: 700">
        <div class="num" text-24 mt-2 style="line-height: 24rpx">30</div>
        <div class="label" text-24 ml-6>被点赞</div>
      </div>
      <div class="oneTip" flex items-center style="font-weight: 700">
        <div class="num" text-24 mt-2 style="line-height: 24rpx">99</div>
        <div class="label" text-24 ml-6>被投币</div>
      </div>
    </div>
    <div class="works">
      <div flex justify-center>
        <div class="oneBtn">
          <div class="label" @click="changeWorksFun(1)">作品</div>
          <div v-show="worksIndex == 1" class="oneline"></div>
        </div>
        <div class="oneBtn">
          <div class="label" @click="changeWorksFun(2)">创想</div>
          <div v-show="worksIndex == 2" class="oneline"></div>
        </div>
      </div>
      <div class="contentBox">
        <div v-show="worksIndex == 1" class="exhibitionHall">
          <div v-for="item in 6" :key="item" class="one" bg-blue></div>
        </div>
        <div v-show="worksIndex == 2" class="imagination">
          <div text-30 mt-4 style="font-weight: 700">我发布的</div>
          <div class="list exhibitionHall">
            <div
              v-for="item in owns.list"
              :key="item.contentUuid"
              class="one"
              relative
              style="border: 3rpx solid #cdd0d6; border-radius: 6rpx; overflow: hidden"
              @click="toDetails(item)"
            >
              <template v-if="ifImgExitFun(item)">
                <image
                  :src="getFristImg(item.contentText)"
                  mode="widthFix"
                  absolute
                  left-0
                  style="width: 100%; top: 50%; transform: translateY(-50%)"
                ></image>
              </template>
              <template v-else>
                {{ JSON.parse(item.contentText)[0].textValue }}
              </template>
            </div>
          </div>
          <div text-30 mt-4 style="font-weight: 700">我参与的</div>
          <div class="list exhibitionHall">
            <div
              v-for="item in collaborations.list"
              :key="item.contentUuid"
              class="one"
              relative
              style="border: 3rpx solid #cdd0d6; border-radius: 6rpx; overflow: hidden"
              @click="toDetails(item)"
            >
              <template v-if="ifImgExitFun(item)">
                <image
                  :src="getFristImg(item.contentText)"
                  mode="widthFix"
                  absolute
                  left-0
                  style="width: 100%; top: 50%; transform: translateY(-50%)"
                ></image>
              </template>
              <template v-else>
                {{ JSON.parse(item.contentText)[0].textValue }}
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Tabbar :index="2"></Tabbar>
</template>

<script setup lang="ts">
let top = $computed(() => {
  const { statusBarHeight } = app.Global.systemInfo
  return statusBarHeight + 5 + 'px;'
})
let appHeight = $computed(() => {
  const { windowHeight } = app.Global.systemInfo
  return 'height:' + windowHeight + 'px;'
})
let pdTop = $ref('top:' + top)

let owns = reactive({ list: [] })
let collaborations = reactive({ list: [] })

onMounted(() => {
  getUserCreatives()
})

const getUserCreatives = async () => {
  let data = await api.getUserCreatives({})
  owns.list = data.owns
  collaborations.list = data.collaborations
}

const ifImgExitFun = (item: { contentText: string }): boolean => {
  let list: Iitem[] = JSON.parse(item.contentText)
  console.log(list)
  let bol = list.some(one => {
    return one.type == 'img'
  })
  return bol
}

const getFristImg = (contentText: string) => {
  let list: Iitem[] = JSON.parse(contentText)
  let url = ''
  for (let i = 0; i < list.length; i++) {
    if (list[i].type == 'img') {
      url = list[i].list[0]
      break
    }
  }
  return url
}
const logout = () => {
  app.User.userInfo = {
    uuid: '',
    email: '',
    phone: '',
    username: '',
    gender: '',
    token: null,
  }
  app.to('/pages/user/login')
}

let worksIndex = $ref(1)
const changeWorksFun = (index: number) => {
  worksIndex = index
}

const toDetails = (item: { isWork: any; titleUuid: any; contentUuid: any; userUuid: any }) => {
  if (item.isWork) {
    app.to('/pages/worksDetails/worksDetails', {
      titleId: item.titleUuid,
      contextId: item.contentUuid,
      userUuid: item.userUuid,
    })
  } else if (!item.isWork) {
    app.to('/pages/nodeDetails/nodeDetails', {
      titleId: item.titleUuid,
      contextId: item.contentUuid,
      userUuid: item.userUuid,
    })
  }
}
</script>

<style lang="scss">
.userCenter {
  .works {
    margin-top: 40rpx;
    .oneBtn {
      margin: 0 95rpx;
      font-size: 32rpx;
      font-weight: 700;
      display: flex;
      flex-direction: column;
      align-items: center;
      .oneline {
        margin-top: 2rpx;
        width: 40rpx;
        height: 4rpx;
        background-color: black;
      }
    }
    .contentBox {
      width: 100%;
      margin-top: 20rpx;
      .exhibitionHall {
        display: flex;
        flex-wrap: wrap;
        .one {
          margin-top: 11rpx;
          margin-left: 11rpx;
          width: 228rpx;
          height: 240rpx;
          &:nth-child(3n + 1) {
            margin-left: 0;
          }
        }
      }
      .imagination {
        .list {
          margin-top: 6rpx;
          display: flex;
        }
      }
    }
  }
}
</style>
