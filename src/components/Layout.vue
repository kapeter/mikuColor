<template>
  <div class="page-bg">
    <HeaderPart></HeaderPart>
    <main class="main">
      <div class="container" id="content">
        <transition mode="out-in" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft">
          <router-view></router-view>
        </transition>
      </div>
    </main>
    <FooterPart></FooterPart>
    <a href="javascript:;" class="go-top" @click="backToTop()" :class="{ 'top-active' : isShow }">
      <i class="iconfont">&#xe600;</i>
    </a>
  </div>
</template>

<script>
  import HeaderPart from './Header.vue'
  import FooterPart from './Footer.vue'

  export default {
    components: {
      HeaderPart,
      FooterPart
    },
    data () {
      return {
        isShow: true,
        timer: null
      }
    },
    mounted () {
      this.isShow = document.body.offsetWidth > 1300
      this.isShow = document.body.scrollTop > 100
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.handleResize)
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
      },
      handleResize () {
        this.isShow = document.body.offsetWidth > 1300
      }
    }
  }
</script>

<style>
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
</style>
