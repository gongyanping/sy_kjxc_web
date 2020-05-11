/*
 * @Author: gyp
 * @Date: 2020-05-08 18:20:13
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-11 21:49:42
 * @Description: 大屏的属性和方法
 * @FilePath: \sy_kjxc_web\src\views\screen\mixins.js
 */
import customMapConfig from '@/assets/json/custom_map_config.json';
const basicScreen = {
  data () {
    // 中间顶部的统计数据
    const headStaData = [{
      icon: 'component', // 图标
      title: '当日警情数', // 名称
      value: 100 // 数值
    },
    {
      icon: 'dashboard',
      title: '平均处警时长',
      value: 198
    },
    {
      icon: 'chart',
      title: '未打卡数据',
      value: 283
    },
    {
      icon: 'example',
      title: '数据考核',
      value: 234
    }]
    return {
      headStaData: headStaData, // 中间顶部的统计数据
      BMap: null, // 百度地图类
      map: null, // 百度地图实例
      cityName: '邵阳', // 地图城市
      center: { lng: 111.28, lat: 27.14 }, // 地图中心点
      zoom: 14, // 地图初始化缩放级别
      mapStyle: { // 地图自定义样式
        styleJson: customMapConfig
      },
      PolygonList: {}, // 多边形覆盖物对象
      platformList: [], // 快警平台信息
      carnavData: [{ name: '全部', value: 0 },
        { name: '汽车', value: 1 },
        { name: '摩托', value: 2 }], // 巡检车辆的导航
      curnavIndex: 0, // 当前选中的巡检车辆的索引,
      dutyLeaderList: [{
        name: '汽车北站2号平台',
        human: '陆华林',
        phone: '13973959376'
      }, {
        name: '武冈广乐路1号平台',
        human: '钟亚新',
        phone: '18073909053'
      }, {
        name: '武冈春园路2号平台',
        human: '肖金华',
        phone: '15073970921'
      }, {
        name: '城步儒林镇城南平台',
        human: '杨文成',
        phone: '13873932991'
      }, {
        name: '新邵老城区1号平台',
        human: '彭育桂',
        phone: '13507395193'
      }, {
        name: '新邵大坪2号平台',
        human: '陈雄杰',
        phone: '13975933098'
      }, {
        name: '绥宁中心街2号平台',
        human: '苏民华',
        phone: '13873973873'
      }], // 大队值班领导
      realtimeAlertList: [{
        palt: '北塔汽车北站2号平台',
        descri: '其朋友在邵阳大饭店被人殴打其朋友在邵阳大饭店被人殴打其朋友在邵阳大饭店被人殴打其朋友在邵阳大饭店被人殴打其朋友在邵阳大饭店被人殴打',
        time: '08:13:04',
        level: '其它警情'
      }, {
        palt: '北塔汽车北站2号平台',
        descri: '在资源菜市场西头有个小孩迷路了',
        time: '08:13:03',
        level: '群众求助'
      }, {
        palt: '北塔江北广场1号平台',
        descri: '在西湖春天售楼部，有人闹事。',
        time: '07:59:16',
        level: '其它警情'
      }, {
        palt: '北塔汽车北站2号平台',
        descri: '在北站商业小区1栋有邻居打其家人',
        time: '07:55:12',
        level: '打架纠纷'
      }, {
        palt: '大祥城南公园5号平台',
        descri: '雪峰路平台请求增援',
        time: '07:42:28',
        level: '其它警情'
      }, {
        palt: '大祥雪峰南路3号平台',
        descri: '其在3路公交车上被扒了3000元现金及银行卡。',
        time: '07:12:12',
        level: '其它警情'
      }, {
        palt: '大祥火车南站4号平台',
        descri: '在火车南站公交车站被拔手机一台',
        time: '07:12:44',
        level: '其它警情'
      }, {
        palt: '大祥城南公园5号平台',
        descri: '报警人称老人在城南公园走失',
        time: '07:11:12',
        level: '群众求助'
      }], // 实时警情
      patrolcarList: [{
        car: '湘E33124',
        status: '行驶中'
      }], // 巡检车辆
      platformId: '', // 当前平台id
      platformTitle: '', // 当前平台名称
      policeVisible: false, // 快警-弹出框可见性
      dutyleaderVisible: false // 大队值班领导-弹出框可见性
    }
  },
  methods: {
    // 地图组件渲染完毕时触发
    handler ({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;
      this.mapInit();
    },
    /**
     * 地图初始化
     */
    mapInit () {
      const map = this.map;
      console.log(map)
      // 设置地图的边界
      let bdary = new BMap.Boundary()
      console.log(bdary);
      bdary.get(this.cityName, function (rs) {
        map.clearOverlays()
        let EN_JW = '180, 90;' // 东北角
        let NW_JW = '-180,  90;' // 西北角
        let WS_JW = '-180, -90;' // 西南角
        let SE_JW = '180, -90;'; // 东南角
        let plyOut = new BMap.Polygon(rs.boundaries[0] + SE_JW + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW, {
          strokeColor: 'none', fillOpacity: 1, strokeOpacity: 0.5, fillColor: '#0C1C31'
        }) // 目标地区外
        let plyInner = new BMap.Polygon(rs.boundaries[0], {
          strokeWeight: 2, strokeColor: '#5ab1ef', fillColor: ''
        }) // 目标地区
        map.addOverlay(plyOut) // 添加覆盖物
        map.addOverlay(plyInner) // 添加覆盖物
        plyOut.disableMassClear(); // 禁止移除
        plyInner.disableMassClear(); // 禁止移除
        this.PolygonList['mapOut'] = plyOut; // 添加到覆盖物数组
        this.PolygonList['plyInner'] = plyInner; // 添加到覆盖物数组
      })
    },
    /**
     * 点击各个板块的标题，查看更多
     * @param {String} name 标题
     */
    onTitleClick (name) {
      switch (name) {
        case '大队值班领导':
          this.dutyleaderVisible = true;
          break;
        default:
          break;
      }
    },
    /**
     * 关闭大队值班领导的弹出框
     */
    onDutyleaderClose () {
      this.dutyleaderVisible = false;
    },
    /**
     * 获取快警平台信息
     */
    findPlatform () {
      this.$api.screen
        .findPlatform()
        .then(res => {
          if (res.data.code === 0) {
            this.platformList = res.data.data;
          }
        })
    },
    /**
     * 打开快警平台弹出框
     * @param {String} row 平台数据
     */
    onPoliceOpen (row) {
      const { id, parentName, name } = row;
      this.policeVisible = true;
      this.flatformId = id;
      this.platformTitle = parentName + '-' + name;
    },
    /**
     * 关闭快警平台弹出框
     */
    onPoliceClose () {
      this.policeVisible = false;
      this.flatformId = '';
      this.platformTitle = '';
    }
  }
}

export default basicScreen;
