<template>
  <div class="error-box text-center">
    <div class="error-content">
      <img src="~assets/img/error.jpg" alt="Page Not Found">
      <h1 class="error-color">404 - Page Not Found</h1>
      <p>呜呜呜┭┮﹏┭┮ 你找的页面已经去了火星，点击<nuxt-link to="/" exact class="text-underline"> 返回首页 </nuxt-link></p>      
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: '404 / Page Not Found',
      meta: [
        { hid: 'description', name: 'description', content: 'I am Kapeter, a front-end engineer.' }
      ]
    }
  }
}
</script>

<style>
.error-box{
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100vh;
}
.error-content{
  flex: 1;
}
</style>