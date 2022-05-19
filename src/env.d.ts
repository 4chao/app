/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

type Is<T> = T
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare namespace UniApp {
  interface Uni {}
}

type func<P extends any[] = any[], R = any> = (...args: P) => R

type Get<T extends {}, K> = K extends keyof T ? T[K] : never
type MaybeArray<T> = [T] extends [unknown[]] ? T : T | T[]
type Promisify<T> = Promise<T extends Promise<infer S> ? S : T>
type Awaitable<T> = [T] extends [Promise<unknown>] ? T : T | Promise<T>
type Intersect<U> = (U extends any ? (arg: U) => void : never) extends (arg: infer I) => void ? I : never

type AObjectHasAnyKeys = { [key in any]: any }
type AwaitedReturn<T extends (...args: any) => any> = Partial<Awaited<ReturnType<T>>>
type AwaitedReturnUnwarpPage<T extends (...args: any) => any> = Partial<Awaited<ReturnType<T>>['data'][0]>
