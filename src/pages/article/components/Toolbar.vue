<template>
  <div class="toolbar">
    <div class="actions">
      <template v-if="published">
        <div class="publish">
          发布
          <div mlxs><div i-ri-share-forward-2-fill></div></div>
        </div>
        <div class="share">
          <div><div i-ri-user-add-line></div></div>
        </div>
      </template>
      <template v-else>
        <div bg-white flex-center pxsm prlg>
          <div v-for="i in 3" :key="i" w-100 flex-center>
            <uni-badge
              size="small"
              text="10k"
              absolute="rightTop"
              :offset="[2, 4]"
              :max-num="NaN"
              :custom-style="{
                backgroundColor: '#fff',
                color: '#000',
                borderRadius: '0',
                padding: '0 4rpx',
              }"
            >
              <div v-if="i == 1" i-ri-chat-3-line w50 h50></div>
              <div v-if="i == 2" i-ri-heart-3-line w50 h50></div>
              <div v-if="i == 3" i-ri-inbox-line w50 h50></div>
            </uni-badge>
          </div>
        </div>
      </template>
    </div>
    <div w40></div>
    <Draggable @on-panend="emit('new-paragraph', $event)">
      <div class="fab">
        <div i-fluent-add-28-regular w59 h59></div>
      </div>
    </Draggable>
    <div class="fabBack">
      <div><div i-ri-close-line w39 h39></div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['new-paragraph'])

let published = $ref(false)
</script>

<style lang="scss">
$zIndex: 900;

.toolbar {
  position: fixed;
  z-index: $zIndex;
  right: 50rpx;
  bottom: 50rpx;
  @apply flex-center;

  .actions {
    min-width: 100rpx;
    height: 100rpx;
    box-shadow: 0px 2px 20px 1px rgba(0, 0, 0, 0.1);
    @apply rounded-full overflow-hidden;
    @apply flex-center;
    > div {
      height: 100%;
      min-width: 100rpx;
      @apply flex-center;
    }

    .publish {
      width: 200rpx;
      @apply bg-brand-pri text-white;
      @apply flex-center;
    }
    .share {
      width: 100rpx;
      background-color: #f2f8ff;
      @apply text-brand-pri;
    }
  }

  .fab {
    width: 100rpx;
    height: 100rpx;
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.15);
    @apply bg-brand-pri text-white;
    @apply rounded-full;
    @apply flex-center;
    z-index: 9999;
  }

  .fabBack {
    position: absolute;
    width: 100rpx;
    height: 100rpx;
    @apply right-0;
    @apply flex-center;
    z-index: -1;
    > div {
      width: 75rpx;
      height: 75rpx;
      background-color: #616161;
      @apply text-white;
      @apply rounded-full;
      @apply flex-center;
    }
  }
}
</style>
