<template>
  <meta title="登录" />
  <u-code ref="uCode" :seconds="seconds" @change="tip = $event"></u-code>
  <div flex-center>
    <div thin mt2xl mb5xl w640>
      <div py pl bg-hex-f6f8fa flex>
        <div flex-1>
          <div text-35 text-bold>欢迎来到思潮</div>
          <div pysm text-23>
            <div flex-center justify-start>
              <div w10 h10 mrxs i-ri-checkbox-blank-circle-fill></div>
              <span>请先阅读:</span>
            </div>
            <div ml-50 mtxs>
              <div text-hex-1989C8>《思潮用户服务协议》</div>
              <div text-hex-1989C8>《思潮隐私声明》</div>
            </div>
          </div>
          <div mtsm flex-center justify-start @click="agree = !agree">
            <div class="radio" :class="{ checked: agree }"></div>
            <div text-23>我已阅读并同意上述服务条款</div>
          </div>
        </div>
        <div w1 h100 bg-hex-929292 self-end mbxlsm></div>
        <div flex-center-col pxlg justify-between @click="isLogin = !isLogin">
          <div>logo</div>
          <div v-if="isLogin" flex-center-col>
            <span mbxs text-gray text-20>还没有账号?</span>
            <span text-hex-1989C8 text-27>点此注册</span>
          </div>
          <div v-else text-20 flex-center-col>
            <span mbxs text-gray text-20>已拥有账号?</span>
            <span text-hex-1989C8 text-25>点此登录</span>
          </div>
        </div>
      </div>
      <div ptlg pxxl>
        <div v-if="isLogin" mblg>
          <div text-25 mb4>手机号 / 邮箱 / 用户名</div>
          <u-input v-model="loginAccount" />
        </div>

        <div v-if="!isLogin" mblg>
          <div text-25 mb4>用户名</div>
          <u-input v-model="username" />
        </div>
        <div v-if="!isLogin" mblg>
          <div text-25 mb4>邮箱</div>
          <div flex-center justify-end>
            <u-input v-model="email">
              <template #suffix>
                <div
                  h50
                  w180
                  pyxs
                  bg-hex-f6f8fa
                  text-hex-6991c7
                  flex-center
                  thin-12-6991c7
                  text-23
                  @click="getCode(email)"
                >
                  {{ tip }}
                </div>
              </template>
            </u-input>
          </div>
        </div>

        <div mblg>
          <div text-25 mb4>密码</div>
          <u-input v-model="password" />
        </div>
        <div v-if="!isLogin" mblg>
          <div text-25 mb4>重复密码</div>
          <u-input v-model="repeatPassword" />
        </div>
        <div v-if="!isLogin" mblg>
          <div text-25 mb4>验证码</div>
          <u-code-input v-model="code" mode="box" :space="0" :maxlength="5" hairline></u-code-input>
        </div>
      </div>

      <div mt3xl plg flex justify-between>
        <div v-if="isLogin" text-25 self-end text-hex-1989C8>忘记密码</div>
        <div v-else></div>
        <div
          rounded-12
          text-white
          pysm
          px3xl
          bg-hex-6991c7
          @click="app.User.login({ email, password })"
        >
          提交
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@/hooks'
const { data } = $(useQuery())

let isLogin = $ref(true)

let loginAccount = $ref('')
let email = $ref('')
let code = $ref('')
let password = $ref('')
let username = $ref('')
let repeatPassword = $ref('')
let agree = $ref(false)

watchEffect(() => uni.setNavigationBarTitle({ title: isLogin ? '登录' : '注册' }))

let seconds = $ref(5)
let tip = $ref('')

async function submit() {
  if (!agree) return uni.$u.toast('请先阅读并同意服务条款')
  if (isLogin) {
    if (!loginAccount) return uni.$u.toast('请输入账号')
    if (!password) return uni.$u.toast('请输入密码')
    await app.User.login({ email: loginAccount, password })
    app.back()
  } else {
    if (!username) return uni.$u.toast('请输入用户名')
    if (!email) return uni.$u.toast('请输入邮箱')
    if (!password) return uni.$u.toast('请输入密码')
    if (!repeatPassword) return uni.$u.toast('请重复输入密码')
    if (password !== repeatPassword) return uni.$u.toast('两次密码不一致')
    if (!code) return uni.$u.toast('请输入验证码')
    await app.User.login({ email: loginAccount, password })
    // TODO: 注册成功需要完善个人信息
  }
}
</script>

<script lang="ts">
export default {
  methods: {
    getCode(email) {
      if (!this.$refs.uCode.canGetCode) return uni.$u.toast('倒计时结束后再发送')
      uni.showLoading({ title: '正在获取验证码' })

      app.api
        .VerificationCode({ email })
        .then(() => (uni.hideLoading(), this.$refs.uCode.start()))
        .catch(() => (uni.hideLoading(), uni.$u.toast('获取失败,请稍后重试')))
    },
  },
}
</script>

<style lang="scss">
.radio {
  height: 28rpx;
  width: 28rpx;
  margin-right: 14rpx;
  border-radius: 50%;
  border: 1rpx solid #c8d6e0;
  background: transparent;
  background-color: #fff;
  &.checked {
    border: 8rpx solid #9ac2ff;
  }
}
</style>
