<template>
  <div class="swiper-slide"
    v-show="ready"
    :class="{ 'swiper-slide-active': isActive, 'is-animating' : isAnimating }"
    :style="{
      msTransform: 'translateX('+ translate +'px)',
      webkitTransform: 'translateX('+ translate +')',
      transform: 'translateX('+ translate +'px)'
    }"

  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'CarouselItem',

    data () {
      return {
        isActive: false,
        isAnimating: false,
        translate: 0,
        ready: false
      }
    },
    methods: {
      processIndex (index, activeIndex, length) {
        if (activeIndex === 0 && index === length - 1) {
          return -1
        } else if (activeIndex === length - 1 && index === 0) {
          return length
        } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
          return length + 1
        } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
          return -2
        }
        return index
      },
      translateItem (index, activeIndex, oldIndex) {
        const parentWidth = this.$parent.$el.offsetWidth
        const length = this.$parent.items.length
        this.isAnimating = (index === activeIndex || index === oldIndex)
        if (index !== activeIndex && length > 2) {
          index = this.processIndex(index, activeIndex, length)
        }
        this.isActive = index === activeIndex
        this.translate = parentWidth * (index - activeIndex)
        this.ready = true
      }
    },
    created () {
      this.$parent && this.$parent.updateItems()
    },
    destroyed () {
      this.$parent && this.$parent.updateItems()
    }
  }
</script>


<style>
  .swiper-slide{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    z-index: 0;
  }
  .swiper-slide-active{
    z-index: 2;
  }
  .is-animating{
    transition: transform .4s ease-in-out;
  }
</style>
