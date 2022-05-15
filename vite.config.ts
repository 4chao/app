/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import mkcert from 'vite-plugin-mkcert'
import ViteRestart from 'vite-plugin-restart'
import AutoImport from 'unplugin-auto-import/vite'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import UniMeta from './build/vite-plugin-uni-meta'
import UniProvider from './build/vite-plugin-uni-provider'
import Espower from './build/vite-plugin-espower'
import Define from './build/vite-plugin-define'
import { visualizer } from 'rollup-plugin-visualizer'

import ImportsConfig from './build/imports.config'

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@root': path.resolve(__dirname),
        lodash: 'lodash-es',
      },
    },
    server: {
      watch: { ignored: ['**/dist/**', '!**/node_modules/uview-ui/**'] },
      // https: true,
      proxy: {
        '^/api': {
          target: loadEnv(mode, process.cwd()).VITE_PROXY_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      Inspect(), //vite分析工具
      // mkcert(), //生成证书
      UniMeta(), //自动生成页面meta信息和路由并注册pages.json
      UniProvider(), //自动注册页面全局组件
      Unocss(),
      ViteRestart({ restart: ['src/pages.js', 'src/app.config.ts'] }),
      AutoImport(ImportsConfig),
      isTest() || uni({ vueOptions: { reactivityTransform: true } }),
      isTest() && Espower(),
      Define(), //添加一些全局变量
      // visualizer(), //可视化依赖关系
    ],
    esbuild: { keepNames: true },
    optimizeDeps: { exclude: ['lodash-es'] },
    test: { globals: true, environment: 'jsdom', deps: { inline: ['@vue'] } },
  })

function isTest() {
  return process.env.NODE_ENV === 'test'
}
