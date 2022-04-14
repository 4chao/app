<template>
  <div mblg mxsm>
    <div flex justify-between>
      <div mbxs flex-center text-gray text-20>
        <image
          w35
          h35
          mrxs
          class="smooth"
          src="https://q2.qlogo.cn/headimg_dl?dst_uin=2490445193&spec=100&v=0.5662477152747005"
        ></image>
        <div>PentaTea</div>
      </div>
      <div flex-center text-gray text-20>
        <div i-ri-eye-fill mrxs></div>
        关注的人
      </div>
    </div>
    <div class="card" thin>
      <div w-full h100>
        <image
          w-full
          h-full
          mode="aspectFill"
          src="https://repository-images.githubusercontent.com/279473495/14866c80-d6b5-11ea-84f1-a824c550bb7d"
        ></image>
      </div>
      <div pxsm pyxs bg-hex-f6f8fa>
        <div class="row1" flex justify-between myxs>
          <div flex>
            <div class="tag thin-8">创业</div>
            <div class="tag thin-8">售楼处当托</div>
            <div class="tag thin-8">物联网</div>
          </div>
          <div>
            <div class="more thin-500 round">
              <h1 w30 h30 i-ri-arrow-drop-down-line></h1>
            </div>
          </div>
        </div>
        <div class="title" text-35 line-clamp-2>福建一男子摄入卡路里结果卡路里</div>
        <div flex justify-between text-20 text-gray mtxs>
          <div>3 天前更新</div>
          <div flex-center>
            <div i-ri-star-fill mlsm mrxs></div>
            <div>238</div>
            <div i-ri-thumb-up-fill mlsm mrxs></div>
            <div>1.5k+</div>
            <div i-ri-brush-fill mlsm mrxs></div>
            <div>24</div>
          </div>
        </div>
      </div>
      <div psm>
        <div line-clamp-3 text-27>
          根据现场情况，消防员立即对水泥盖板周围杂物及缝隙里的小石块及泥土进行清理，随后用撬棍等工具撬动水泥盖板。经过3分钟救助，被困人员成功脱困。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from '@/hooks'
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
