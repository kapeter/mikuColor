import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/',
          component: require('@/pages/Home.vue')
        },
        {
          path: '*',
          component: require('@/pages/error/404.vue')
        }
      ]
    }
  ]
})
