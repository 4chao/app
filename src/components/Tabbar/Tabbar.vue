<template>
  <!-- 底部导航 -->
  <div class="tabbar" fixed bottom-0 w-screen flex justify-around items-center pt-14 pb-14>
    <div v-for="(item, i) in tabbarList" :key="item.path" class="tabbar-item" @click.stop="toPath(item)">
      <div v-if="item.text != ''" class="label" text-36 :style="index == i ? 'color:red' : 'color:#333333'">
        {{ item.text }}
      </div>
      <div v-if="item.icon != ''" class="img" w100 h100 relative style="border: 1px solid #797979; border-radius: 50%">
        <image :src="item.icon" w60 h60 absolute left-13 top-15></image>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  index: number
}>()
const { index } = props

const tabbarList = reactive([
  {
    text: '发现',
    icon: '',
    iconPath: '',
    path: '/pages/index/index',
    type: '1',
  },
  {
    text: '',
    icon: '../../static/img/create.jpg',
    iconPath: '../../static/img/create.jpg',
    path: '/pages/articleEdit/articleEdit',
    type: '2',
  },
  {
    text: '我的',
    icon: '',
    iconPath: '',
    path: '/pages/userCenter/userCenter',
    type: '1',
  },
])
const toPath = item => {
  if (item.type === '1') {
    uni.switchTab({
      url: item.path,
    })
  } else if (item.type === '2') {
    app.to(item.path)
  }
}
</script>

<style lang="scss"></style>
