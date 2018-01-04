<template>
  <section class="container">
    <div class="box">
      <Carousel :defaultIndex=0>
        <CarouselItem v-for="item in bannerItems" :key="item.id">
          <img v-if="item.cover_img != 'null'"  :src="item.cover_img">
          <div class="banner-cover">
            <div class="banner-content">
              <span class="category">{{ item.category.name }}</span>
              <h2 class="title">
                <nuxt-link :to="apiUrl.post + '/' + item.id">{{ item.title }}</nuxt-link>
              </h2>
              <span class="dateline">{{ item.published_at.date.slice(0, 10) }}</span>
            </div>
          </div>
        </CarouselItem>
      </Carousel>
    </div>

    <!-- Recent Articles -->
    <div class="box">
      <div class="box-header">
        <h3>近期文章<br><span>Lastest Articles</span></h3>
      </div>
      <div class="box-content">
        <div class="row">
          <div class="col-4" v-for="item in postItems">
            <div class="article-link">
              <div class="article-pic">
                <img v-if="item.cover_img != 'null'" :src="item.cover_img" :alt="item.title">
                <nuxt-link class="pic-guide" :to="apiUrl.post + '/' + item.id">
                  <span class="album-border"></span>
                </nuxt-link>
              </div>
              <div class="article-info">
                <p class="article-category">{{  item.category != null ? item.category.name : '' }}</p>
                <h3>
                  <nuxt-link :to="apiUrl.post + '/' + item.id">{{ item.title }}</nuxt-link>
                </h3>
                <p class="article-dateline">{{ item.published_at.date.slice(0, 10) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box-footer">
        <nuxt-link to="/post" class="btn btn-primary more-btn">READ MORE</nuxt-link>
      </div>
    </div>
    <!-- END Recent Articles -->
  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  import Carousel from '~/components/Carousel'
  import CarouselItem from '~/components/CarouselItem'

  export default {
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
    }
  }
</script>

<style>
  .swiper-slide{
    background: #ddd;
  }
  .swiper-slide img{
    width: 100%;
  }
  .banner-cover{
    position: absolute;
    left: 50%;
    top: 50%;
    overflow:hidden;
    width: 500px;
    margin-left: -250px;
    height: 180px;
    margin-top: -90px;
    border: 2px solid #39c5bb;
    padding: 5px;
    box-sizing: border-box;
  }
  .banner-content{
    background: rgba(255,255,255,0.95);
    padding: 30px 15px;
    height: 100%;
    box-sizing: border-box;
    text-align: center;
  }
  .banner-content .category{
    display: inline-block;
    padding-bottom: 5px;
    margin-bottom: 20px;
    border-bottom: 2px solid #39c5bb;
    color: #39c5bb;
  }
  .banner-content .title{
    margin-bottom: 15px;
  }
  .banner-content .dateline{
    color: #999;
    font-size: 12px;
  }
  .more-btn{
    color: #999;
    border:1px solid #C4C4C4;
    padding: 8px 25px;
  }
  .article-link {
    display: block;
    margin-bottom: 45px;
    position: relative;
    transition: all 0.3s ease-in-out;
  }
  .article-link:after{
    content: '';
    display: block;
    width: 0px;
    height: 2px;
    background-color: #39c5bb;
    position: absolute;
    left: 0;
    bottom: 0;
    transition: all 0.35s ease-in-out;
  }
  .article-link:hover{
    box-shadow: 0 15px 30px rgba(0,0,0,0.15);
  }
  .article-link:hover:after{
    width: 100%;
  }
  .article-pic{
    width: 100%;
    height: 214px;
    overflow:hidden;
    position: relative;
    background: #ddd;
  }
  .article-pic img {
    max-width: 100%;
    transition: all 0.25s ease-out;
  }
  .article-pic:hover img{
    transform: scale(1.1);
  }
  .article-info{
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    position: relative;
    text-align: center;
  }
  .article-info > h3 {
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: normal;
    height: 54px;
    overflow: hidden;
  }
  .article-info .article-dateline{
    margin-bottom: 0;
    font-size: 13px;
    color: #999;
  }
  .article-info > .article-category {
    color: #39c5bb;
    margin-bottom: 15px;
    position: relative;
    display: inline-block;
    padding: 0 15px;
    font-size: 13px;
  }
  .article-info > .article-category:before{
    content: "";
    display: block;
    height: 1px;
    width: 25px;
    position: absolute;
    top: 42%;
    right: 100%;
    background-color: #39c5bb;
  }
  .article-info > .article-category:after{
    content: "";
    display: block;
    height: 1px;
    width: 25px;
    position: absolute;
    top: 42%;
    left: 100%;
    background-color: #39c5bb;
  }
  .pic-guide{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:30px;
    z-index: 1;
    background-color: #39c5bb;
    opacity: 0;
    transform: scale(1.5);
    transition: all 0.25s ease-out;
  }

  .article-pic:hover .pic-guide{
    opacity: .5;
    transform: scale(1);
  }
  .album-border{
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    border: solid #fff 2px;
    box-sizing: border-box;
  }
  .album-border:before{
    content: '';
    display: block;
    width: calc(100% + 4px);
    height: calc(100% - 60px);
    position: absolute;
    top: 30px;
    left: -2px;
    z-index: 5;
    background-color: #39c5bb;
  }
  .album-border:after{
    content: '';
    display: block;
    height: calc(100% + 4px);
    width: calc(100% - 60px);
    position: absolute;
    top: -2px;
    left: 30px;
    z-index: 5;
    background-color: #39c5bb;
  }
  .pic-guide .btn{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 10;
    background: #fff;
    color: #39c5bb;
    border: 0;
    padding: 10px 20px;
    font-size: 12px;
  }
  .pic-guide .btn:hover{
    color: #39c5bb;
  }
  .pic-guide .btn:hover:after{
    width: 0;
  }
</style>

