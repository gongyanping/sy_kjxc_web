/**
 * @Author: xulian
 * @Date: 2019-11-07 16:12:41
 * @Last Modified by: xulian
 * @Last Modified time: 2019-11-07 16:13:03
 * @Desc: 这里是统一写具体接口的地方
 */
import request from '../request.js'
const sys = {
  findAllByRole () {
    return request.get('sys/menu/findAllByRole')
  },
  queryMenuListById (params) {
    return request.get('sys/menu/queryMenuListById', { params })
  },
  queryMenuDetails (params) {
    return request.get('sys/menu/queryMenuDetails', { params })
  },
  queryMenuByName (params) {
    return request.get('sys/menu/queryMenuByName', { params })
  },
  queryMenuList (params) {
    return request.get('sys/menu/queryMenuList', { params })
  },
  paraTypeList (params) {
    return request.get('sys/paraTypeList', { params })
  },
  paraTypeDelete (params) {
    return request.get('sys/paraTypeDelete', { params })
  },
  edit (params) {
    return request.post('sys/menu/edit', params)
  },
  save (params) {
    return request.post('sys/menu/save', params)
  },
  delete (params) {
    return request.get('sys/menu/delete', { params })
  },
  delDepartment (params) {
    return request.get('sys/dept/delDepartment', { params })
  },
  deptList (params) {
    return request.get('sys/dept/deptList', { params })
  },
  queryDetails (params) {
    return request.get('sys/dept/queryDetails', { params })
  },
  depCodeGeneration (params) {
    return request.get('sys/dept/depCodeGeneration', { params })
  },
  saveDepartment (params) {
    return request.post('sys/dept/saveDepartment', params)
  },
  selectDeptCategory (params) {
    return request.get('sys/dept/selectDeptCategory', { params })
  },
  paraByTypeIds (params) {
    return request.get('sys/paraByTypeIds', { params })
  },
  deptEdit (params) {
    return request.post('sys/dept/edit', params)
  },
  savePara (params) {
    return request.post('sys/savePara', params)
  },
  paraList (params) {
    return request.get('sys/paraList', { params })
  },
  paraDelete (params) {
    return request.get('sys/paraDelete', { params })
  },
  findPara (params) {
    return request.get('sys/findPara', { params })
  },
  saveParaType (params) {
    return request.post('sys/saveParaType', params)
  },
  findParaType (params) {
    return request.get('sys/findParaType', { params })
  },
  findInform (params) {
    return request.get('sys/findInform', { params })
  },
  saveOrUpdateInform (params) {
    return request.post('sys/saveOrUpdateInform', params)
  },
  deleteInform (params) {
    return request.get('sys/deleteInform', { params })
  }
}
export default sys
// 也可以采用对象的形式,也可以分模块，看具体需求
