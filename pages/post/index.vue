<template>
  <div>
    <div class="list-header">
      <h3 class="list-title pull-left">{{ listTitle }}</h3>
      <div class="pull-right">
        <form class="search-box clearfix">
          <input class="form-control col-9" type="text" name="filter" placeholder="输入关键词……" v-model="filter">
          <a class="btn btn-primary col-3" style="border-left:0" href="javascript:;" @click="searchPost()">搜  索</a>
        </form>
      </div>
    </div>
    <div class="list-content" v-if="listLoaded">
      <ul v-if="lists.length > 0">
        <li class="list-box clearfix" v-for="item in lists">
          <div class="list-img" v-show="item.cover_img != 'null'">
            <nuxt-link :to="apiUrl.list + '/' + item.id" :title="item.title">
              <img :src="item.cover_img" :alt="item.title">
            </nuxt-link>
          </div>
          <div class="list-right">
            <h3 class="article-title">
              <nuxt-link :to="apiUrl.list + '/' + item.id" :title="item.title">{{ item.title }}</nuxt-link>
            </h3>
            <p class="article-desc">{{ item.description }}</p>
            <div class="article-info clearfix">
              <div class="pull-left">
                <span>发布日期：{{ item.published_at }}</span>
                <span v-if="item.category != null">
                  栏目：
                  <a href="javascript:;" @click="changeCategory(item.category.id)">
                    {{ item.category.name }}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="text-center content-padding" v-else>
        <p><img src="~assets/img/error.jpg" alt="Page Not Found"></p>
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
    <div v-else>
      <Loading text="列表正在努力加载中……"></Loading>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import Loading from '~/components/Loading.vue'

  export default{
    components: {
      Loading
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
        listLoaded: true,
        filter: ''
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
      let paraData = { per_page: 6, category: 0, filter: '', page: 1 }
      let title = '所有文章'
      // 处理参数
      if ('filter' in context.route.query && context.route.query.filter !== '') {
        paraData.category = 0
        paraData.filter = context.route.query.filter
        title = '“' + paraData.filter + '” 的搜索结果'
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
          } else {
            paraData.category = 0
            title = '所有文章'
          }
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
      searchPost () {
        let _temp = this.filter
        this.$router.push({ path: '/post', query: { filter: _temp } })
        this.filter = ''
      },
      setParams () {
        let catItem = null
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
          if (catItem !== null) {
            if (this.params.category !== catItem.id) {
              this.params.page = 1
            }
            this.params.category = catItem.id
            this.listTitle = catItem.name
          } else {
            this.params.category = 0
            this.listTitle = '所有文章'
          }
          return
        }

        this.params.category = 0
        this.params.filter = ''
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

<style lang="less">
  @import '~assets/less/variable.less';

  .list-header{
    padding: 45px 0;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  .list-title{
    font-size: 28px;
    color: @main-color;
    letter-spacing: 0.1rem;
  }
  .list-content{
    padding: 30px 0 60px 0;
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
  .pagination{
    display: inline-block;
    li{
      float: left;
      margin: 0 5px;
      font-size: 14px;
      font-weight: 600;
      a{
        display: inline-block;
        padding: 6px;
        &:hover{
          color: @main-color;
        }
      }
    }
    .iconfont{
      font-weight: 400;
    }
    .active{
      border-bottom: 2px solid @main-color;
      a{
        color: @main-color;
      }
    }
    .disabled{
      a{
        color: #c9c9c9;
        cursor: not-allowed;
        &:hover{
          color: #c9c9c9;
        }
      }
    }
  }
</style>
