import { createModule, action } from 'vuex-class-component'

var baseUrl = import.meta.env.VITE_BASE_URL

export class User extends createModule({
  namespaced: 'user',
}) {
  baseUrl = baseUrl
  userInfo = { token: '12345' } as Awaited<ReturnType<typeof api.login>>
  get token() {
    return this.userInfo.token
  }
  get isLogin() {
    return !!this.userInfo.token
  }

  @action async login(options: Parameters<typeof api.login>[0]) {
    this.userInfo = await api.login(options)
    uni.$emit('$reload')
  }
  @action async register(options: Parameters<typeof api.register>[0]) {
    this.userInfo = await api.register(options)
    uni.$emit('$reload')
  }
}
