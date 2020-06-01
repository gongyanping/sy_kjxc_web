/*
 * @Author: gyp
 * @Date: 2020-05-08 18:20:13
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-01 17:51:31
 * @Description: 大屏的属性和方法
 * @FilePath: \sy_kjxc_web\src\views\screen\mixins.js
 */
import customMapConfig from '@/assets/json/custom_map_config.json';
import axios from 'axios';
import _ from 'lodash';
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
      // PolygonList: {}, // 多边形覆盖物对象
      platformList: [], // 快警平台信息
      carnavData: [{ name: '全部', value: 0 },
        { name: '汽车', value: 1 },
        { name: '摩托', value: 2 }], // 巡检车辆的导航
      curnavIndex: 0, // 当前选中的巡检车辆的索引,
      dutyLeaderList: [], // 大队值班领导
      realtimeAlertList: [{
        palt: '北塔汽车北站2号平台',
        descri: '其朋友在邵阳大饭店被人殴打',
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
      dutyleaderVisible: false, // 大队值班领导-弹出框可见性
      markers: [], // 车辆点位数据
      showMarkers: [], // 显示的车辆点位数据
      polygons: [], // 全部网格数组
      showPolygons: [], // 显示的网格数组
      videoStyle: {
        height: '100%',
        width: '100%'
      },
      infoBox: null // 弹出框窗口
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
      // 设置地图的边界
      let bdary = new BMap.Boundary()
      bdary.get(this.cityName, function (rs) {
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
      })
    },
    /**
     * 老接口-获取全部数据
     */
    getPoliceCarInit () {
      // this.$api.screen.getPoliceCarInit().then(res => {
      axios.get('http://218.76.207.66:8181/api/getPoliceCarInit').then(res => {
        this.getAllGrid(res.data.deptList);
        this.getAllPoint(res.data.deptList);
      })
    },
    /**
     * 设置地图上车辆的平台网格
     * @param {Array} data 网格数据
     */
    getAllGrid (data) {
      let gridArray = []; // 格式化后的网格数据
      let coordArray = data.map(item => {
        return {
          name: item.parentName + item.name,
          coordList: item.coordList
        };
      }); // 未格式化的网格数据
      coordArray.map((each) => {
        const { name, coordList } = each;
        let tempArray = []; // 一个区域网格
        if (coordList.length) {
          // 数组有坐标点才进行计算
          for (let i = 0; i < coordList.length; i++) {
            // 一个分局可能包含多个分区
            let arr = coordList[i][0].split(';');
            if (arr.length) {
              // 有坐标点才进行计算
              arr.forEach(element => {
                let eleCoord = element.split(',');
                let obj = {
                  lng: eleCoord[0],
                  lat: eleCoord[1]
                };
                tempArray.push(obj);
              });
            }
          }
        }
        if (tempArray.length) {
          // 有数据才加入网格数据组
          gridArray.push({
            name,
            coordList: tempArray
          });
        }
      });
      this.polygons = gridArray;
      this.showPolygons = _.cloneDeep(this.polygons);
      console.log(this.polygons)
    },
    /**
     * 设置地图上车辆的点位
     * @param {Array} data 车辆数据
     */
    getAllPoint (data) {
      let pointArray = [];
      data.map(every => {
        const { parentName, name, leader, resourceList } = every;
        if (resourceList.length) {
          // 有点位
          resourceList.map(item => {
            const { lon, lat, type } = item;
            if (lon && lat) {
              // 有经纬度
              let obj = {
                ...item,
                lng: lon,
                wholeName: parentName + name,
                parentName,
                name,
                leader,
                icon: require('../../assets/icon/car' + type + '.png')
              }
              delete obj.lon;
              pointArray.push(obj);
            }
          })
        }
      });
      this.markers = pointArray;
      this.showMarkers = _.cloneDeep(this.markers);
      console.log(this.showMarkers)
    },
    /**
     * 车辆点击弹出框
     * @param {Object} marker 点信息
     */
    onMarkerClick (marker) {
      const { lng, lat, parentName, name, leader, carCode, type } = marker;
      let myWindow = ['<div class="myInfobox" id = "infoWindow">' +
          ' <div class="top-left"></div>' +
          ' <div class="top-right"></div>' +
          ' <div class="bottom-left"></div>' +
          ' <div class="bottom-right"></div>' +
          ' <div class="top">' +
          '   <div class="pName">' + parentName + '</div>' +
          '   <div class="sName">' + name + '</div>' +
          ' </div>' +
          ' <div class="center">' +
          '    <div class="carName">' + carCode + '</div>' +
          '    <div class="leaderName">' + leader + '</div>' +
          ' </div>'
      ]
      switch (type) {
        case '1':
          myWindow[0] += '<div style = "border:0.01rem solid #5ab1ef;height:73%">'
          myWindow[0] += '<div style="display:flex;flex-direction: row;text-align:left;color: #ffffff;font-size: 0.1rem;margin: 0.05rem 0.1rem;">' +
              '<div style=\'color: #5ab1ef;\'>装备清单</div>' +
              '</div>' +
              '<div style="display:flex;flex-direction: row;color: #ffffff;font-size: 0.1rem;margin: 0.05rem 0.1rem;">' +
              '<div style=\'width: 30%\'>手枪:2</div><div style=\'width: 38%\'>防弹头盔:5 </div><div style=\'width: 34%\'>警戒带:2</div></div>' +
              '<div style="display:flex;flex-direction: row;justify-content:space-between;color: #ffffff;font-size: 0.1rem;margin: 0.05rem 0.1rem;">' +
              '<div style=\'width: 30%\'>盾牌:4</div><div style=\'width: 38%\'>单警装备:10</div><div style=\'width: 34%\'>防弹衣:5</div>' +
              '</div>' +
              '<div style="display:flex;flex-direction: row;justify-content:space-between;color: #ffffff;font-size: 0.1rem;margin: 0.05rem 0.1rem;">' +
              '<div style=\'width: 30%\'>阻车器:2</div><div style=\'width: 38%\'>电子抓捕器:2</div><div style=\'width: 34%\'>执法记录仪:6</div></div>' +
              '<div style="display:flex;flex-direction: row;justify-content:space-between;color: #ffffff;font-size: 0.1rem;margin: 0.05rem 0.1rem;">' +
              '<div style=\'width: 30%\'>约束带:4</div><div style=\'width: 38%\'>停车示意牌:5</div><div style=\'width: 34%\'>反光背心:8</div>' +
              '</div>' +
              '<div style="display:flex;flex-direction: row;justify-content:space-around;color: #ffffff;font-size: 0.1rem;margin: 0.05rem 0.1rem;">' +
              '<div style=\'width: 60%\'>处警车350兆车载台:3</div><div style=\'width: 40%\'>350兆对讲机:7</div>' +
              '</div>'
          break;
        case '2':
          break;
        case '3':
          break;
        default:
          break;
      }
      let infoBox = new BMapLib.InfoBox(this.map, myWindow, {
        boxStyle: {
          background: 'transparent',
          width: '350px',
          height: '300px'
        },
        offset: new BMap.Size(0, 35),
        closeIconMargin: '1px 1px 0 0',
        enableAutoPan: true,
        closeIconUrl: require('../../assets/icon/close.png')
      })
      let point = new BMap.Point(lng, lat)
      infoBox.open(new BMap.Marker(point));
    },
    initWebSocket () {
      // 初始化weosocket
      let wsuri = 'ws://218.76.207.66:8181/quickWebSocketServer.action';
      this.websock = new WebSocket(wsuri)
      this.websock.onopen = this.websocketonopen

      this.websock.onerror = this.websocketonerror

      this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
    },
    videoClose () {
      this.showview = false
      this.centerPointVideo = null
    },
    websocketonopen () {
      console.log('WebSocket连接成功')
    },
    websocketonerror (e) { // 错误
      console.log('WebSocket连接发生错误' + e.data)
    },
    websocketonmessage (e) { // 数据接收
      if (e.data !== undefined) {
        // this.queue.push(JSON.parse(e.data))
        console.log(e.data);
      }
    },
    websocketsend (agentData) { // 数据发送
      this.websock.send(agentData)
    },
    websocketclose: function (e) { // 关闭
      console.log('connection closed (' + e.code + ')')
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
      this.platformId = id;
      this.platformTitle = parentName + '-' + name;
    },
    /**
     * 关闭快警平台弹出框
     */
    onPoliceClose () {
      this.policeVisible = false;
      this.platformId = '';
      this.platformTitle = '';
    },
    /**
     * 大队值班领导
     */
    findUserByIdentity () {
      let params = {
        pageNumber: 1,
        pageSize: 15
      }
      this.$api.screen.findUserByIdentity(params)
        .then(res => {
          this.dutyLeaderList = res.data.rows;
        })
    }
  }
}

export default basicScreen;
