<template>
  <div>
    <transition mode="out-in" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft">
        <router-view></router-view>
      </transition>
  </div>
</template>
