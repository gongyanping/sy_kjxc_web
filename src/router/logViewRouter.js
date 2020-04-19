/**
 * @Author: chenminggui
 * @Date: 2019-11-07 16:14:27
 * @Last Modified by: chenminggui
 * @Last Modified time: 2019-11-07 16:15:05
 * @Desc:   模块：日志中心
*/
// 日志中心
const logView = () => import('@/views/logView/page/logView.vue');

let logViewRouter = [
  /* 日志中心 */
  {
    path: '/logView',
    name: 'logView',
    component: logView,
    meta: { title: '日志中心' }
  }
]
export default logViewRouter
