import Vue from 'vue'
import VueRouter from 'vue-router'
import New from '../views/New.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'New',
    component: New
  },
  {
    path: '/best',
    name: 'Best',
    component: () => import('../views/Best.vue')
  },
  {
    path: '/article/:id',
    name: 'Detail',
    component: () => import('../views/Detail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
