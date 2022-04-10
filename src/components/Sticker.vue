<template>
  <!-- #ifndef MP -->
  <view id="sticker" :data-height="back" style="willchange: transform">
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
defineProps({ back: { default: 40 } })

// #ifdef never
let renderBiz: any
// #endif
</script>

<script module="renderBiz" lang="renderjs">
export default {
  data() {
    return {
      scrollTop: 0,
      min: 0,
      max: 0,
      focus: true,
      height: 12,
    }
  },
  mounted() {
    this.min = Number(this.$ownerInstance.$el.dataset.height)
    window.addEventListener("scroll", this.scrollHandler)
    window.addEventListener("touchstart", () => (this.focus = true))
    window.addEventListener("touchend", () => (this.focus = false))
  },
  watch: {
    focus(val) {
      if (val) return
      this.height = (Math.abs(this.height - this.min) < Math.abs(this.height - this.max) ? this.min : this.max)
      this.setHeight(true)
    },
    scrollTop(y1, y2) {
      if (y1 <= 0) return (this.height = this.max), this.setHeight(true)
      if (!this.focus) return
      this.height += (y2 - y1) || 0
      this.height < this.min && (this.height = this.min)
      this.height > this.max && (this.height = this.max)
      this.setHeight(false)
    }
  },
  methods: {
    propObserver(props) {
      console.log('props', props);
    },
    scrollHandler() {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    },
    setHeight(t) {
      this.$ownerInstance.$el.style.transition = t ? 'all 0.3s ease' : 'none' // 'all  0.07s cubic-bezier(0,.6,.34,1)'
      this.$ownerInstance.$el.style.transform = 'translateY(' + this.height + 'px)'
    }
  }
}
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
    transition: t ? 'all 0.3s ease' : 'all 0.05s cubic-bezier(0,.6,.34,1)',
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
