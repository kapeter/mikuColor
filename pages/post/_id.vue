<template>
  <div>
    <h1 class="content-title">{{ thisPost.title }}</h1>
    <div class="content-info">
      <span>栏目：{{  thisPost.category != null ? thisPost.category.name : '' }}</span>
      <span>发布日期：{{ publishedTime }}</span>
    </div>
    <div class="content-body">
      <div id="marked-content" v-html="postContent"></div>
    </div>
    <div class="content-footer">
      <p>目前网站尚未开放评论功能，如需联系，请发邮件至: hfxsky@hotmail.com</p>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    // transition: {
    //   mode: 'out-in',
    //   enterActiveClass: 'animated fadeInUp',
    //   leaveActiveClass: 'animated fadeOutDown'
    // },
    head () {
      return {
        title: this.thisPost.title + ' / Kapeter',
        meta: [
          { hid: 'description', name: 'description', content: this.thisPost.title },
          { hid: 'keyword', name: 'keyword', content: 'Kapeter' }
        ]
      }
    },
    validate ({ params }) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
    data () {
      return {
        apiUrl: 'post',
        postId: 0,
        postLoaded: false,
        thisPost: {
          title: '这是一篇默认文章',
          published_at: {
            date: '2017-10-18 17:13:31.000000',
            timezone: 'Asia/Shanghai',
            timezone_type: 3
          },
          content: '<p>永远相信美好的事情即将发生</p>'
        }
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
    async asyncData (context) {
      let postRes = await axios.get('post/' + context.params.id)
      if ('code' in postRes.data && postRes.data.code === 10012) {
        context.error({statusCode: 404, message: 'Page Not Found'})
      } else {
        return {
          thisPost: postRes.data.data
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        let markedDom = document.getElementById('marked-content')
        if (markedDom) {
          this.generateTOC(markedDom)
        }
      })
    },
    beforeDestroy () {
      this.$parent.deleteToc()
    },
    methods: {
      generateTOC (markedDom) {
        let domArr = markedDom.querySelectorAll('h1, h2, h3, h4, h5, h6')
        if (domArr.length > 0) {
          let tocDom = document.createElement('div')
          tocDom.className = 'panel'
          tocDom.id = 'content-toc'
          let tocHtml = '<h3 class="panel-title">章节目录</h3><ul class="panel-list">'
          for (let i = 0; i < domArr.length; i++) {
            tocHtml += '<li class="toc-' + domArr[i].tagName.toLowerCase() + '"><a href="#' + domArr[i].id + '">' + domArr[i].innerText + '</a></li>'
          }
          tocHtml += '</ul>'
          tocDom.innerHTML = tocHtml
          this.$parent.addToc(tocDom)
        }
      }
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
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .content-body{
    line-height: 1.5;
    font-size: 15px;
  }
  .content-body p{
    margin-bottom: .85em;
  }
  .content-body h1{
    font-weight: 600;
    margin-top: 0.85em;
    margin-bottom: 0.85em;
    font-size: 28px;
  }
  .content-body h2, .content-body h3, .content-body h4, .content-body h5, .content-body h6 {
    font-weight: 400;
    margin-bottom: 0.85em;
    margin-top: 0;
  }
  .content-body h1:first-of-type{
    margin-top: 0;
  }
  .content-body ul, .content-body ol{
    margin-left: 30px;
    margin-bottom: 0.85em;
    word-break: break-word;
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
    font: 13px/1.5 'Poppins','PingFang SC',"Helvetica Neue",Helvetica,Arial,sans-serif;
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
  .content-toc{
    width: 360px;
    padding: 15px;
    box-sizing: border-box;
    border:1px dashed #39c5bb;
    float: right;
    margin-left: 30px;
    margin-bottom: 30px;
    word-break: break-all;
  }

</style>
