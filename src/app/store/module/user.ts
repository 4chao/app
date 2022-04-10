import { createModule, action } from 'vuex-class-component'

export class User extends createModule({
  namespaced: 'user',
}) {
  userInfo = {} as Awaited<ReturnType<typeof api.Login>>
  get token() {
    return this.userInfo.token
  }

  @action async login(options: Parameters<typeof api.Login>[0]) {
    this.userInfo = await api.Login(options)
  }
  @action async register(options: Parameters<typeof api.Register>[0]) {
    this.userInfo = await api.Register(options)
  }
}
