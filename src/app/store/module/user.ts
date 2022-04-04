import { createModule, action } from 'vuex-class-component'

export class User extends createModule({
  namespaced: 'user',
}) {
  userInfo = {} as Awaited<ReturnType<typeof api.Login>>
  get token() {
    return this.userInfo.token
  }

  @action async login({ email, password }) {
    this.userInfo = await api.Login({ email, password })
  }
}
