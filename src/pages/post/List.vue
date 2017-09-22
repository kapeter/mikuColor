<template>
  <div class="row content-padding">
    <div class="col-8">
      <div class="list-header">
        <h3 class="list-title">所有文章</h3>
        <p class="list-sub-title">文章总数：22</p>
      </div>
      <div class="list-content">
        <ul>
          <li class="list-box row">
            <div class="article-img col-4">
              <a href="#">
                <img src="../../assets/images/article-simple.jpg" alt="#">
              </a>
            </div>
            <div class="article-text col-8">
              <h3 class="article-title"><router-link to="/post/1">为美好的世界献上祝福</router-link></h3>
              <p class="article-desc">Vestibulum luctus sapien malesuada eros varius, vel vestibulum lacus euismod. Fusce fermentum est ac diam imperdiet, in ornare tellus lobortis. Aliquam erat volutpat. Nulla tempus ultricies quam id accumsan. Maecenas sollicitudin elementum libero, scelerisque tempor</p>
              <div class="article-info clearfix">
                <div class="pull-left">
                  <span>栏目：前端开发</span>
                  <span>发布日期：2017-09-18</span>
                </div>
                <a href="#" class="btn pull-right">继续阅读</a>
              </div>
            </div>
          </li>
          <li class="list-box row">
            <div class="article-img col-4">
              <a href="#">
                <img src="../../assets/images/article-simple.jpg" alt="#">
              </a>
            </div>
            <div class="article-text col-8">
              <h3 class="article-title"><a href="#">为美好的世界献上祝福</a></h3>
              <p class="article-desc">Vestibulum luctus sapien malesuada eros varius, vel vestibulum lacus euismod. Fusce fermentum est ac diam imperdiet, in ornare tellus lobortis. Aliquam erat volutpat. Nulla tempus ultricies quam id accumsan. Maecenas sollicitudin elementum libero, scelerisque tempor</p>
              <div class="article-info clearfix">
                <div class="pull-left">
                  <span>栏目：前端开发</span>
                  <span>发布日期：2017-09-18</span>
                </div>
                <a href="#" class="btn pull-right">继续阅读</a>
              </div>
            </div>
          </li>
          <li class="list-box row">
            <div class="article-img col-4">
              <a href="#">
                <img src="../../assets/images/article-simple.jpg" alt="#">
              </a>
            </div>
            <div class="article-text col-8">
              <h3 class="article-title"><a href="#">为美好的世界献上祝福</a></h3>
              <p class="article-desc">Vestibulum luctus sapien malesuada eros varius, vel vestibulum lacus euismod. Fusce fermentum est ac diam imperdiet, in ornare tellus lobortis. Aliquam erat volutpat. Nulla tempus ultricies quam id accumsan. Maecenas sollicitudin elementum libero, scelerisque tempor</p>
              <div class="article-info clearfix">
                <div class="pull-left">
                  <span>栏目：前端开发</span>
                  <span>发布日期：2017-09-18</span>
                </div>
                <a href="#" class="btn pull-right">继续阅读</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-4 list-right">
      <div class="panel">
        <form class="search-box clearfix">
          <input class="form-control col-9" type="text" name="keyword" placeholder="输入关键词……">
          <a class="btn col-3" style="border-left:0"  href="javascript:;">搜  索</a>
        </form>
      </div>
      <div class="panel">
        <h3 class="panel-title">CATEGORIES</h3>
        <ul class="panel-list">
          <li><a href="#">前端开发</a><span class="pull-right">(12)</span></li>
          <li><a href="#">前端开发</a><span class="pull-right">(12)</span></li>
          <li><a href="#">前端开发</a><span class="pull-right">(12)</span></li>
          <li><a href="#">前端开发</a><span class="pull-right">(12)</span></li>
        </ul>
      </div>
      <div class="panel">
        <h3 class="panel-title">ARCHIVES</h3>
        <ul class="panel-list">
          <li><a href="#">2017年9月</a><span class="pull-right">(12)</span></li>
          <li><a href="#">2017年8月</a><span class="pull-right">(12)</span></li>
          <li><a href="#">2017年7月</a><span class="pull-right">(12)</span></li>
          <li><a href="#">2017年6月</a><span class="pull-right">(12)</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
  .list-header{
    width: 100%;
    padding: 20px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    text-align: center;
  }
  .list-title{
    font-size: 24px;
    color: #39c5bb;
    margin-bottom: 10px;
  }
  .list-sub-title{
    font-size: 12px;
    color: #999;
    margin-bottom: 0;
  }
  .list-content{
    padding: 30px 0;
  }
  .list-right{
    padding-left: 60px;
  }
  .list-box{
    position: relative;
    margin-bottom: 30px;
  }
  .list-box .article-img{
    height: 170px;
    overflow:hidden;
  }
  .list-box .article-img img{
    max-width: 100%;
  }
  .list-box .article-title{
    font-size: 18px;
    font-weight: normal;
  }
  .list-box .article-title span{
    float: right;
    font-size: 14px;
    color: #999;
  }
  .list-box .article-desc{
    padding: 15px 0;
    color: #999;
    margin-bottom: 0;
    height: 81px;
    overflow:hidden;
    text-align: justify;
    font-size: 13px;
  }
  .list-box .article-info{
    color: #999;
    font-size: 13px;
    padding: 0;
  }
  .list-box .article-info span{
    line-height: 34px;
    margin-right: 15px;
  }
  .list-box .article-info .btn{
    font-size: 13px;
  }
</style>
