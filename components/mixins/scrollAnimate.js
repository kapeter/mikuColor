export default {
  data () {
    return {
      timer: null
    }
  },
  methods: {
    scrollToGoal (goal) {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        let oTop = document.documentElement.scrollTop || document.body.scrollTop
        let oDelta = goal - oTop
        let oSpeed = Math.floor(oDelta / 5)
        document.documentElement.scrollTop = document.body.scrollTop = oTop + oSpeed
        // 考虑向下滚动，到达最大滚动距离的情况
        if (oDelta > 0 && oTop === document.body.scrollHeight - document.body.clientHeight) {
          clearInterval(this.timer)
        }
        if (oTop === goal) {
          clearInterval(this.timer)
        }
      }, 40)
    },
    stopScroll () {
      document.addEventListener('mousewheel', () => {
        clearInterval(this.timer)
      })
    }
  }
}
