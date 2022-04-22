import { createModule, action } from 'vuex-class-component'

// #ifdef H5
var baseUrl = import.meta.env.VITE_BASE_URL
// #endif
// #ifndef H5
var baseUrl = import.meta.env.VITE_PROXY_URL
// #endif
export class User extends createModule({
  namespaced: 'user',
}) {
  baseUrl = baseUrl
  userInfo = { token: '12345' } as Awaited<ReturnType<typeof api.Login>>
  get token() {
    return this.userInfo.token
  }
  get isLogin() {
    return !!this.userInfo.token
  }

  @action async login(options: Parameters<typeof api.Login>[0]) {
    this.userInfo = await api.Login(options)
    uni.$emit('$reload')
  }
  @action async register(options: Parameters<typeof api.Register>[0]) {
    this.userInfo = await api.Register(options)
    uni.$emit('$reload')
  }
}
