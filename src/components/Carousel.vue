<template>
  <div class="swiper-container" :style="{ height: height }">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-button-prev">
      <i class="iconfont">&#xe600;</i>
    </div>
    <div class="swiper-button-next">
      <i class="iconfont">&#xe601;</i>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      height: {
        type: String,
        default: '575px'
      }
    }
  }
</script>

<style>
  .swiper-container{
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  .swiper-wrapper{
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
  }
  .swiper-button-prev,.swiper-button-next{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 80px;
    line-height: 80px;
    background: rgba(255,255,255,1);
    z-index: 10;
    text-align: center;
    cursor: pointer;
    transition: all 0.25s ease-out;
    color: #999;
  }
  .swiper-button-prev:hover ,.swiper-button-next:hover{
    color: #39c5bb;
    background: rgba(255,255,255,0.85);
  }
  .swiper-button-prev{
    left: 0;
  }
  .swiper-button-next{
    right: 0;
  }
</style>
