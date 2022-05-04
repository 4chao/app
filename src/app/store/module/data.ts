import { createModule, action } from 'vuex-class-component'

export class Data extends createModule({
  namespaced: 'data',
}) {
  indexList = [] as AwaitedReturnUnwarpPage<typeof api.getProjectPage>[]
}
