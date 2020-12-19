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
    paddingLeft: {
      type: Number,
      default: 10
    },
    // 卡片层叠的纵向边距
    paddingTop: {
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
      isThrowed: false,
      left: 0,
      top: 0,
      startLeft: 0,
      startTop: 0
    }
  },

  computed: {
    flyCardWrapperStyle () {
      return {
        position: 'relative',
        width: this.cardWidth + 'px',
        height: this.cardHeight + 'px'
      }
    },

    firstCardClass () {
      return {
        'has--shadow': this.hasShadow,
        'has--border': this.hasBorder,
        'has-animation': this.isAnimating
      }
    },

    largeCardStyle () {
      return {
        width: this.cardWidth + 'px',
        height: this.cardHeight + 'px',
        left: 0,
        top: 0
      }
    },

    middleCardStyle () {
      return {
        width: this.cardWidth - this.paddingLeft * 2 + 'px',
        height: this.cardHeight - this.paddingTop * 2 + 'px',
        left: this.paddingLeft + 'px',
        top: this.paddingTop * 3 + 'px'
      }
    },

    smallCardStyle () {
      return {
        width: this.cardWidth - this.paddingLeft * 4 + 'px',
        height: this.cardHeight - this.paddingTop * 4 + 'px',
        left: this.paddingLeft * 2 + 'px',
        top: this.paddingTop * 6 + 'px'
      }
    },

    firstCardStyle () {
      return {
        ...this.largeCardStyle,
        left: this.left + 'px',
        top: this.top + 'px'
      }
    },

    secondCardStyle () {
      return this.isThrowed ? this.largeCardStyle : this.middleCardStyle
    },

    thirdCardStyle () {
      return this.isThrowed ? this.middleCardStyle : this.smallCardStyle
    },

    forthCardStyle () {
      return this.isThrowed
        ? {
            ...this.smallCardStyle,
            opacity: 1
          }
        : {
            width: this.cardWidth - this.paddingLeft * 6 + 'px',
            height: this.cardHeight - this.paddingTop * 6 + 'px',
            left: this.paddingLeft * 3 + 'px',
            top: this.paddingTop * 9 + 'px',
            opacity: 0
          }
    }
  },

  methods: {
    getDistance: function ({ x: x1, y: y1 }, { x: x2, y: y2 }) {
      const dx = Math.abs(x2 - x1)
      const dy = Math.abs(y2 - y1)

      return Math.sqrt(dx * dx + dy * dy)
    },

    touchStart (e) {
      if (!this.isAnimating) {
        const [{ clientX, clientY }] = e.touches

        this.startLeft = clientX - this.left
        this.startTop = clientY - this.top
        this.$emit('on-drag-start')
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
      this.$emit('on-drag-stop', {
        left: this.left,
        top: this.top,
        distance: distance
      })

      if (!this.isAnimating) {
        distance > this.throwTriggerDistance
          ? this.makeCardThrow()
          : this.makeCardBack()
      }
    },

    makeCardThrow () {
      const angle = Math.atan2(this.top - 0, this.left - 0)

      this.$emit('on-throw-start')
      this.isThrowed = true
      this.isAnimating = true
      this.left = Math.cos(angle) * this.throwDistance
      this.top = Math.sin(angle) * this.throwDistance
      setTimeout(() => {
        this.$emit('on-throw-done')
        this.resetAllCard()
      }, 400)
    },

    makeCardBack () {
      this.left = 0
      this.top = 0
      this.isAnimating = true

      setTimeout(() => {
        this.$emit('on-throw-fail')
        this.isAnimating = false
      }, 600)
    },

    resetAllCard () {
      this.left = 0
      this.top = 0
      this.isAnimating = false
      this.isThrowed = false
    }
  },

  mounted () {
    this.resetAllCard()
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
      ],
      actionName: null
    }
  },

  computed: {
    showCards () {
      return this.cards.slice(0, 4)
    }
  },

  methods: {
    handleDragStart () {
      console.log('handleDragStart')
    },

    handleDragMove (e) {
      if (e.left < -10) {
        this.actionName = '不喜欢'
      } else if (e.left > 10) {
        this.actionName = '喜欢'
      } else {
        this.actionName = null
      }
    },

    handleDragStop () {
      console.log('handleDragStop')
      this.actionName = null
    },

    handleThrowStart () {
      console.log('handleThrowStart')
    },

    handleThrowDone () {
      this.cards.shift()
      this.cards.push({
        image: `https://picsum.photos/260/300?random=${Math.floor(
          Math.random() * 1000
        )}`
      })
    },

    handleThrowFail () {
      console.log('handleThrowFail')
    }
  }
})
