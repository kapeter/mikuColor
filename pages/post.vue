<template>
  <section class="container">
    <div class="page-header">
      <ul class="category-list clearfix">
        <li :class="{active: currentCategory == 0 }">
          <a class="btn btn-primary" href="javascript:void(0);" @click="changeCategory(0)">所有文章</a>
        </li>
        <li v-for="item in $store.state.catLists" :class="{active: currentCategory == item.id }" :key="item.id">
          <a class="btn btn-primary" href="javascript:void(0);" @click="changeCategory(item.id)">{{ item.name }}</a>
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
    li{
      float: left;
      margin-right: 15px;
      margin-bottom: 15px;
    }
    .active{
      .btn{
        background: @main-color;
        color: #fff;
        border: 1px solid #39c5bb;
      }
    }
  }
</style>
