/*
 * @Author: gyp
 * @Date: 2020-05-09 09:52:32
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-12 16:14:22
 * @Description: 大屏接口
 * @FilePath: \sy_kjxc_web\src\api\screen\screen.js
 */

import request from '../request.js'
let serverUrl = 'http://218.76.207.66:8030';
const localUrl = 'http://localhost:8030';
const screen = {
  // 查询全部接口
  getPoliceCarInit () {
    return request.get(serverUrl + '/patrolCar/getPoliceCarInit')
  },
  // 获取快警平台信息
  findPlatform () {
    return request.get(serverUrl + '/platformUser/findPlatform')
  },
  // 根据平台id查询所有小组
  findByPlatformId (params) {
    return request.get(serverUrl + '/platformUser/findByPlatformId', { params })
  },
  // 根据分组id查询人员信息
  findUserVo (params) {
    return request.get(serverUrl + '/platformUser/findUserVo', { params })
  },
  // 根据分组id查询设备信息
  findEquipmentForGroupId (params) {
    return request.get(serverUrl + '/platformUser/findEquipmentForGroupId', { params })
  },
  // 大队值班领导信息
  findUserByIdentity (params) {
    return request.get(serverUrl + '/platformUser/findUserByIdentity', { params })
  },
  // 查询用户详细信息
  findUserDetails (params) {
    return request.get(serverUrl + '/platformUser/findUserDetails', { params })
  },
  // 获取用户打卡记录
  userAllClockedList (params) {
    return request.get(serverUrl + '/user/userAllClockedList', { params })
  },
  // 获取用户任务
  userSpotList (params) {
    return request.get(serverUrl + '/user/userSpotList', { params })
  },
  // 获取数据考核
  checkList (params) {
    return request.get(serverUrl + '/platform/list', { params })
  },
  // 实时警情
  intime (params) {
    return request.get(localUrl + '/police/intime', { params });
  },
  // 当日警情数
  todayAlert () {
    return request.get(localUrl + '/police/todayAlert');
  },
  // 平均处警时长
  avgDealAlertTime (params) {
    return request.get(localUrl + '/police/avgDealAlertTime', { params });
  }
}
export default screen
