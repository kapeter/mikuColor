<template>
  <div class="loading">
    <img src="~assets/img/loading.gif">
    <p>{{ text }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: 'Now Loading……'
      }
    }
  }
</script>

<style>
.loading{
  padding: 60px 0;
  text-align: center;
}
</style>
