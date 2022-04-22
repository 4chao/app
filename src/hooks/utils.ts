import { WritableComputedRef } from 'vue'

export function useSwitch<T>(defaultValue: T = null): WritableComputedRef<T> & T {
  let a = $ref(defaultValue) as any
  return computed<T>({
    get: () => a,
    set: val => (a = toRaw(a) === val ? defaultValue : val),
  }) as any
}
