import * as api from '@/api';
import { Message } from 'element-ui';
import router from '@/router/index';
export default {
  newLogin ({ commit }, form) {
    return new Promise((resolve, reject) => {
      console.log(reject);
      api.user.newLogin(form.form)
        .then(resp => {
          if (resp.data.code === 0) {
            commit('SET_SESSION', resp.data.data.token.toString());
            sessionStorage.setItem('loginName', resp.data.data.userName);
            sessionStorage.setItem('department', resp.data.data.department);
            // sessionStorage.setItem('userLevel', form.form.userLevel);
            // sessionStorage.setItem('roleId', form.form.roleId);
            sessionStorage.setItem('userAvatar', resp.data.data.userAvatar);
            if (form.remberPassWord) {
              let userMsg = {
                userIdNum: resp.data.data.loginAccount,
                pwd: form.form.password
              };
              form.vm.$cookies.set('_user', JSON.stringify(userMsg), 60 * 60 * 24 * 7);
            }
            router.push({ path: '/' });
            Message({
              message: '登录成功！',
              type: 'success',
              duration: 1000
            });
          } else {
            Message({
              message: resp.data.message,
              type: 'warning',
              duration: 1500
            });
            resolve('error');
          }
        })
        .catch(err => {
          console.error(err);
        });
    });
  }
}
