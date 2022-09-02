<template>
  <div mblg mxsm>
    <div flex justify-between>
      <div mbxs flex-center text-gray text-25>
        <image w35 h35 mrxs class="smooth"
          :src="data.user.avatar"></image>
        <div>{{data.user.username}}</div>
        <div flex-center text-gray text-10 >
        <!-- 暂时没有关注的功能 -->
        <div>关注的人</div>
      </div>
      </div>
      <div flex-center text-gray text-20>
        <div class="more thin-500 round">
              <h1 w30 h30 i-ri-arrow-drop-down-line></h1>
            </div>
      </div>
    </div>
    <div class="card" thin @click="app.to('#article')">
      <div w-full h100 v-if="data.cover != null && data.cover.length > 0">
        <image w-full h-full mode="aspectFill" :src="data.cover"></image>
      </div>
      <div pxsm pyxs bg-hex-f6f8fa>
        
        <div class="row1" flex justify-between myxs>
          <div flex >
            <div class="tag thin-8" v-for="tag in data.tags">{{ tag.name }}</div>
          </div>
          <div>
            
          </div>
        </div>
        <div class="title" text-35 line-clamp-2>{{ data.title }}</div>
        <div flex justify-between text-20 text-gray mtxs>
          <div>{{app.time(data.created_time).fromNow()}}</div>
          <div flex-center>
            <div i-ri-thumb-up-fill mlsm mrxs></div>
            <div>{{data.coin_num}}</div>
            <div i-ri-star-fill mlsm mrxs></div>
            <div>{{data.favorite_num}}</div>
            <div i-ri-brush-fill mlsm mrxs></div>
            <div>{{data.participant_num}}</div>
          </div>
        </div>
      </div>
      <div psm>
        <div line-clamp-3 text-27>
          {{ data.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
let { data } = defineProps<{ data: AwaitedReturnUnwarpPage<typeof api.getProjectPage> }>()
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
