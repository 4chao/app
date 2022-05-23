<template>
  <div>
    <div class="card" shadow-box>
      <div pxsm pysm bg-hex-f6f8fa>
        <div class="title" text-35 line-clamp-2>福建一男子摄入卡路里结果卡路里</div>
        <div flex justify-between text-20 text-gray mtxs>
          <div flex-center>
            <div i-ri-star-fill mrxs></div>
            <div>238</div>
            <div i-ri-thumb-up-fill mlsm mrxs></div>
            <div>1.5k+</div>
            <div i-ri-brush-fill mlsm mrxs></div>
            <div>24</div>
          </div>
          <div></div>
        </div>
      </div>
      <div psm flex justify-between text-20 text-gray bg-white>
        <div>3 天前编辑&nbsp;&nbsp;&nbsp;&nbsp;345字</div>
        <div>继续编辑</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  allowBanner: {
    type: Boolean,
    default: true,
  },
  allowTag: {
    type: Boolean,
    default: true,
  },
  allowTitle: {
    type: Boolean,
    default: true,
  },
})
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
