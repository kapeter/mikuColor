<template>
  <div class="page-bg">
    <!-- Page Header  -->
    <header class="header">
      <div class="container">
        <div class="logo">
          <a href="/"><img src="~assets/img/logo-lg.png"></a>
        </div>
        <div class="slogan">I'm Kapeter, a front-end engineer.</div>
        <nav class="nav">
          <ul>
            <li><nuxt-link to="/" exact>首页</nuxt-link></li>
            <li><nuxt-link to="/post">文章</nuxt-link></li>
            <li><nuxt-link to="/about" exact>关于我</nuxt-link></li>
          </ul>
        </nav>
      </div>
    </header>
    <main class="main">
      <div class="container" id="content">
          <nuxt/>
      </div>
    </main>
    <!-- Page Footer  -->
    <footer class="footer">
      <div class="container">
        <ul class="society-list">
          <li><a href="https://github.com/kapeter"><i class="iconfont">&#xe69f;</i></a></li>
        </ul>
        <p class="copyright">&copy;{{ thisYear }} KAPETER.COM <a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action">浙ICP备14040866号</a></p>
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
      this.isShow = document.body.scrollTop > 100
      window.addEventListener('scroll', this.handleScroll)
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
        this.isShow = document.body.scrollTop > 100
        document.addEventListener('mousewheel', () => {
          clearInterval(this.timer)
        })
      }
    }
  }
</script>

<style>
  .header{
    padding: 60px 0 30px;
  }
  .logo, .slogan{
    width: 100%;
    text-align: center;
  }
  .slogan{
    color: #666;
    font-size: 16px;
    letter-spacing: 1px;
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
    padding-top: 15px;
    position: relative;
    text-align: center;
    color: #999;
  }
  .society-list{
    display: inline-block;
  }
  .society-list > li {
    margin:0 15px;
    float: left;
    font-size: 32px;
  }
  .society-list > li > a {
    letter-spacing: 1px;
  }
  .copyright{
    font-size: 12px;
  }
  .copyright a{
    color: #999;
  }
  .copyright a:hover{
    color: #39c5bb;
  }
</style>
