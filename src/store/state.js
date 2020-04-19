/*
 * @Author: gyp
 * @Date: 2020-03-17 09:42:11
 * @LastEditors: gyp
 * @LastEditTime: 2020-04-17 11:54:17
 * @Description:
 * @FilePath: \sy_kjxc_web0417\src\store\state.js
 */
export default {
  lastChecked: null, // 最后一次所点击的菜单
  storeDeptCode2: '', // 部门号（超级信息员）
  storeOrgName2: '', // 部门名称（超级信息员）
  currentUser: null, // 登录的ID
  isLogin: false, // 是否登录
  token: '', // token值
  menuId: '', // 1级菜单id
  fstmenuId: '', // 2级菜单默认id
  auditNum: 1, // 存动态维护审核状态值
  updateTrager: 1, // 监听取一级菜单变化
  updateNum: 1, // 监听取二级菜单变化
  menuType: '', // 存二级菜单状态
  isShowFlag: window.sessionStorage.getItem('isShowFlag'),
  isShowFlagChange: window.sessionStorage.getItem('isShowFlagChange'),
  opts: {},
  userControllerEdit: 1,
  pageSizes: [6, 10, 20, 50, 100, 200],
  tableHeight: window.screen.height - 430 + 'px', // 有分页
  tableHeight2: window.screen.height - 360 + 'px', // 没有分页
  dictionarySearchPrams: {},
  operationSearchPrams: {},
  directoryTotal: 0,
  curDep: {
    punishment: {
      label: '全部',
      deptCode: ''
    },
    mandatorycheck: {
      label: '全部',
      deptCode: ''
    },
    levy: {
      label: '全部',
      deptCode: ''
    },
    apply: {
      label: '全部',
      deptCode: ''
    },
    Items: []
  }
}
