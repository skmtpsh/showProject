import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const LayOut = import('@/views/layout/layout')
const LayOutCredit = import('@/views/credit/layout')

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/login')
  },
  {
    path: '/loginno',
    component: () => import('@/views/login/loginnocheck')
  },
  {
    path: '/',
    component: () => LayOut,
    redirect: '/auths/list'
  },
  {
    path: '/credit',
    component: () => LayOutCredit,
    redirect: '/credit/risk',
    children: [
      {
        path: 'risk',
        component: () => import('@/views/credit/index'),
        name: 'risk',
        meta: {title: 'risk'}
      }
    ]
  },
  {
    path: '/auths',
    component: () => LayOut,
    redirect: '/auths/list',
    meta: {title: '认证管理'},
    children: [
      {
        path: 'list',
        component: () => import('@/views/auths/index'),
        name: 'list',
        meta: {title: '认证列表'}
      }
    ]
  },
  {
    path: '*',
    component: () => LayOut,
    redirect: '/404',
    children: [
      {
        path: '404',
        component: () => import('@/views/404'),
        name: '404',
        meta: {title: '404'}
      }
    ]
  }
]

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  base: __dirname,
  routes: constantRouterMap
})
