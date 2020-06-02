/*
 * @Author: gyp
 * @Date: 2020-03-17 09:42:11
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-02 16:38:51
 * @Description:
 * @FilePath: \sy_kjxc_web\src\router\index.js
 */

import Vue from 'vue'
import Router from 'vue-router'

// 登录页面
const login = () => import('@/views/login.vue')
const Layout = () => import('@/layout/index.vue')
const patrolPoint = () => import('@/views/patrolManage/patrolPoint.vue');
const clockinRecord = () => import('@/views/patrolManage/clockinRecord.vue');
const screen = () => import('@/views/screen/index.vue');

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: login,
    hidden: true
  },
  // {
  //   path: '/',
  //   name: 'indexPage',
  //   component: Layout,
  //   redirect: '/patrolPoint',
  //   hidden: true,
  //   children: [
  //     ...patrolManageRouter,
  //     ...referanceMainRouter,
  //     ...checkManageRouter
  //   ]
  // },
  {
    path: '/',
    name: 'index',
    component: Layout,
    redirect: '/clockinRecord'
  },
  {
    path: '/patrolPoint',
    name: 'patrolPoint',
    component: patrolPoint,
    meta: { title: '巡逻点管理' }
  },
  {
    path: '/clockinRecord',
    name: 'clockinRecord',
    component: clockinRecord,
    meta: { title: '打卡记录' }
  },
  {
    path: '/screen',
    name: 'screen',
    component: screen,
    meta: { title: '外网大屏' }
  }
]

const router = new Router({
  routes: constantRoutes
})
router.beforeEach((to, from, next) => {
  next()
})
router.afterEach(() => {
})
export default router
