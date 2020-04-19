/**
 * @Author: xulian
 * @Date: 2019-11-07 16:12:41
 * @Last Modified by: xulian
 * @Last Modified time: 2019-11-07 16:13:03
 * @Desc: 这里是统一写具体接口的地方
 */
import request from '../request.js'
const user = {
  getVerifyCode () {
    return request.get('user/getVerifyCode')
  },
  accountList (params) {
    return request.get('user/accountList', { params })
  },
  login (params) {
    return request.post('user/login', params)
  },
  newLogin (params) {
    return request.post('user/newLogin', params)
  },
  list (params) {
    return request.get('user/list', { params })
  },
  updateUserById (params) {
    return request.post('user/updateUserById', params)
  },
  enable (params) {
    return request.post('user/enable', params)
  },
  disable (params) {
    return request.post('user/disable', params)
  },
  accountDelete (params) {
    return request.post('user/accountDelete', params)
  },
  initPass (params) {
    return request.post('user/initPass', params)
  },
  roleList (params) {
    return request.get('user/roleList', params)
  },
  register (params) {
    return request.post('user/register', params)
  },
  redact (params) {
    return request.post('user/redact', params)
  },
  findById (params) {
    return request.get('user/findById', { params })
  }
}
export default user
// 也可以采用对象的形式,也可以分模块，看具体需求
