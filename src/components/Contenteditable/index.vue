<template>
  <div :placeholder="placeholder" class="content" contenteditable>{{ value }}</div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
const { placeholder = '', ...props } = defineProps<{
  modelValue?: string
  placeholder?: string
}>()
const emit = defineEmits(['update:modelValue'])
const value = useVModel(props, 'modelValue', emit)
</script>

<script lang="ts">
export default {
  methods: {
    onInput(e: string) {
      this.$emit('update:modelValue', e)
    },
  },
}
</script>

<script module="render" lang="renderjs">

export default {
  mounted() {
    this.$ownerInstance.$el.addEventListener('keyup', () => {
      console.log('keyup',this.$ownerInstance.$el.innerText );
      this.$ownerInstance.callMethod('onInput' ,this.$ownerInstance.$el.innerText)
    })
  },
}
</script>

<style lang="scss">
.content {
  height: 1em;
  line-height: 1;
  outline: none;
  &:empty:before {
    content: attr(placeholder);
    color: #ccc;
  }
  &:empty:focus:before {
    color: #eee;
  }
}
</style>
