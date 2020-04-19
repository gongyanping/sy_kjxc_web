export default {
  SET_SESSION: (state, token) => {
    sessionStorage.setItem('token', token); // 存token到session
  },
  SET_fstmenuId: (state, fstmenuId) => {
    // 存2级菜单id
    // state.fstmenuId = fstmenuId;
    sessionStorage.setItem('fstmenuId', '' + fstmenuId);
  },
  GET_fstmenuId: (state, fstmenuId) => {
    // 取2级菜单id
    // fstmenuId(state.fstmenuId);
    fstmenuId(sessionStorage.getItem('fstmenuId'))
  },
  SET_UPDATENUM: (state, count) => {
    // 监听存二级菜单变化
    state.updateNum = count;
  },
  GET_UPDATENUM: (state, count) => {
    // 监听取二级菜单变化
    count(state.updateNum);
  },
  SET_operationSearchPrams: (state, count) => {
    state.operationSearchPrams = count;
  },
  SET_currentpage: (state, count) => {
    // 用戶管理點擊編輯存當前頁
    state.userControllerEdit = count;
  },
  SET_dictionarySearchPrams: (state, count) => {
    // 储存操作权限查询参数
    state.dictionarySearchPrams = count;
  }
}
