interface Events {
  CreateArticle: null
}

function $on<T extends keyof Events>(eventName: T, fn: (result?: Events[T]) => void) {
  ;(uni as any).$on(eventName, fn)
}

function $emit<T extends keyof Events>(eventName: T, param?: Events[T]) {
  ;(uni as any).$emit(eventName, param)
}

export default function () {
  Object.assign(app, { $on, $emit })
}

declare global {
  interface App {
    $on: typeof $on
    $emit: typeof $emit
  }
}
