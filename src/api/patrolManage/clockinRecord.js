/*
 * @Author: gyp
 * @Date: 2020-04-16 09:31:25
 * @LastEditors: gyp
 * @LastEditTime: 2020-04-16 18:22:52
 * @Description: 打卡记录接口
 * @FilePath: \sy_kjxc_web\src\api\patrolManage\clockinRecord.js
 */
import request from '../request.js'
const clockinRecord = {
  // 获取人员
  userList () {
    return request.post('/patrol/record/userList')
  },
  // 获取打卡记录 -- 多条据
  selectList (params) {
    return request.post('patrol/record/selectList', params)
  },
  // 获取平台或分局列表
  platList (params) {
    return request.get('/platform/list', { params })
  },
  selectPicByDetailsId (params) {
    return request.get('/patrol/record/selectPicByDetailsId', { params })
  },
  gpsList (params) {
    return request.post('/gpsDetails/list2', params);
  }
}
export default clockinRecord
