<template>
  <div>
    <div class="box">
      <div class="swiper">
        <div class="swiper-slide">
          <img src="../assets/images/banner.jpg">
        </div>
      </div>
    </div>

    <!-- Recent Articles -->
    <div class="box">
      <div class="box-content">
        <div class="row">
          <a class="col-4 article-link" href="#">
            <div class="article-pic">
              <img src="../assets/images/article-simple.jpg">
              <div class="pic-guide">
                Secure your Day One Edition today as this bonus content will be available for a limited time only!
              </div>
            </div>
            <div class="article-info">
              <h3><a href="#">为美好的世界献上祝福</a></h3>
              <ul class="article-content">
                <li><span>栏目：</span>前端开发</li>
                <li><span>标签：</span>JavaScript,Css</li>
              </ul>
              <p class="article-time"><span>2017.04.06</span></p>
            </div>
          </a>
          <a class="col-4 article-link" href="#">
            <div class="article-pic">
              <img src="../assets/images/article-simple.jpg">
              <div class="pic-guide">
                Secure your Day One Edition today as this bonus content will be available for a limited time only!
              </div>
            </div>
            <div class="article-info">
              <h3><a href="#">为美好的世界献上祝福</a></h3>
              <ul class="article-content">
                <li><span>栏目：</span>前端开发</li>
                <li><span>标签：</span>JavaScript,Css</li>
              </ul>
              <p class="article-time"><span>2017.04.06</span></p>
            </div>
          </a>
          <a class="col-4 article-link" href="#">
            <div class="article-pic">
              <img src="../assets/images/article-simple.jpg">
              <div class="pic-guide">
                Secure your Day One Edition today as this bonus content will be available for a limited time only!
              </div>
            </div>
            <div class="article-info">
              <h3><a href="#">为美好的世界献上祝福</a></h3>
              <ul class="article-content">
                <li><span>栏目：</span>前端开发</li>
                <li><span>标签：</span>JavaScript,Css</li>
              </ul>
              <p class="article-time"><span>2017.04.06</span></p>
            </div>
          </a>
        </div>
        <div class="row">
          <a class="col-4 article-link" href="#">
            <div class="article-pic">
              <img src="../assets/images/article-simple.jpg">
              <div class="pic-guide">
                Secure your Day One Edition today as this bonus content will be available for a limited time only!
              </div>
            </div>
            <div class="article-info">
              <h3><a href="#">为美好的世界献上祝福</a></h3>
              <ul class="article-content">
                <li><span>栏目：</span>前端开发</li>
                <li><span>标签：</span>JavaScript,Css</li>
              </ul>
              <p class="article-time"><span>2017.04.06</span></p>
            </div>
          </a>
          <a class="col-4 article-link" href="#">
            <div class="article-pic">
              <img src="../assets/images/article-simple.jpg">
              <div class="pic-guide">
                Secure your Day One Edition today as this bonus content will be available for a limited time only!
              </div>
            </div>
            <div class="article-info">
              <h3><a href="#">为美好的世界献上祝福</a></h3>
              <ul class="article-content">
                <li><span>栏目：</span>前端开发</li>
                <li><span>标签：</span>JavaScript,Css</li>
              </ul>
              <p class="article-time"><span>2017.04.06</span></p>
            </div>
          </a>
          <a class="col-4 article-link" href="#">
            <div class="article-pic">
              <img src="../assets/images/article-simple.jpg">
              <div class="pic-guide">
                Secure your Day One Edition today as this bonus content will be available for a limited time only!
              </div>
            </div>
            <div class="article-info">
              <h3><a href="#">为美好的世界献上祝福</a></h3>
              <ul class="article-content">
                <li><span>栏目：</span>前端开发</li>
                <li><span>标签：</span>JavaScript,Css</li>
              </ul>
              <p class="article-time"><span>2017.04.06</span></p>
            </div>
          </a>
        </div>
      </div>
      <div class="box-footer">
        <p><a href="#" class="more-btn">More Articles<i class="iconfont">&#xe651;</i></a></p>
      </div>
    </div>
    <!-- END Recent Articles -->
  </div>
</template>

<script>
  export default {}
</script>

<style>
  .box {
    width: 100%;
    margin-bottom: 30px;
  }
  .box-header{
    width: 100%;
    position: relative;
  }
  .box-footer{
    margin-top: 30px;
    text-align: center;
  }
  .swiper-slide img{
    max-width: 100%;
  }
  .more-btn{
    font-size: 16px;
  }
  .article-link {
    display: block;
    padding: 0px 15px;
    margin-bottom: 30px;
    position: relative;
  }
  .article-link:after{
    content: '';
    display: block;
    width: 0px;
    height: 2px;
    background-color: #39c5bb;
    position: absolute;
    left: 15px;
    bottom: 0;
    transition: all 0.5s ease-in-out;
  }
  .article-link:hover{
    color: #666;
    letter-spacing: 1px;
  }
  .article-link:hover:after{
    width: calc(100% - 30px);
  }
  .article-pic{
    width: 100%;
    height: 208px;
    overflow:hidden;
    position: relative;
  }
  .article-pic img {
    max-width: 100%;
    transition: all 0.25s ease-out;
  }
  .article-info{
    width: 100%;
    padding: 15px 30px 15px 0px;
    box-sizing: border-box;
    position: relative;
  }
  .article-info > h3 {
    font-size: 18px;
    margin-bottom: 15px;
    display: block;
  }
  .article-content > li {
    margin-bottom: 15px;
    word-wrap: break-word;
    word-break: break-all;
  }
  .article-time {
    position: absolute;
    right: -35px;
    top: 45px;
    transform: rotate(90deg);
    transition: all .25s ease-out;
  }
  .pic-guide{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding:15px;
    line-height: 1.5;
    z-index: 1;
    content: "";
    color: #fff;
    background-color: rgba(57, 197, 187, 0.75);
    opacity: 0;
    visibility: none;
    -webkit-transition: all 0.25s ease-out;
    transition: all 0.25s ease-out;
  }
  .article-pic:hover .pic-guide{
    opacity: 1;
    visibility: visible;
  }
</style>
