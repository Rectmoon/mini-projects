new Vue({
  el: '#app',

  data: {
    keywords: ['Think Pad', 'Ipad Pro', 'Mac Pro', 'Iphone', 'Cookie Cup'],

    isFocusing: false,

    currentIndex: 0,

    animationTriggerFlag: true,

    value: ''
  },

  computed: {
    before () {
      const keyword = this.keywords[this.currentIndex]
      return this.isFocusing || this.value ? '' : keyword
    },

    after () {
      const keyword = this.keywords[this.currentIndex + 1]
      return this.isFocusing || this.value
        ? ''
        : typeof keyword === 'undefined'
        ? this.keywords[0]
        : keyword
    },

    placeholder () {
      const keyword = this.keywords[this.currentIndex]
      return !this.isFocusing || this.value ? '' : keyword
    },

    shouldAnimate () {
      return !this.isFocusing && !this.value && this.animationTriggerFlag
    }
  },

  methods: {
    handleAnimationend (e) {
      if (e.pseudoElement === '::after') {
        this.animationTriggerFlag = false

        const newIndex =
          typeof this.keywords[this.currentIndex + 1] === 'undefined'
            ? 0
            : this.currentIndex + 1
        this.currentIndex = newIndex

        setTimeout(() => {
          this.animationTriggerFlag = true
        }, 3000)
      }
    },

    handleSearch () {
      alert(this.keywords[this.currentIndex])
    }
  }
})
