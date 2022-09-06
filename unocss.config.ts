import { defineConfig, presetUno, presetAttributify, presetIcons, toEscapedSelector as e } from 'unocss'
import transformerDirective from '@unocss/transformer-directives'
import { times } from 'lodash'
import path from 'path'
import { colors } from './build/getRules'

export default defineConfig({
  theme: {
    spacing: [...['none', 'xs', 'sm', 'DEFAULT', 'lg', 'xl'], ...times(8).map(n => n + 2 + 'xl')].reduce((o, k, i) => {
      if (process.env.UNI_PLATFORM?.startsWith('mp')) o[k] = (i * 10).toFixed(2) + 'rpx'
      else o[k] = (i / 3.2).toFixed(2) + 'rem'
      return o
    }, {}),
    colors: {
      ...colors,
    },
  },

  rules: [
    [
      /^thin-?(\d+)?-?(\w+)?$/,
      ([_, radius, hex], { rawSelector }) => {
        const r = (Number(radius) || 12) / 32
        const s = e(rawSelector)
        //prettier-ignore
        return `${s} {position: relative;border-radius: ${r}rem;overflow: hidden;}${s}::after {content: " ";width: 200%;height: 200%;position: absolute;top: 0;left: 0;border: 1${process.env.UNI_PLATFORM?.startsWith('mp') ? 'r' : ''}px solid #${hex || 'd9d9d9'};border-radius: ${r * 2}rem;transform: scale(0.5);transform-origin: 0 0;box-sizing: border-box;z-index: 1;pointer-events: none;}`
      },
    ],
    ['absolute-center', { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }],
  ],
  presets: [presetUno(), presetAttributify(), presetIcons()],
  transformers: [transformerDirective() as any],
  shortcuts: {
    'flex-center': 'flex flex-row justify-center items-center',
    'flex-center-col': 'flex flex-col justify-center items-center',
  },
  postprocess: [
    // 小程序不需要属性选择器
    process.env.UNI_PLATFORM?.startsWith('mp') &&
      (util => {
        if (!util.selector.startsWith('[')) return
        util.selector = undefined
        util.entries = []
      }),
  ].filter(e => !!e),
  include: [path.resolve(__dirname, 'src', '**/*.vue')],
})
