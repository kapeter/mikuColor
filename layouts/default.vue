<template>
  <div class="page-bg">
    <div class="main-bg">
      <!-- Page Header  -->
      <header class="header">
        <div class="container">
          <div class="logo">
            <nuxt-link to="/" exact><img src="~assets/img/logo-lg.png"></nuxt-link>
          </div>
          <div class="slogan">Always believe that something wonderful is about to happen.</div>
          <nav class="nav">
            <ul>
              <li><nuxt-link to="/" exact>首页</nuxt-link></li>
              <li><nuxt-link to="/post">文章</nuxt-link></li>
              <li><nuxt-link to="/about" exact>关于我</nuxt-link></li>
              <li><nuxt-link to="/contact" exact>联系我</nuxt-link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main class="main">
        <div class="container" id="content">
            <nuxt/>
        </div>
      </main>

    </div>
    <!-- Page Footer  -->
    <footer class="footer">
      <canvas id="canvas"  class="canvas"></canvas>
      <div class="container">
        <p class="copyright">&copy; 2014 - {{ thisYear }} KAPETER.COM  <a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action">浙ICP备14040866号</a></p>
      </div>
    </footer>
    <a href="javascript:;" class="go-top" @click="backToTop()" :class="{ 'top-active' : isShow }">
      <i class="iconfont">&#xe600;</i>
    </a>
  </div>

</template>


<script>
  export default {
    computed: {
      thisYear () {
        return (new Date()).getFullYear()
      }
    },
    data () {
      return {
        isShow: false,
        timer: null
      }
    },
    mounted () {
      let sTop = document.documentElement.scrollTop || document.body.scrollTop
      this.isShow = sTop > 100
      window.addEventListener('scroll', this.handleScroll)

      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      canvas.width = canvas.parentNode.offsetWidth
      canvas.height = canvas.parentNode.offsetHeight

      let boHeight = canvas.height / 2.5
      let posHeight = canvas.height / 1.5

      let step = 0

      let lines = ['rgba(57,197,187,0.25)', 'rgba(102,204,255,0.25)', 'rgba(146,203,213,0.25)']
      function loop () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        step++
        for (let j = lines.length - 1; j >= 0; j--) {
          ctx.fillStyle = lines[j]
          let angle = (step + j * 75) * Math.PI / 180
          let deltaHeight = Math.sin(angle) * boHeight
          let deltaHeightRight = Math.cos(angle) * boHeight
          ctx.beginPath()
          ctx.moveTo(0, posHeight + deltaHeight)
          ctx.bezierCurveTo(canvas.width / 2, posHeight + deltaHeight - boHeight, canvas.width / 2, posHeight + deltaHeightRight - boHeight, canvas.width, posHeight + deltaHeightRight)
          ctx.lineTo(canvas.width, canvas.height)
          ctx.lineTo(0, canvas.height)
          ctx.lineTo(0, posHeight + deltaHeight)
          ctx.closePath()
          ctx.fill()
        }
        window.requestAnimationFrame(loop)
      }
      loop()
    },
    methods: {
      backToTop () {
        this.timer = setInterval(() => {
          let oTop = document.documentElement.scrollTop || document.body.scrollTop
          let oSpeed = Math.floor(oTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = oTop - oSpeed
          if (oTop === 0) {
            clearInterval(this.timer)
          }
        }, 30)
      },
      handleScroll () {
        let sTop = document.documentElement.scrollTop || document.body.scrollTop
        this.isShow = sTop > 100
        document.addEventListener('mousewheel', () => {
          clearInterval(this.timer)
        })
      }
    }
  }
</script>

<style>
  .main-bg{
    min-height: calc(100vh - 64px);
  }
  .header .container{
    padding: 60px 0 30px;
  }
  .logo, .slogan{
    width: 100%;
    text-align: center;
  }
  .logo .nuxt-link-active:after {
    display: none;
  }
  .slogan{
    color: #5a6665;
    margin-top: 30px;
  }
  .nav{
    width: 100%;
    height: 45px;
    margin-top: 30px;
    text-align: center;
    border-top: 1px #ddd solid;
    border-bottom: 1px #ddd solid;
  }
  .nav > ul {
    display: inline-block;
    line-height: 45px;
  }
  .nav > ul:after{
    content: '';
    display: block;
    clear: both;
    height: 0;
  }
  .nav > ul > li {
    margin: 0 30px;
    float: left;
    text-align: center;
    position: relative;
  }
  .nav > ul > li > a{
    display: inline-block;
    letter-spacing: 1px;
  }
  .nuxt-link-active{
    color: #39c5bb;
  }
  .nuxt-link-active:after{
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: #39c5bb;
    position: absolute;
    left: 0;
    bottom: -1px;
  }

  .main{
    position: relative;
    width: 100%;
    min-height: calc(100% - 40px);
    overflow: hidden;
  }
  .go-top{
    position: fixed;
    right: 15px;
    bottom: -45px;
    display: block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    border-radius: 30px;
    border:1px solid #ddd;
    transition: all 0.35s ease-in-out;
    z-index: 10;
    background: #fff;
  }
  .go-top:hover{
    background-color: #39c5bb;
    border-color: #fff;
    color: #fff;
  }
  .top-active{
    bottom: 15px;
  }
  @media screen and (max-width: 1200px) {
    .header, .footer, .main{
      width: 1200px;
      padding-right: 15px !important;
      padding-left: 15px !important;
    }
  }

  .footer{
    width: 100%;
    height: 64px;
    padding: 30px 0 15px;
    box-sizing: border-box;
    position: relative;
    text-align: center;
    color: #666;
  }
  .footer::before {
    background-color: #eee;
    content: "";
    height: 2px;
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 0;
    width: 30px;
  }
  .canvas{
    position:absolute;
    top:0px;
    left:0px;
    z-index:-1;
  }
  .link-list{
    display: inline-block;
    letter-spacing: 1px;
    font-size: 12px;
    text-transform: uppercase;
  }
  .link-list > li{
    float: left;
    margin: 0px 5px;
    text-align: center;
  }
  .link-list > li:after{
    content: '/';
    margin-left: 10px;
  }
  .link-list > li:last-child:after{
    content: '';
  }
  .copyright{
    font-size: 12px;
    letter-spacing: 1px;
    margin-bottom: 0;
  }
  .copyright a{
    color: #666;
  }
  .copyright a:hover{
    color: #39c5bb;
  }
  .link-list .nuxt-link-active:after {
    display: none;
  }
</style>
