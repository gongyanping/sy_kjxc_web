<!--
 * @Author: gyp
 * @Date: 2020-04-15 10:48:52
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-19 18:48:23
 * @Description: 打卡记录
 * @FilePath: \sy_kjxc_web\src\views\patrolManage\clockinRecord.vue
 -->

<template>
  <div class="patrolmainWrap">
    <div class="patrolHeader">
      <el-form
        :inline="true"
        ref="searchForm"
        :model="searchForm"
        label-width="100px"
      >
        <el-form-item label="关键字" prop="userName">
          <el-input
            v-model="searchForm.userName"
            size="small"
            placeholder="请输入用户名"
            clearable
            style="width: 1.8rem"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属局">
          <el-select
            v-model="searchForm.region1"
            placeholder="请选择所属局"
            size="small"
            clearable
            style="width: 2rem"
          >
            <el-option
              v-for="item in platformOptions2"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="所属平台">
          <el-select
            v-model="searchForm.platformId"
            placeholder="请选择所属平台"
            size="small"
            clearable
            style="width: 1.8rem"
          >
            <el-option
              v-for="item in platformOptions3"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="打卡状态">
          <el-select
            v-model="searchForm.state"
            placeholder="请选择打卡状态"
            size="small"
            clearable
            style="width: 1.8rem"
          >
            <el-option
              v-for="item in punchclockList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="10">
            <el-date-picker
              type="datetime"
              placeholder="开始时间"
              v-model="searchForm.startTime"
              style="width: 100%;"
              size="small"
              value-format="yyyy-MM-dd HH:mm:ss"
              clearable
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1" style="text-align: center;">-</el-col>
          <el-col :span="10">
            <el-date-picker
              type="datetime"
              placeholder="结束时间"
              v-model="searchForm.endTime"
              style="width: 100%;"
              size="small"
              value-format="yyyy-MM-dd HH:mm:ss"
              clearable
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            class="bt-search"
            @click="getList"
            >搜索</el-button
          >
          <el-button @click="reset" size="small" type="primary" plain
            >重置</el-button
          >
          <el-button @click="handleTrack" size="small" type="success" plain>
            <span v-if="!isTracking">查看轨迹</span>
            <span v-else>关闭轨迹</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mainWrap">
      <baidu-map
        class="map"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        @ready="handler"
        @click="onMapClick"
      >
        <bml-marker-clusterer
          :averageCenter="true"
          v-if="markers.length <= 2000"
        >
          <bm-marker
            v-for="marker of markers"
            :key="marker.userId + '_' + marker.index"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @click="onMarkerClick(marker)"
            :icon="
              marker.isLocate
                ? {
                    url: require('../../assets/icon/loca.png'),
                    size: { width: 32, height: 32 }
                  }
                : { url: marker.icon, size: { width: 32, height: 32 } }
            "
            :offset="{ width: 0, height: -16 }"
          />
          <!-- <bm-label
              :content="marker.content"
              :labelStyle="{backgroundColor: 'white', color: '#333', fontSize : '12px', zIndex: '5'}"
              :offset="{width: -20, height: -48}"
            />-->
        </bml-marker-clusterer>
        <bm-point-collection
          v-else
          :points="markers"
          shape="BMAP_POINT_SHAPE_STAR"
          color="#d340c3"
          size="BMAP_POINT_SIZE_SMALL"
          @click="onPointClick"
        />
        <!-- 海量点的定位 -->
        <bm-marker
          v-if="locateMarker"
          :position="{ lng: locateMarker.lng, lat: locateMarker.lat }"
          @click="onMarkerClick(locateMarker)"
          :icon="{
            url: require('../../assets/icon/loca.png'),
            size: { width: 32, height: 32 }
          }"
          :offset="{ width: 0, height: -16 }"
        />
        <!-- 轨迹线和轨迹运动 -->
        <bm-polyline :path="polylinePaths" />
        <!-- 网格图 -->
        <bm-polygon
          v-for="(polygon, index) of showPolygons"
          :key="index"
          :path="polygon.coordList"
          :stroke-color="'#f00'"
          :stroke-weight="2"
          :stroke-opacity="0.6"
          :stroke-style="'dashed'"
          :fill-color="polygon.fillColor"
          :fill-opacity="0.5"
        />
        <bm-marker
          v-if="trackMarker"
          :position="trackMarker"
          :icon="{
            url: require('../../assets/icon/Mario.png'),
            size: { width: 32, height: 32 }
          }"
        />
        <bm-info-window
          :position="markerCoord"
          :title="'打&ensp;卡&ensp;人：' + infoWindow.name"
          :show="infoWindow.show"
          @close="infoWindowClose"
          @open="infoWindowOpen"
        >
          <p>所属平台：{{ infoWindow.addr }}</p>
          <p>打卡时间：{{ infoWindow.time }}</p>
        </bm-info-window>
      </baidu-map>
      <div class="listWrap">
        <user-list
          v-if="tabIndex === 1"
          :userList="userList"
          :markers="markers"
          @handleViewRecord="handleViewRecord"
        />
        <clockin-list
          v-if="tabIndex === 2"
          :recordList="recordList"
          :punchclockList="punchclockList"
          @handleLocate="handleLocate"
          @setTabIndex="setTabIndex"
        />
        <no-data v-if="userList.length <= 0" />
      </div>
    </div>
  </div>
