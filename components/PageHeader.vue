<template>
  <div class="page-header">
    <div class="cover">
        <img src="~assets/img/bg.jpg">
    </div>
    <h1 class="title">{{ pageTitle }}</h1>
    <h5 class="sub-title">/ {{ pageSubTitle }} /</h5>
    <canvas id="waveCanvas" class="waves"></canvas>
    <audio loop id="audio"></audio>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'audioState',
        'pageTitle',
        'pageSubTitle'
      ])
    },
    watch: {
      audioState (newVal) {
        if (newVal) {
          this.audio.play()
          this.animate()
        } else {
          this.stop()
          this.audio.pause()
        }
      }
    },
    mounted () {
      this.init()
      if (this.audioState) {
        this.audio.play()
        this.animate()
      } else {
        this.stop()
        this.audio.pause()
      }
    },
    methods: {
      init () {
        this.audioContext = new window.AudioContext()
        this.canvas = document.getElementById('waveCanvas')
        this.ctx = this.canvas.getContext('2d')
        this.width = this.canvas.offsetWidth
        this.height = this.canvas.offsetHeight
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.baseY = this.height

        this.audio = document.getElementById('audio')
        this.audio.crossOrigin = 'anonymous'
        this.audio.src = 'http://96.f.1ting.com/5b472766/6056311c50692f6e2c7e7c08d0736e58/2018/05/14X/14e_Xusong/01.mp3'
        this.source = this.audioContext.createMediaElementSource(this.audio)
        this.analyser = this.audioContext.createAnalyser()
        this.analyser.connect(this.audioContext.destination)
        this.source.connect(this.analyser)
      },
      animate () {
        let con = () => {
          let array = new Uint8Array(this.analyser.frequencyBinCount)
          this.analyser.getByteFrequencyData(array)
          this.draw(array)
          this.timer = requestAnimationFrame(con)
        }
        this.timer = requestAnimationFrame(con)
      },

      stop () {
        this.ctx.clearRect(0, 0, this.width, this.height)
        cancelAnimationFrame(this.timer)
      },

      draw (array) {
        this.ctx.clearRect(0, 0, this.width, this.height)
        // array的长度为1024, 总共取10个关键点,关键点左右边各取五个点作为过渡,波浪更为自然;
        let waveArr1 = []
        let waveArr2 = []
        let waveTemp = []
        let leftTemp = []
        let rightTemp = []
        // 事先定好要取的点的key,相比下面直接循环整个数组来说效率高很多。
        let waveStepArr = [0, 51, 102, 153, 204, 255, 306, 357, 408]
        let leftStepArr = [70, 141, 212, 283, 354]
        let rightStepArr = [90, 181, 272, 363, 454]
        waveStepArr.map((key) => {
          waveTemp.push(array[key] / 2.6)
        })
        leftStepArr.map((key) => {
          leftTemp.unshift(Math.floor(array[key] / 4.8))
        })
        rightStepArr.map((key) => {
          rightTemp.push(Math.floor(array[key] / 4.8))
        })
        waveArr1 = leftTemp.concat(waveTemp).concat(rightTemp)
        waveArr2 = leftTemp.concat(rightTemp)
        waveArr2.map((data, k) => {
          waveArr2[k] = data * 1.8
        })
        let waveWidth = Math.ceil(this.width / (waveArr1.length - 3))

        this.ctx.beginPath()
        this.ctx.fillStyle = 'rgba(255,255,255, 1)'
        this.ctx.moveTo(-waveWidth * 2, this.baseY - waveArr1[0])
        for (let i = 1; i < waveArr1.length - 2; i++) {
          let p0 = {x: (i - 2) * waveWidth, y: waveArr1[i - 1]}
          let p1 = {x: (i - 1) * waveWidth, y: waveArr1[i]}
          let p2 = {x: (i) * waveWidth, y: waveArr1[i + 1]}
          let p3 = {x: (i + 1) * waveWidth, y: waveArr1[i + 2]}

          for (let j = 0; j < 100; j++) {
            let t = j * (1.0 / 100)
            let tt = t * t
            let ttt = tt * t
            let CGPoint = {}
            CGPoint.x = 0.5 * (2 * p1.x + (p2.x - p0.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * tt + (3 * p1.x - p0.x - 3 * p2.x + p3.x) * ttt)
            CGPoint.y = 0.5 * (2 * p1.y + (p2.y - p0.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * tt + (3 * p1.y - p0.y - 3 * p2.y + p3.y) * ttt)
            this.ctx.lineTo(CGPoint.x, this.baseY - CGPoint.y)
          }
          this.ctx.lineTo(p2.x, this.baseY - p2.y)
        }
        this.ctx.lineTo((waveArr1.length) * waveWidth, this.baseY - waveArr1[waveArr1.length - 1])
        this.ctx.lineTo(this.width + waveWidth * 2, this.baseY)
        this.ctx.lineTo(this.width + waveWidth * 2, this.height)
        this.ctx.lineTo(-2 * waveWidth, this.height)
        this.ctx.fill()
      }
    }
  }
</script>

<style scoped lang="less">
@import '~assets/less/variable.less';

.page-header{
    position: relative;
    height: 320px;
    overflow: hidden;
    color: #ffffff;
    text-align: center;
    margin-bottom: 90px;
    padding: 120px 15px 0;
    box-sizing: border-box;
    .cover{
      position: absolute;
      left: 0;
      top: -100%;
      width: 100%;
      // animation: cover 25s linear;
      // animation-fill-mode: forwards;
      text-align: center;
      img{
        width: 100%;
      }
    }
    .title{
      display: inline-block;
      font-size: 28px;
      letter-spacing: 0.1em;
      z-index: 10;
      position: relative;
    }
    .sub-title{
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5em;
      font-weight: normal;
      z-index: 10;
      position: relative;
    }
    .waves{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
}

@keyframes cover {
    0% {
        top: 0;
    }
    100% {
        top: -100%;
    }
}

  @media screen and (max-width: 768px) {
    .page-header{
        margin-bottom: 30px;
        padding: 100px 15px 0;
        .cover{
          img{
            width: auto;
          }
        }
        .title{
          font-size: 24px;
        }
    }    
  }
</style>
