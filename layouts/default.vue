<template>
  <div class="page-bg">
    <main class="main">
      <nuxt/>
    </main>
    <!-- Page Footer  -->
    <footer class="footer">
      <p>Copyright &copy; 2014 - {{ thisYear }} KAPETER.COM</p>
<!--       <p><a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action">浙ICP备14040866号</a></p> -->
    </footer>
    <a href="javascript:;" class="go-top" @click="backToTop()" :class="{ 'top-active' : isShow }">
      <i class="iconfont">&#xe600;</i>
    </a>
    <a href="javascript:void(0)" class="menu-icon" @click="menuIsOpened = true">
      <div class="menu-lines">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </a>
    <div class="menu-content" :class="{ 'menu-active': menuIsOpened }" >
      <a href="javascript:void(0)" class="menu-close" @click="menuIsOpened = false">
        <span></span>
        <span></span>
      </a>
      <div class="menu-body" v-if="menuIsOpened">
        <nav class="side-nav">
          <ul>
            <li><nuxt-link to="/" exact>首页 <span>/ HOME</span></nuxt-link></li>
            <li><nuxt-link to="/post">文章 <span>/ ARTICLES</span></nuxt-link></li>
            <li><nuxt-link to="/contact">联系 <span>/ CONTACT</span></nuxt-link></li>
          </ul>
        </nav>
        <div class="side-info">
          <img src="~assets/img/logo-white.png" alt="KAPETER">
          <h1>Kapeter</h1>
          <p>想要学设计，会点PHP的前端工程师。</p>
          <p>热爱二次元，热爱摄影。</p>
          <ul class="clearfix">
            <li>
              <a href="https://github.com/kapeter" title="github" target="_blank">
                <i class="iconfont">&#xeee2;</i>
              </a>
            </li>
            <li>
              <a href="http://note.youdao.com/noteshare?id=c800efd52739529c54b5e3d86ddc47cd" title="有道云笔记" target="_blank">
                <i class="iconfont">&#xe621;</i>
              </a>
            </li>
            <li>
              <a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">浙ICP备14040866号</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="clock">
      <p>{{ currentTime }}</p>
    </div>
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
        timer: null,
        menuIsOpened: false,
        currentTime: null
      }
    },
    watch: {
      menuIsOpened (val) {
        if (val) {
          document.body.style.overflow = 'hidden'
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
      window.addEventListener('scroll', this.handleScroll)
      this.setClock()
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
      },
      setClock () {
        this.currentTime = new Date()
        setInterval(() => {
          this.currentTime = new Date()
        }, 1000)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~assets/less/variable.less';

  .main{
    position: relative;
    width: 100%;
    min-height: 100%;
    overflow: hidden;
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
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
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
    width: 50px;
    position: fixed;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    .menu-lines{
      span{
        display: block;
        width: 40px;
        height: 2px;
        background-color: @main-color;
        transition: width .8s cubic-bezier(.23,1,.32,1) 0s;
        margin-bottom: 8px;
        &:first-child{
          width: 50px;
        }
        &:last-child{
          width: 30px;
        }
      }
    }
    p{
      font-weight: bold;
      color: @main-color;
      line-height: 1;
      transition: all .5s cubic-bezier(.23,1,.32,1);
    }
    &:hover{
      p{
        letter-spacing: 1px;
      }
      .menu-lines{
        span{
          &:first-child{
            width: 30px;
          }
          &:last-child{
            width: 50px;
          }
        }
      }
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
    transform: translateX(100%);
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
            color: #00ffee;
            span{
              font-size: 2rem;
            }
            &:hover{
              color: #fff;
              transform: translateX(30px);
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
        color: #00ffee;
        letter-spacing: .08rem;
        padding-top: -2rem;
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
              color: #00ffee;
              &:hover{
                color: #fff;
              }
            }
            &:last-child {
              margin-top: 15px;
            }
          }
        }
      }
    }
  }
  .menu-active{
    transform: translateX(0%);
  }

  .clock{
    width: 300px;
    letter-spacing: 0.25rem;
    color: @main-color;
    font-weight: bold;
    position: fixed;
    left: 50px;
    top: 60%;
    z-index: 999;
    transform: rotate(-90deg);
    transform-origin: 0 0;
  }
</style>
