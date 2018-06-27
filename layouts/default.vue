<template>
  <div class="page-bg">
    <header class="header clearfix" :class="{'is-black' : isBlack }">
      <div class="logo">
        <nuxt-link to="/" exact>
          <img v-if="!isBlack && !menuIsOpened" src="~assets/img/logo-sm.png" alt="kapeter">
          <img v-else src="~assets/img/logo-black.png" alt="kapeter">
        </nuxt-link>
      </div>
      <nav class="nav" :class="{'nav-open' : menuIsOpened}">
        <ul class="nav-list">
          <li><nuxt-link to="/" exact>首页</nuxt-link></li>
          <li><nuxt-link to="/about">关于</nuxt-link></li>
          <li><nuxt-link to="/post">博客</nuxt-link></li>
          <li><nuxt-link to="/contact">联系</nuxt-link></li>
          <li>
            <a href="https://github.com/kapeter" target="_blank">Github</a>
          </li>
        </ul>
      </nav>
      <a href="javascript:void(0);" class="nav-toggle" @click="menuIsOpened = !menuIsOpened" :class="{'is-open' : menuIsOpened}">
        <span></span>
        <span></span>
        <span></span>
      </a>
    </header>
    <main class="main">
      <nuxt/>
    </main>
    <!-- Page Footer  -->
    <footer class="footer">
      <p>Copyright &copy; 2014 - {{ thisYear }} KAPETER.COM</p>
      <p class="copyright">
        <a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">浙ICP备14040866号</a>
      </p>
    </footer>
    <a href="javascript:;" class="go-top" @click="backToTop()" :class="{ 'top-active' : isShow }">
      <i class="iconfont">&#xe600;</i>
    </a>
  </div>

</template>


<script>
  import scrollAnimate from '~/components/mixins/scrollAnimate'

  export default {
    mixins: [scrollAnimate],
    computed: {
      thisYear () {
        return (new Date()).getFullYear()
      }
    },
    data () {
      return {
        isShow: false,
        isBlack: false,
        menuIsOpened: false
      }
    },
    watch: {
      $route () {
        this.menuIsOpened = false
      }
    },
    mounted () {
      let sTop = document.documentElement.scrollTop || document.body.scrollTop
      this.isShow = sTop > 100
      window.addEventListener('scroll', () => {
        let sTop = document.documentElement.scrollTop || document.body.scrollTop
        this.isShow = sTop > 100
        this.isBlack = sTop > 250
        this.menuIsOpened = false
        this.stopScroll()
      })
    },
    methods: {
      backToTop () {
        this.scrollToGoal(0)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~assets/less/variable.less';

  .header{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    padding: 50px;
    box-sizing: border-box;
    z-index: 10;
    transition: all 0.25s;
    .logo{
      position: relative;
      z-index: 10;
      float: left;
      img{
        display: block;
        height: 18px;
      }
    }
    .nav{
      float: right;
      .nav-list{
        li{
          float: left;
          padding: 0px 15px;
          line-height: 18px;
          a{
            display: block;
            color: #ffffff;
            font-size: 16px;
            box-sizing: border-box;
            letter-spacing: .1em;
          }
        }
        .nuxt-link-active{
          color: @main-color;
          font-weight: 600;
        }
      }
    }
  }
  .is-black{
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0px 0px 15px rgba(0,0,0,.1);
    padding: 25px;
    .nav{
      .nav-list{
        li{
          a{
            color: #333;
          }
        }
      }
    }
  }
  .main{
    position: relative;
    width: 100%;
  }
  .go-top{
    position: fixed;
    right: 15px;
    bottom: -45px;
    display: block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    border:1px solid #ddd;
    transition: all 0.35s ease-in-out;
    z-index: 10;
    background: #fff;
    &:hover{
      background-color: @main-color;
      border-color: @main-color;
      color: #fff;
    }
  }
  .top-active{
    bottom: 45px;
  }

  .footer{
    text-align: center;
    z-index: 999;
    line-height: 1;
    p{
      color: #999;
      font-size: 12px;
      letter-spacing: 0.5px;
      a{
        color: #999;
        &:hover{
          color: @main-color;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .header{
      padding: 15px;
      .nav{
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(255, 255, 255, 0.95);
        width: 100%;
        padding-top: 50px;
        transform: translateY(-100%);
        opacity: 0;
        transition: all 0.25s ease-out;
        z-index: -1;
        box-shadow: 0px 0px 30px rgba(0,0,0,.1);
        .nav-list{
          li{
            float: none;
            height: 45px;
            line-height: 45px;
            a{
              display: block;
              color: @text-color;
            }
          }
        }
      }
      .nav-toggle{
        float: right;
        position: relative;
        width: 24px;
        span{
          position: absolute;
          left: 0;
          top: 8px;
          display: inline-block;
          height: 1px;
          background: #fff;
          transition: all 0.25s;
          width: 24px;
          &:first-child{
            top: 0;
          }
          &:last-child{
            top: 16px;
          }
        }
      }
      .nav-open{
        transform: translateY(0%);
        opacity: 1;
      }
      .is-open{
        span{
          background: #333;
          &:first-child{
            transform-origin: 0 0;
            transform: rotate(45deg);
          }
          &:nth-child(2){
            opacity: 0;
          }
          &:last-child{
            transform-origin: 0 0;
            transform: rotate(-45deg);
          }
        }
      }
    }
    .is-black{
      .nav-toggle{
        span{
          background: #333;
        }
      }
    }
    .go-top{
      right: 15px;
      border-radius: 100%;
      width: 30px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
    }
    .top-active{
      bottom: 15px;
    }
  }
</style>
