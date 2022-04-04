import { App as VueApp } from 'vue'

let patch = {
  log: <T>(...args: [T, ...any]) => (
    app.debug(/(?<=src)(.*?\.vue)/.exec(new Error('123').stack)[0], ...args), args[0]
  ),
  any: arg => arg as any,
}

export default function (vueApp: VueApp) {
  Object.assign(vueApp.config.globalProperties, patch)
  vueApp.mixin({
    props: {
      run: Function,
    },
    mounted() {
      this.$nextTick(() => {
        console.log(123, this.run)
      })
    },
  })
}

type patchType = typeof patch

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties extends patchType {}
}
