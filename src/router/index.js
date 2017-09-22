import Vue from 'vue'
import Router from 'vue-router'
import Parent from '../pages/Parent.vue'
import Layout from '@/components/Layout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/about',
      component: require('@/pages/about/Index.vue')
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/',
          component: require('@/pages/Home.vue')
        },
        {
          path: '/post',
          component: Parent,
          children: [
            {
              path: '/',
              component: require('@/pages/post/List.vue')
            },
            {
              path: ':id',
              component: require('@/pages/post/Content.vue')
            }
          ]
        },
        {
          path: '*',
          component: require('@/pages/error/404.vue')
        }
      ]
    }
  ]
})
