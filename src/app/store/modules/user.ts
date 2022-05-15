import { Store, Pinia, Persist } from '../utils'

@Store
export class User extends Pinia {
  baseUrl = import.meta.env.VITE_BASE_URL
  userInfo = { token: '12345' } as Awaited<ReturnType<typeof api.login>>
  get token() {
    return this.userInfo.token
  }
  get isLogin() {
    return !!this.userInfo.token
  }

  async login(options: Parameters<typeof api.login>[0]) {
    this.userInfo = await api.login(options)
    uni.$emit('$reload')
  }
  async register(options: Parameters<typeof api.register>[0]) {
    this.userInfo = await api.register(options)
    uni.$emit('$reload')
  }
}
