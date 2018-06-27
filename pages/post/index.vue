<template>
  <section>
    <PageHeader :title="pageTitle" :sub-title="pageSubTitle"></PageHeader>
    <div class="container">
      <!-- <div class="list-header clearfix">
        <form class="search-box pull-right clearfix" v-if="searchVisible">
          <input class="form-control col-9" type="text" name="filter" placeholder="输入关键词……" v-model="filter">
          <a class="btn btn-primary col-3" style="border-left:0" href="javascript:;" @click="searchPost()">搜  索</a>
        </form>
        <a href="javascript:;" @click="searchVisible = !searchVisible" class="pull-right search-icon">
          <i class="iconfont">&#xe61f;</i>
        </a>
      </div> -->
      <div class="list-content" v-if="listLoaded">
        <ul v-if="lists.length > 0">
          <li class="list-box clearfix" v-for="item in lists" :key="item.id">
            <div class="list-img" v-if="item.cover_img != 'null'">
              <nuxt-link :to="apiUrl.list + '/' + item.id" :title="item.title">
                <img v-lazy="item.cover_img" :alt="item.title">
              </nuxt-link>
            </div>
            <div class="list-right">
              <h3 class="article-title">
                <nuxt-link :to="apiUrl.list + '/' + item.id" :title="item.title">{{ item.title }}</nuxt-link>
              </h3>
              <p class="article-desc">{{ item.description }}</p>
              <div class="article-info clearfix">
                <div class="pull-left">
                  <span v-if="item.category != null">
                    栏目：
                    <a href="javascript:;" @click="changeCategory(item.category.id)">
                      {{ item.category.name }}
                    </a>
                  </span>
                  <span>日期：{{ item.published_at }}</span>

                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="text-center push-30-t" v-else>
          <p><img src="~assets/img/error.png" alt="Page Not Found" class="error-img"></p>
          <p>没找到文章，要不换个姿势再试试</p>
        </div>
        <div class="list-footer" v-if="lists.length > 0">
          <Pagination :pagination="pagination" v-on:change="changePage"></Pagination>
        </div>
      </div>
      <div v-else class="list-content">
        <Loading text="列表正在努力加载中……"></Loading>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  import Loading from '~/components/Loading'
  import Pagination from '~/components/Pagination'
  import PageHeader from '~/components/PageHeader'

  export default{
    middleware: 'category',
    components: {
      Loading,
      Pagination,
      PageHeader
    },
    head () {
      return {
        title: this.pageTitle + ' / Kapeter',
        meta: [
          { hid: 'description', name: 'description', content: this.pageTitle },
          { hid: 'filter', name: 'filter', content: 'Kapeter' }
        ]
      }
    },
    data () {
      return {
        apiUrl: {
          list: 'post'
        },
        lists: [],
        params: {},
        pageTitle: '',
        pageSubTitle: '',
        pagination: {},
        pages: [],
        listLoaded: true,
        filter: '',
        searchVisible: false
      }
    },
    watch: {
      $route () {
        this.loadListData()
      }
    },
    async asyncData (context) {
      let paraData = { per_page: 6, category: 0, filter: '', page: 1 }
      let title = '所有文章'
      let pageSubTitle = 'all articles'
      // 处理参数
      if ('filter' in context.route.query && context.route.query.filter !== '') {
        paraData.category = 0
        paraData.filter = context.route.query.filter
        title = '“' + paraData.filter + '” 的搜索结果'
        pageSubTitle = 'search'
      } else {
        if ('category' in context.route.query) {
          let catItem = null
          let catId = parseInt(context.route.query.category)
          let lists = context.store.state.catLists
          for (let i = 0; i < lists.length; i++) {
            if (catId === lists[i].id) {
              catItem = lists[i]
              break
            }
          }
          if (catItem !== null) {
            paraData.category = catItem.id
            title = catItem.name
            pageSubTitle = catItem.slug
          } else {
            paraData.category = 0
            title = '所有文章'
            pageSubTitle = 'all articles'
          }
        }
      }

      let listRes = await axios.get('post', { params: paraData })

      return {
        params: paraData,
        lists: listRes.data.data,
        pagination: listRes.data.meta.pagination,
        pageTitle: title,
        pageSubTitle: pageSubTitle
      }
    },
    methods: {
      loadListData () {
        let _self = this
        _self.listLoaded = false
        _self.setParams()
        axios.get(_self.apiUrl.list, { params: _self.params })
          .then(function (res) {
            _self.lists = res.data.data
            _self.pagination = res.data.meta.pagination
            _self.listLoaded = true
          })
      },
      searchPost () {
        let _temp = this.filter
        if (_temp) {
          this.$router.push({ path: '/post', query: { filter: _temp } })
          this.filter = ''
          this.handleSearchVisible()
        }
      },
      setParams () {
        let catItem = null
        if ('filter' in this.$route.query && this.$route.query.filter !== '') {
          this.params.category = 0
          this.params.filter = this.$route.query.filter
          this.pageTitle = '“' + this.params.filter + '” 的搜索结果'
          this.pageSubTitle = 'search'
        } else {
          this.params.filter = ''
          if ('category' in this.$route.query) {
            let catId = parseInt(this.$route.query.category)
            let lists = this.$store.state.catLists
            for (let i = 0; i < lists.length; i++) {
              if (catId === lists[i].id) {
                catItem = lists[i]
                break
              }
            }
            if (catItem !== null) {
              if (this.params.category !== catItem.id) {
                this.params.page = 1
              }
              this.params.category = catItem.id
              this.pageTitle = catItem.name
              this.pageSubTitle = catItem.slug
            } else {
              this.params.category = 0
              this.pageTitle = '所有文章'
              this.pageSubTitle = 'all articles'
            }
          } else {
            this.params.category = 0
            this.pageTitle = '所有文章'
            this.pageSubTitle = 'all articles'
          }
        }
      },
      changePage ({ pageNum }) {
        this.params.page = pageNum
        this.loadListData()
      },
      changeCategory (id) {
        this.$router.push({ path: '/post', query: { category: id } })
      },
      handleSearchVisible () {
        let winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        this.searchVisible = winW > 640
      }
    },

    mounted () {
      this.handleSearchVisible()
    }
  }
