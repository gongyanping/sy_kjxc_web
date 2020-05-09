<!--
 * @Author: gyp
 * @Date: 2020-04-15 10:48:52
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-09 18:44:49
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
        label-width="140px"
      >
        <el-form-item label="关键字" prop="userName">
          <el-input
            v-model="searchForm.userName"
            size="small"
            placeholder="请输入用户名"
            clearable
            style="width: 2rem"
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
          <el-select v-model="searchForm.platformId" placeholder="请选择所属平台" size="small" clearable>
            <el-option
              v-for="item in platformOptions3"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="11">
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
          <el-col class="line" :span="2" style="text-align: center;">-</el-col>
          <el-col :span="11">
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
          <el-button type="primary" size="small" class="bt-search" @click="getList">搜索</el-button>
          <el-button @click="reset" size="small" type="primary" plain>重置</el-button>
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
        <bml-marker-clusterer :averageCenter="true">
          <bm-marker
            v-for="marker of markers"
            :position="{lng: marker.lng, lat: marker.lat}"
            :key="marker.userId + '_' + marker.index"
            @click="onMarkerClick(marker)"
            :icon="{url: marker.icon, size: {width: 32, height:32}}"
          >
            <bm-label
              :content="marker.content"
              :labelStyle="{backgroundColor: 'white', color: '#333', fontSize : '12px', zIndex: '5'}"
              :offset="{width: -20, height: -48}"
            />
          </bm-marker>
        </bml-marker-clusterer>
        <!-- 轨迹线和轨迹运动 -->
        <bm-polyline :path="polylinePaths"></bm-polyline>
        <bm-marker
          v-if="trackMarker"
          :position="trackMarker"
          :icon="{url: require('../../assets/icon/Mario.png'), size: {width: 32, height:32}}"
        />
        <bm-info-window
          :position="markerCoord"
          :title="infoWindow.name"
          :show="infoWindow.show"
          @close="infoWindowClose"
          @open="infoWindowOpen"
        >
          <p v-text="infoWindow.addr"></p>
          <p v-text="infoWindow.time"></p>
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
        startTime: '',
        endTime: ''
      },
      platformOptions2: [],
      platformOptions3: [],
      markers: [],
      BMap: null,
      markerCoord: null, // 弹出框坐标
      infoWindow: { // 弹出框信息
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
      recordList: [] // 某个用户的打卡记录
    };
  },
  created () {
    let userName = GetQueryString('userName'); // 从其他入口传进来
    if (userName) {
      this.searchForm.userName = userName;
    }
    this.initPlatList(); // 下拉数据获取
  },
  beforeDestroy () {
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
      let pp = {
        userId: 'b2014ba2d42348dcbe106943ceaf76f3',
        date: '2020-04-19'
      }
      // 多数据
      // let mm = {
      //   userId: "asdfsdfasdf",
      //   date: "2020-04-19"
      // };
      this.isTracking = true;
      this.$api.clockinRecord
        .gpsList(
          this.$qs.stringify(pp)
        )
        .then(res => {
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
    },
    initPlatList () {
      this.$api.clockinRecord.platList({ level: 2 }).then(res => {
        if (res.data.code === 0) {
          this.platformOptions2 = res.data.data;
        }
      });
      this.$api.clockinRecord.platList({ level: 3 }).then(res => {
        if (res.data.code === 0) {
          this.platformOptions3 = res.data.data;
        }
      });
    },
    // 获取打卡记录
    getList () {
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
          if (res.data && res.data.rows.length) {
            let resRows = res.data.rows;
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
            let iconObj = {};
            userArr.map((item, index) => {
              iconObj[item] = index;
            });
            this.iconObj = iconObj; // 存用户颜色的对象
            this.markers = resRows.map((item, index) => {
              let obj2 = {
                ...item,
                lng: item.lon,
                index: index + 1,
                icon: require('../../assets/icon/loca' +
                  iconObj[item.userName] +
                  '.png'),
                content:
                  '<div class="markerLabel"><p><b>打卡人：</b>' +
                  item.userName +
                  '</p><p><b>时间：</b>' +
                  item.clocktime +
                  '</p></div>'
              };
              return obj2;
            });
            this.center = {
              lng: this.markers[0].lng,
              lat: this.markers[0].lat
            }; // 定位到查询的点去
            this.zoom = 15;
            this.userList = userlistArr.map(item => {
              item.icon = require('../../assets/icon/loca' +
                iconObj[item.userName] +
                '.png');
              return item;
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    onMarkerClick (marker) {
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
    handleLocate (lng, lat) {
      if (lng && lat) {
        this.center = { lng, lat };
        this.zoom = 18;
      } else {
        this.$message.info('该坐标位置不存在');
      }
    },
    infoWindowClose () {
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
        startTime: '',
        endTime: ''
      };
      this.getList();
    },
    // 查看某个用户的打卡记录
    handleViewRecord (recordList) {
      this.tabIndex = 2;
      this.recordList = recordList;
    },
    setTabIndex (type) {
      this.tabIndex = type;
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
