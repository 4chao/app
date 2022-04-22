import { App as VueApp } from 'vue'
import { type IResult } from '@root/declare/APId'
import { map } from '@root/build/APIm'

export const api = new Proxy(map, {
  get: function (target, name: string) {
    function found(name, type?) {
      // app.log('found', name, type)
      if (!type && name in target) return target[name]
      if (!type && 'Post' + name in target) return target['Post' + name]
      if (!type && 'Get' + name in target) return target['Get' + name]
      if (type + name in target) return target[type + name]
      return null
    }
    function req(ins) {
      if (!ins) throw new Error('错误调用: ' + name)
      let { url, type } = ins
      return async (data, options = {}) => {
        let attr = /\/:([^\/]+)/g.exec(url)?.[1]
        if (attr) {
          url = url.replace(':' + attr, attr in data ? data[attr] : '')
          delete data[attr]
        }
        app.debug('发起请求', type, url, data)
        return new Promise((resolve, reject) => {
          uni.request({
            url: app.User.baseUrl + url,
            method: type,
            data: data,
            timeout: 3000,
            // header: {
            //   'Sichiao-User-Token': app.User.token,
            // },
            success: ({ data: res }: any) => {
              if (res.code != '31458') {
                uni.showToast({ title: res.message, icon: 'none' })
                app.error('请求失败', res.message)
                return reject(res)
              }
              app.success('请求成功', res.data)
              return resolve(res.data)
            },
            fail: err => {
              app.error('请求失败', err)
              return reject(err)
            },
            ...options,
          })
        })
      }
    }
    return new Proxy(function () {}, {
      get: (_, type) => req(found(name, type)),
      apply: (_, __, argumentsList: [any, any]) => req(found(name))(...argumentsList),
    })
  },
}) as unknown as UnionToIntersection<APIs>

export default function (vueApp: VueApp) {
  Object.assign(vueApp.config.globalProperties, { api })
  Object.assign(app, { api })
}

declare global {
  interface App {
    api: typeof api
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    api: typeof api
  }
}

type Types = 'Update' | 'Create' | 'Delete' | 'Get'
type WithMethod<T> = T extends { Get: infer P } ? T & P : T extends { Post: infer P } ? T & P : T
type FReq<Req, Res> = (req?: Partial<Req>) => Promise<Partial<Res>>

type APIs<K = keyof IResult> = K extends infer Name
  ? Name extends `${infer U}Req`
    ? U extends `${Types}${infer Key}`
      ? U extends `${infer Type}${Key}`
        ? //@ts-expect-error `${U}Req`无法被约束为IResult的索引类型
          { [k in Key]: WithMethod<{ [m in Type]: FReq<IResult[`${U}Req`], IResult[`${U}Res`]> }> }
        : never
      : //@ts-expect-error `${U}Req`无法被约束为IResult的索引类型
        { [k in U]: WithMethod<{ Post: FReq<IResult[`${U}Req`], IResult[`${U}Res`]> }> }
    : never
  : never

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never
