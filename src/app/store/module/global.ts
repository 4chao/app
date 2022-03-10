import { createModule, action } from 'vuex-class-component'

export class Global extends createModule({
  namespaced: 'global',
}) {
  readonly config = {}
  systemInfo = uni.getSystemInfoSync()
  menuButtonBounding = uni.getMenuButtonBoundingClientRect?.()
  get navBarHeight() {
    const { top, height } = this.menuButtonBounding || {}
    const { statusBarHeight } = this.systemInfo
    return (top - statusBarHeight) * 2 + height || uni.upx2px(120)
  }
  get capsuleWidth() {
    const { left, right } = this.menuButtonBounding || {}
    const { windowWidth } = this.systemInfo
    return windowWidth * 2 - (left + right) || 0
  }
  get capsuleMarginRight() {
    const { right } = this.menuButtonBounding || {}
    const { windowWidth } = this.systemInfo
    return windowWidth - right || 0
  }

  @action async getSystemInfo() {
    this.systemInfo = uni.getSystemInfoSync()
    this.menuButtonBounding = uni.getMenuButtonBoundingClientRect?.()
  }
}
