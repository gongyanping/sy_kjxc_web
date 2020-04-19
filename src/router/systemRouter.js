/**
 * @Author: chenminggui
 * @Date: 2019-11-07 16:14:27
 * @Last Modified by: chenminggui
 * @Last Modified time: 2019-11-07 16:15:05
 * @Desc:   模块：系统管理
 */
// 用户管理
const userController = () => import('@/views/system/page/userController/userController.vue');
const addmodel = () => import('@/views/system/page/userController/addmodel.vue');
const compile = () => import('@/views/system/page/userController/compile.vue');
const lookDetil = () => import('@/views/system/page/userController/lookDetil.vue');
// 操作权限
const operationMain = () => import('@/views/system/page/operationMain/operationMain.vue');
const operationAdd = () => import('@/views/system/page/operationMain/operationAdd.vue');
const operationEdit = () => import('@/views/system/page/operationMain/operationEdit.vue');
// 菜单管理
const newMenuMain = () => import('@/views/system/page/newMenuMain/newMenuMain.vue');
// 角色管理
const roleAdmin = () => import('@/views/system/page/roleAdmin/roleAdmin.vue');
const roleAddModel = () => import('@/views/system/page/roleAdmin/roleAddModel.vue');
const roleAmendModel = () => import('@/views/system/page/roleAdmin/roleAmendModel.vue');
const roleAccredit = () => import('@/views/system/page/roleAdmin/roleAccredit.vue');
// 部门管理
const division = () => import('@/views/system/page/division/division.vue');
// 数据字典
const dataDictionary = () => import('@/views/system/page/dataDictionary/dataDictionary.vue')
const dataTypeAdd = () => import('@/views/system/page/dataDictionary/dataTypeAdd.vue')
const dataTypeRedact = () => import('@/views/system/page/dataDictionary/dataTypeRedact.vue')
const dataAdmin = () => import('@/views/system/page/dataDictionary/dataAdmin.vue')
const dataAdd = () => import('@/views/system/page/dataDictionary/dataAdd.vue')
const dataRedact = () => import('@/views/system/page/dataDictionary/dataRedact.vue')

let systemRouter = [
  /* 用户管理 */
  {
    path: '/userController',
    name: 'userController',
    component: userController,
    meta: { title: '用户管理' }
  },
  {
    path: '/addmodel',
    name: 'addmodel',
    component: addmodel,
    meta: { title: '用户管理/新增用户' }
  },
  {
    path: '/compile',
    name: 'compile',
    component: compile,
    meta: { title: '用户管理/编辑用户' }
  },
  {
    path: '/lookDetil',
    name: 'lookDetil',
    component: lookDetil,
    meta: { title: '用户管理/查看详情' }
  },
  /* 操作权限 */
  {
    path: '/operationMain',
    name: 'operationMain',
    component: operationMain,
    meta: { title: '操作权限' }
  },
  {
    path: '/operationEdit',
    name: 'operationEdit',
    component: operationEdit,
    meta: { title: '操作权限/修改权限' }
  },
  {
    path: '/operationAdd',
    name: 'operationAdd',
    component: operationAdd,
    meta: { title: '操作权限/新增权限' }
  },
  /* 菜单管理 */
  {
    path: '/newMenuMain',
    name: 'newMenuMain',
    component: newMenuMain,
    meta: { title: '菜单管理' }
  },
  /* 角色管理 */
  {
    path: '/roleAdmin',
    name: 'roleAdmin',
    component: roleAdmin,
    meta: { title: '角色管理' }
  },
  {
    path: '/roleAccredit',
    name: 'roleAccredit',
    component: roleAccredit,
    meta: { title: '角色管理/角色授权' }
  },
  {
    path: '/roleAddModel',
    name: 'roleAddModel',
    component: roleAddModel,
    meta: { title: '角色管理/新增角色' }
  },
  {
    path: '/roleAmendModel',
    name: 'roleAmendModel',
    component: roleAmendModel,
    meta: { title: '角色管理/编辑角色' }
  },
  /* 部门管理 */
  {
    path: '/division',
    name: 'division',
    component: division,
    meta: { title: '部门管理' }
  },
  /* 数据字典 */
  {
    path: '/dataDictionary',
    name: 'dataDictionary',
    component: dataDictionary,
    meta: { title: '数据字典' }
  },
  {
    path: '/dataTypeAdd',
    name: 'dataTypeAdd',
    component: dataTypeAdd,
    meta: { title: '数据字典/参数类型新增' }
  },
  {
    path: '/dataTypeRedact',
    name: 'dataTypeRedact',
    component: dataTypeRedact,
    meta: { title: '数据字典/参数类型编辑' }
  },
  {
    path: '/dataAdmin',
    name: 'dataAdmin',
    component: dataAdmin,
    meta: { title: '数据字典/参数管理' }
  },
  {
    path: '/dataAdd',
    name: 'dataAdd',
    component: dataAdd,
    meta: { title: '数据字典/参数管理/新增参数' }
  },
  {
    path: '/dataRedact',
    name: 'dataRedact',
    component: dataRedact,
    meta: { title: '数据字典/参数管理/参数编辑' }
  }
]
export default systemRouter
