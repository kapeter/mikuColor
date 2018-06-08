<template>
  <section>
    <div class="first-screen">
      <Carousel class="banner" v-lazy-container="{ selector: 'img' }">
        <CarouselItem v-for="item in bannerItems" :key="item.id" >
          <img v-lazy="item.cover_img" :alt="item.title" data-error="/big-img-error.jpg">
          <nuxt-link class="banner-cover" :to="apiUrl.post + '/' + item.id">
            <div class="banner-content">
              <span class="category">{{ item.category.name }}</span>
              <h2 class="title">{{ item.title }}</h2>
              <span class="dateline">{{ item.published_at }}</span>
            </div>
          </nuxt-link>
        </CarouselItem>
      </Carousel>
      <a class="scroll" href="javascript:void(0);" @click="scrollToNews()">
        <i class="iconfont">&#xe65b;</i>
      </a>
    </div>
    <!-- Recent Articles -->
    <div class="container" id="news">
      <div class="box">
        <div class="box-header">
          <h3>近期文章<br><span>Lastest Articles</span></h3>
        </div>
        <div class="box-content">
          <div class="row">
            <div class="col-4" v-for="item in postItems" :key="item.id">
              <nuxt-link class="article-link" :to="apiUrl.post + '/' + item.id">
                <div class="article-pic">
                  <img v-lazy="item.cover_img" :alt="item.title">
                </div>
                <div class="article-info">
                  <p class="article-category">{{  item.category != null ? item.category.name : '' }}</p>
                  <h3>{{ item.title }}</h3>
                  <p class="article-dateline">{{ item.published_at }}</p>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="box-footer">
          <nuxt-link to="/post" class="btn btn-primary more-btn">READ MORE</nuxt-link>
        </div>
      </div>
    </div>

    <!-- END Recent Articles -->
  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  import Carousel from '~/components/Carousel'
  import CarouselItem from '~/components/CarouselItem'
  import scrollAnimate from '~/components/mixins/scrollAnimate'

  export default {
    mixins: [scrollAnimate],
    components: {
      Carousel,
      CarouselItem
    },
    data () {
      return {
        apiUrl: {
          post: 'post'
        },
        postItems: [],
        bannerItems: []
      }
    },
    async asyncData ({ params }) {
      let [postRes, bannerRes] = await Promise.all([
        axios.get('post', {
          params: {per_page: 6, sort: 'published_at|desc'}
        }),
        axios.get('post', {
          params: {per_page: 3, recommend: 0}
        })
      ])
      return {
        postItems: postRes.data.data,
        bannerItems: bannerRes.data.data
      }
    },
    mounted () {
      window.addEventListener('scroll', () => {
        this.stopScroll()
      })
    },
    methods: {
      scrollToNews () {
        let oDom = document.getElementById('news')
        if (oDom) {
          this.scrollToGoal(oDom.offsetTop)
        } else {
          this.scrollToGoal(document.body.clientHeight + document.documentElement.clientHeight)
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~assets/less/variable.less';
  .banner{
    margin: 0 auto;
    width: 90%;
    height: 75vh;
    position: relative;
  }
  .swiper-slide{
    background: #ddd;
    img {
      position: absolute;
      min-width: 100%;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
  .banner-cover{
    position: absolute;
    left: 50%;
    top: 50%;
    overflow:hidden;
    display: block;
    width: 500px;
    transform: translate(-50%,-50%);
    border: 2px solid @main-color;
    padding: 5px;
    box-sizing: border-box;
  }
  .banner-content{
    background: rgba(255,255,255,0.95);
    padding: 30px 15px;
    height: 100%;
    box-sizing: border-box;
    text-align: center;
    .category{
      display: inline-block;
      padding-bottom: 5px;
      margin-bottom: 20px;
      border-bottom: 2px solid @main-color;
      color: @main-color;
    }
    .title{
      margin-bottom: 15px;
    }
    .dateline{
      color: #999;
      font-size: 12px;
    }
  }
  .scroll{
    display: block;
    width: 100%;
    margin-bottom: 60px;
    text-align: center;
    .iconfont{
      display: inline-block;
      font-size: 32px;
      animation: scroll 2s infinite;
    }
  }
  @keyframes scroll {
    0% {
      transform: translate3d(0, -5px, 0);
    }
    50% {
      transform: translate3d(0, 5px, 0);
    }
    100% {
      transform: translate3d(0, -5px, 0);
    }
  }
  .article-link {
    display: block;
    margin-bottom: 30px;
    position: relative;
    .transition;
  }
  .article-link:after{
    content: '';
    display: block;
    width: 0px;
    height: 2px;
    background-color: @main-color;
    position: absolute;
    left: 0;
    bottom: 0;
    .transition;
  }
  .article-link:hover{
    box-shadow: 0 15px 30px rgba(0,0,0,0.15);
  }
  .article-link:hover:after{
    width: 100%;
  }
  .article-pic{
    width: 100%;
    height: 169px;
    overflow:hidden;
    position: relative;
    background: #ddd;
    img{
      max-width: 100%;
      .transition;
    }
  }
  .article-info{
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    position: relative;
    text-align: center;
    h3 {
      font-size: 18px;
      margin-bottom: 15px;
      font-weight: normal;
      height: 54px;
      overflow: hidden;
    }
    .article-dateline{
      margin-bottom: 0;
      font-size: 13px;
      color: #999;
    }
    .article-category {
      color: @main-color;
      margin-bottom: 15px;
      position: relative;
      display: inline-block;
      padding: 0 15px;
      font-size: 13px;
      .temp{
        content: "";
        display: block;
        height: 1px;
        width: 25px;
        position: absolute;
        top: 42%;
        background-color: @main-color;
      }
      &:before{
        .temp;
        right: 100%;
      }
      &:after{
        .temp;
        left: 100%;
      }
    }
  }
  .box-footer .more-btn{
    border:1px solid #c4c4c4;
    padding: 10px 45px;
  }

  @media screen and (max-width: 1024px) {
    .swiper-slide{
      img {
        min-height: 100%;
      }
    }
  }

  @media screen and (max-width: 640px) {
    .banner{
      width: 100%;
      padding: 0 15px;
      box-sizing: border-box;
      .banner-cover{
        width: 90%;
      }
    }
    .scroll{
      display: none;
    }
    .article-pic{
      height: auto;
      min-height: 180px;
      img{
        display: block;
        width: 100%;
        height: 180px;
      }
    }
  }
</style>

