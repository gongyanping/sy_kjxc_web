/*
 * @Author: gyp
 * @Date: 2020-05-09 09:52:32
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-11 22:14:26
 * @Description: 大屏接口
 * @FilePath: \sy_kjxc_web\src\api\screen\screen.js
 */

import request from '../request.js'
const screen = {
  // 获取快警平台信息
  findPlatform () {
    return request.get('/platformUser/findPlatform')
  }
  // /platformUser/findByPlatformId
}
export default screen
