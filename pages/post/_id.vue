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
      <p>目前网站尚未开放评论功能，请通过邮件 <nuxt-link to="/contact">联系我</nuxt-link></p>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  import axios from '~/plugins/axios'

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
      publishedTime () {
        return this.thisPost.published_at.date.slice(0, 10)
      },
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


<style lang="less">
  @import '~assets/less/variable.less';

  .content-title{
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 30px;
    letter-spacing: 1px;
  }
  .content-info{
    color: #999;
    font-size: 14px;
    margin-bottom: 15px;
    span{
      margin-right: 15px;
    }
  }
  .content-desc{
    padding: 15px;
    border: 1px dashed #ddd;
  }

  .content-body{
    line-height: 1.5;
    font-size: 14px;
    padding: 15px 0;
    h1{
      margin-top: 0.85em;
      margin-bottom: 0.85em;
      font-size: 28px;
      border-left: 3px solid @main-color;
      padding-left: 15px;
      line-height: 1;
    }
    h2, h3, h4, h5, h6{
      margin-bottom: 0.5em;
      margin-top: 0.5em;
    }
    ul, ol{
      margin-left: 30px;
      margin-bottom: 0.85em;
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
    .temp{
      border: 1px solid #ddd;
      padding: 10px 15px;
      overflow-x: auto;
      margin-bottom: 0.85em;
      background: #f4f4f4;
    }
    pre{
      .temp;
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
    code{
      font: 13px/1.5 'Poppins','PingFang SC',"Helvetica Neue",Helvetica,Arial,sans-serif;
    }
    img{
      max-width: 100%;
    }
  }
  .content-footer{
    margin-top: 30px;
    a{
      text-decoration: underline;
    }
    p{
      color: #999;
      padding-left: 15px;
      position: relative;
      &:before{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        width: 2px;
        height: 100%;
        background: @main-color;
      }
    }
  }
</style>
