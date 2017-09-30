<template>
  <div>
    <div v-if="pageIsLoaded">
      <router-view></router-view>
    </div>
    <div class="error-box" v-else>
      <p class="text-center push-30">
          <img src="assets/images/loading.gif" alt="Loading">
      </p>
      <p class="text-center font-s18 color-gary">页面正在努力加载中……!</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pageIsLoaded: false
      }
    },
    created () {
      this.$store.dispatch('config')
    },
    mounted () {
      this.$nextTick(() => {
        this.pageIsLoaded = true
      })
    }
  }
</script>

<style>
  @import './assets/css/index.css'
</style>