</template>

<script>
import { BmlMarkerClusterer, BmMarker } from 'vue-baidu-map';
import noData from '@/components/noData';
import userList from './components/userList';
import clockinList from './components/clockinList';
import { GetQueryString } from '@/utils/common.js';
import axios from 'axios';
import _ from 'lodash';
export default {
  name: 'clockin-record',
  components: {
    noData,
    userList,
    clockinList,
    BmlMarkerClusterer,
    BmMarker
  },
  data () {
    return {
      center: { lng: 111.28, lat: 27.14 },
      // center: { lng: 104.05, lat: 30.65 },
      zoom: 12,
      searchForm: {
        userName: '',
        platformId: '',
        state: '',
        startTime: '',
        endTime: ''
      },
      // platformOptions2: [],
      platformOptions3: [], // 平台
      markers: [],
      BMap: null,
      markerCoord: null, // 弹出框坐标
      infoWindow: {
        // 弹出框信息
        show: false,
        name: '',
        addr: '',
        time: ''
      },
      userList: [], // 用户列表
      iconObj: {}, // 存用户颜色的对象 {用户名：颜色}
      tabIndex: 1, // 1 当前页 2 二级页面
      trackMarker: null, // 轨迹点
      polylinePaths: [], // 轨迹线
      isTracking: false,
      recordList: [], // 某个用户的打卡记录
      punchclockList: [
        {
          id: '0',
          name: '未打卡'
        },
        {
          id: '1',
          name: '已打卡'
        },
        {
          id: '2',
          name: '出警中'
        },
        {
          id: '3',
          name: '请假'
        },
        {
          id: '4',
          name: '打卡申诉处理中'
        },
        {
          id: '5',
          name: '打卡申诉通过'
        }
      ],
      polygons: [], // 全部网格数组
      showPolygons: [], // 显示的网格数组
      fillColors: [
        '#B5D6C1',
        '#e9f1a8',
        '#e6eee3',
        '#E3E2A0',
        '#E7C4CD',
        '#C5E1EE',
        '#F2CFCD',
        '#FAD6CA',
        '#D7E8D6',
        '#B7CFD3',
        '#F6BAB9',
        '#A6FE81',
        '#FDF6A7',
        '#DEEAB8',
        '#FBC5AD',
        '#EEE4B2',
        '#D4CBE8',
        '#F6C9DD',
        '#FDF6A8',
        '#DFF1FB',
        '#F8C17B',
        '#D1C8EC',
        '#DFE2F1',
        '#CEDCE5',
        '#E9CD3E',
        '#FAE5F1',
        '#E0E2BA',
        '#BDD2EF',
        '#FFF8B5',
        '#E2DFF2',
        '#BACD7E',
        '#FFB283',
        '#86C04F',
        '#E2EDF3',
        '#E2EDF3',
        '#F1CD91'
      ], // 网格颜色集合
      locateMarker: null // 海量点定位
    };
  },
  created () {
    let userName = GetQueryString('userName'); // 从其他入口传进来
    if (userName) {
      this.searchForm.userName = decodeURI(decodeURI(userName));
    }
    this.initPlatList(); // 下拉数据获取
    this.getGridData(); // 获取网格数据
  },
  beforeDestroy () {
    clearTimeout(this.timeOut);
    this.timeOut = null;
  },
  methods: {
    handler ({ BMap }) {
      this.BMap = BMap;
      this.getList(); // 获取打卡记录
    },
    mapInit () {
      this.zoom = 12;
      this.center = { lng: 111.28, lat: 27.14 };
    },
    run () {
      let paths = this.polylinePaths.length; // 获得有几个点
      let resetMkPoint = i => {
        this.trackMarker = this.polylinePaths[i];
        if (i < paths) {
          this.timeOut = setTimeout(function () {
            console.log(i);
            i++;
            resetMkPoint(i);
          }, 500);
        }
      };
      this.timeOut = setTimeout(function () {
        resetMkPoint(0);
      }, 500);
    },
    handleTrack () {
      if (this.isTracking) {
        this.isTracking = false;
        this.polylinePaths = [];
        this.trackMarker = null;
      } else {
        this.gpsList();
      }
    },
    gpsList () {
      // 真实数据
      const { userName, startTime, endTime } = this.searchForm;
      if (userName && startTime && endTime) {
        let userId = this.userList.find(item => item.userName === userName)
          .userId;
        let pp = {
          userId: userId,
          startTime,
          endTime
        };
        this.isTracking = true;
        this.$api.clockinRecord.gpsList(this.$qs.stringify(pp)).then(res => {
          if (res.data.data.list && res.data.data.list.length) {
            this.polylinePaths = res.data.data.list.map(item => {
              return {
                lng: item.lon,
                lat: item.lat
              };
            });
            this.center = this.polylinePaths[0];
            this.zoom = 19;
            this.run();
          }
        });
      } else {
        this.$message.error('必须输入用户和起始时间');
      }
    },
    initPlatList () {
      // this.$api.clockinRecord.platList({ level: 2 }).then(res => {
      //   if (res.data.code === 0) {
      //     this.platformOptions2 = res.data.data;
      //   }
      // });
      this.$api.clockinRecord.platList({ level: 3 }).then(res => {
        if (res.data.code === 0) {
          this.platformOptions3 = res.data.data;
        }
      });
    },
    // 获取打卡记录
    getList () {
      if (this.searchForm.platformId) {
        // 只展示某个局的信息
        const searchPlatform = this.platformOptions3.find(
          item => item.id === this.searchForm.platformId
        );
        let searchArr = searchPlatform.name.split(' ');
        let searchPlat = searchArr[0].substr(0, 2);
        let searchNum = searchArr[1];
        this.showPolygons = this.polygons.filter(item => {
          let name = item.name;
          return name.includes(searchPlat) && name.includes(searchNum);
        });
        if (this.showPolygons.length) {
          // 先定位到区域
          this.zoom = 14;
          this.center = {
            lng: this.showPolygons[0].coordList[0].lng,
            lat: this.showPolygons[0].coordList[0].lat
          };
        } else {
          this.$message.info('此区域暂无网格数据');
          this.mapInit();
        }
      } else {
        // 全部网格
        this.showPolygons = _.cloneDeep(this.polygons);
        this.mapInit();
      }
      this.markers = [];
      this.userList = [];
      this.recordList = [];
      this.tabIndex = 1;
      this.$api.clockinRecord
        .selectList(
          this.$qs.stringify({
            ...this.searchForm
          })
        )
        .then(res => {
          alert(3);
          console.log(res);
          if (res.data.data && res.data.data.userRecordList.length) {
            let resRows = res.data.data.userRecordList; // 打卡记录数据
            let userArr = []; // 获取用户名数组
            let userlistArr = []; // 获取用户数据数组
            resRows.map(item => {
              const {
                userId,
                userName,
                platformName,
                parentPlatformName
              } = item;
              if (!userArr.includes(item.userName)) {
                userArr.push(userName);
                userlistArr.push({
                  userId,
                  userName,
                  platformName,
                  parentPlatformName
                });
              }
            });
            console.log(userArr);
            console.log(userlistArr);

            let iconObj = {}; // 图标对象
            userArr.map((item, index) => {
              iconObj[item] = index;
            });
            this.iconObj = iconObj; // 存用户颜色的对象
            let markers = resRows.map((item, index) => {
              let iconIndex = iconObj[item.userName];
              if (iconIndex / 50 > 1) {
                iconIndex = iconIndex - 50 * parseInt(iconIndex / 50);
              }
              let obj2 = {
                ...item,
                lng: item.lon,
                index: index + 1,
                icon: require('../../assets/icon/loca' + iconIndex + '.png'),
                content:
                  '<div class="markerLabel"><p><b>打卡人：</b>' +
                    item.userName +
                    '</p><p><b>时间：</b>' +
                    item.clocktime || '' + '</p></div>',
                isLocate: false
              };
              return obj2;
            }); // 打卡点
            this.markers = markers;
            console.log(this.markers);
            this.center = {
              lng: this.markers[0].lng,
              lat: this.markers[0].lat
            }; // 定位到查询的点去
            this.zoom = 13;
            this.userList = userlistArr.map(item => {
              let iconIndex = iconObj[item.userName];
              if (iconIndex / 50 > 1) {
                iconIndex = iconIndex - 50 * parseInt(iconIndex / 50);
              }
              item.icon = require('../../assets/icon/loca' +
                iconIndex +
                '.png');
              return item;
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 海量点点击
     */
    onPointClick (e) {
      console.log(e.point);
      const { lng, lat } = e.point;
      this.locateMarker = this.markers.find(
        item => item.lng === lng && item.lat === lat
      );
      if (this.locateMarker) {
        this.onMarkerClick(this.locateMarker);
      }
    },
    /**
     * marker点击
     */
    onMarkerClick (marker) {
      console.log(marker);
      const { lng, lat, userName, platformName, clocktime } = marker;
      this.infoWindow = {
        show: true,
        name: userName,
        addr: platformName,
        time: clocktime
      };
      this.markerCoord = { lng, lat };
    },
    onMapClick () {},
    handleLocate (id, lng, lat) {
      if (lng && lat) {
        this.center = { lng, lat };
        this.zoom = 19;
        this.markers = this.markers.map(item => {
          if (item.userId === id) {
            item.isLocate = true;
          } else {
            item.isLocate = false;
          }
          return item;
        });
      } else {
        this.$message.error('该坐标位置不存在');
      }
    },
    infoWindowClose () {
      this.locateMarker = null;
      this.infoWindow.show = false;
    },
    infoWindowOpen () {
      this.infoWindow.show = true;
    },
    reset () {
      this.$refs['searchForm'].resetFields();
      this.searchForm = {
        userName: '',
        platformId: '',
        state: '',
        startTime: '',
        endTime: ''
      };
      this.isTracking = false;
      this.polylinePaths = [];
      this.trackMarker = null;
      this.getList();
    },
    // 查看某个用户的打卡记录
    handleViewRecord (recordList) {
      this.tabIndex = 2;
      this.recordList = recordList;
    },
    setTabIndex (type) {
      this.tabIndex = type;
    },
    // 获取网格数据
    getGridData () {
      let url = 'http://218.76.207.66:8181/api/getPoliceCarInit';
      axios.get(url).then(res => {
        let gridArray = []; // 格式化后的网格数据
        let coordArray = res.data.deptList.map(item => {
          return {
            name: item.parentName + item.deptName,
            coordList: item.coordList
          };
        }); // 未格式化的网格数据
        coordArray.map((each, index) => {
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
              fillColor: this.fillColors[index],
              coordList: tempArray
            });
          }
        });
        this.polygons = gridArray;
        this.showPolygons = _.cloneDeep(this.polygons);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.patrolmainWrap {
  .patrolHeader {
    min-height: 60px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    background: #ffffff;
    border-bottom: solid 1px #ccc;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .mainWrap {
    display: flex;
    .map {
      width: calc(100% - 400px);
      height: calc(100vh - 110px);
    }
    .listWrap {
      width: 400px;
      height: calc(100vh - 110px);
      background: #ffffff;
      overflow-y: auto;
    }
  }
}
</style>

<style lang="less">
.anchorBL {
  display: none;
}
.markerLabel {
  padding: 5px;
  > p {
    &:first-of-type {
      margin-bottom: 3px;
    }
  }
}
</style>
