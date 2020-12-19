Vue.component('fly-card', {
  template: '#fly-card',

  props: {
    // 正常卡片宽度
    cardWidth: {
      type: Number,
      default: 260
    },
    // 正常卡片高度
    cardHeight: {
      type: Number,
      default: 300
    },
    // 卡片层叠的横向边距
    leftPad: {
      type: Number,
      default: 10
    },
    // 卡片层叠的纵向边距
    topPad: {
      type: Number,
      default: 6
    },
    // 卡片背景色
    cardBackground: {
      type: String,
      default: '#fff'
    },
    // 卡片的圆角弧度
    borderRadius: {
      type: Number,
      default: 10
    },
    // 是否开启卡片描边效果
    hasBorder: {
      type: Boolean,
      default: false
    },
    // 是否开启阴影效果
    hasShadow: {
      type: Boolean,
      default: true
    },
    // 卡片触发飞卡效果的距离
    throwTriggerDistance: {
      type: Number,
      default: 100
    },
    // 飞卡的移动距离
    throwDistance: {
      type: Number,
      default: 1000
    }
  },

  data () {
    return {
      isAnimating: false,
      left: 0,
      top: 0,
      startLeft: 0,
      startTop: 0
    }
  },

  computed: {
    flyCardWrapperStyle () {
      return {
        width: this.cardWidth + 'px',
        height: this.cardHeight + 'px'
      }
    },

    firstCardClass () {
      return {
        'has--shadow': this.hasShadow,
        'has--border': this.hasShadow,
        animation: this.isAnimating
      }
    },

    firstCardStyle () {
      return {
        left: this.left + 'px',
        top: this.top + 'px',
        zIndex: 13
      }
    },

    secondCardStyle () {
      return {
        width: this.cardWidth - this.leftPad * 2 + 'px',
        height: this.cardHeight - this.topPad * 2 + 'px',
        left: this.leftPad + 'px',
        top: this.topPad * 3 + 'px',
        zIndex: 12
      }
    },

    thirdCardStyle () {
      return {
        width: this.cardWidth - this.leftPad * 4 + 'px',
        height: this.cardHeight - this.topPad * 4 + 'px',
        left: this.leftPad * 2 + 'px',
        top: this.topPad * 6 + 'px',
        zIndex: 11
      }
    },

    forthCardStyle () {
      return {
        width: this.cardWidth - this.leftPad * 6 + 'px',
        height: this.cardHeight - this.topPad * 6 + 'px',
        left: this.leftPad * 3 + 'px',
        top: this.topPad * 9 + 'px',
        zIndex: 10
      }
    }
  },

  methods: {
    getDistance: function ({ x: x1, y: y1 }, { x: x2, y: y2 }) {
      const dx = Math.abs(x1 - x2)
      const dy = Math.abs(x1 - x2)

      return Math.sqrt(dx * dx + dy * dy)
    },

    touchStart (e) {
      if (!this.isAnimating) {
        const [{ clientX, clientY }] = e.touches

        this.startLeft = clientX - this.left
        this.startTop = clientY - this.top
      }
    },

    touchMove (e) {
      if (!this.isAnimating) {
        const [{ clientX, clientY }] = e.touches

        this.left = clientX - this.startLeft
        this.top = clientY - this.startTop
        this.$emit('on-drag-move', {
          left: this.left,
          top: this.top,
          distance: this.getDistance(
            { x: 0, y: 0 },
            { x: this.left, y: this.top }
          )
        })
      }
    },

    touchCancel () {
      const distance = this.getDistance(
        { x: 0, y: 0 },
        { x: this.left, y: this.top }
      )
      this.$emit({ left: this.left, top: this.top, distance: distance })

      if (!this.isAnimating) {
        distance > this.throwTriggerDistance
          ? this.makeCardThrow()
          : this.makeCardBack()
      }
    },

    makeCardThrow () {
      const angle = Math.atan2(this.top - 0, this.left - 0)

      this.$emit('on-throw-start')
      this.isAnimating = true
      this.left = Math.cos(angle) * this.throwDistance
      this.top = Math.sin(angle) * this.throwDistance
      setTimeout(() => {
        this.isAnimating = false
        this.$emit('on-throw-done')
        this.resetAllCard()
      }, 400)
    },

    makeCardBack () {
      this.isAnimating = true
      this.left = 0
      this.top = 0

      setTimeout(() => {
        this.isAnimating = false
        this.$emit('on-throw-cancel')
        this.resetAllCard()
      }, 600)
    },

    resetAllCard () {
      this.left = 0
      this.top = 0
      this.startLeft = 0
      this.startTop = 0
    }
  }
})

new Vue({
  el: '#app',

  data () {
    return {
      cards: [
        {
          image: './images/1.jpg'
        },
        {
          image: './images/2.jpg'
        },
        {
          image: './images/3.jpg'
        },
        {
          image: './images/4.jpg'
        },
        {
          image: './images/5.jpg'
        }
      ]
    }
  },

  methods: {
    handleThrowDone () {
      const [c, ...rest] = this.cards
      this.cards = [...rest, c]
    }
  }
})
