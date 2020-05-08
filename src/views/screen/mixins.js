/*
 * @Author: gyp
 * @Date: 2020-05-08 18:20:13
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-08 18:26:45
 * @Description: 大屏的属性和方法
 * @FilePath: \sy_kjxc_web\src\views\screen\mixins.js
 */

const basicScreen = {
  data () {
    // 中间顶部的统计数据
    const headStaData = [{
      icon: 'component', // 图标
      title: '当日警情数', // 名称
      value: 1000 // 数值
    },
    {
      icon: 'dashboard',
      title: '平均处警时长',
      value: 1980
    },
    {
      icon: 'chart',
      title: '巡逻处警通报',
      value: 2833
    },
    {
      icon: 'example',
      title: '考核评比',
      value: 2345
    }]
    return {
      headStaData: headStaData, // 中间顶部的统计数据
      center: { lng: 111.28, lat: 27.14 }, // 地图中心点
      zoom: 12 // 地图初始化缩放级别
    }
  }
}

export default basicScreen;
