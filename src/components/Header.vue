<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <img src="../assets/images/logo-lg.png">
      </div>
      <div class="slogan">I'm Kapeter, a front-end engineer.</div>
      <nav class="nav">
        <ul>
          <li><router-link to="/" exact>首页</router-link></li>
          <li><router-link to="/post">文章</router-link></li>
          <li><router-link to="/about" exact>关于我</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
  export default {}
</script>

<style>
  .header{
    padding: 60px 0 30px;
  }
  .logo, .slogan{
    width: 100%;
    text-align: center;
  }
  .slogan{
    color: #666;
    font-size: 16px;
    letter-spacing: 1px;
    margin-top: 30px;
  }
  .nav{
    width: 100%;
    height: 45px;
    margin-top: 30px;
    text-align: center;
    border-top: 1px #ddd solid;
    border-bottom: 1px #ddd solid;
  }
  .nav > ul {
    display: inline-block;
    line-height: 45px;
  }
  .nav > ul:after{
    content: '';
    display: block;
    clear: both;
    height: 0;
  }
  .nav > ul > li {
    margin: 0 30px;
    float: left;
    text-align: center;
    position: relative;
  }
  .nav > ul > li > a{
    display: inline-block;
  }
  .router-link-active{
    color: #39c5bb;
  }
  .router-link-active:after{
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: #39c5bb;
    position: absolute;
    left: 0;
    bottom: -1px;
  }
</style>
