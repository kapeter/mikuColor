<template>
  <section class="container">
    <div class="page-header">
      <ul class="category-list clearfix">
        <li :class="{active: currentCategory == 0 }">
          <a href="javascript:;" @click="changeCategory(0)">所有文章({{ total }})</a>
        </li>
        <li v-for="item in $store.state.catLists" :class="{active: currentCategory == item.id }">
          <a href="javascript:;" @click="changeCategory(item.id)">{{ item.name }}({{ item.detail.count }})</a>
        </li>
      </ul>
    </div>
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
      margin-bottom: 10px;
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
</style>
