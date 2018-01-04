<template>
  <div class="swiper-container"
    :style="{ height: height }"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
  >
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-button-prev" @click="prev()">
      <i class="iconfont">&#xe602;</i>
    </div>
    <div class="swiper-button-next" @click="next()">
      <i class="iconfont">&#xe603;</i>
    </div>
    <ul class="swiper-pagination">
      <li class="swiper-pagination-bullet"
        v-for="(item, index) in items"
        :class="{ 'swiper-pagination-active': index === activeIndex }"
        @click="setActiveItem(index)"
      >
        <span class="swiper-pagination-content"
          :style="{
            'transition-duration': index === activeIndex && autoplay  ? interval + 'ms' : '400ms',
            'transition-property': autoplay ? 'width' : 'opacity',
          }">
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    props: {
      height: {
        type: String,
        default: '575px'
      },
      defaultIndex: {
        type: Number,
        default: 0
      },
      autoplay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 3000
      }
    },
    data () {
      return {
        items: [],
        timer: null,
        activeIndex: -1
      }
    },
    mounted () {
      this.updateItems()
      this.$nextTick(() => {
        if (this.defaultIndex < this.items.length && this.defaultIndex >= 0) {
          this.activeIndex = this.defaultIndex
        }
        this.startTimer()
      })
    },
    methods: {
      handleMouseEnter () {
        this.pauseTimer()
      },
      handleMouseLeave () {
        this.startTimer()
      },
      setActiveItem (index) {
        let length = this.items.length
        if (index < 0) {
          this.activeIndex = length - 1
        } else if (index >= length) {
          this.activeIndex = 0
        } else {
          this.activeIndex = index
        }
      },
      updateItems () {
        this.items = this.$children.filter(child => child.$options.name === 'CarouselItem')
      },
      resetItemPosition (oldIndex) {
        this.items.forEach((item, index) => {
          item.translateItem(index, this.activeIndex, oldIndex)
        })
      },
      prev () {
        this.setActiveItem(this.activeIndex - 1)
      },
      next () {
        this.setActiveItem(this.activeIndex + 1)
      },
      startTimer () {
        if (this.interval <= 0 || !this.autoplay) return false
        this.timer = setInterval(this.playSlides, this.interval)
      },
      pauseTimer () {
        clearInterval(this.timer)
      },

      playSlides () {
        if (this.activeIndex < this.items.length - 1) {
          this.activeIndex++
        } else {
          this.activeIndex = 0
        }
      }

    },
    watch: {
      activeIndex (val, oldVal) {
        this.resetItemPosition(oldVal)
      },
      items (val) {
        if (val.length > 0) {
          this.setActiveItem(this.defaultIndex)
        }
      }
    }
  }
</script>

<style>
  .swiper-container{
    position: relative;
    overflow: hidden;
  }
  .swiper-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    background: #ddd;
  }
  .swiper-button-prev,.swiper-button-next{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    cursor: pointer;
    transition: all 0.25s ease-out;
    color: rgba(255,255,255,0.5);
    font-size: 32px;
    font-weight: normal;
  }
  .swiper-button-prev:hover,.swiper-button-next:hover{
    color: #fff;
  }
  .swiper-button-prev{
    left: -30px;
  }
  .swiper-button-next{
    right: -30px;
  }
  .swiper-container:hover .swiper-button-prev{
    left: 15px;
  }
  .swiper-container:hover .swiper-button-next{
    right: 15px;
  }
  .button-disabled{
    opacity: .5;
    cursor: auto;
    pointer-events: none;
  }
  .swiper-pagination{
    position: absolute;
    left: 0;
    bottom: 30px;
    width: 100%;
    height: 2px;
    text-align: center;
  }
  .swiper-pagination-bullet{
    display: inline-block;
    margin:0 5px;
    position: relative;
    width: 50px;
    height: 100%;
    background: rgba(255,255,255,.85);
    z-index: 10;
    cursor: pointer;
  }
  .swiper-pagination-content{
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 0;
    height: 100%;
    background: #39c5bb;
    z-index: 11;
    transition-timing-function: linear;
    opacity: 0;
  }
  .swiper-pagination-active .swiper-pagination-content{
    width: 100%;
    opacity: 1;
  }
</style>
