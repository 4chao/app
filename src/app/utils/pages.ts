import { debounce, DebouncedFuncLeading } from 'lodash'
import USID from 'usid'
const usid = new USID()

export function getPath(p: string, currentGroup: string) {
  let [group, path] = Array.from(p.match(/^(?:#(.*?)(?:\/|$))?(.*)$/)).slice(1)
  if (group === undefined) return path
  else return `/pages/${group || currentGroup}/${path || 'index'}`
}

let to = debounce(
  (path: string, obj?: any) => {
    const currentPath = getCurrentPages().pop()['route']
    const currentGroup = currentPath.split('/')[1]
    const id = usid.uuid()

    const pkg = { data: obj, from: currentPath, id }
    uni.$on(id + '_query', cb => cb(pkg))
    let url = getPath(path, currentGroup)
    uni
      .navigateTo({ url: url + '?id=' + id })
      .then(() => app.info('页面切换', obj || '', '=>', path == url ? path : `${path} (${url})`))
      .catch(err => app.error('页面切换失败', '=>' + path, err))
    return new Promise<any>((r, e) => (uni.$once(id + '_resolve', r), uni.$once(id + '_reject', e)))
  },
  50,
  { leading: true, trailing: false },
)

const back = debounce(
  (data?: any, type: 'resolve' | 'reject' = 'resolve') => {
    if (data?.defaultPrevented) data = undefined
    if (data) console.log('回调:', data)
    const { id } = useQuery()
    uni.$emit(id.value + '_' + type, data)
    const url = '/pages/index/index'
    if (getCurrentPages().length > 1) uni.navigateBack()
    else uni.redirectTo({ url }).catch(() => uni.switchTab({ url }))
  },
  50,
  { leading: true, trailing: false },
) as DebouncedFuncLeading<(data?: any, type?: 'resolve' | 'reject') => void> & {
  resolve: (data?: any) => void
  reject: (data?: any) => void
}

back.resolve = (data?: any) => back(data, 'resolve')
back.reject = (data?: any) => back(data, 'reject')

const pageTools = {
  to,
  back,
  upx2px: uni.upx2px,
}

export default function () {
  Object.assign(app, pageTools)
}

type pageType = typeof pageTools

declare global {
  interface App extends pageType {}
}
