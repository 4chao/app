import { ToRefs } from 'vue'
import { PageParams, definePage, ParamsType } from '@/types'

type QueryDefaultData<T> = Omit<PageParams, 'params'> & { params: T & AObjectHasAnyKeys }
/**
 * 获得当前页面跳转携带的参数和信息
 * (依赖 app.to )
 * @param fn 函数时为回调函数,其他为默认返回值
 */
export function useQuery<T extends definePage>(fn?: T[typeof ParamsType]): ToRefs<QueryDefaultData<T[typeof ParamsType]>>
export function useQuery<T extends definePage>(fn?: (params: T[typeof ParamsType]) => void): ToRefs<PageParams>
export function useQuery<T>(fn?: (params: T) => void | T) {
  let isF = typeof fn === 'function'
  const query = reactive<{ params?: any; id?: string; from?: string }>({
    params: isF ? {} : fn,
    id: null,
    from: null,
  })

  Promise.do(async () => {
    if (!getCurrentPages().pop()?.['$page']?.fullPath) await new Promise(r => onLoad(r))
    let id = getCurrentPages().pop()['$page'].fullPath.split('?id=')[1]
    uni.$emit(id + '_query', pkg => Object.assign(query, pkg))
    isF && fn(query.params)
  }).catch(err => app.error('参数获取失败', err))

  return toRefs(query)
}

import { Mescroll } from '@/types'
import { RefValue } from 'vue/macros'
export const ScrollSymbol = Symbol('mescroll')
export interface ScrollOptions {
  mescroll?: RefValue<Mescroll>
  enable: 'none' | 'up' | 'down' | 'all'
  fetch: (mescroll: Mescroll) => void
}
/**
 * 上拉加载,下拉刷新
 *
 * @example
 * useScroll(onPageScroll)
 *   .onLoad((page) => {
 *     page.endSuccess()
 *   })
 */
export function useScroll(onPageScroll?: typeof import('@dcloudio/uni-app')['onPageScroll']) {
  let Load
  let Fetch = page => setTimeout(() => page.endSuccess(10, false), 1000) as any
  let Time = +new Date()
  let loading = ref(true)
  let ready = ref(false)
  let error = ref(null)
  const scrollOptions = reactive<ScrollOptions>({
    enable: 'all',
    mescroll: null,
    fetch: async page => {
      let track = []

      if (mescroll.num == 0) {
        loading.value = true
        Time = +new Date()
        page.time = Time
        track.push(Load?.(page))
      }
      page.time = Time
      track.push(Fetch?.(page))
      try {
        await Promise.all(track)
      } catch (err) {
        error.value = err || '未知错误'
        page.endErr('加载失败')
        console.error(error)
      }
      loading.value = false
      await Promise.wait(300)
      ready.value = true
    },
  })
  provide(ScrollSymbol, scrollOptions)
  let { mescroll, fetch, enable } = $(scrollOptions)
  onPageScroll?.(e => mescroll && mescroll.onPageScroll(e))
  onReachBottom(() => mescroll && mescroll.onReachBottom())
  onPullDownRefresh(() => mescroll && mescroll.onPullDownRefresh())

  const o = {
    onLoad: (cb: (mescroll: Mescroll) => void) => ((Load = cb), o),
    onFetch: (cb: (mescroll: Mescroll) => void) => ((Fetch = cb), o),
    enable: (type: ScrollOptions['enable']) => ((enable = type), o),
    mescroll: $$(mescroll),
    loading,
    ready,
    error,
  }
  return o
}

export function useSystemInfo() {
  let systemInfo = reactive({})
  onReady(async () => {
    Object.assign(systemInfo, await uni.getSystemInfo())
  }, getCurrentInstance().root)
  return systemInfo
}
