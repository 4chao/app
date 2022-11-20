<template>
  <div class="group" mbxl>
    <div flex-center px relative mb>
      <Contenteditable v-model="name" placeholder="未命名分组" text-56 font-bold />
      <div border="t-dashed hex-e8e8e8" flex-1 mx></div>
      <div i-ri-menu-4-line text-56 text-gray></div>
    </div>
    <div contents>
      <Paragraph v-for="(paragraph, i) in context.paragraph" :key="i" :context="paragraph"></Paragraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Paragraph from './Paragraph.vue'
let name = $ref('')
const { context } = defineProps<{
  context: any // TODO 补全类型
}>()
watchEffect(() => {
  console.log('group name', name)
})
</script>

<style lang="scss" scoped>
.group {
  .inputContainer {
    position: relative;
    height: 70rpx;

    input {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translate(0, -50%);
      font: inherit;
      background-color: #fff;
    }
  }
}
</style>
