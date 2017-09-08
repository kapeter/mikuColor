<template>
  <div class="swiper-slide">
    <slot></slot>
  </div>
</template>

<style>
  .swiper-slide{
    -webkit-flex-shrink: 0;
    -ms-flex: 0 0 auto;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
