import { defineConfig, presetUno, presetAttributify, presetIcons, toEscapedSelector as e, Preset } from 'unocss'
import transformerDirective from '@unocss/transformer-directives'
import { times } from 'lodash'
import path from 'path'

const isMP = !!process.env.UNI_PLATFORM?.startsWith('mp')

export default defineConfig({
  theme: {
    spacing: [...['none', 'xs', 'sm', 'DEFAULT', 'lg', 'xl'], ...times(8).map(n => n + 2 + 'xl')].reduce((o, k, i) => {
      o[k] = (i * 2.5).toFixed(2) + 'rem'
      return o
    }, {}),
  },
  rules: [
    [
      /^thin-?(\d+)?-?(\w+)?$/,
      ([_, radius, hex], { rawSelector }) => {
        const r = (Number(radius) || 12) / 32
        const s = e(rawSelector)
        //prettier-ignore
        return `${s} {position: relative;border-radius: ${r}rem;overflow: hidden;}${s}::after {content: " ";width: 200%;height: 200%;position: absolute;top: 0;left: 0;border: 1${isMP ? 'r' : ''}px solid #${hex || 'd9d9d9'};border-radius: ${r * 2}rem;transform: scale(0.5);transform-origin: 0 0;box-sizing: border-box;z-index: 1;pointer-events: none;}`
      },
    ],
    ['absolute-center', { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }],
  ],
  presets: [presetUno(), presetAttributify(), presetIcons(), remToRpxPreset(), mpTreeShakingPreset()],
  transformers: [transformerDirective() as any],
  shortcuts: {
    'flex-center': 'flex flex-row justify-center items-center',
    'flex-center-col': 'flex flex-col justify-center items-center',
  },
  include: [path.resolve(__dirname, 'src', '**/*.vue')],
})

// rem转换rpx单位
function remToRpxPreset(): Preset {
  return {
    name: 'preset-rem-to-rpx',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1]
        if (value && typeof value === 'string' && /^-?[\.\d]+rem$/.test(value)) {
          if (isMP) i[1] = `${+value.slice(0, -3) * 4}rpx`
          else i[1] = `${+value.slice(0, -3) / 8}rem`
        }
      })
    },
  }
}

// 小程序不需要属性选择器
function mpTreeShakingPreset(): Preset {
  return {
    name: 'preset-mp-tree-shaking',
    postprocess: isMP ? (util) => {
      if (!util.selector.startsWith('[')) return
      util.selector = ''
      util.entries = []
    } : undefined,
  }
}