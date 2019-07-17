import throttle from 'throttle-debounce/throttle'
export default {
  data () {
    return {
      el: null,
      visible: false,
      scrollTopDis: 0
    }
  },
  mounted () {
    this.el = document.getElementsByClassName('el-scrollbar__wrap')[0]
    this.throttledScrollHandler = throttle(300, this.onScroll)
    this.el.addEventListener('scroll', this.throttledScrollHandler, true)
  },
  beforeDestroy () {
    this.el.removeEventListener('scroll', this.throttledScrollHandler, true)
  },
  methods: {
    onScroll () {
      // console.log(this.el.scrollTop)
      const scrollTop = this.el.scrollTop
      this.visible = scrollTop >= 200
      this.scrollTopDis = scrollTop
    },
    scrollToTop () {
      let el = this.el
      let step = 0
      let interval = setInterval(() => {
        if (el.scrollTop <= 0) {
          clearInterval(interval)
          return
        }
        step += 10
        el.scrollTop -= step
      }, 20)
    }
  }
}
