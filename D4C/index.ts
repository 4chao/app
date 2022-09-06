import type { App } from 'vue';

const Module = import.meta.globEager<any>("./components/*/index.vue")
console.log(Module);

const components = {} as Record<string, any>;
Object.entries(Module).forEach(([k, v]) => {
  const com = v.default
  const name = /components\/(.*)\//.exec(k)?.[1]
  components[com.name || name] = v.default
})
console.log(components);

/**
 * 组件注册
 * @param {App} app Vue 对象
 * @returns {Void}
 */
const install = function (app: App) {
  Object.entries(components).forEach(([key, value]) => {
    app.component(key, value);
  });
};

export default {
  install,
};
