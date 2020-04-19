/*
 * @Author: gyp
 * @Date: 2020-03-17 09:42:11
 * @LastEditors: gyp
 * @LastEditTime: 2020-04-16 15:13:54
 * @Description: 入口文件
 * @FilePath: \sy_kjxc_web\src\main.js
 */
import 'babel-polyfill'
import { setRem } from './utils/rem'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as api from './api'
import './assets/css/base.less'
import './plugins/element.js'
import * as filters from './filters' // global filters
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import echarts from 'echarts'
import VueCookies from 'vue-cookies'
import moreBox from '@/components/moreBox.vue'
// import './permission' // permission control
import './icons' // icon
import request from '@/api/request'
import './styles/index.less'
// import '@/assets/font/iconfont/iconfont.css'
// import '@/assets/font/iconfont/iconfont.js'
import BaiduMap from 'vue-baidu-map'
import Qs from 'qs';

Vue.config.productionTip = false
Vue.prototype.$api = api // 注册为全局指令
Vue.prototype.$echarts = echarts
Vue.prototype.$requst = request
Vue.prototype.$qs = Qs;
Vue.use(VueCookies)
Vue.use(iView)
Vue.use(BaiduMap, {
  ak: 'NrTYvuK4VE8l4E7e7eTEtcOe'
})

const components = [
  { 'more-box': moreBox }
]

components.forEach((v, i) => {
  Object.keys(v).forEach(v => {
    Vue.component(v, components[i][v])
  })
})

setRem()

Vue.prototype.isEvenOrOdd = function (index) {
  if (index % 2 === 0) {
    return ''
  } else {
    return 'isOdd'
  }
}

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
