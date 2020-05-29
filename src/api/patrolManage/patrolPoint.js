/*
 * @Author: gyp
 * @Date: 2020-04-16 09:31:25
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-29 16:11:08
 * @Description:
 * @FilePath: \sy_kjxc_web\src\api\patrolManage\patrolPoint.js
 */
import request from '../request.js'
const patrolPoint = {
  // 分页获取点位列表
  list (params) {
    return request.post('/lineSpot/list', params)
  },
  // 保存或修改点位信息
  saveOrUpdate (params) {
    return request('/lineSpot/saveOrUpdate', {
      method: 'post',
      data: params
    })
  },
  // 删除私人文件 filePath,id
  delete (params) {
    return request.post('/lineSpot/delete', params)
  },
  // 获取所有线路
  findAll () {
    return request.get('/line/findAll');
  },
  getOne (params) {
    return request.post('/lineSpot/getOne', params);
  },
  // 获取所有打卡机
  getAllFingerprint (params) {
    return request.get('/lineSpot/getAllFingerprint', { params });
  },
  // 获取部门
  getPlatform () {
    return request.get('platform/findAll')
  }
}
export default patrolPoint
