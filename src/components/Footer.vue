<template>
  <footer class="footer">
    <div class="container">
      <ul class="society-list">
        <li><a href="#"><i class="iconfont">&#xe69f;</i></a></li>
      </ul>
      <p class="copyright">StarryMask V1.1.0</p>
      <p class="copyright">&copy;{{ thisYear }} KAPETER.COM 浙ICP备14040866号-1</p>
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
    padding: 30px 0;
    position: relative;
    text-align: center;
    color: #999;
  }
  .society-list{
    display: inline-block;
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
    text-transform: uppercase;
  }
  #cover{
    position: absolute;
    left: 0;
    bottom: 0;
  }
</style>
