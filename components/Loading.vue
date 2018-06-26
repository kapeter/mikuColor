<template>
  <div class="loading">
    <img src="~assets/svg/bars.svg">
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

<style scoped lang="less">
@import '~assets/less/variable.less';

.loading{
  padding: 60px 0;
  text-align: center;
}
.loading img{
  width: 75px;
  margin-bottom: 15px;
}
.loading p{
  color: @text-sub-color;
}
</style>
