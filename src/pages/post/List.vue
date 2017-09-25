<template>
  <div>
    <div class="list-header">
      <h3 class="list-title">{{ listTitle }}</h3>
      <p class="list-sub-title">文章总数：{{ pagination.total }}</p>
    </div>
    <div class="list-content">
      <ul v-if="lists.length > 0">
        <li class="list-box row" v-for="item in lists">
          <div class="article-img col-4">
            <router-link :to="apiUrl.list + '/' + item.id" :title="item.title">
              <img :src="item.cover_img" alt="#">
            </router-link>
          </div>
          <div class="article-text col-8">
            <h3 class="article-title">
              <router-link :to="apiUrl.list + '/' + item.id" :title="item.title">{{ item.title }}</router-link>
            </h3>
            <p class="article-desc">{{ item.description }}</p>
            <div class="article-info clearfix">
              <div class="pull-left">
                <span>栏目：{{  item.category != null ? item.category.name : '' }}</span>
                <span>发布日期：{{ item.published_at.date.slice(0, 10) }}</span>
              </div>
              <router-link :to="apiUrl.list + '/' + item.id" class="btn pull-right">继续阅读</router-link>
            </div>
          </div>
        </li>
      </ul>
      <div class="text-center" v-else>
        <p>没找到文章，要不换个姿势再试试</p>
      </div>
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
          keyword: ''
        },
        listTitle: '',
        pagination: {}
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
        _self.setParams()
        _self.$http.get(_self.apiUrl.list, {
          params: _self.params
        })
          .then(function (res) {
            _self.lists = res.data.data
            _self.pagination = res.data.meta.pagination
          })
      },
      setParams () {
        let catItem = null
        if ('keyword' in this.$route.query && this.$route.query.keyword !== '') {
          this.params.category = 0
          this.params.keyword = this.$route.query.keyword
          this.listTitle = '“' + this.params.keyword + '” 的搜索结果'
          return
        }
        this.params.keyword = ''
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
          this.listTitle = catItem.name
        } else {
          this.params.category = 0
          this.listTitle = '所有文章'
        }
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
    height: 170px;
    overflow:hidden;
  }
  .list-box .article-img img{
    max-width: 100%;
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
    padding: 15px 0;
    color: #999;
    margin-bottom: 0;
    height: 81px;
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
    line-height: 34px;
    margin-right: 15px;
  }
  .list-box .article-info .btn{
    font-size: 13px;
  }
</style>
