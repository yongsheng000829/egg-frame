import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/user'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'userlist',
        name: 'userlist',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserList.vue')
      },
      {
        path: 'adduser',
        name: 'adduser',
        component: () => import(/* webpackChunkName: "about" */ '../views/AddUser.vue')
      },
      {
        path: 'rolelist',
        name: 'rolelist',
        component: () => import(/* webpackChunkName: "about" */ '../views/RoleList.vue')
      },
      {
        path: 'addrole',
        name: 'addrole',
        component: () => import(/* webpackChunkName: "about" */ '../views/AddRole.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
