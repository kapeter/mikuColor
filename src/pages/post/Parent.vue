<template>
  <div class="row content-padding">
    <div class="col-8">
      <transition mode="out-in" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <router-view></router-view>
      </transition>
    </div>
    <div class="col-4 list-right">
      <div class="panel">
        <form class="search-box clearfix">
          <input class="form-control col-9" type="text" name="keyword" placeholder="输入关键词……" v-model="keyword">
          <a class="btn col-3" style="border-left:0" href="javascript:;" @click="searchPost()">搜  索</a>
        </form>
      </div>
      <div class="panel">
        <h3 class="panel-title">CATEGORIES</h3>
        <ul class="panel-list">
          <li v-for="item in $store.state.catLists">
            <a href="javascript:;" @click="changeCategory(item.id)">{{ item.name }}</a><span class="pull-right">({{ item.detail.count }})</span>
          </li>
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
        keyword: ''
      }
    },
    created () {
      if (this.$store.state.catLists.length < 1) {
        this.$store.dispatch('getCategory')
      }
    },
    methods: {
      changeCategory (id) {
        this.$router.push({ path: '/post', query: { category: id } })
      },
      searchPost () {
        let temp = this.keyword
        this.keyword = ''
        this.$router.push({ path: '/post', query: { keyword: temp } })
      }
    }
  }
</script>

<style>
  .list-right{
    padding-left: 60px;
  }
</style>
