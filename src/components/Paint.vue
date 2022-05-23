<template>
  <span></span>
</template>

<script setup lang="ts"></script>

<script module="render" lang="renderjs">
if (!document.body.classList.value?.includes('smooth') && 'CSS' in window && 'paintWorklet' in CSS) {
    CSS['paintWorklet'].addModule('./static/smooth-corners.js').then(() => {
        console.log('paintWorklet loaded')
        document.body.classList.add('smooth-enable')
    }).catch(() => {
        console.log('当前环境不支持paintWorklet')
        document.body.classList.add('smooth-failed')
    })
}
export default {}
</script>

<style lang="scss"></style>
