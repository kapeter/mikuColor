<template>
  <div class="page-header">
    <div class="cover">
        <img src="~assets/img/bg.jpg">
    </div>
    <h1 class="title">{{ title }}</h1>
    <h5 class="sub-title">/ {{ subTitle }} /</h5>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: 'KAPETER'
      },
      subTitle: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="less">
@import '~assets/less/variable.less';

.page-header{
    position: relative;
    height: 320px;
    overflow: hidden;
    color: #ffffff;
    text-align: center;
    margin-bottom: 75px;
    padding: 120px 15px 0;
    box-sizing: border-box;
    .cover{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      animation: cover 25s linear;
      animation-fill-mode: forwards;
      text-align: center;
      img{
        width: 100%;
      }
    }
    .title{
      display: inline-block;
      font-size: 28px;
      letter-spacing: 0.1em;
      z-index: 10;
      position: relative;
    }
    .sub-title{
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5em;
      font-weight: normal;
      z-index: 10;
      position: relative;
    }
}

@keyframes cover {
    0% {
        top: 0;
    }
    100% {
        top: -100%;
    }
}

  @media screen and (max-width: 768px) {
    .page-header{
        margin-bottom: 30px;
        padding: 100px 15px 0;
        .cover{
          img{
            width: auto;
          }
        }
        .title{
          font-size: 24px;
        }
    }    
  }
</style>
