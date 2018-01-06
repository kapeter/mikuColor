<template>
  <div class="row content-padding">
    <div class="col-8">
      <nuxt-child/>
    </div>
    <div class="col-4 list-right">
      <Avatar></Avatar>
      <div class="panel">
        <form class="search-box clearfix">
          <input class="form-control col-9" type="text" name="filter" placeholder="输入关键词……" v-model="filter">
          <a class="btn btn-primary col-3" style="border-left:0" href="javascript:;" @click="searchPost()">搜  索</a>
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
      <div id="toc" class="toc"></div>
    </div>
  </div>
</template>

<script>
  import Avatar from '~/components/Avatar.vue'
  export default {
    middleware: 'category', // 引入文章目录

    components: {
      Avatar
    },
    data () {
      return {
        left: 0,
        top: 0,
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
        let dom = document.getElementById('toc')
        dom.append(tocDom)
        this.left = this.getAbsLeft(dom)
        this.top = this.getAbsTop(dom)
        window.addEventListener('scroll', this.handleScroll)
      },
      deleteToc () {
        document.getElementById('toc').innerHTML = ''
        window.removeEventListener('scroll', this.handleScroll)
      },
      handleScroll () {
        let dom = document.getElementById('toc')
        let winTop = document.documentElement.scrollTop || document.body.scrollTop
        if (winTop >= this.top - 30) {
          dom.style.position = 'fixed'
          dom.style.left = this.left + 'px'
          dom.style.top = '30px'
        } else {
          dom.style.position = 'static'
        }
      },
      getAbsTop (obj) {
        let top = obj.offsetTop
        while (obj.offsetParent != null) {
          obj = obj.offsetParent
          top += obj.offsetTop
        }
        return top
      },
      getAbsLeft (obj) {
        let left = obj.offsetLeft
        while (obj.offsetParent != null) {
          obj = obj.offsetParent
          left += obj.offsetLeft
        }
        return left
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
  .toc{
    width: 335px;
  }
</style>
