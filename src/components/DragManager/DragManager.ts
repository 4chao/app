import Hammer from 'hammerjs'
import { debounce } from 'lodash'
import { animate, spring } from 'motion'

declare global {
  interface Window {
    dropIns: Set<Droppable>
  }
}

window.dropIns = new Set<Droppable>()
interface Options {
  distance: number
}
class DragManager {
  pageX = -1000
  pageY = -1000
  onTouch = false

  options: Options
  constructor(public $el: HTMLElement, public name = String.rand(), options: Partial<Options> = {}) {
    this.options = {
      distance: 100,
      ...options,
    }
    $el.addEventListener('touchstart', () => (this.onTouch = true))
    $el.addEventListener('touchend', () => (this.onTouch = false))
    $el.addEventListener('touchmove', ev => {
      this.pageX = ev.touches[0].pageX
      this.pageY = ev.touches[0].pageY
      this.update()
    })
  }

  static registerDropIns(ins: Droppable) {
    window.dropIns.add(ins)
  }
  target?: Droppable
  update = debounce(() => {
    if (!this.onTouch) return
    let tempD = Infinity
    let target: Droppable = null
    this.target = null

    Array.from(window.dropIns)
      .filter(e => !(e.name && e.name !== this.name))
      .forEach(e => {
        e.update()
        e.$el.dataset.active = 'false'
        const d = distance(e.rect, { x: this.pageX, y: this.pageY })
        if (d < tempD) {
          tempD = d
          target = e
        }
      })
    if (target && tempD < this.options.distance) {
      target.$el.dataset.active = 'true'
      this.target = target
    }
  }, 0)
}

export class Draggable extends DragManager {
  hammer: HammerManager
  onPanend = (id: string) => {}

  constructor($el: HTMLElement, name: string = null, options: Partial<Options> = {}) {
    super($el, name, options)
    this.init()
    this.bind()
  }
  init() {
    this.hammer = new Hammer(this.$el)
  }
  bind() {
    const { hammer, $el } = this

    // 处理拖动事件
    hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL })
    hammer.on('panstart', ev => {
      this.to(0, 0)
    })
    hammer.on('panmove', ev => {
      this.to(ev.deltaX, ev.deltaY)
    })
    hammer.on('panend', ev => {
      console.log('panend:', this.target?.$el.dataset.id)
      if (this.target) {
        const dataset = this.target.$el.dataset
        dataset.active = 'false'
        this.onPanend(dataset.id)
      }
      this.to(0, 0, true)
      this.size.normal()
    })

    // 按住放大
    $el.addEventListener('touchstart', ev => this.size.big())
    $el.addEventListener('touchmove', ev => (ev.stopPropagation(), ev.preventDefault()))
    $el.addEventListener('touchend', ev => this.size.normal())
    $el.addEventListener('touchcancel', ev => this.size.normal())
  }

  to(x: number, y: number, withAnimate = false) {
    const style = { x, y }
    if (withAnimate) animate(this.$el, style, { easing: spring({ stiffness: 500, damping: 23 }) })
    else animate(this.$el, style, { easing: spring({ stiffness: 100000, damping: 10000 }) })
  }

  size = {
    normal: () => animate(this.$el, { scale: 1 }, { easing: spring({ stiffness: 1000, damping: 20 }) }),
    big: () => animate(this.$el, { scale: 1.2 }, { easing: spring({ stiffness: 1000, damping: 20 }) }),
  }

  hide() {
    // TODO
  }
}

export class Droppable {
  constructor(public $el: HTMLElement, public name?: 'string') {
    this.init()
    this.bind()
  }

  init() {}

  bind() {
    const { $el } = this
    DragManager.registerDropIns(this)
  }

  rect: DOMRect
  update() {
    const { $el } = this
    this.rect = $el.getBoundingClientRect()
  }
}

function distance(rect: DOMRect, p: Record<'x' | 'y', number>) {
  var dx = Math.max(rect.left - p.x, 0, p.x - rect.right)
  var dy = Math.max(rect.top - p.y, 0, p.y - rect.bottom)
  return Math.sqrt(dx * dx + dy * dy)
}
