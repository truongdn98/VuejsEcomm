import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductPage from '../views/ProductPage.vue'
import ProductDetailPage from '../views/ProductDetailPage.vue'
import CartPage from '../views/CartPage'
import ShippingInfo from '../views/ShippingInfomation.vue'
import PaymentSuccessPage from '../views/PaymentSuccessPage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product',
    name: 'ProductPage',
    component: ProductPage
    
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/product/:slug',
    name: 'Product Detail',
    component: ProductDetailPage
  },
  {
    path: '/your-cart',
    name: 'Your Cart',
    component: CartPage
  },
  {
    path: '/shipping-infomation',
    name: 'ShippingInfo',
    component: ShippingInfo
  },
  {
    path: '/payment-success',
    name: 'PaymentSuccessPage',
    component: PaymentSuccessPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