</script>

<style lang="less">
  @import '~assets/less/variable.less';

  .list-header{
    text-align: center;
    border-bottom: 1px solid #ddd;
    padding-bottom: 15px;
    .list-title{
      font-size: 27px;
      color: @main-color;
    }    
    .search-box{
      margin-top: 5px;
    }
    .search-icon{
      font-size: 24px;
      display: none;
    }
  }

  .list-content{
    padding: 30px 0 60px 0;
    min-height: 300px;
  }
  .list-box{
    position: relative;
    margin-bottom: 30px;
  }
  .list-box .list-img{
    width: 320px;
    height: 180px;
    overflow:hidden;
    background: #ddd;
    float: left;
  }
  .list-box .list-img img{
    max-width: 100%;
    display: block;
    .transition;
  }
  .list-box .list-img:hover img{
    transform: scale(1.1);
  }
  .list-right{
    margin-left: 350px;
  }
  .list-right .article-title{
    font-size: 20px;
    font-weight: normal;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .list-right .article-title span{
    float: right;
    font-size: 16px;
    color: #999;
  }
  .list-right .article-desc{
    margin: 15px 0;
    color: #999;
    height: 104px;
    overflow:hidden;
    text-align: justify;
    font-size: 15px;
    line-height: 1.5;
  }
  .list-right .article-info{
    color: #999;
    font-size: 13px;
    padding: 0;
  }
  .list-right .article-info span{
    margin-right: 15px;
  }
  .list-right .article-info .btn{
    font-size: 13px;
  }
  .list-footer{
    margin-top: 60px;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    .list-header {
      position: relative;
      .list-title{
        font-size: 24px;
      }
      .search-box{
        position: absolute;
        left: 0;
        bottom: -65px;
        z-index: 10;
        padding: 15px 0px;
        background: #fff;
        width: 100%;
        box-sizing: border-box;
      }
      .search-icon{
        display: block;
      }
    }
    .list-box{
      .list-img{
        width: 100%;
        float: none;
        height: auto;
      }
      .list-right{
        width: 100%;
        margin: 0;
        .article-title{
          white-space: normal;
          text-align: justify;
          padding-top: 15px;
          font-size: 18px;
        }
        .article-desc{
          height: auto;
          font-size: 14px;
        }
      }
    }
  }
</style>
