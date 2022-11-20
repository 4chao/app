<template>
  <div class="paragraph" :class="{ new: isNew }">{{ context }}</div>
</template>

<script lang="ts" setup>
const { context } = defineProps<{
  context: any // TODO 补全类型
}>()
let isNew = $ref(false)
onMounted(() => {
  isNew = context.new
})
</script>

<style lang="scss">
@keyframes in {
  from {
    height: 0;
  }
  to {
    height: 300rpx;
  }
}
.paragraph {
  // min-height: 300rpx;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0px 0px 50rpx rgba(0, 0, 0, 0.1);
  border-radius: 12rpx;
  &.new {
    animation: in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
}
</style>
