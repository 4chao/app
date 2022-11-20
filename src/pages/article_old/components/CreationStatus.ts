function StatusFactory() {
  return {
    //创作数据
    Meta: {} as AwaitedReturn<typeof api.getProject>,
    Sections: [] as Section<any>[],
    //状态机
    editMode: false,
    SectionHighlight: useSwitch<Section>(),
    SectionActive: useSwitch<Section>(),
    SectionEditing: useSwitch<Section>(),
    CommentShow: false,
  }
}
export type Section<T = TextDto> = AwaitedReturnUnwarpPage<typeof api.getProjectParagraph> & { component: T }
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
