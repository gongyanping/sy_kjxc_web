/*
 * @Author: gyp
 * @Date: 2020-03-17 09:42:11
 * @LastEditors: gyp
 * @LastEditTime: 2020-04-23 20:47:59
 * @Description: 如果分模块，这里统一暴露出需要的模块
 * @FilePath: \sy_kjxc_web\src\api\index.js
 */
import user from '@/api/user/user'
import sysrole from '@/api/sysrole/sysrole'
import log from '@/api/log/log'
import { patrolPoint, clockinRecord } from '@/api/patrolManage/index.js';
export {
  user,
  sysrole,
  log,
  patrolPoint,
  clockinRecord
}
