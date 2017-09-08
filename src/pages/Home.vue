<template>
  <div>
    <div class="box">
      <Carousel>
        <CarouselItem v-for="item in bannerItems" :key="item.id">
          <img src="../assets/images/banner.jpg">
          <div class="banner-cover">
            <div class="banner-content">
              <span class="category">{{ item.category }}</span>
              <h2 class="title"><a href="#">{{ item.title }}</a></h2>
              <span class="dateline">{{ item.dateline }}</span>
            </div>
          </div>
        </CarouselItem>
      </Carousel>
    </div>

    <!-- Recent Articles -->
    <div class="box">
      <div class="box-header">
        <h3>Latest articles</h3>
      </div>
      <div class="box-content">
        <div class="row">
          <a class="col-4 article-link" href="#">
            <div class="article-pic">
              <img src="../assets/images/article-simple.jpg">
              <div class="pic-guide">
                <span class="album-border"></span>
                <a href="#" class="btn">阅读全文</a>
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
                <span class="album-border"></span>
                <a href="#" class="btn">阅读全文</a>
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
                <span class="album-border"></span>
                <a href="#" class="btn">阅读全文</a>
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
                <span class="album-border"></span>
                <a href="#" class="btn">阅读全文</a>
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
                <span class="album-border"></span>
                <a href="#" class="btn">阅读全文</a>
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
                <span class="album-border"></span>
                <a href="#" class="btn">阅读全文</a>
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
        <a href="#" class="btn more-btn">READ MORE</a>
      </div>
    </div>
    <!-- END Recent Articles -->
  </div>
</template>

<script>
  import Carousel from '../components/Carousel'
  import CarouselItem from '../components/CarouselItem'

  export default {
    components: {
      Carousel,
      CarouselItem
    },
    data () {
      return {
        bannerItems: [
          {'id': 1, 'title': '[VueCms系列] windows下搭建开发环境——Laravel Homestead', 'dateline': '2017.09.05', 'category': '前端开发'},
          {'id': 2, 'title': '[VueCms系列] windows下搭建开发环境——Laravel Homestead', 'dateline': '2017.09.05', 'category': '前端开发'},
          {'id': 3, 'title': '[VueCms系列] windows下搭建开发环境——Laravel Homestead', 'dateline': '2017.09.05', 'category': '前端开发'}
        ]
      }
    }
  }
</script>

<style>
  .box {
    width: 100%;
    margin-bottom: 60px;
  }
  .box-header{
    width: 100%;
    position: relative;
    margin-bottom: 30px;
    text-align: center;
  }
  .box-header > h3{
    display: inline-block;
    font-size: 16px;
    font-weight: normal;
    color: #39c5bb;
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }
  .box-footer{
    text-align: center;
  }
  .swiper-slide{
    position: relative;
  }
  .swiper-slide img{
    max-width: 100%;
  }
  .banner-cover{
    position: absolute;
    left: 160px;
    top: 56%;
    overflow:hidden;
    width: 400px;
  }
  .banner-content{
    width: 400px;
    min-height: 175px;
    background: rgba(255,255,255,0.85);
    padding: 30px;
    box-sizing: border-box;
    border-left: 4px solid #39c5bb;
  }
  .banner-content .category{
    display: inline-block;
    padding-bottom: 5px;
    margin-bottom: 30px;
    border-bottom: 2px solid #39c5bb;
    color: #39c5bb;
  }
  .banner-content .title{
    margin-bottom: 15px;
    line-height: 1.4;
  }
  .banner-content .dateline{
    color: #999;
  }
  .more-btn{
    color: #999;
    border:1px solid #C4C4C4;
    padding: 8px 25px;
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
    transition: all 0.3s ease-in-out;
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
    font-weight: normal;
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
  }
  .pic-guide{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:30px;
    z-index: 1;
    background-color: #39c5bb;
    opacity: 0;
    transform: scale(1.5);
    transition: all 0.25s ease-out;
  }

  .article-pic:hover .pic-guide{
    opacity: .75;
    transform: scale(1);
  }
  .album-border{
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    border: solid #fff 2px;
    box-sizing: border-box;
  }
  .album-border:before{
    content: '';
    display: block;
    width: calc(100% + 4px);
    height: calc(100% - 60px);
    position: absolute;
    top: 30px;
    left: -2px;
    z-index: 5;
    background-color: #39c5bb;
  }
  .album-border:after{
    content: '';
    display: block;
    height: calc(100% + 4px);
    width: calc(100% - 60px);
    position: absolute;
    top: -2px;
    left: 30px;
    z-index: 5;
    background-color: #39c5bb;
  }
  .pic-guide .btn{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 10;
    background: #fff;
    color: #39c5bb;
    border: 0;
  }
  .pic-guide .btn:hover:after{
    width: 0;
  }
</style>
