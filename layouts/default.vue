<template>
  <div class="page-bg">
    <header class="header clearfix">
      <div class="cover">
        <img src="~assets/img/bg.jpg">
      </div>
      <div class="logo">
        <nuxt-link to="/" exact><img src="~assets/img/logo-sm.png" alt="kapeter"></nuxt-link>
      </div>
      <nav class="nav">
        <ul class="nav-list">
          <li><nuxt-link to="/" exact>首页</nuxt-link></li>
          <li><nuxt-link to="/about">关于我</nuxt-link></li>
          <li><nuxt-link to="/post">技术</nuxt-link></li>
          <li><nuxt-link to="/contact">联系我</nuxt-link></li>
        </ul>
      </nav>
    </header>
    <main class="main">
      <nuxt/>
    </main>
    <!-- Page Footer  -->
    <footer class="footer">
      <p>Copyright &copy; 2014 - {{ thisYear }} KAPETER.COM</p>
    </footer>
    <a href="javascript:;" class="go-top" @click="backToTop()" :class="{ 'top-active' : isShow }">
      <i class="iconfont">&#xe600;</i>
    </a>
    <div class="menu-content" :class="{ 'menu-active': menuIsOpened }" >
      <a href="javascript:void(0)" class="menu-close" @click="menuIsOpened = false">
        <span></span>
        <span></span>
      </a>
      <div class="emoji">
        <img src="~assets/img/kiss.png">
      </div>
      <div class="menu-body" v-if="menuIsOpened">
        <nav class="side-nav">
          <ul>
            <li><nuxt-link to="/" exact>首页 <span>/ HOME</span></nuxt-link></li>
            <li><nuxt-link to="/post">文章 <span>/ ARTICLES</span></nuxt-link></li>
            <li><nuxt-link to="/contact">联系 <span>/ CONTACT</span></nuxt-link></li>
          </ul>
        </nav>
        <div class="side-info">
          <h1>About Me</h1>
          <p>想要学设计，会点PHP的前端工程师；热爱二次元与摄影。</p>
          <ul class="clearfix">
            <li>
              <a href="https://github.com/kapeter" title="github" target="_blank">
                <i class="iconfont">&#xe691;</i>
              </a>
            </li>
            <li>
              <a href="http://note.youdao.com/noteshare?id=c800efd52739529c54b5e3d86ddc47cd" title="有道云笔记" target="_blank">
                <i class="iconfont">&#xe65a;</i>
              </a>
            </li>
            <li>
              <a href="https://tuchong.com/1669457/" title="图虫" target="_blank">
                <i class="iconfont">&#xe665;</i>
              </a>
            </li>
          </ul>
          <p class="copyright"><a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">浙ICP备14040866号</a></p>
        </div>
      </div>
    </div>
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
        menuIsOpened: false,
        currentTime: null
      }
    },
    watch: {
      menuIsOpened (val) {
        if (val) {
          setTimeout(() => {
            document.body.style.overflow = 'hidden'
          }, 500)
        } else {
          document.body.style.overflow = 'auto'
        }
      },
      $route (val) {
        this.menuIsOpened = false
      }
    },
    mounted () {
      let sTop = document.documentElement.scrollTop || document.body.scrollTop
      this.isShow = sTop > 100
      window.addEventListener('scroll', () => {
        let sTop = document.documentElement.scrollTop || document.body.scrollTop
        this.isShow = sTop > 100
        this.stopScroll()
      })
      this.setClock()
    },
    methods: {
      backToTop () {
        this.scrollToGoal(0)
      },
      setClock () {
        this.currentTime = this.parseDate()
        setInterval(() => {
          this.currentTime = this.parseDate()
        }, 1000)
      },
      parseDate () {
        let obj = new Date()

        return obj.toJSON()
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~assets/less/variable.less';

  .header{
    position: relative;
    width: 100%;
    padding: 50px;
    box-sizing: border-box;
    height: 240px;
    overflow: hidden;
    .cover{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      z-index: -1;
      animation: cover 25s linear;
      animation-fill-mode: forwards;
      img{
        width: 100%;
      }
    }
    .logo{
      float: left;
      img{
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
            color: #ffffff;
            font-size: 16px;
          }
        }
      }
    }
  }

  @-webkit-keyframes cover {
    0% {
      top: 0;
    }
    100% {
      top: -100%;
    }
  }

  .main{
    position: relative;
    width: 100%;
    padding: 60px 0;
  }
  .go-top{
    position: fixed;
    right: 60px;
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
      border-color: #fff;
      color: #fff;
    }
  }
  .top-active{
    bottom: 45px;
  }

  .footer{
    padding: 15px 0;
    text-align: center;
    z-index: 999;
    line-height: 1;
    p{
      color: #999;
      font-size: 12px;
      letter-spacing: 0.5px;
      margin-bottom: 0;
    }
  }

  .menu-icon{
    width: 30px;
    position: fixed;
    right: 50px;
    top: 50px;
    line-height: 1;
    span{
      display: inline-block;
      width: 30px;
      height: 1px;
      background-color: @main-color;
      margin-bottom: 8px;
    }
  }

  .menu-content{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: @main-color;
    z-index: 1000;
    transform: translate3d(100%,0,0);
    opacity: 0.5;
    transition: all .8s cubic-bezier(.23,1,.32,1);
    .menu-close{
      display: block;
      width: 50px;
      height: 50px;
      position: absolute;
      right: 50px;
      top: 50%;
      transform: translateY(-50%);
      span{
        position: absolute;
        left: 0;
        top: 50%;
        display: block;
        width: 48px;
        height: 2px;
        background-color: #fff;
        &:first-child{
          transform: rotate(45deg);
        }
        &:last-child{
          transform: rotate(-45deg);
        }
      }
    }
    .emoji{
      position: absolute;
      left: 50px;
      bottom:  50px;
    }
    .menu-body{
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: 100%;
      .side-nav{
        padding-right: 8%;
        line-height: 2;
        font-size: 3.5rem;
        li{
          a{
            display: inline-block;
            color: @light-color;
            white-space: nowrap;
            span{
              font-size: 2rem;
            }
            &:hover{
              color: #fff;
              transform: translate3d(30px,0,0);
            }
          }
          .nuxt-link-active{
            color: #fff;
          }
        }
      }
      .side-info{
        padding-left: 8%;
        font-size: 1rem;
        color: @light-color;
        letter-spacing: .08rem;
        h1{
          color: #fff;
        }
        ul {
          display: inline-block;
          li{
            float: left;
            margin-right: 15px;
            a{
              .iconfont{
                font-size: 28px;
              }
              color: @light-color;
              &:hover{
                color: #fff;
              }
            }
          }
        }
        .copyright{
          a{
            color: @light-color;
            &:hover{
              color: #fff;
            }
          }
        }
      }
    }
  }
  .menu-active{
    opacity: 1;
    transform: translate3d(0%,0,0);
  }

  .clock{
    width: 350px;
    text-align: center;
    letter-spacing: 0.25rem;
    color: @main-color;
    font-weight: bold;
    position: fixed;
    left: -94px;
    top: 50%;
    z-index: 999;
    transform: rotate(-90deg) translateY(-50%);
  }


  @media screen and (max-width: 768px) {
    .header{
      position: fixed;
      left: 0;
      right:0;
      top: 0;
      padding: 0 15px;
      height: 50px;
      line-height: 50px;
      box-shadow: 0px 0px 15px rgba(0,0,0,.1);
      background: #fff;
      .menu{
        font-size: 2.5rem;
      }
    }
    .menu-content{
      .menu-body{
        display: block;
        .side-nav{
          font-size: 2.5rem;
          padding: 45px 0;
          li{
            a{
              span{
                font-size: 1.5rem;
              }
            }
          }

        }
        .side-info{
          padding: 0;
          img {
            display: none;
          }
          h1{
            font-size: 1.5rem;
          }
        }
      }
      .menu-close{
        width: 30px;
        height: 30px;
        span{
          width: 28px;
        }
      }
    } 
  }

  @media screen and (max-width: 1200px) {
    .clock, .menu-icon{
      display: none;
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
    .footer{
      position: relative;
      background: transparent;
    }
    .menu-content{
      .menu-body{
        padding: 0 30px;
      }
      .emoji{
        display: none;
      }
      .menu-close{
        bottom: 30px;
        left: 50%;
        top: auto;
        transform: translate(-50%, 0);
      }
    }
    .main{
      padding-top: 50px;
    }
  }
</style>
