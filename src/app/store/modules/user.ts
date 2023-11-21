import { Store, Pinia, Persist } from '../utils'

@Store
export class User extends Pinia {
  baseUrl = import.meta.env.VITE_BASE_URL
  @Persist
  userInfo: LoginUserDto = {
    uuid: '',
    email: '',
    phone: '',
    username: '',
    gender: '',
    token: null,
  }
  get token() {
    return this.userInfo.token
  }
  get isLogin() {
    return !!this.userInfo.token
  }

  async login(options: Parameters<typeof api.login>[0]) {
    let data = await api.login(options)
    this.userInfo = data as LoginUserDto
    uni.$emit('$reload')
  }
  async register(options: Parameters<typeof api.register>[0]) {
    let data = await api.register(options)
    this.userInfo = data as LoginUserDto
    uni.$emit('$reload')
  }
}
