<template>
  <!-- #ifndef MP -->
  <view
    :change:scrollTop="wxsBiz.onScroll"
    :scrollTop="scrollTop"
    :change:limit="wxsBiz.limit"
    :limit="limit.join(',')"
    :change:focus="wxsBiz.focus"
    :focus="focus"
  >
    <slot></slot>
  </view>
  <!-- #endif -->
  <!-- #ifdef MP -->
  <view>
    <slot></slot>
  </view>
  <!-- #endif -->
</template>

<script setup lang="ts">
// #ifdef never
let wxsBiz
// #endif
const props = defineProps({
  limit: { default: () => [-40, 0] },
  focus: { default: true },
})
let scrollTop = $ref(0)
// #ifndef MP
onPageScroll(e => (scrollTop = e.scrollTop))
// #endif
</script>

<script module="wxsBiz" lang="wxs">

var h = 0
var min, max,f
function limit(limit) {
  if (!limit) return
  [min, max] = limit.split(',').map(Number)
}
function focus(focus,_,ins) {
  if (focus === undefined) return
  f = focus
  if(f) return
  h = (Math.abs(h - min) < Math.abs(h - max) ? min : max)
  setH(ins,true)
}
function onScroll(y1, y2, ins) {
  if(y1 <= 0)return (h = max),setH(ins,true)
  if(!f) return
  h += (y2 - y1) || 0
  h < min && (h = min)
  h > max && (h = max)
  setH(ins,false)
}
  function setH(ins,t){
  ins.setStyle({
    transition: t ? 'all 0.3s ease' : 'none',
    'will-change': 'transform',
    transform: 'translateY(' + h + 'px)',
  })
}
module.exports = { onScroll: onScroll, limit: limit,focus:focus }
</script>

<style lang="scss">
.test {
  transition: all 0.3s ease;
}
</style>
