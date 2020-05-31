<!--
 * @Author: gyp
 * @Date: 2020-04-15 10:48:52
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-29 16:26:28
 * @Description: 巡逻点管理
 * @FilePath: \sy_kjxc_web\src\views\patrolManage\patrolPoint.vue
 -->

<template>
  <div class="patrolmainWrap">
    <div class="patrolHeader">
      <div>
        <el-button
          type="primary"
          @click="handleNew"
          :disabled="onProcessing && !this.patrolForm.lon"
        >
          <span v-if="!onProcessing">新增巡逻点</span>
          <span v-else>确定巡逻点</span>
        </el-button>
        <el-button v-if="onProcessing" @click="handleCancelPoint">取消新增巡逻点</el-button>
        <!-- <span class="elAlert" v-if="onProcessing" v-show="alertShow">
          <el-alert title="先在地图上选择点位，再点击确定去进行新增" type="success" @close="alertShow = false" />
        </span>-->
        <span v-if="onProcessing">
          <el-input
            placeholder="输入地址名查询"
            v-model="addrSearch"
            clearable
            style="width: 180px;margin: 5px 10px"
          />
          <el-button type="primary" class="bt-search" @click="searchAddr">查询</el-button>
        </span>
      </div>
      <div class="searchWrap">
        <el-input placeholder="请输入关键字" v-model="inputName" clearable style="width: 150px;" />
        <el-select
          v-model="typeName"
          placeholder="点位类型"
          clearable
          style="width: 140px; margin-left: 10px"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="platformId"
          placeholder="请选择部门"
          clearable
          filterable
          style="width: 180px; margin-left: 10px"
        >
          <el-option
            v-for="item in platformOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-select
          v-model="lineId"
          placeholder="请选择任务名称"
          clearable
          filterable
          style="width: 205px; margin-left: 10px"
        >
          <el-option
            v-for="item in lineOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button type="primary" class="bt-search" @click="getList(1)">搜索</el-button>
        <el-button @click="reset" type="primary" plain>重置</el-button>
        <el-button @click="showPolylines = []" type="success" plain>关闭线路</el-button>
      </div>
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
        <bm-marker
          v-for="marker of markers"
          :position="{ lng: marker.lng, lat: marker.lat }"
          :key="marker.id"
          @click="onMarkerClick(marker)"
          :icon="
            marker.isLocate
              ? {
                  url: require('../../assets/icon/loca.png'),
                  size: { width: 32, height: 32 }
                }
              : { url: marker.icon, size: { width: 32, height: 32 } }
          "
          :offset="{ width: 0, height: -14 }"
        />
        <bm-info-window
          :position="markerCoord"
          :title="infoWindow.title"
          :show="infoWindow.show"
          @close="infoWindowClose"
          @open="infoWindowOpen"
        >
          <p v-text="infoWindow.contents"></p>
        </bm-info-window>
        <!-- 每条线路下所有点位，用线串起来闭环，相同号码的线路颜色一样 -->
        <!-- 先注释掉 -->
        <bm-polyline
          v-for="(polyline, index) of showPolylines"
          :key="index"
          :path="polyline.coordList"
          :stroke-color="polyline.strokeColor"
          :stroke-weight="2"
          :stroke-opacity="0.8"
        />
      </baidu-map>
      <div class="listWrap">
        <patrolpoint-list
          :datatables="tableDatas && tableDatas.rows"
          @handleLocate="handleLocate"
          @handleEdit="handleEdit"
          @getList="getList"
          @onSavePoint="onSavePoint"
        />
        <Pagination :tabledatas="tableDatas" @comgetData="getList" :changePageNum="true" />
        <no-data v-if="tableDatas.rows.length <= 0" />
      </div>
    </div>
    <patrolpoint-dialog
      :dialogVisible="dialogVisible"
      :curId="curId"
      :form="patrolForm"
      :lineOptions="lineOptions"
      :equOptions="equOptions"
      :typeOptions="typeOptions"
      :isFromTask="isFromTask"
      @closeDialog="closeDialog"
      @getList="getList"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
