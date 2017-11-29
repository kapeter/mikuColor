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
              <router-link :to="apiUrl.list + '/' + item.id" :title="item.title">
                <img :src="item.cover_img" :alt="item.title">
              </router-link>
            </div>
          </div>
          <div class="col-8" :class="{ 'col-8' : item.cover_img != 'null' }">
            <div class="article-text">
              <h3 class="article-title">
                <router-link :to="apiUrl.list + '/' + item.id" :title="item.title">{{ item.title }}</router-link>
              </h3>
              <p class="article-desc">{{ item.description }}</p>
              <div class="article-info clearfix">
                <div class="pull-left">
                  <span>栏目：{{  item.category != null ? item.category.name : '' }}</span>
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
      <img src="../../assets/images/loading.gif">
      <p>列表正在努力加载中……</p>
    </div>
  </div>
</template>

<script>

  export default{
    data () {
      return {
        apiUrl: {
          list: 'post',
          category: 'category'
        },
        lists: [],
        params: {
          per_page: 5,
          category: 0,
          filter: '',
          page: 1
        },
        listTitle: '',
        pagination: {},
        pages: [],
        listLoaded: false
      }
    },
    watch: {
      $route () {
        this.loadListData()
      }
    },
    mounted () {
      setTimeout(() => {
        this.loadListData()
      }, 300)
    },
    methods: {
      loadListData () {
        let _self = this
        _self.listLoaded = false
        _self.setParams()
        _self.$http.get(_self.apiUrl.list, { params: _self.params })
          .then(function (res) {
            _self.lists = res.data.data
            _self.pagination = res.data.meta.pagination
            _self.pages = []
            for (let i = 0; i < _self.pagination.total_pages; i++) {
              let x = i + 1
              _self.pages.splice(i, 1, x)
            }
            _self.listLoaded = true
          })
      },
      setParams () {
        let catItem = null
        if ('filter' in this.$route.query && this.$route.query.filter !== '') {
          this.params.category = 0
          this.params.filter = this.$route.query.filter
          this.listTitle = '“' + this.params.filter + '” 的搜索结果'
          return
        }

        this.params.filter = ''
        if ('category' in this.$route.query) {
          let catId = parseInt(this.$route.query.category)
          for (let i = 0; i < this.$store.state.catLists.length; i++) {
            if (catId === this.$store.state.catLists[i].id) {
              catItem = this.$store.state.catLists[i]
              break
            }
          }
        }
        if (catItem !== null) {
          this.params.category = catItem.id
          this.params.page = 1
          this.listTitle = catItem.name
        } else {
          this.params.category = 0
          this.listTitle = '所有文章'
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
