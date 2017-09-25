<template>
  <div class="page-bg">
    <HeaderPart></HeaderPart>
    <main class="main">
      <div class="container" id="content">
        <transition mode="out-in" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft">
          <router-view></router-view>
        </transition>
      </div>
    </main>
    <FooterPart></FooterPart>
  </div>
</template>

<script>
  import HeaderPart from './Header.vue'
  import FooterPart from './Footer.vue'

  export default {
    components: {
      HeaderPart,
      FooterPart
    }
  }
</script>

<style>
  .main{
    position: relative;
    width: 100%;
    overflow: hidden;
  }
</style>
