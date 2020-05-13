/*
 * @Author: gyp
 * @Date: 2020-05-09 09:52:32
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-13 11:48:40
 * @Description: 大屏接口
 * @FilePath: \sy_kjxc_web\src\api\screen\screen.js
 */

import request from '../request.js'
const screen = {
  // 获取快警平台信息
  findPlatform () {
    return request.get('/platformUser/findPlatform')
  },
  // 根据平台id查询所有小组
  findByPlatformId (params) {
    return request.get('/platformUser/findByPlatformId', { params })
  },
  // 根据分组id查询人员信息
  findUserVo (params) {
    return request.get('/platformUser/findUserVo', { params })
  },
  // 根据分组id查询设备信息
  findEquipmentForGroupId (params) {
    return request.get('/platformUser/findEquipmentForGroupId', { params })
  },
  // 大队值班领导信息
  findUserByIdentity (params) {
    return request.get('/platformUser/findUserByIdentity', { params })
  },
  // 查询用户详细信息
  findUserDetails (params) {
    return request.get('/platformUser/findUserDetails', { params })
  }
}
export default screen
