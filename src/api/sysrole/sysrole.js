/**
 * @Author: xulian
 * @Date: 2019-11-07 16:12:41
 * @Last Modified by: xulian
 * @Last Modified time: 2019-11-07 16:13:03
 * @Desc: 这里是统一写具体接口的地方
 */
import request from '../request.js'
const sysrole = {
  del (params) {
    return request.post('sysrole/del', params)
  },
  ableorno (params) {
    return request.post('sysrole/ableorno', params)
  },
  findAll (params) {
    return request.get('sysrole/findAll', { params })
  },
  update (params) {
    return request.post('sysrole/update', params)
  },
  add (params) {
    return request.post('sysrole/add', params)
  },
  savetree (params) {
    return request.post('sysrole/savetree', params)
  },
  gettree (params) {
    return request.get('sysrole/gettree', { params })
  }
}
export default sysrole
// 也可以采用对象的形式,也可以分模块，看具体需求
