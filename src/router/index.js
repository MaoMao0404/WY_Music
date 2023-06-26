import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const PlayList = ()=>import('@/views/PlayList.vue')
const SongPage = ()=>import('../views/SongPage.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    //动态路由
    path:'/playlist/:id',
    name:'playlist',
    component:PlayList,
    props:true
  },
  {
    path:'/songpage/:id/:title',
    name:'songpage',
    component:SongPage,
    props:true
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
