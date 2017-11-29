<template>
  <div class="row content-padding">
    <div class="col-8">
      <nuxt-child/>
    </div>
    <div class="col-4 list-right" id="list-navbar">
      <div class="panel">
        <form class="search-box clearfix">
          <input class="form-control col-9" type="text" name="filter" placeholder="输入关键词……" v-model="filter">
          <a class="btn col-3" style="border-left:0" href="javascript:;" @click="searchPost()">搜  索</a>
        </form>
      </div>
      <div class="panel">
        <h3 class="panel-title">分类栏目</h3>
        <ul class="panel-list">
          <li v-for="item in $store.state.catLists">
            <a href="javascript:;" @click="changeCategory(item.id)">{{ item.name }}</a>
            <span class="pull-right">({{ item.detail.count }})</span>
          </li>
        </ul>
      </div>
      <div class="panel">
        <h3 class="panel-title">文章归档</h3>
        <ul class="panel-list">
          <li><a href="#">2017年9月</a><span class="pull-right">(12)</span></li>
          <li><a href="#">2017年8月</a><span class="pull-right">(12)</span></li>
          <li><a href="#">2017年7月</a><span class="pull-right">(12)</span></li>
          <li><a href="#">2017年6月</a><span class="pull-right">(12)</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    middleware: 'category', // 引入文章目录
    data () {
      return {
        filter: ''
      }
    },
    methods: {
      changeCategory (id) {
        this.$router.push({ path: '/post', query: { category: id } })
      },
      searchPost () {
        let _temp = this.filter
        this.$router.push({ path: '/post', query: { filter: _temp } })
        this.filter = ''
      },
      addToc (tocDom) {
        document.getElementById('list-navbar').append(tocDom)
      },
      deleteToc () {
        if (document.getElementById('content-toc')) {
          document.getElementById('list-navbar').removeChild(document.getElementById('content-toc'))
        }
      }
    }
  }
</script>

<style>
  .list-right{
    padding-left: 60px;
  }
  .toc-list{
    margin:15px 0 0;
  }
  .toc-list li{
    list-style-type: none;
    margin-bottom: 10px;
  }
  .toc-list li:last-child{
    margin-bottom: 0;
  }
  .toc-list li a{
    color: #666;
  }
  .toc-list li a:hover{
    text-decoration: none;
  }
  .panel-list .toc-h2{
    padding-left: 15px;
  }
  .panel-list.toc-h3{
    padding-left: 30px;
  }
  .panel-list .toc-h4{
    padding-left: 45px;
  }
  .panel-list .toc-h5{
    padding-left: 60px;
  }
  .panel-list .toc-h6{
    padding-left: 75px;
  }
</style>
