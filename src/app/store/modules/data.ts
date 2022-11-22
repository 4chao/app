import { Store, Pinia, Persist } from '../utils'

@Store
export class Data extends Pinia {
  @Persist
  indexList: AwaitedReturnUnwarpPage<typeof api.getProjectPage>[] = []
}
