<template>
  <section>
    <PageHeader title="404" sub-title="Page Not Found"></PageHeader>
    <div class="error-box text-center">
      <div class="error-content">
        <img src="~assets/img/error.png" alt="Page Not Found">
        <p>呜呜呜┭┮﹏┭┮ 你找的页面已经去了火星……</p>
      </div>
    </div>
  </section>
</template>

<script>
import PageHeader from '~/components/PageHeader'

export default {
  components: {
    PageHeader
  },
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
  margin-bottom: 75px;
}
.error-content{
  flex: 1;
}
.error-content img{
  margin-bottom: 15px;
}
</style>