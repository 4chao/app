export declare const ParamsType: unique symbol
export declare const ReturnType: unique symbol
export type definePage<P extends RecordAny = {}, R extends RecordAny = {}> = {
  [ParamsType]: P
  [ReturnType]: R
}

export type PageArticle = definePage<{
  /**
   * 项目id, 不传视为新建
   */
  id?: number
  data?: ProjectDto
}>
