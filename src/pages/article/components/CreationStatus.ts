import { useSwitch } from '@/hooks'
import { Ref, ShallowUnwrapRef } from 'vue'

function StatusFactory() {
  return {
    //创作数据
    Meta: {} as Awaited<ReturnType<typeof api.Project>>,
    Sections: [] as Section[],
    //状态机
    editMode: false,
    SectionHighlight: useSwitch<Section>(),
    SectionActive: useSwitch<Section>(),
    SectionEditing: useSwitch<Section>(),
    CommentShow: false,
  }
}
export type Section = Awaited<ReturnType<typeof api.ProjectParagraphPage>>['data'][0]
export type Status = ReturnType<typeof StatusFactory>
const tag = Symbol('creationStatus')

export function initCreationStatus(options: Partial<Status> = {}) {
  const status = reactive({
    ...StatusFactory(),
    ...options,
  })
  provide(tag, status)

  return status
}

export function useCreationStatus() {
  const status = inject<Status>(tag)
  return status
}