import noData from '@/components/noData';
import patrolpointList from './components/patrolpointList';
import patrolpointDialog from './components/patrolpointDialog';
import { BmMarker } from 'vue-baidu-map';
import { GetQueryString } from '@/utils/common.js';
// import axios from 'axios';
import _ from 'lodash';
export default {
  name: 'patrol-point',
  components: {
    Pagination,
    noData,
    patrolpointList,
    patrolpointDialog,
    BmMarker
  },
  data () {
    const typeOptions = [
      {
        label: '巡逻点位',
        value: '1'
      },
      {
        label: '上班',
        value: '2'
      },
      {
        label: '下班',
        value: '3'
      }
    ];
    return {
      center: { lng: 111.28, lat: 27.14 }, // 邵阳
      // center: { lng: 104.05, lat: 30.65 },
      zoom: 12,
      tableDatas: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        rows: []
      },
      dialogVisible: false,
      curId: '',
      inputName: '',
      typeName: '',
      typeOptions: typeOptions,
      markers: [],
      form: {
        pageNumber: 1,
        pageSize: 10
      },
      selectedAddr: '',
      onProcessing: false,
      infoWindow: {
        show: false,
        contents: ''
      },
      markerCoord: null,
      BMap: null, // 地图类
      map: null, // 地图实例
      local: null, // 服务类
      patrolForm: {
        id: '',
        name: '',
        address: '',
        lon: '',
        lat: '',
        lineId: '',
        type: '1',
        time: ''
      },
      isFromTask: false, // 是否来自任务列表
      lineId: '', // b0b61152d17f4ae7a5c52af5a7657d79
      taskId: '',
      lineOptions: [], // 任务名称
      equOptions: [], // 打卡机列表
      addrSearch: '', // 地图关键字搜索位置
      alertShow: false, // 新增点时提示框
      platformId: '', // 选中的部门
      platformOptions: [], // 部门列表
      polylines: [], // 全部线路
      showPolylines: [], // 显示的线路
      markersLength: 0, // 点长度
      strokeColors: [
        '#BD8CBB',
        '#D81E06',
        '#14A849',
        '#2264BC',
        '#1296DB',
        '#13227A',
        '#03A8A4',
        '#594D9C',
        '#D4237A',
        '#8CBB19',
        '#3F0412',
        '#EB8099',
        '#EFB40D'
      ] // 线路颜色
    };
  },
  created () {
    // 获取任务id
    let taskId = GetQueryString('lineId');
    if (taskId) {
      this.lineId = taskId;
      this.taskId = taskId;
      this.isFromTask = true;
    }
    this.findAll(); // 任务
    this.getAllFingerprint(); // 打卡机
    this.getList(); // 巡逻点
    this.getPolylineData(); // 线路
    this.initPlatList(); // 部门
  },
  methods: {
    handler ({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;
      this.mapShaoyang();
    },
    // 初始化地图
    mapInit () {
      this.zoom = 12;
      this.center = { lng: 111.28, lat: 27.14 };
    },
    mapShaoyang () {
      const map = this.map;
      // 设置地图的边界
      let bdary = new BMap.Boundary();
      bdary.get('邵阳', rs => {
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
            fillColor: '#F5F3F0'
          }
        ); // 目标地区外
        let plyInner = new BMap.Polygon(rs.boundaries[0], {
          strokeWeight: 2,
          strokeColor: '#999',
          fillColor: ''
        }); // 目标地区
        map.addOverlay(plyOut); // 添加覆盖物
        map.addOverlay(plyInner); // 添加覆盖物
        plyOut.disableMassClear(); // 禁止移除
        plyInner.disableMassClear(); // 禁止移除
      });
    },
    // 获取巡逻点列表
    getList (val1 = 1, val2) {
      if (val2) {
        this.form.pageNumber = 1;
        this.form.pageSize = val1;
      } else {
        this.form.pageNumber = val1;
      }
      if (this.inputName || this.typeName) {
        this.showPolylines = [];
      } else if (this.platformId && !this.lineId) {
        // 某个平台
        this.showPolylines = this.polylines.filter(
          item => item.platformId === this.platformId
        );
        if (this.showPolylines.length) {
          // 先定位到线路
          this.zoom = 16;
          this.center = {
            lng: this.showPolylines[0].coordList[0].lng,
            lat: this.showPolylines[0].coordList[0].lat
          };
        } else {
          this.showPolylines = [];
        }
      } else if (this.lineId) {
        this.platformId = '';
        // 某个线路
        this.showPolylines = this.polylines.filter(
          item => item.lineId === this.lineId
        );
        if (this.showPolylines.length) {
          // 先定位到线路
          this.zoom = 17;
          let length = this.showPolylines[0].coordList.length;
          if (length) {
            length = Math.floor(length / 2);
          }
          this.center = {
            lng: this.showPolylines[0].coordList[length].lng,
            lat: this.showPolylines[0].coordList[length].lat
          };
        } else {
          this.showPolylines = [];
        }
      } else {
        // 全部线路
        this.showPolylines = _.cloneDeep(this.polylines);
        this.mapInit();
      }
      this.markers = [];
      this.$api.patrolPoint
        .list(
          this.$qs.stringify({
            ...this.form,
            name: this.inputName,
            type: this.typeName,
            platformId: this.platformId,
            lineId: this.lineId
          })
        )
        .then(res => {
          if (res.data.code === 0) {
            this.tableDatas = {
              ...res.data.data,
              pageNum: this.form.pageNumber,
              pageSize: this.form.pageSize
            };
            if (res.data.data.rows.length) {
              this.markers = res.data.data.rows.map(item => {
                const { id, lineName, name, lon, lat } = item;
                const lineNum = lineName.slice(-1);
                let obj = {
                  id,
                  name,
                  lng: lon,
                  lat,
                  isLocate: false,
                  lineNum,
                  icon: require('../../assets/icon/loca' + lineNum + '.png')
                };
                return obj;
              });
              this.markersLength = this.markers.length;
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 获取全部线路
    getPolylineData () {
      this.$api.patrolPoint
        .list(
          this.$qs.stringify({
            name: '',
            type: '',
            lineId: '',
            platformId: '',
            pageNumber: 1,
            pageSize: 1000000
          })
        )
        .then(res => {
          if (res.data.code === 0) {
            let data = res.data.data.rows;
            let lineArr = []; // 线路id
            let polyArr = []; // 线路数组
            let reg = /^[1-9]+[0-9]*]*$/; // 正整数验证
            data.forEach(item => {
              const { lineId, platformId, lineName } = item;
              if (!lineArr.find(item => item.lineId === lineId)) {
                let lineNum = 0;
                if (lineName) {
                  const last = lineName.slice(-1);
                  if (reg.test(last)) {
                    lineNum = parseInt(last);
                  }
                }
                lineArr.push({
                  lineId,
                  platformId,
                  lineName,
                  lineNum
                });
              }
            });
            for (let i = 0; i < lineArr.length; i++) {
              let { lineId, platformId, lineName, lineNum } = lineArr[i];
              let curLine = lineId;
              let obj = {
                lineId,
                platformId,
                lineName,
                strokeColor:
                  lineNum < 12
                    ? this.strokeColors[lineNum]
                    : this.strokeColors[lineNum - 12]
              };
              let coordArr = []; // 闭环线路坐标
              data.forEach(item => {
                const { lineId, lon, lat, sort } = item;
                if (curLine === lineId) {
                  coordArr.push({ lng: lon, lat, sort });
                }
              });
              coordArr.sort((a, b) => a.sort - b.sort);
              obj.coordList = [...coordArr, coordArr[0]];
              polyArr.push(obj);
            }
            this.polylines = polyArr;
            this.showPolylines = polyArr;
          }
        });
    },
    // 新增巡逻点
    handleNew () {
      if (!this.onProcessing) {
        // 如果没有在新增巡逻点过程中，则设为是
        this.onProcessing = true;
        this.alertShow = true;
      } else {
        // 在巡逻过程中
        this.curId = '';
        this.dialogVisible = true;
        if (this.taskId) {
          this.isFromTask = true;
          this.patrolForm.lineId = this.taskId;
        }
      }
    },
    // 编辑巡逻点
    handleEdit (row) {
      this.dialogVisible = true;
      this.curId = row ? row.id : '';
    },
    // 定位巡逻点
    handleLocate (id, lng, lat) {
      if (lng && lat) {
        this.center = { lng, lat };
        this.zoom = 19;
        this.markers = this.markers.map(item => {
          if (item.id === id) {
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
    // 关闭巡逻点弹出框
    closeDialog () {
      this.curId = '';
      this.dialogVisible = false;
      this.onProcessing = false;
      this.patrolForm = {
        id: '',
        name: '',
        address: '',
        lon: '',
        lat: '',
        lineId: '',
        type: '1',
        time: ''
      };
      this.handleCancelPoint();
    },
    // 地图点击事件，新增巡逻点用
    onMapClick (e) {
      const { lng, lat } = e.point;
      if (this.onProcessing) {
        this.patrolForm.lon = lng;
        this.patrolForm.lat = lat;
        if (this.markers.length > this.markersLength) {
          this.markers.pop();
        }
        this.markers.push({
          lng,
          lat,
          isLocate: true
        });
        let BMap = this.BMap;
        let geocoder = new BMap.Geocoder(); // 创建地址解析器的实例
        geocoder.getLocation(e.point, res => {
          this.patrolForm.address = res.address;
        });
      }
    },
    // marker点击事件
    onMarkerClick (e) {
      const { name, lng, lat } = e;
      this.markerCoord = { lng, lat };
      this.infoWindow = {
        show: true,
        title: name,
        contents: '坐标:' + lng + ',' + lat
      };
    },
    // infoWindow关闭
    infoWindowClose () {
      this.infoWindow.show = false;
    },
    // infoWindwo打开
    infoWindowOpen () {
      this.infoWindow.show = true;
    },
    // 保存巡逻点函数
    onSavePoint (params) {
      this.$api.patrolPoint
        .saveOrUpdate(this.$qs.stringify(params))
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success('复制巡逻点成功');
            this.getList();
          }
        });
    },
    // 重置搜索的关键字
    reset () {
      this.inputName = ''; // 关键字
      this.typeName = ''; // 点位类型
      this.platformId = ''; // 部门
      this.lineId = ''; // 线路
      this.getList();
    },
    // 取消新增巡逻点
    handleCancelPoint () {
      this.onProcessing = false;
      if (this.markers.length > this.markersLength) {
        this.markers.pop();
      }
      // 清除最近一次检索的结果
      if (this.local) {
        if (this.local.clearResults) {
          this.local.clearResults();
        }
      }
    },
    // 获取所有的任务
    findAll () {
      this.$api.patrolPoint.findAll().then(res => {
        this.lineOptions = res.data.data;
      });
    },
    // 获取所有的打卡机
    getAllFingerprint () {
      this.$api.patrolPoint.getAllFingerprint().then(res => {
        this.equOptions = res.data.data.filter(item => item.equCode);
      });
    },
    // 地图上关键字搜索
    searchAddr () {
      this.local = new BMap.LocalSearch('邵阳市', {
        renderOptions: { map: this.map }
      });
      this.local.search(this.addrSearch);
    },
    // 所属平台
    initPlatList () {
      this.$api.patrolPoint.getPlatform({ level: 3 }).then(res => {
        // axios.get('http://47.105.153.19:8020/platform/findAll').then(res => {
        if (res.data.code === 0) {
          this.platformOptions = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.patrolmainWrap {
  .patrolHeader {
    min-height: 62px;
    padding: 5px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    background: #ffffff;
    border-bottom: solid 1px #ccc;
    font-size: 15px;
    .elAlert {
      width: 324px;
      display: inline-block;
      margin-left: 10px;
    }
    .searchWrap {
      display: flex;
      align-items: center;
      .bt-search {
        margin-left: 10px;
      }
    }
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
    }
  }
}
</style>

<style lang="less">
.anchorBL {
  display: none;
}
.elAlert {
  .el-alert__closebtn {
    top: 15px;
  }
}
</style>
