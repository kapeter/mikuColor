<template>
  <div>
    <div class="list-header">
      <h3 class="list-title">{{ listTitle }}</h3>
      <p class="list-sub-title">文章总数：{{ pagination.total }}</p>
    </div>
    <div class="list-content" v-if="listLoaded">
      <ul v-if="lists.length > 0">
        <li class="list-box row" v-for="item in lists">
          <div class="col-4" v-show="item.cover_img != 'null'">
            <div class="article-img">
              <nuxt-link :to="apiUrl.list + '/' + item.id" :title="item.title">
                <img :src="item.cover_img" :alt="item.title">
              </nuxt-link>
            </div>
          </div>
          <div class="col-8" :class="{ 'col-8' : item.cover_img != 'null' }">
            <div class="article-text">
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
                  <span>发布日期：{{ item.published_at.date.slice(0, 10) }}</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="text-center" v-else>
        <p>没找到文章，要不换个姿势再试试</p>
      </div>
      <div class="list-footer">
        <ul class="pagination" v-show="lists.length > 0">
          <li :class="{ disabled: pagination.current_page === 1  }">
            <a href="javascript:;" title="首页" @click="changePage(1)">
              <i class="iconfont">&#xe605;</i>
            </a>
          </li>
          <li :class="{ disabled: pagination.current_page === 1  }">
            <a href="javascript:;" title="上一页" @click="changePage(pagination.current_page - 1)">
              <i class="iconfont">&#xe602;</i>
            </a>
          </li>
          <li v-for="num in showPageNum(pages)" :class="{ active: num == pagination.current_page }">
            <a href="javascript:;" @click="changePage(num)">{{ num }}</a>
          </li>
          <li :class="{ disabled: pagination.current_page === pagination.total_pages  }">
            <a href="javascript:;" title="下一页" @click="changePage(pagination.current_page + 1)">
              <i class="iconfont">&#xe603;</i>
            </a>
          </li>
          <li :class="{ disabled: pagination.current_page === pagination.total_pages  }">
            <a href="javascript:;" title="下一页" @click="changePage(pagination.total_pages)">
              <i class="iconfont">&#xe604;</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="loading">
      <img src="~assets/img/loading.gif">
      <p>列表正在努力加载中……</p>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default{
    transition: {
      mode: 'out-in',
      enterActiveClass: 'animated fadeInUp',
      leaveActiveClass: 'animated fadeOutDown'
    },
    head () {
      return {
        title: this.listTitle + ' / Kapeter',
        meta: [
          { hid: 'description', name: 'description', content: this.listTitle },
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
        listTitle: '',
        pagination: {},
        pages: [],
        listLoaded: true
      }
    },
    mounted () {
      this.setPageList()
    },
    watch: {
      $route () {
        this.loadListData()
      }
    },
    async asyncData (context) {
      let paraData = { per_page: 5, category: 0, filter: '', page: 1 }
      let title = '所有文章'
      // 处理参数
      if ('filter' in context.route.query && context.route.query.filter !== '') {
        paraData.category = 0
        paraData.filter = context.route.query.filter
        title = '“' + paraData.filter + '” 的搜索结果'
      }
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
        } else {
          paraData.category = 0
          title = '所有文章'
        }
      }
      let listRes = await axios.get('post', { params: paraData })

      return {
        params: paraData,
        lists: listRes.data.data,
        pagination: listRes.data.meta.pagination,
        listTitle: title
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
            _self.setPageList()
            _self.listLoaded = true
          })
      },
      setParams () {
        let catItem = null
        this.params.filter = ''
        this.params.category = 0
        if ('filter' in this.$route.query && this.$route.query.filter !== '') {
          this.params.category = 0
          this.params.filter = this.$route.query.filter
          this.listTitle = '“' + this.params.filter + '” 的搜索结果'
          return
        }

        if ('category' in this.$route.query) {
          let catId = parseInt(this.$route.query.category)
          let lists = this.$store.state.catLists
          for (let i = 0; i < lists.length; i++) {
            if (catId === lists[i].id) {
              catItem = lists[i]
              break
            }
          }
        }
        if (catItem !== null) {
          this.params.category = catItem.id
          this.listTitle = catItem.name
        } else {
          this.params.category = 0
          this.listTitle = '所有文章'
        }
      },
      setPageList () {
        this.pages = []
        for (let i = 0; i < this.pagination.total_pages; i++) {
          let x = i + 1
          this.pages.splice(i, 1, x)
        }
      },
      changePage (num) {
        if (num < 1 || num > this.pagination.total_pages) {
          return false
        }
        this.params.page = num
        this.loadListData()
      },
      showPageNum (pages) {
        let current = this.pagination.current_page
        let total = this.pagination.total_pages
        return pages.filter(function (page) {
          if (current < 5) {
            return page < 10
          } else if (current > (total - 5)) {
            return page > total - 9
          } else {
            return Math.abs(page - current) < 5
          }
        })
      },
      changeCategory (id) {
        this.$router.push({ path: '/post', query: { category: id } })
      }
    }
  }
</script>

<style>
  .list-header{
    width: 100%;
    padding: 20px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    text-align: center;
  }
  .list-title{
    font-size: 24px;
    color: #39c5bb;
    margin-bottom: 10px;
  }
  .list-sub-title{
    font-size: 12px;
    color: #999;
    margin-bottom: 0;
  }
  .list-content{
    padding: 30px 0;
  }
  .list-right{
    padding-left: 60px;
  }
  .list-box{
    position: relative;
    margin-bottom: 30px;
  }
  .list-box .article-img{
    height: 138px;
    overflow:hidden;
    background: #ddd;
  }
  .list-box .article-img img{
    max-width: 100%;
    min-height: 100%;
    transition: all 0.25s ease-out;
  }
  .list-box .article-img:hover img{
    transform: scale(1.1);
  }
  .list-box .article-title{
    font-size: 18px;
    font-weight: normal;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .list-box .article-title span{
    float: right;
    font-size: 14px;
    color: #999;
  }
  .list-box .article-desc{
    margin: 15px 0;
    color: #999;
    height: 68px;
    overflow:hidden;
    text-align: justify;
    font-size: 13px;
  }
  .list-box .article-info{
    color: #999;
    font-size: 13px;
    padding: 0;
  }
  .list-box .article-info span{
    margin-right: 15px;
  }
  .list-box .article-info .btn{
    font-size: 13px;
  }
  .list-footer{
    margin-top: 60px;
    text-align: center;
  }
  .pagination{
    display: inline-block;
  }
  .pagination li{
    float: left;
    margin: 0 5px;
    font-size: 14px;
    font-weight: 600;
  }
  .pagination li a{
    display: inline-block;
    padding: 6px;
  }
  .pagination li a:hover{
    color: #39c5bb;
  }
  .pagination .iconfont{
    font-weight: 400;
  }
  .pagination .active{
    border-bottom: 2px solid #39c5bb;
  }
  .pagination .disabled a{
    color: #c9c9c9;
    cursor: not-allowed;
  }
  .pagination .disabled a:hover{
    color: #c9c9c9;
  }
  .pagination .active a{
    color: #39c5bb;
  }
</style>
