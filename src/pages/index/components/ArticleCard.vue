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
    <div class="card">
      <div class="ff" w-full h100>
        <image
          w-full
          h-full
          mode="aspectFill"
          src="https://repository-images.githubusercontent.com/279473495/14866c80-d6b5-11ea-84f1-a824c550bb7d"
        ></image>
      </div>
      <div class="ff" pxsm pyxs bg-f6f8fa>
        <div class="row1" flex justify-between myxs>
          <div flex>
            <div class="tag">创业</div>
            <div class="tag">售楼处当托</div>
            <div class="tag">物联网</div>
          </div>
          <div>
            <div class="more round">
              <h1 w30 h30 i-ri-arrow-drop-down-line></h1>
            </div>
          </div>
        </div>
        <div class="title" text-35>福建一男子摄入卡路里结果卡路里</div>
        <div flex justify-between text-20 text-gray mtxs>
          <div>3 天前更新</div>
          <div>收藏</div>
        </div>
      </div>
      <div psm>
        <div line-clamp-2 text-27>
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
.card {
  border-radius: 24rpx;
  //   border: solid 1rpx #c3c3c3;
  //   overflow: hidden;

  position: relative;
  &::after {
    content: ' ';
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border: 1rpx solid #c3c3c3;
    // border-radius: 12rpx;
    transform: scale(0.5);
    transform-origin: 0 0;
    box-sizing: border-box;
    border-radius: inherit;
    z-index: 1;
    pointer-events: none;
  }
}
.ff:first-child {
  overflow: hidden;
  border-radius: 12rpx 12rpx 0 0;
}
.row1 {
  > div > div,
  > view > view {
    height: 35rpx;
    background: #fdfdfd;
    // border: 1rpx solid rgba(89, 89, 89, 0.36);
    box-sizing: border-box;
    @apply flex-center;

    position: relative;

    &::after {
      content: ' ';
      width: 200%;
      height: 200%;
      position: absolute;
      top: 0;
      left: 0;
      border: 1rpx solid #d9d9d9;
      transform: scale(0.5);
      transform-origin: 0 0;
      box-sizing: border-box;
      border-radius: inherit;
      z-index: 1;
      pointer-events: none;
    }
  }
  .tag {
    border-radius: 10rpx;
    font-size: 17rpx;
    padding: 0 17rpx;
    margin-right: 10rpx;
    color: #656565;
  }
  .more {
    width: 35rpx;
    &::after {
      border: none;
    }
  }
}
.title {
  font-weight: bold;
  opacity: 0.8;
}
</style>
