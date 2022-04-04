<template>
  <meta title="登录" />
  <div flex-center-col pt100>
    <u-input v-model="email" placeholder="账号" inputAlign="center" />
    <u-input v-model="password" placeholder="密码" inputAlign="center" />
    <button @click="app.User.login({ email, password })">登录</button>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@/hooks'
const { data } = $(useQuery())
const email = $ref('')
const password = $ref('')
</script>

<style lang="scss">
.icon {
  background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
}
</style>
