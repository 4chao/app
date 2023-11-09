import { App as VueApp } from 'vue'
import { map } from '@/api'

export const api = new Proxy(map, {
  get: function (target, name: string) {
    return request(target[name])
  },
})

function request(ins) {
  if (!ins) throw new Error('错误调用: ' + name)
  let { url, type } = ins
  return async (data, options = {}) => {
    url = url.replace(/\/{(.*?)}/g, (_, name) => {
      let val = data[name]
      delete data[name]
      return '/' + val
    })
    console.log(app.User.token)
    app.debug('发起请求', type, url, data)
    return new Promise((resolve, reject) => {
      uni.request({
        url: import.meta.env.VITE_PROXY_URL + app.User.baseUrl + url,
        method: type,
        data: data,
        timeout: 10000,
        sslVerify: false,
        header: {
          'MiaoA-User-Token': app.User.token,
        },
        success: ({ data: res }: any) => {
          if (res.code != '200') {
            uni.showToast({ title: res.message, icon: 'none' })
            app.error('请求失败', res.message)
            return reject(res.message)
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

type Types = 'update' | 'create' | 'delete' | 'get'
type WithMethod<T> = T extends { Get: infer P } ? T & P : T extends { Post: infer P } ? T & P : T
type FReq<Req, Res> = (req?: Partial<Req>) => Promise<Partial<Res>>

type APIs<K = keyof typeof map> = K extends infer Name
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

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
