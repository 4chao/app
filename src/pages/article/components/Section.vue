<template>
  <SectionSlide @active="SectionActive = data">
    <div pxlg pblg @click="SectionHighlight = data">
      <div relative text-35 break-all>
        {{ data.component.content }}
        <div class="highlight" :class="{ show: SectionHighlight === data }" absolute top-full left-0 text-24 text-gray flex-center>
          {{ data.uuid }}
        </div>
      </div>
    </div>
  </SectionSlide>
</template>

<script setup lang="ts">
import SectionSlide from './SectionSlide.vue'
import {} from '@/hooks'
import { useCreationStatus, Section } from './CreationStatus'
let { SectionActive, SectionHighlight } = $(useCreationStatus())
let { data } = defineProps<{
  data: Section
}>()
</script>

<style lang="scss">
.highlight {
  transition: all 0.1s;
  opacity: 0;
  &.show {
    opacity: 1;
  }
}
</style>
