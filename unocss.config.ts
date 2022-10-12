import type { Preset, SourceCodeTransformer } from 'unocss'
import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  toEscapedSelector as e,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetApplet, presetRemToRpx, transformerApplet, transformerAttributify } from 'unocss-applet'
import transformerDirective from '@unocss/transformer-directives'
import { times } from 'lodash'
import path from 'path'
import { colors } from './build/getRules'

const presets: Preset[] = []
const transformers: SourceCodeTransformer[] = []
const isMP = !!process.env.UNI_PLATFORM?.startsWith('mp')

if (!isMP) {
  presets.push(presetAttributify())
} else {
  transformers.push(transformerAttributify())
  transformers.push(transformerApplet())
}

export default defineConfig({
  theme: {
    spacing: [...['none', 'xs', 'sm', 'DEFAULT', 'lg', 'xl'], ...times(8).map(n => n + 2 + 'xl')].reduce((o, k, i) => {
      if (isMP) o[k] = (i * 10).toFixed(2) + 'rpx'
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
  presets: [presetUno(), presetIcons(), ...presets],
  transformers: [transformerDirectives(), transformerVariantGroup(), ...transformers],
  shortcuts: {
    'flex-center': 'flex flex-row justify-center items-center',
    'flex-center-col': 'flex flex-col justify-center items-center',
  },
  include: [path.resolve(__dirname, 'src', '**')],
})
