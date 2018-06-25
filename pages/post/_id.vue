<template>
  <div>
    <h1 class="content-title">{{ thisPost.title }}</h1>
    <div class="content-info">
      <span>栏目：{{  thisPost.category != null ? thisPost.category.name : '' }}</span>
      <span>发布日期：{{ thisPost.published_at }}</span>
    </div>
    <div class="content-body">
      <div id="marked-content" v-html="postContent"></div>
    </div>
    <div class="content-footer">
      <Comment model="post" :uid="thisPost.id"></Comment>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  import axios from '~/plugins/axios'
  import Comment from '~/components/Comment.vue'

  export default {
    head () {
      return {
        title: this.thisPost.title + ' / Kapeter',
        meta: [
          { hid: 'description', name: 'description', content: this.thisPost.title },
          { hid: 'keyword', name: 'keyword', content: 'Kapeter' }
        ]
      }
    },
    components: {
      Comment
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
        thisPost: {}
      }
    },
    computed: {
      postContent () {
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
      // this.$nextTick(() => {
      //   let markedDom = document.getElementById('marked-content')
      //   if (markedDom) {
      //     this.generateTOC(markedDom)
      //   }
      // })
    },
    beforeDestroy () {
      // this.$parent.deleteToc()
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


<style lang="less">
  @import '~assets/less/variable.less';

  .content-title{
    font-size: 30px;
    text-align: center;
    margin-top: 0;
  }
  .content-info{
    text-align: center;
    color: #999;
    font-size: 14px;
    span{
      margin-right: 15px;
    }
  }
  .content-desc{
    padding: 15px;
    border: 1px dashed #ddd;
  }

  .content-body{
    line-height: 1.75;
    font-size: 15px;
    padding: 30px 0;
    h1{
      margin: 0.75em 0;
      font-size: 28px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 15px;
      line-height: 1;
      position: relative;
      &:after{
        content: '';
        display: block;
        width: 115px;
        height: 1px;
        position: absolute;
        left: 0;
        bottom: -1px;
        background: @main-color;
      }
    }
    h2, h3, h4, h5, h6{
      margin-bottom: 0.5em;
      margin-top: 0.5em;
    }
    ul, ol{
      margin-left: 30px;
      margin-bottom: 0.75em;
      word-break: break-word;
      li{
        list-style-type: disc;
        display: list-item;
        text-align: -webkit-match-parent;
      }
    }
    a{
      color: @main-color;
      &:hover{
        text-decoration: underline;
      }
    }
    code{
      margin: 0 5px;
      color: #333;
      font: 13px/1.5 'Poppins','PingFang SC',"Helvetica Neue",Helvetica,Arial,sans-serif;
    }
    img{
      max-width: 100%;
    }
    .temp{
      border: 1px solid #ddd;
      padding: 10px 15px;
      overflow-x: auto;
      margin-bottom: 0.85em;
      background: #f8f8f8;
    }
    pre{
      .temp;
      code{
        margin: 0;
        color: #5a6665;
      }
    }
    blockquote{
      .temp;
      border-left:3px solid @main-color;
      p{
        &:last-child{
          margin-bottom: 0;
        }
      }
    }

    table{
      display: block;
      width: 100%;
      overflow: auto;
      border-spacing: 0;
      border-collapse: collapse;
      margin-bottom: 15px;
      tr{
        background-color: #fff;
        border-top: 1px solid @border-color;
        &:nth-child(2n) {
          background-color: #f6f8fa;
        }
        th{
          font-weight: 600;
        }
        th,td{
          padding: 6px 15px;
          border: 1px solid @border-color;
        }
      }

    }
  }
  .content-footer{
    margin-bottom: 60px;
  }
</style>
