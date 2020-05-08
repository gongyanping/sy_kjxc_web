/*
 * @Author: gyp
 * @Date: 2020-05-08 18:20:13
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-08 18:26:45
 * @Description: 大屏的属性和方法
 * @FilePath: \sy_kjxc_web\src\views\screen\mixins.js
 */
import customMapConfig from '@/assets/json/custom_map_config1.json';
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
      zoom: 12, // 地图初始化缩放级别
      mapStyle: { // 地图自定义样式
        styleJson: customMapConfig
      },
      platformList: [{
        parentName: '北塔分局',
        deptName: '龙山路1号平台',
        deptCount: 29,
        leader: '郭小慧'
      }, {
        parentName: '北塔分局',
        deptName: '龙山路1号平台',
        deptCount: 29,
        leader: '郭小慧'
      }, {
        parentName: '北塔分局',
        deptName: '龙山路1号平台',
        deptCount: 29,
        leader: '郭小慧'
      }, {
        parentName: '北塔分局',
        deptName: '龙山路1号平台',
        deptCount: 29,
        leader: '郭小慧'
      }, {
        parentName: '北塔分局',
        deptName: '龙山路1号平台',
        deptCount: 29,
        leader: '郭小慧'
      }, {
        parentName: '北塔分局',
        deptName: '龙山路1号平台',
        deptCount: 29,
        leader: '郭小慧'
      }, {
        parentName: '北塔分局',
        deptName: '龙山路1号平台',
        deptCount: 29,
        leader: '郭小慧'
      }, {
        parentName: '北塔分局',
        deptName: '龙山路1号平台',
        deptCount: 29,
        leader: '郭小慧'
      }, {
        parentName: '北塔分局',
        deptName: '龙山路1号平台',
        deptCount: 29,
        leader: '郭小慧'
      }, {
        parentName: '北塔分局',
        deptName: '龙山路1号平台',
        deptCount: 29,
        leader: '郭小慧'
      }], // 快警平台信息
      carnavData: [{
        name: '全部', value: 0
      },
      { name: '汽车', value: 1 },
      { name: '摩托', value: 2 }], // 巡检车辆的导航
      curnavIndex: 0 // 当前选中的巡检车辆的索引
    }
  }
}

export default basicScreen;
