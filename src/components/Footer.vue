<template>
  <footer class="footer">
    <div class="container">
      <ul class="society-list">
        <li><a href="https://github.com/kapeter"><i class="iconfont">&#xe69f;</i></a></li>
      </ul>
      <p class="copyright">&copy;{{ thisYear }} KAPETER.COM <a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action">浙ICP备14040866号-1</a></p>
    </div>
  </footer>
</template>

<script>
  export default {
    computed: {
      thisYear () {
        return (new Date()).getFullYear()
      }
    }
  }
</script>

<style>
  .footer{
    width: 100%;
    padding-top: 30px;
    position: relative;
    text-align: center;
    color: #999;
  }
  .society-list{
    display: inline-block;
    margin-bottom: 15px;
  }
  .society-list > li {
    margin:0 15px;
    float: left;
    font-size: 32px;
  }
  .society-list > li > a {
    letter-spacing: 1px;
  }
  .copyright{
    font-size: 12px;
  }
  .copyright a{
    color: #999;
  }
  .copyright a:hover{
    color: #39c5bb;
  }

</style>
