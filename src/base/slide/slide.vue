<template>
  <div class="slide" ref="slide">
    <div class="slide-group" ref="slideGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index}" v-for="(item,index) in dots" :key="index">{{index}}</span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addCls } from 'common/js/dom'

export default {
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    speed: {
      type: Number,
      default: 400
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSlideWidth()
      this._initDots()
      this._initSlide()
      if (this.autoPlay) {
        this._initAutoPlay()
      }
    }, 20)

    window.addEventListener('resize', this._onResize)
  },
  methods: {
    _setSlideWidth(isResize) {
      this.children = this.$refs.slideGroup.children
      let slideWidth = this.$refs.slide.clientWidth
      let width = 0
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addCls(child, 'slide-item')
        child.style.width = slideWidth + 'px'
        width += slideWidth
      }
      if (this.loop && !isResize) {
        width += 2 * slideWidth
      }
      this.$refs.slideGroup.style.width = width + 'px'
    },
    _initSlide() {
      this.slide = new BScroll(this.$refs.slide, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.1,
          speed: this.speed
        },
        stopPropagation: true,
        click: true
      })

      this.slide.on('scrollEnd', this._onScrollEnd)
    },
    _onScrollEnd() {
      let pageIndex = this.slide.getCurrentPage().pageX
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._initAutoPlay()
      }
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _initAutoPlay() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slide.next()
      }, this.interval)
    },
    _onResize() {
      if (!this.slide) {
        return
      }
      clearTimeout(this._resizeTimer)
      this._resizeTimer = setTimeout(() => {
        /* istanbul ignore if */
        if (this.slide.isInTransition) {
          this._onScrollEnd()
        } else {
          if (this.autoPlay) {
            this._initAutoPlay()
          }
        }
        this._setSlideWidth(true)
        this.slide.refresh()
      }, 60)
    },
    destroyed() {
      clearTimeout(this.timer)
    }
  }
}

</script>
<style lang='stylus' scoped>
@import 'common/stylus/variable'

.slide
  min-height: 1px
  .slide-group
    position: relative
    overflow: hidden
    white-space: nowrap
    .slide-item
      float: left
      box-sizing: border-box
      overflow: hidden
      text-align: center
      a
        display: block
        width: 100%
        overflow: hidden
        text-decoration: none
      img
        display: block
        width: 100%
  .dots
    position: absolute
    right: 0
    left: 0
    bottom: 12px
    text-align: center
    font-size: 0
    .dot
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background: $color-text-l
      &.active
        width: 20px
        border-radius: 5px
        background: $color-text-ll
</style>