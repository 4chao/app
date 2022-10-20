import { WritableComputedRef } from 'vue'

export function use<T>(fn: () => T) {
  return new Promise<T>(r => watchEffect(() => fn() && r(fn())))
}

export function useSwitch<T>(defaultValue: T = null): WritableComputedRef<T> & T {
  let a = $ref(defaultValue) as any
  return computed<T>({
    get: () => a,
    set: val => (a = toRaw(a) === val ? defaultValue : val),
  }) as any
}
