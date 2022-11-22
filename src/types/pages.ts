export declare const ParamsType: unique symbol
export declare const ReturnType: unique symbol
export type definePage<P extends RecordAny = {}, R extends RecordAny = {}> = {
  [ParamsType]: Partial<P>
  [ReturnType]: Partial<R>
}

export type PageArticle = definePage<ProjectDto>
