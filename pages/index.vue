<template>
  <section>
    <!-- Recent Articles -->
    <div class="container" id="news">
      <div class="box">
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
  import scrollAnimate from '~/components/mixins/scrollAnimate'

  export default {
    mixins: [scrollAnimate],
    data () {
      return {
        apiUrl: {
          post: 'post'
        },
        postItems: []
      }
    },
    async asyncData ({ params }) {
      let [postRes] = await Promise.all([
        axios.get('post', {
          params: {per_page: 6, sort: 'published_at|desc'}
        })
      ])
      return {
        postItems: postRes.data.data
      }
    },
    mounted () {
      window.addEventListener('scroll', () => {
        this.stopScroll()
      })
      this.$store.commit('setTitle', {
        title: '寂',
        subTitle: '永远相信美好的事情即将发生'
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

<style lang="less" scoped>
  @import '~assets/less/variable.less';

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
      display: block;
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

  @media screen and (max-width: 768px) {
    .article-pic{
      height: auto;
    }
  }
</style>

