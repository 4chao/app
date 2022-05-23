<template>
  <div absolute-center>
    <div class="dot">加载思潮&nbsp;</div>
  </div>
</template>

<script setup lang="ts">
let { size = 40 } = defineProps<{ size?: number }>()
let s = $computed(() => uni.upx2px(size) / 12)
</script>

<style lang="scss">
$s: v-bind(s);

.dot {
  font-size: 12px;
  height: 12px;
  line-height: 12px;
  font-weight: bold;
  overflow: hidden;
  transform: scale($s);
  animation: shine 4s infinite reverse;
  &::after {
    display: inline-table;
    white-space: pre;
    content: '\A.\A..\A...';
    animation: spin 2s steps(4) infinite;
  }
}

@keyframes spin {
  to {
    -webkit-transform: translateY(-48px);
    transform: translateY(-48px);
  }
}

@keyframes shine {
  0% {
    color: #bbc7d4;
  }
  50% {
    color: #8098b3;
  }
  100% {
    color: #bbc7d4;
  }
}
</style>
