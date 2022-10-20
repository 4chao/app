import Hammer from 'hammerjs'
import { debounce } from 'lodash'
import { animate, spring } from 'motion'

interface Options {
  distance: number
}
class DragManager {
  pageX = -1000
  pageY = -1000

  options: Options
  constructor(public $el: HTMLElement, public name = String.rand(), options: Partial<Options> = {}) {
    this.options = {
      distance: 100,
      ...options,
    }
    $el.addEventListener('touchmove', ev => {
      console.log(ev)

      this.pageX = ev.touches[0].pageX
      this.pageY = ev.touches[0].pageY
      console.log(this.pageY)
      this.update()
    })
  }

  static dropIns = new Set<Droppable>()
  static registerDropIns(ins: Droppable) {
    this.dropIns.add(ins)
  }
  update = debounce(() => {
    let tempD = Infinity
    let target: Droppable = null
    console.log('====')
    Array.from(DragManager.dropIns)
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
    }
  }, 0)
}

export class Draggable extends DragManager {
  hammer: HammerManager

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
    big: () => animate(this.$el, { scale: 1.5 }, { easing: spring({ stiffness: 1000, damping: 20 }) }),
  }

  hide() {
    // TODO
  }
}

export class Droppable {
  constructor(public $el: HTMLElement, public name?: 'string') {
    this.init()
    this.bind()
    DragManager.registerDropIns(this)
  }

  init() {}

  bind() {
    const { $el } = this
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
