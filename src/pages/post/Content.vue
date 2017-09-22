<template>
  <div class="row content-padding">
    <div class="col-8">
      <transition name="fade">
        <div v-if="postLoaded">
          <h1 class="content-title">{{ thisPost.title }}</h1>
          <div class="content-info">
            <span>栏目：前端开发</span>
            <span>发布日期：{{ publishedTime }}</span>
          </div>
          <div class="content-desc">
            {{ thisPost.description }}
          </div>
          <div class="content-body" v-html="postContent"></div>
          <div class="content-footer">
            <p>本博客所有文章均为作者原创，享有版权所有权，未经许可，严禁转载或修改。</p>
          </div>
        </div>
        <div v-else class="content-loading">
          <img src="../../assets/images/loading.gif">
          <p>文章正在努力加载中……</p>
        </div>
      </transition>
    </div>

    <div class="col-4 list-right">
      <div class="panel">
        <form class="search-box clearfix">
          <input class="form-control col-9" type="text" name="keyword" placeholder="输入关键词……">
          <a class="btn col-3" style="border-left:0"  href="javascript:;">搜  索</a>
        </form>
      </div>
      <div class="panel">
        <h3 class="panel-title">CHAPTERS</h3>
        <ul class="panel-list">
          <li><a href="#">前端开发</a><span class="pull-right">(12)</span></li>
          <li><a href="#">前端开发</a><span class="pull-right">(12)</span></li>
          <li><a href="#">前端开发</a><span class="pull-right">(12)</span></li>
          <li><a href="#">前端开发</a><span class="pull-right">(12)</span></li>
        </ul>
      </div>
      <div class="panel">
        <h3 class="panel-title">CATEGORIES</h3>
        <ul class="panel-list">
          <li><a href="#">前端开发</a><span class="pull-right">(12)</span></li>
          <li><a href="#">前端开发</a><span class="pull-right">(12)</span></li>
          <li><a href="#">前端开发</a><span class="pull-right">(12)</span></li>
          <li><a href="#">前端开发</a><span class="pull-right">(12)</span></li>
        </ul>
      </div>
      <div class="panel">
        <h3 class="panel-title">ARCHIVES</h3>
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
    data () {
      return {
        apiUrl: '',
        postId: 0,
        postLoaded: false,
        thisPost: {}
      }
    },
    computed: {
      publishedTime () {
        return this.thisPost.published_at.date.slice(0, 10)
      },
      postContent () {
        const marked = require('marked')
        marked.setOptions({
          renderer: new marked.Renderer(),
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false
        })
        return marked(this.thisPost.content)
      }
    },
    watch: {
      thisPost () {
        this.postLoaded = !this.postLoaded
      }
    },
    mounted () {
      let _self = this
      _self.postId = parseInt(_self.$route.params.id)
      _self.$http.get('http://vue.test.com/api/post/55')
        .then(function (res) {
          _self.thisPost = res.data.data
        })
    }
  }
</script>


<style>
  .content-title{
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 30px;
  }
  .content-info{
    color: #999;
    font-size: 14px;
    margin-bottom: 15px;
  }
  .content-info span{
    margin-right: 15px;
  }
  .content-desc{
    padding: 15px;
    border: 1px dashed #ddd;
  }
  .content-body{
    padding: 15px 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
  .content-body{
    line-height: 1.5;
    font-size: 15px;
  }
  .content-body p{
    margin-bottom: .85em;
  }
  .content-body h1, .content-body h2, .content-body h3, .content-body h4, .content-body h5, .content-body h6 {
    font-weight: 400;
    margin-bottom: 0.85em;
    margin-top: 0;
  }
  .content-body h1{
    font-weight: 600;
    margin-top: 0.85em;
    font-size: 28px;
  }
  .content-body ul, .content-body ol{
    margin-left: 30px;
    margin-bottom: 0.85em;
  }
  .content-body ul li, .content-body ol li{
    list-style-type: disc;
    display: list-item;
    text-align: -webkit-match-parent;
  }
  .content-body a{
    color: #39c5bb;
  }
  .content-body a:hover{
    color: #39c5bb;
    text-decoration: underline;
  }
  .content-body pre {
    border: 1px solid #ddd;
    padding: 10px 15px;
    overflow-x: auto;
    margin-bottom: 0.85em;
    background: #f4f4f4;
  }
  .content-body code{
    font: 14px/1.5 'Roboto','PingFang SC',"Helvetica Neue",Helvetica,Arial,sans-serif;
  }
  .content-footer{
    margin-top: 30px;
  }
  .content-footer p{
    color: #999;
    padding-left: 15px;
    position: relative;
  }
  .content-footer p:before{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 2px;
    height: 100%;
    background: #39c5bb;
  }
  .content-loading{
    padding: 60px 0;
    text-align: center;
  }
</style>
