import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Posts from '@/components/Posts'
import CouponManager from '@/components/CouponManager'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/listings',
      name: 'Listings',
      component: Posts
    },
    {
      path: '/coupons',
      name: 'Coupons',
      component: CouponManager
    }

  ]
})
