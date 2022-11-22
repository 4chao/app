<template>
  <div mblg mxsm>
    <div flex justify-between>
      <div mbxs flex-center text-gray text-20>
        <image w35 h35 mrxs class="smooth" :src="avatar"></image>
        <div>{{ data.user.nickname }}</div>
      </div>
      <div flex-center text-gray text-20>
        <div i-ri-eye-fill mrxs></div>
        关注的人
      </div>
    </div>
    <div class="card" thin @click="app.to('#article')">
      <div w-full h100>
        <image w-full h-full mode="aspectFill" :src="cover"></image>
      </div>
      <div pxsm pyxs bg-hex-f6f8fa>
        <div class="row1" flex justify-between myxs>
          <div flex>
            <div v-for="tag in data.tags" :key="tag.id" class="tag thin-8">{{ tag.name }}</div>
          </div>
          <div>
            <div class="more thin-500 round">
              <h1 w30 h30 i-ri-arrow-drop-down-line></h1>
            </div>
          </div>
        </div>
        <div class="title" text-35 line-clamp-2>{{ data.title }}</div>
        <div flex justify-between text-20 text-gray mtxs>
          <div>{{ date }} 更新</div>
          <div flex-center>
            <div i-ri-star-fill mlsm mrxs></div>
            <div>{{ numfix(data.favorite_num) }}</div>
            <div i-ri-thumb-up-fill mlsm mrxs></div>
            <div>{{ numfix(data.upvote_num) }}</div>
            <div i-ri-brush-fill mlsm mrxs></div>
            <div>{{ numfix(data.contributors.length) }}</div>
          </div>
        </div>
      </div>
      <div psm>
        <div line-clamp-3 text-27>
          {{ data.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { log } from 'console'

let { data } = defineProps<{ data: AwaitedReturnUnwarpPage<typeof api.getProjectPage> }>()
const oss_base_url = import.meta.env.VITE_OSS_BASE_URL

const avatar = oss_base_url + data.user.avatar
const cover = oss_base_url + data.cover.image_file.filename

const date = app.time(data.updated_time).toNow()

function numfix(num) {
  return num / 10000 >= 1 ? (num / 10000).toFixed(0) + 'w' : num / 1000 >= 1 ? (num / 1000).toFixed(0) + 'k' : num
}
</script>

<style lang="scss">
.row1 {
  > div > div,
  > view > view {
    height: 35rpx;
    background: #fdfdfd;
    // border: 1rpx solid rgba(89, 89, 89, 0.36);
    box-sizing: border-box;
    @apply flex-center;
  }

  .tag {
    font-size: 17rpx;
    padding: 0 17rpx;
    margin-right: 12rpx;
    color: #656565;
  }

  .more {
    width: 35rpx;
  }
}

.title {
  font-weight: bold;
  opacity: 0.8;
}
</style>
