/*
 * @Author: gyp
 * @Date: 2020-03-17 09:42:11
 * @LastEditors: gyp
 * @LastEditTime: 2020-04-16 18:50:25
 * @Description: 如果分模块，这里统一暴露出需要的模块
 * @FilePath: \sy_kjxc_web\src\api\index.js
 */
// import operator from '@/api/operator/operator'
import user from '@/api/user/user'
import sysrole from '@/api/sysrole/sysrole'
import log from '@/api/log/log'
// import catalog from '@/api/catalog/catalog'
// import referance from '@/api/referance/referance'
// import referPerson from '@/api/referance/personalReferance'
// import checkSource from '@/api/check/checkSource'
// import { dataGather, sourceGather } from '@/api/check/checkGather/index.js'
import { patrolPoint, clockinRecord } from '@/api/patrolManage/index.js';
export {
  user,
  // operator,
  sysrole,
  log,
  // catalog,
  // referance,
  // referPerson,
  // checkSource,
  // dataGather,
  // sourceGather,
  patrolPoint,
  clockinRecord
}
