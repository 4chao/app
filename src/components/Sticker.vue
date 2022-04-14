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
  mounted() {
    this.min = Number(this.$ownerInstance.$el.dataset.height)
    window.addEventListener('scroll', this.scrollHandler)
    window.addEventListener('touchstart', () => (this.focus = true))
    window.addEventListener('touchend', () => (this.focus = false))
  },
  methods: {
    propObserver(props) {
      console.log('props', props);
    },
    scrollHandler() {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    },
    setHeight(t) {
      this.$ownerInstance.$el.style.transition = t ? 'all 0.3s cubic-bezier(.15,.7,.35,1)' : 'none' // 'all  0.07s cubic-bezier(0,.6,.34,1)'
      this.$ownerInstance.$el.style.transform = 'translateY(' + this.height + 'px)'
    }
  }
}
</script>

<style lang="scss">
.test {
  transition: all 0.3s ease;
}
</style>
