/*
 * @Author: gyp
 * @Date: 2020-04-16 09:31:25
 * @LastEditors: gyp
 * @LastEditTime: 2020-04-16 17:33:25
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
  findAll () {
    return request.get('/line/findAll');
  },
  getOne (params) {
    return request.post('/lineSpot/getOne', params);
  }
}
export default patrolPoint
