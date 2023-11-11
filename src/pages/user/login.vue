<template>
  <meta title="登录" />
  <div flex-center style="overflow: hidden">
    <div thin mt2xl mb5xl w640>
      <div py pl bg-hex-f6f8fa flex>
        <div flex-1>
          <div text-35 font-bold>欢迎来到思潮</div>
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
          <div v-else flex-center-col>
            <span mbxs text-gray text-20>已拥有账号?</span>
            <span text-hex-1989C8 text-27>点此登录</span>
          </div>
        </div>
      </div>
      <div ptlg pxxl>
        <div v-if="isLogin" mblg>
          <div text-25 mb4>邮箱</div>
          <uni-easyinput v-model="account" />
        </div>

        <div v-if="!isLogin" mblg>
          <div text-25 mb4>邮箱</div>
          <uni-easyinput v-model="account" />
        </div>
        <Code ref="Coder" @change="tip = $event"></Code>
        <!--               <div v-if="!isLogin" mblg>
          <div text-25 mb4>邮箱</div>
          <div flex-center justify-end>
            <uni-easyinput v-model="email">
              <template #right>
                <div h50 w180 pyxs bg-hex-f6f8fa text-hex-6991c7 flex-center thin-12-6991c7 text-23 mr5px @click="getCode('邮箱', email)">
                  {{ tip }}
                </div>
              </template>
            </uni-easyinput>
          </div>
        </div> -->

        <div mblg>
          <div text-25 mb4>密码</div>
          <uni-easyinput v-model="password" type="password" />
        </div>
        <div v-if="!isLogin" mblg>
          <div text-25 mb4>重复密码</div>
          <uni-easyinput v-model="repeatPassword" type="password" />
        </div>
        <div v-if="!isLogin" mblg>
          <div text-25 mb4>验证码</div>
          <div flex h-56>
            <CodeInput v-model="code" mode="box" :space="0" :maxlength="6" hairline></CodeInput>
            <button type="primary" plain="true" style="line-height: 60rpx; width: 180rpx" @click="getCode">发送验证码</button>
          </div>
        </div>
      </div>

      <div mt3xl plg flex justify-between>
        <div v-if="isLogin" text-25 self-end text-hex-1989C8>忘记密码</div>
        <div v-else></div>
        <div rounded-12 text-white pysm px3xl bg-hex-6991c7 @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Code from './components/Code.vue'
import CodeInput from './components/CodeInput.vue'
const { from } = $(useQuery())

let isLogin = $ref(true)

let account = $ref('')
let email = $ref('2490445193@qq.com')
let code = $ref<number>()
let password = $ref('')
let username = $ref('')
let repeatPassword = $ref('')
let agree = $ref(false)

watchEffect(() => uni.setNavigationBarTitle({ title: isLogin ? '登录' : '注册' }))

let tip = $ref('')

async function submit() {
  if (!agree) return app.toast('请先阅读并同意服务条款')
  if (isLogin) {
    if (!account) return app.toast('请输入账号')
    if (!password) return app.toast('请输入密码')
    await app.User.login({ account, password, authType: 'PASSWORD' })
    app.back('登录成功')
  } else {
    if (!account) return app.toast('请输入邮箱')
    if (!password) return app.toast('请输入密码')
    if (!repeatPassword) return app.toast('请重复输入密码')
    if (password !== repeatPassword) return app.toast('两次密码不一致')
    if (!code) return app.toast('请输入验证码')
    await app.User.register({ account, password, code })
    app.back('登录成功')
    // app.to('#user/afterRegister', { from })
  }
}

let Coder = $ref(null)
watchEffect(() => console.log(Coder))
const getCode = async () => {
  let data = await api.getCode({
    account: account,
  })
  console.log(data)
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
