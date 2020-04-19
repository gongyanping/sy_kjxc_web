/*
 * @Author: gyp
 * @Date: 2020-04-15 10:51:26
 * @LastEditors: gyp
 * @LastEditTime: 2020-04-15 10:59:32
 * @Description: 模块：逻辑管理
 * @FilePath: \sy_kjxc_web\src\router\patrolManageRouter.js
 */
// 逻辑管理
// const patrolManage = () => import('@/views/patrolManage/patrolManage.vue');
const patrolPoint = () => import('@/views/patrolManage/patrolPoint.vue');
const clockinRecord = () => import('@/views/patrolManage/clockinRecord.vue');
let patrolManageRouter = [
  /* 逻辑管理 */
  // {
  //   path: '/',
  //   name: 'patrolManage',
  //   component: patrolManage,
  //   meta: { title: '逻辑管理' }
  // },
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
  }
];
export default patrolManageRouter
