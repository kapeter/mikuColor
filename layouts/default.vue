<template>
  <div class="page-bg">
    <!-- Page Header  -->
    <header class="header">
      <div class="container">
        <div class="logo">
          <nuxt-link to="/" exact><img src="~assets/img/logo-lg.png"></nuxt-link>
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
        <ul class="link-list clearfix">
          <li><a href="https://www.github.com/kapeter">github</a></li>
          <li><nuxt-link to="/contact">联系我</nuxt-link></li>
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
      let sTop = document.documentElement.scrollTop || document.body.scrollTop
      this.isShow = sTop > 100
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
  .header{
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
    padding-top: 30px;
    position: relative;
    text-align: center;
    color: #999;
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
  }
  .copyright a{
    color: #999;
  }
  .copyright a:hover{
    color: #39c5bb;
  }
  .link-list .nuxt-link-active:after {
    display: none;
  }
</style>
