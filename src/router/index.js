import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]
// 将VueRouter原型上的push和replace保存一份
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

// 修改VueRouter原型上的push，用于解决重复跳转报错
VueRouter.prototype.push = function (location, okCallback, errCallback) {
  if (okCallback || errCallback) {
    return originPush.call(this, location, okCallback, errCallback)
  } else {
    return originPush.call(this, location).catch(() => {})
  }
}
// 修改VueRouter原型上的replace，用于解决重复跳转报错
VueRouter.prototype.replace = function (location, okCallback, errCallback) {
  if (okCallback || errCallback) {
    return originReplace.call(this, location, okCallback, errCallback)
  } else {
    return originReplace.call(this, location).catch(() => {})
  }
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

export default router
