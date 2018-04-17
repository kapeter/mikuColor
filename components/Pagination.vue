<template>
  <ul class="pagination clearfix">
    <li :class="{ disabled: pagination.current_page === 1  }">
      <a href="javascript:;" title="首页" @click="changePage(1)">
        <i class="iconfont">&#xe605;</i>
      </a>
    </li>
    <li :class="{ disabled: pagination.current_page === 1  }">
      <a href="javascript:;" title="上一页" @click="changePage(pagination.current_page - 1)">
        <i class="iconfont">&#xe602;</i>
      </a>
    </li>
    <li v-for="num in showPageNum(pages)" :class="{ active: num == pagination.current_page }">
      <a href="javascript:;" @click="changePage(num)">{{ num }}</a>
    </li>
    <li :class="{ disabled: pagination.current_page === pagination.total_pages  }">
      <a href="javascript:;" title="下一页" @click="changePage(pagination.current_page + 1)">
        <i class="iconfont">&#xe603;</i>
      </a>
    </li>
    <li :class="{ disabled: pagination.current_page === pagination.total_pages  }">
      <a href="javascript:;" title="下一页" @click="changePage(pagination.total_pages)">
        <i class="iconfont">&#xe604;</i>
      </a>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      pagination: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        pages: []
      }
    },
    mounted () {
      this.setPageList()
    },
    methods: {
      showPageNum (pages) {
        let current = this.pagination.current_page
        let total = this.pagination.total_pages
        return pages.filter(function (page) {
          if (current < 3) {
            return page < 5
          } else if (current > (total - 3)) {
            return page > total - 5
          } else {
            return Math.abs(page - current) < 3
          }
        })
      },
      setPageList () {
        this.pages = []
        for (let i = 0; i < this.pagination.total_pages; i++) {
          let x = i + 1
          this.pages.splice(i, 1, x)
        }
      },
      changePage (num) {
        if (num < 1 || num > this.pagination.total_pages) {
          return false
        }
        this.$emit('change', { pageNum: num })
      }
    }
  }
</script>

<style lang="less">
  @import '~assets/less/variable.less';
  .pagination{
    display: inline-block;
    li{
      float: left;
      margin: 0 5px;
      font-size: 14px;
      font-weight: 600;
      a{
        display: inline-block;
        padding: 5px;
        &:hover{
          color: @main-color;
        }
      }
    }
    .iconfont{
      font-weight: 400;
    }
    .active{
      border-bottom: 2px solid @main-color;
      a{
        color: @main-color;
      }
    }
    .disabled{
      a{
        color: #c9c9c9;
        cursor: not-allowed;
        &:hover{
          color: #c9c9c9;
        }
      }
    }
  }
</style>
