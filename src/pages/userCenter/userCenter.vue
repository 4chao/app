<template>
  <meta hide />
  <div fixed :style="pdTop">用户中心</div>
  <button fixed top-200 @click="logout">退出登录</button>
  <Tabbar :index="2"></Tabbar>
</template>

<script setup lang="ts">
let top = $computed(() => {
  const { navBarHeight } = app.Global
  console.log('打印的是navBarHeight' + navBarHeight)
  const { statusBarHeight } = app.Global.systemInfo
  console.log('打印的是statusBarHeight' + statusBarHeight)
  return statusBarHeight + uni.upx2px(30) + 'px'
})
let pdTop = $ref('top:' + top)
const logout = () => {
  app.User.userInfo = {
    email: '',
    phone: '',
    username: '',
    gender: '',
    token: null,
  }
  app.to('/pages/user/login')
}
</script>

<style></style>
