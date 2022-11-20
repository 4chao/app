<template>
  <view transition-all @touchstart="wxsBiz.touchstart" @touchmove="wxsBiz.touchmove" @touchend="wxsBiz.touchend">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
// #ifdef never
let wxsBiz
// #endif
</script>
<script lang="ts">
//prettier-ignore
export default { methods: { active() { this.$emit('active'); uni.vibrateShort().catch(()=>{}) } } }
</script>

<script module="wxsBiz" lang="wxs">
var threshold = 50
function touchstart(event, ownerInstance) {
  // 触发事件的组件的ComponentDescriptor实例
  var instance = event.instance
  // wxs内的局部变量快照，此快照是属于整个组件的，在touchstart和touchmove事件中都能获取到相同的结果
  var state = instance.getState()
  if (state.disabled) return
  var touches = event.touches
  // 如果进行的是多指触控，不允许进行操作
  if (touches && touches.length > 1) return
  // 标识当前为滑动中状态
  state.moving = true
  state.new = true
  // 记录触摸开始点的坐标值
  state.startX = touches[0].pageX
  state.startY = touches[0].pageY
}

// 触摸滑动
function touchmove(event, ownerInstance) {
  // 触发事件的组件的ComponentDescriptor实例
  var instance = event.instance
  // wxs内的局部变量快照
  var state = instance.getState()

  var touches = event.touches
  var pageX = touches[0].pageX
  var pageY = touches[0].pageY
  var moveX = pageX - state.startX
  var moveY = pageY - state.startY

  // 移动的X轴距离大于Y轴距离，也即终点与起点位置连线，与X轴夹角小于45度时，禁止页面滚动
  if (Math.abs(moveX) > Math.abs(moveY) || Math.abs(moveX) > threshold) {
    event.preventDefault && event.preventDefault()
    event.stopPropagation && event.stopPropagation()
  }
  //   // 如果移动的X轴距离小于Y轴距离，也即终点位置与起点位置连线，与Y轴夹角小于45度时，认为是页面上下滑动，而不是左右滑动单元格
  if (Math.abs(moveX) < Math.abs(moveY)) {
    state.moving = false
    moveSwipeAction(null, instance, ownerInstance)
  }
  if (state.disabled || !state.moving) return
  if (Math.abs(moveX) > threshold && state.new) {
    state.new = false
    ownerInstance.callMethod('active')
  }
  moveSwipeAction(moveX, instance, ownerInstance)
}

// 触摸结束
function touchend(event, ownerInstance) {
  // 触发事件的组件的ComponentDescriptor实例
  var instance = event.instance
  // wxs内的局部变量快照
  var state = instance.getState()
  var touches = event.changedTouches ? event.changedTouches[0] : {}
  var pageX = touches.pageX
  var pageY = touches.pageY
  var moveX = pageX - state.startX

  moveSwipeAction(null, instance, ownerInstance)
}

function moveSwipeAction(moveX, instance, ownerInstance) {
  if (moveX === null)
    return instance.requestAnimationFrame(function () {
      instance.setStyle({
        // 设置translateX的值
        transition: 'transform 0.5s cubic-bezier(0,.63,.27,1)',
        transform: 'translateX(' + 0 + 'px)',
        '-webkit-transform': 'translateX(' + 0 + 'px)',
      })
    })
  //   let th = moveX > 0 ? threshold : -threshold
  //   if (Math.abs(moveX) > threshold) moveX = th + Math.atan((moveX - th) / 300) * 60
  moveX = Math.atan(moveX / 200) * 30
  // 设置菜单内容部分的偏移
  instance.requestAnimationFrame(function () {
    instance.setStyle({
      // 设置translateX的值
      transition: 'all 0.07s',
      transform: 'translateX(' + moveX + 'px)',
      '-webkit-transform': 'translateX(' + moveX + 'px)',
    })
  })
}

module.exports = {
  touchstart: touchstart,
  touchmove: touchmove,
  touchend: touchend,
}
</script>

<style lang="scss">
.highlight {
  transition: all 0.2s;
  opacity: 0;
  &.show {
    opacity: 1;
  }
}
</style>
