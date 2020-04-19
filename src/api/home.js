/*
 * @Author: gyp
 * @Date: 2020-03-23 23:57:50
 * @LastEditors: gyp
 * @LastEditTime: 2020-04-14 16:13:10
 * @Description: 首页接口
 * @FilePath: \gs_xzsp_web\src\api\home.js
 */
import request from './request'

/**
 * 通知公告
 */
export function findOpenInform () {
  return request({
    url: '/sys/findOpenInform',
    method: 'get'
  })
}

/**
 * 综合统计，目录清单占比，类型占比
 */
export function getStatistics () {
  return request({
    url: '/homePage/statistics',
    method: 'get'
  })
}
