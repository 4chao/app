<template>
  <div></div>
</template>

<script setup lang="ts">
const UniqueKey = 'is-running'

let {
  wait = 60,
  keep = true,
  startText = '获取验证码',
  waitingText = 'x秒重新获取',
  endText = '重新获取',
} = defineProps<{
  wait?: number
  keep?: boolean
  startText?: string
  waitingText?: string
  endText?: string
}>()
const emit = defineEmits(['change'])

let startTimestamp = $ref<number>(keep ? uni.getStorageSync(UniqueKey) : 0)
let text = $ref(startText)
let num = $ref(wait)
let timer = $ref(null)

function start() {
  clearInterval(timer)
  startTimestamp = +new Date()
  tick()
  timer = setInterval(tick, 1000)
}

function recover() {
  tick()
  timer = setInterval(tick, 1000)
}

function tick() {
  if (num <= 0) {
    clearInterval(timer)
    text = endText
    num = wait
    startTimestamp = 0

    return
  }
  text = waitingText.replace('x', String(num--))
}

if (startTimestamp) (num = wait - Math.ceil((+new Date() - startTimestamp) / 1000)), recover()
watch($$(startTimestamp), () => keep && uni.setStorageSync(UniqueKey, startTimestamp))
watchEffect(() => emit('change', text))
watchEffect(() => console.log('num', num))
onUnload(() => clearInterval(timer))

let waiting = $computed(() => !!startTimestamp)

defineExpose({
  start,
  waiting: $$(waiting),
  text: $$(text),
})
</script>

<style lang="scss"></style>
