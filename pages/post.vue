<template>
  <section class="container">
    <header class="header">
      <ul class="category-list clearfix">
        <li :class="{active: currentCategory == 0 }">
          <a href="javascript:;" @click="changeCategory(0)">所有文章({{ total }})</a>
        </li>
        <li v-for="item in $store.state.catLists" :class="{active: currentCategory == item.id }">
          <a href="javascript:;" @click="changeCategory(item.id)">{{ item.name }}({{ item.detail.count }})</a>
        </li>
      </ul>
    </header>
    <nuxt-child/>
  </section>

</template>

<script>
  export default {
    middleware: 'category', // 引入文章目录

    data () {
      return {
        currentCategory: 0
      }
    },
    computed: {
      total () {
        return this.$store.state.catLists.reduce((total, currentValue) => {
          return total + currentValue.detail.count
        }, 0)
      }
    },
    mounted () {
      if ('category' in this.$route.query) {
        this.currentCategory = parseInt(this.$route.query.category)
      }
    },
    methods: {
      changeCategory (id) {
        this.currentCategory = id
        this.$router.push({ path: '/post', query: { category: id } })
      }
    }
  }
</script>

<style lang="less">
  @import '~assets/less/variable.less';

  .category-list{
    line-height: 2;
    li{
      float: left;
      margin-right: 15px;
      a{
        position: relative;
        color: #999;
        font-size: 16px;
        &:hover{
          color: @main-color;
        }
      }
      &:after{
        content: "/";
        padding-left: 15px;
      }
      &:last-child{
        &:after{
          content: "";
        }
      }
    }
    .active{
      a{
        color: @main-color;
        &:after{
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          display: block;
          width: 100%;
          height: 1px;
          background: @main-color;
        }
      }
    }
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
