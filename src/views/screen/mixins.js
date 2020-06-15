/*
 * @Author: gyp
 * @Date: 2020-05-08 18:20:13
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-15 18:22:20
 * @Description: 大屏的属性和方法
 * @FilePath: \sy_kjxc_web\src\views\screen\mixins.js
 */
import customMapConfig from '@/assets/json/custom_map_config.json';
import { formateTime } from '@/utils/common.js';
// import axios from 'axios';
import Queue from 'queue';
import _ from 'lodash';
const basicScreen = {
  data () {
    // 中间顶部的统计数据
    const headStaData = [
      {
        icon: 'component', // 图标
        title: '当日警情数', // 名称
        value: 0 // 数值
      },
      {
        icon: 'dashboard',
        title: '平均处警时长',
        value: 0
      },
      {
        icon: 'dashboard',
        title: '实时警情数',
        value: 0
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
      }
    ];
    return {
      headStaData: headStaData, // 中间顶部的统计数据
      BMap: null, // 百度地图类
      map: null, // 百度地图实例
      cityName: '邵阳', // 地图城市
      center: { lng: 111.28, lat: 27.14 }, // 地图中心点
      zoom: 14, // 地图初始化缩放级别
      mapStyle: {
        // 地图自定义样式
        styleJson: customMapConfig
      },

      platformList: [], // 快警平台信息
      carnavData: [
        { name: '全部', value: 0 },
        { name: '汽车', value: 1 },
        { name: '摩托', value: 2 }
      ], // 巡检车辆的导航
      curnavIndex: 0, // 当前选中的巡检车辆的索引,
      dutyLeaderList: [], // 大队值班领导
      realtimeAlertList: [
        {
          jjzzjgmc: '北塔汽车北站2号平台',
          bjnr: '其朋友在邵阳大饭店被人殴打',
          BJSJ: '08:13:04',
          jqlx: 1
        },
        {
          jjzzjgmc: '北塔汽车北站2号平台',
          bjnr: '在资源菜市场西头有个小孩迷路了',
          BJSJ: '08:13:03',
          jqlx: 1
        },
        {
          jjzzjgmc: '北塔江北广场1号平台',
          bjnr: '在西湖春天售楼部，有人闹事。',
          BJSJ: '07:59:16',
          jqlx: 2
        },
        {
          jjzzjgmc: '北塔汽车北站2号平台',
          bjnr: '在北站商业小区1栋有邻居打其家人',
          BJSJ: '07:55:12',
          jqlx: 3
        },
        {
          jjzzjgmc: '大祥城南公园5号平台',
          bjnr: '雪峰路平台请求增援',
          BJSJ: '07:42:28',
          jqlx: 3
        },
        {
          jjzzjgmc: '大祥雪峰南路3号平台',
          bjnr: '其在3路公交车上被扒了3000元现金及银行卡。',
          BJSJ: '07:12:12',
          jqlx: 2
        },
        {
          jjzzjgmc: '大祥火车南站4号平台',
          bjnr: '在火车南站公交车站被拔手机一台',
          BJSJ: '07:12:44',
          jqlx: 2
        },
        {
          jjzzjgmc: '大祥城南公园5号平台',
          bjnr: '报警人称老人在城南公园走失',
          BJSJ: '07:11:12',
          jqlx: 1
        }
      ], // 实时警情
      patrolcarArray: [], // 全部巡查车辆数据
      patrolcarList: [], // 当前类别的巡检车辆
      platformId: '', // 当前平台id
      platformTitle: '', // 当前平台名称
      policeVisible: false, // 快警-弹出框可见性
      dutyleaderVisible: false, // 大队值班领导-弹出框可见性
      userdetailVisible: false, // 用户详情-弹出框可见性
      situationVisible: false, // 警情-弹出框可见性
      dealsituaVisible: false, // 处警-弹出框可见性
      realtimealertnumVisible: false, // 实时警情数-弹出框可见性
      nopunchVisible: false, // 未打卡列表-弹出层可见性
      datacheckVisible: false, // 数据考核-弹出框可见性
      recordlistVisible: false, // 打卡记录-弹出框可见性
      patroltaskVisible: false, // 巡逻任务-弹出框可见性
      maptrackVisible: false, // 地图轨迹-弹出框可见性
      currentUserId: '', // 当前选中用户的id
      currentUserName: '', // 当前选中用户的名称
      markers: [], // 车辆点位数据
      showMarkers: [], // 显示的车辆点位数据
      polygons: [], // 全部网格数组
      showPolygons: [], // 显示的网格数组
      labels: [], // 网格标注
      showLabels: [], // 显示的网格标注
      videoStyle: {
        height: '100%',
        width: '100%'
      },
      lastInfoBox: null, // 弹出框窗口
      showView: false, // 视频播放可见性
      videoName: '', // 视频播放标题
      viewUrlMap: {}, // 存储视频的对象
      queue: Queue(), // 用来存车辆数据的队列
      timer: null, // 实时点位
      todayDate: '', // 今天日期
      htmlWidth: document.documentElement.clientWidth || document.body.clientWidth
    };
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
      let bdary = new BMap.Boundary();
      bdary.get(this.cityName, function (rs) {
        let EN_JW = '180, 90;'; // 东北角
        let NW_JW = '-180,  90;'; // 西北角
        let WS_JW = '-180, -90;'; // 西南角
        let SE_JW = '180, -90;'; // 东南角
        let plyOut = new BMap.Polygon(
          rs.boundaries[0] + SE_JW + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW,
          {
            strokeColor: 'none',
            fillOpacity: 1,
            strokeOpacity: 0.5,
            fillColor: '#0C1C31'
          }
        ); // 目标地区外
        let plyInner = new BMap.Polygon(rs.boundaries[0], {
          strokeWeight: 2,
          strokeColor: '#5ab1ef',
          fillColor: ''
        }); // 目标地区
        map.addOverlay(plyOut); // 添加覆盖物
        map.addOverlay(plyInner); // 添加覆盖物
        plyOut.disableMassClear(); // 禁止移除
        plyInner.disableMassClear(); // 禁止移除
      });
    },
    /**
     * 老接口-获取全部数据
     */
    getPoliceCarInit () {
      this.$api.screen.getPoliceCarInit().then(res => {
      // axios.get('http://218.76.207.66:8181/api/getPoliceCarInit').then(res => {
        this.getAllGrid(res.data.deptList);
        this.getAllPoint(res.data.deptList);
      });
    },
    /**
     * 设置地图上车辆的平台网格
     * @param {Array} data 网格数据
     */
    getAllGrid (data) {
      let gridArray = []; // 格式化后的网格数据
      let coordArray = []; // 未格式化的网格数据
      let labelArray = []; // 未格式化的网格标签
      data.map(item => {
        let objGrid = {
          name: item.parentName + item.deptName,
          coordList: item.coordList
        };
        coordArray.push(objGrid);
        let lng = 0;
        let lat = 0;
        if (item.conrdinate.split(',')) {
          lng = item.conrdinate.split(',')[0];
          lat = item.conrdinate.split(',')[1];
        } // 格式化
        let objLabel = {
          name: item.parentName + item.deptName,
          conrdinate: lng && lat ? { lng, lat } : ''
        };
        labelArray.push(objLabel);
      });
      this.labels = labelArray;
      this.showLabels = labelArray;
      coordArray.map(each => {
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
    },
    /**
     * 设置地图上车辆的点位
     * @param {Array} data 车辆数据
     */
    getAllPoint (data) {
      let pointArray = [];
      let carArray = [];
      data.map(every => {
        const { parentName, deptName, leader, resourceList } = every;
        if (resourceList.length) {
          // 有点位
          resourceList.map(item => {
            const { lon, type } = item;
            // if (lon && lat) {
            // 有经纬度
            let obj = {
              ...item,
              lng: lon,
              wholeName: parentName + deptName,
              parentName,
              name: deptName,
              leader,
              icon: require('../../assets/icon/car' + type + '.png')
            };
            delete obj.lon;
            pointArray.push(obj);
            // }
            let obb = {
              ...item,
              lng: lon
            };
            delete obb.lon;
            carArray.push(obb);
          });
        }
      });
      this.markers = pointArray;
      this.showMarkers = pointArray;
      this.patrolcarArray = carArray;
      this.patrolcarList = carArray;
    },
    /**
     * 车辆点击弹出框
     * @param {Object} marker 点信息
     */
    onMarkerClick (marker) {
      const {
        lng,
        lat,
        parentName,
        name,
        leader,
        carCode,
        type,
        devid,
        jsonText,
        videoList
      } = marker;
      let mileage = 0;
      let speed = 0;
      if (jsonText) {
        mileage = jsonText.mileage;
        speed = jsonText.speed;
      }
      let myWindow = [
        '<div class="myInfobox" id = "infoWindow">' +
          '<div class="top-left"></div>' +
          '<div class="top-right"></div>' +
          '<div class="bottom-left"></div>' +
          '<div class="bottom-right"></div>' +
          '<div class="top">' +
          '<div class="pName">' +
          parentName +
          '</div>' +
          '<div class="sName">' +
          name +
          '</div>' +
          '</div>' +
          '<div class="center">' +
          '<div class="carName">' +
          carCode +
          '</div>' +
          '<div class="leaderName">' +
          leader +
          '</div>' +
          '</div>'
      ];
      switch (type) {
        case '1':
          myWindow[0] += '<div style = "border:1px solid #5ab1ef;height:73%">';
          myWindow[0] +=
            '<div style="display:flex;flex-direction: row;text-align:left;color: #ffffff;font-size: 14px;margin: 5px 10px;">' +
            '<div style=\'color: #5ab1ef;\'>装备清单</div>' +
            '</div>' +
            '<div style="display:flex;flex-direction: row;color: #ffffff;font-size: 14px;margin: 5px 10px;">' +
            '<div style=\'width: 30%\'>手枪:2</div><div style=\'width: 38%\'>防弹头盔:5 </div><div style=\'width: 34%\'>警戒带:2</div></div>' +
            '<div style="display:flex;flex-direction: row;justify-content:space-between;color: #ffffff;font-size: 14px;margin: 5px 10px;">' +
            '<div style=\'width: 30%\'>盾牌:4</div><div style=\'width: 38%\'>单警装备:10</div><div style=\'width: 34%\'>防弹衣:5</div>' +
            '</div>' +
            '<div style="display:flex;flex-direction: row;justify-content:space-between;color: #ffffff;font-size: 14px;margin: 5px 10px;">' +
            '<div style=\'width: 30%\'>阻车器:2</div><div style=\'width: 38%\'>电子抓捕器:2</div><div style=\'width: 34%\'>执法记录仪:6</div></div>' +
            '<div style="display:flex;flex-direction: row;justify-content:space-between;color: #ffffff;font-size: 14px;margin: 5px 10px;">' +
            '<div style=\'width: 30%\'>约束带:4</div><div style=\'width: 38%\'>停车示意牌:5</div><div style=\'width: 34%\'>反光背心:8</div>' +
            '</div>' +
            '<div style="display:flex;flex-direction: row;justify-content:space-around;color: #ffffff;font-size: 14px;margin: 5px 10px;">' +
            '<div style=\'width: 60%\'>处警车350兆车载台:3</div><div style=\'width: 40%\'>350兆对讲机:7</div>' +
            '</div>';
          break;
        case '2':
        case '3':
          if (jsonText && mileage && speed) {
            myWindow[0] +=
              '<div style = "border:1px solid #5ab1ef;height:73%">';
            myWindow[0] +=
              '<div style="display:flex;flex-direction: row;text-align:left;color: #ffffff;font-size: 14px;margin: 30px 10px;">' +
              '<div style=\'width: 100%\' id = \'male' +
              devid +
              '\'>巡逻里程:' +
              (mileage / 1000).toFixed(2) +
              '公里</div>' +
              '</div>' +
              '<div style="display:flex;flex-direction: row;text-align:left;color: #ffffff;font-size: 14px;margin: 30px 10px;">' +
              '<div style=\'width: 100%\' id = \'speed' +
              devid +
              '\'>速度:' +
              speed.toFixed(2) +
              '公里/小时</div>' +
              '</div>';
          }
          break;
        default:
          break;
      }
      if (videoList !== null && videoList.length > 0) {
        this.viewUrlMap[devid] = videoList;
        myWindow[0] +=
          '<div style="display:flex;flex-direction: row;justify-content:space-around;color: #25f3e6;font-size: 15px;margin: 10px;font-weight: bold">' +
          '        <div style="cursor:pointer;text-align: left;font-weight:bold;" onclick="tapclick(\'' +
          devid +
          '\',\'' +
          carCode +
          '\')">查看监控</div>' +
          '      </div>' +
          '    </div>';
      } else {
        myWindow[0] += ' </div>   </div>';
      }
      if (this.lastInfoBox) {
        this.lastInfoBox.close();
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
      });
      this.lastInfoBox = infoBox;
      let point = new BMap.Point(lng, lat);
      this.lastInfoBox.open(new BMap.Marker(point));
    },
    changeCarList (val) {
      this.curnavIndex = val;
      if (val === 0) {
        // 全部
        this.patrolcarList = _.cloneDeep(this.patrolcarArray);
      } else if (val === 1) {
        // 汽车
        this.patrolcarList = this.patrolcarArray.filter(
          item => item.type === '2'
        );
      } else {
        // 摩托
        this.patrolcarList = this.patrolcarArray.filter(
          item => item.type === '3'
        );
      }
    },
    /**
     * 监控车辆
     * @param {Object} row 一行的值
     */
    monitorCar (row) {
      const { devid, carCode } = row;
      // if (lng && lat) {
      //   this.center = { lng, lat };
      //   this.zoom = 19;
      // }
      window.tapclick(devid, carCode);
    },
    initWebSocket () {
      // 初始化weosocket
      let wsuri = 'ws://218.76.207.66:8181/quickWebSocketServer.action';
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    videoClose () {
      this.showView = false;
    },
    websocketonopen () {
      console.log('WebSocket连接成功');
    },
    websocketonerror (e) {
      // 错误
      console.log('WebSocket连接发生错误' + e.data);
    },
    websocketonmessage (e) {
      // 数据接收
      if (e.data !== undefined) {
        this.queue.push(JSON.parse(e.data));
      }
    },
    websocketsend (agentData) {
      // 数据发送
      this.websock.send(agentData);
    },
    websocketclose: function (e) {
      // 关闭
      console.log('connection closed (' + e.code + ')');
    },
    /**
     * 实时车辆位置
     */
    setTimer () {
      this.timer = setInterval(() => {
        let queue = this.queue;
        if (queue.length > 0) {
          let len = queue.length;
          if (len > 30) len = 30;
          for (let i = 0; i < len; i++) {
            let obj = queue.shift();
            if (obj) {
              const { deviceId, lon, lat, mileage, speed } = obj;
              this.showMarkers = this.markers.map(item => {
                if (item.devid === deviceId) {
                  item.lng = lon;
                  item.lat = lat;
                }
                item.jsonText = {
                  mileage,
                  speed
                }
                return item;
              });
            }
          }
        }
      }, 1000);
    },
    /**
     * 顶部统计点击事件
     * @param {String} title 标题
     */
    onStatopClick (title) {
      switch (title) {
        case '当日警情数':
          this.situationVisible = true;
          break;
        case '平均处警时长':
          this.dealsituaVisible = true;
          break;
        case '未打卡数据':
          this.nopunchVisible = true;
          break;
        case '数据考核':
          this.datacheckVisible = true;
          break;
        default:
          break;
      }
    },
    /**
     * 点击各个板块的标题，查看更多
     * @param {String} name 标题
     */
    onTitleClick (name) {
      if (name.includes('快警平台信息')) {
        name = 1;
      }
      switch (name) {
        case 1:
          this.showPolygons = _.cloneDeep(this.polygons);
          this.showMarkers = _.cloneDeep(this.markers);
          this.showLabels = _.cloneDeep(this.labels);
          this.center = { lng: 111.28, lat: 27.14 }; // 地图中心点
          this.zoom = 14; // 地图初始化缩放级别
          break;
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
      this.$api.screen.findPlatform().then(res => {
        if (res.data.code === 0) {
          this.platformList = res.data.data;
        }
      });
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
      // 网格
      let pName = parentName.slice(0, parentName.length - 1);
      this.showPolygons = this.polygons.filter(item => {
        let polyName = item.name;
        return polyName.includes(pName) && polyName.includes(name);
      });
      if (this.showPolygons.length) {
        // 先定位到区域
        this.zoom = 14;
        this.center = {
          lng: this.showPolygons[0].coordList[0].lng,
          lat: this.showPolygons[0].coordList[0].lat
        };
      } else {
        this.mapInit();
      }
      // 车辆
      this.showMarkers = this.markers.filter(item => {
        let wholeName = item.wholeName;
        return wholeName.includes(pName) && wholeName.includes(name);
      });
      // 网格标签
      this.showLabels = this.markers.filter(item => {
        let labelName = item.name;
        return labelName.includes(pName) && labelName.includes(name);
      });
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
      };
      this.$api.screen.findUserByIdentity(params).then(res => {
        this.dutyLeaderList = res.data.rows;
      });
    },
    /**
     * 当前选中用户的id
     * @param {String} userId 用户id
     * @param {String} type 操作类型
     */
    onUserClick (userId, type, name) {
      this.currentUserId = userId;
      this.currentUserName = name;
      switch (type) {
        case 'look':
          this.userdetailVisible = true;
          break;
        case 'record':
          this.recordlistVisible = true;
          break;
        case 'task':
          this.patroltaskVisible = true;
          break;
        case 'track':
          this.maptrackVisible = true;
          break;
        default:
          break;
      }
    },
    /**
     * 关闭用户详情弹出框
     */
    onUserdetailClose () {
      this.currentUserId = '';
      this.userdetailVisible = false;
    },
    /**
     * 关闭未打卡数据弹出框
     */
    onNopunchClose () {
      this.nopunchVisible = false;
      this.getNopunchData();
    },
    /**
     * 关闭数据考核弹出框
     */
    onDatacheckClose () {
      this.datacheckVisible = false;
      this.getCheckData();
    },
    /**
     * 获取未打卡数据的总数
     */
    getNopunchData () {
      let params = {
        userId: '',
        pageSize: 10,
        pageNumber: 1,
        name: '',
        state: 0,
        date: this.todayDate
      };
      this.$api.screen.userAllClockedList(params).then(res => {
        this.headStaData[3].value = res.data.total;
      });
    },
    /**
     * 获取数据考核的总数
     */
    getCheckData () {
      let params = {
        startDate: this.todayDate,
        endDate: this.todayDate,
        pageSize: 10,
        pageNumber: 1
      };
      this.$api.screen.checkList(params).then(res => {
        this.headStaData[4].value = res.data.total;
      });
    },
    /**
     * 实时警情
     */
    intime () {
      this.$api.screen.intime({
        time: 60
      }).then(res => {
        if (res.data.data) {
          this.realtimeAlertList = res.data.data;
        }
      })
    },
    /**
     * 当日警情数
     */
    todayAlert () {
      this.$api.screen.todayAlert().then(res => {
        if (res.data.data) {
          this.headStaData[0].value = res.data.alertSum;
        }
      })
    },
    /**
     * 平均处警时长
     */
    avgDealAlertTime () {
      this.$api.screen.avgDealAlertTime().then(res => {
        if (res.data.data) {
          this.headStaData[1].value = formateTime(res.data.useTime);
        }
      })
    }
  }
};

export default basicScreen;
