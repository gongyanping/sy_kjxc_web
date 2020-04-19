/**
 * @Author: xulian
 * @Date: 2019-11-07 16:13:38
 * @Last Modified by: xulian
 * @Last Modified time: 2019-11-07 16:14:06
 * @Desc: 封装axios，统一配置拦截器级错误处理的，可根据具体的需求进行修改
 */
import axios from 'axios'
import { getToken } from '@/utils/token';
import { Message, Loading } from 'element-ui';
const serverUrl = process.env.VUE_APP_BASE_API // 服务器地址
const request = axios.create({
  timeout: 60 * 1000,
  baseURL: serverUrl, // 如果多个服务器地址的话，可以新去掉该配置，新建文件进行配置，直接在写接口的地方调用服务器地址
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // 'application/json' ||  '
  }
});

// 请求动画遮掩层
let loading;
function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '加载中，请稍后……',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}
function endLoading () {
  loading.close();
}
let needLoadingRequestCount = 0;
export function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

export function tryHideFullScreenLoading () {
  // if (needLoadingRequestCount <= 0) {
  //   return;
  // }

  if (--needLoadingRequestCount === 0) {
    endLoading();
  }
  // needLoadingRequestCount--;
}

// 请求发出拦截器
request.interceptors.request.use(config => {
  if (getToken()) {
    showFullScreenLoading();
    // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['Authorization'] = 'Bearer-' + getToken();
  }
  return config;
}, error => {
  return Promise.reject(error)
})
// 请求结果拦截
request.interceptors.response.use(
  response => {
    tryHideFullScreenLoading();
    const ret = response;
    // 业务级异常
    if (ret && ret.data.code === -1) {
      Message.error(response.data.message);
      // 破坏promise链, reject之后的promise不在执行then(),而是直接调用catch()
      // return   Promise.reject(response)
    }

    return response;
  },
  error => {
    tryHideFullScreenLoading();
    const ret = error.response;
    // 系统级异常
    if (ret === undefined) {
      Message.error('请求超时');
    } else if (ret.status === 400 || ret.status === 500) {
      Message.error('系统异常'); // 登录失败、参数错误等
    } else if (ret.status === 401) {
      Message.error('登录状态已失效，请重新登录'); // 无访问权限
      sessionStorage.removeItem('token');
      setTimeout(function () {
        window.location.href = process.env.VUE_APP_LoginUrl;
      }, 300);
    } else if (ret.status === 403) {
      Message.error('该用户权限不足'); // 无访问权限
      setTimeout(function () {
        // 回到首页
        window.location.href = window.location.origin + '/#/indexPage';
      }, 300);
    }

    return Promise.reject(error);
  }
)
export default request
