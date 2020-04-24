<!--
 * @Author: gyp
 * @Date: 2020-04-15 10:48:52
 * @LastEditors: gyp
 * @LastEditTime: 2020-04-24 16:18:01
 * @Description: 巡逻点管理
 * @FilePath: \sy_kjxc_web\src\views\patrolManage\patrolPoint.vue
 -->

<template>
  <div class="patrolmainWrap">
    <div class="patrolHeader">
      <div>
        <el-button
          type="primary"
          size="small"
          @click="handleNew"
          :disabled="onProcessing && !this.patrolForm.lon"
        >
          <span v-if="!onProcessing">新增巡逻点</span>
          <span v-else>确定巡逻点</span>
        </el-button>
        <el-button v-if="onProcessing" @click="handleCancelPoint" size="small">取消新增巡逻点</el-button>
        <span class="elAlert">
          <el-alert v-if="onProcessing" title="请先在地图上选择点位信息，再点击确定巡逻点按钮去进行巡逻点的新增" type="success" />
        </span>
      </div>
      <div class="searchWrap">
        <el-input
          placeholder="请输入关键字"
          size="small"
          v-model="inputName"
          clearable
          style="width: 2rem;"
        ></el-input>
        <el-select
          v-model="typeName"
          placeholder="请选择点位类型"
          size="small"
          clearable
          style="width: 2rem; margin-left: 0.1rem"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          v-model="lineId"
          placeholder="请选择任务名称"
          size="small"
          clearable
          style="width: 2rem; margin-left: 0.1rem"
        >
          <el-option key="uniqued0000" label="全部" value />
          <el-option v-for="item in lineOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button type="primary" size="small" class="bt-search" @click="getList(1)">搜索</el-button>
        <el-button @click="reset" size="small" type="primary" plain>重置</el-button>
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
        <bml-marker-clusterer :averageCenter="true">
          <bm-marker
            v-for="marker of markers"
            :position="{lng: marker.lng, lat: marker.lat}"
            :key="marker.id"
            @click="onMarkerClick(marker)"
            :icon="marker.isLocate ? {url: require('../../assets/icon/loca.png'), size: {width: 32, height:32}} : {url: require('../../assets/icon/loc.png'), size: {width: 32, height:32}} "
          ></bm-marker>
        </bml-marker-clusterer>
        <bm-info-window
          :position="markerCoord"
          :title="infoWindow.title"
          :show="infoWindow.show"
          @close="infoWindowClose"
          @open="infoWindowOpen"
        >
          <p v-text="infoWindow.contents"></p>
        </bm-info-window>
      </baidu-map>
      <div class="listWrap">
        <patrolpoint-list
          :datatables="tableDatas && tableDatas.rows"
          @handleLocate="handleLocate"
          @handleEdit="handleEdit"
          @getList="getList"
          @onSavePoint="onSavePoint"
        />
        <Pagination :tabledatas="tableDatas" @comgetData="getList" />
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
import { BmlMarkerClusterer, BmMarker } from 'vue-baidu-map';
export default {
  name: 'patrol-point',
  components: {
    Pagination,
    noData,
    patrolpointList,
    patrolpointDialog,
    BmlMarkerClusterer,
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
        total: 100,
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
        pageSize: 6
      },
      selectedAddr: '',
      onProcessing: false,
      infoWindow: {
        show: false,
        contents: ''
      },
      markerCoord: null,
      BMap: null,
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
      equOptions: [] // 打卡机列表
    };
  },
  created () {
    let taskId = this.GetQueryString('lineId');
    if (taskId) {
      this.lineId = taskId;
      this.taskId = taskId;
      this.isFromTask = true;
    }
    this.findAll(); // 任务
    this.getAllFingerprint(); // 打卡机
    this.getList();
  },
  methods: {
    handler ({ BMap }) {
      this.BMap = BMap;
    },
    mapInit () {
      this.zoom = 12;
      this.center = { lng: 111.28, lat: 27.14 };
    },
    getList (val1 = 1, val2) {
      if (val2) {
        this.form.pageNumber = 1;
        this.form.pageSize = val1;
      } else {
        this.form.pageNumber = val1;
      }
      this.mapInit();
      this.$api.patrolPoint
        .list(
          this.$qs.stringify({
            ...this.form,
            name: this.inputName,
            type: this.typeName,
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
            this.markers = res.data.data.rows.map(item => {
              let obj = {
                id: item.id,
                name: item.name,
                lng: item.lon,
                lat: item.lat,
                isLocate: false
              };
              return obj;
            });
            this.markersLength = this.markers.length;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleNew () {
      if (!this.onProcessing) {
        this.onProcessing = true;
      } else {
        this.curId = '';
        this.dialogVisible = true;
        if (this.taskId) {
          this.isFromTask = true;
          this.patrolForm.lineId = this.taskId;
        }
      }
    },
    handleEdit (row) {
      this.dialogVisible = true;
      this.curId = row ? row.id : '';
    },
    handleLocate (id, lng, lat) {
      if (lng && lat) {
        this.center = { lng, lat };
        this.zoom = 18;
        this.markers = this.markers.map(item => {
          if (item.id === id) {
            item.isLocate = true;
          } else {
            item.isLocate = false;
          }
          return item;
        });
      } else {
        this.$message.info('该坐标位置不存在');
      }
    },
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
          lat
        });
        let BMap = this.BMap;
        let geocoder = new BMap.Geocoder(); // 创建地址解析器的实例
        geocoder.getLocation(e.point, res => {
          this.patrolForm.address = res.address;
        });
      }
    },
    onMarkerClick (e) {
      const { name, lng, lat } = e;
      this.markerCoord = { lng, lat };
      this.infoWindow = {
        show: true,
        title: name,
        contents: '坐标:' + lng + ',' + lat
      };
    },
    infoWindowClose () {
      this.infoWindow.show = false;
    },
    infoWindowOpen () {
      this.infoWindow.show = true;
    },
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
    reset () {
      this.inputName = '';
      this.typeName = '';
    },
    handleCancelPoint () {
      this.onProcessing = false;
      if (this.markers.length > this.markersLength) {
        this.markers.pop();
      }
    },
    findAll () {
      this.$api.patrolPoint.findAll().then(res => {
        this.lineOptions = res.data.data;
      });
    },
    getAllFingerprint () {
      this.$api.patrolPoint.getAllFingerprint().then(res => {
        this.equOptions = res.data.data;
      });
    },
    GetQueryString (name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      let r = window.location.search.substr(1).match(reg);
      if (r !== null) return unescape(r[2]);
      return null;
    }
  }
};
</script>

<style lang="less" scoped>
.patrolmainWrap {
  .patrolHeader {
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    background: #ffffff;
    border-bottom: solid 1px #ccc;
    .elAlert {
      width: 500px;
      display: inline-block;
      margin-left: 15px;
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
      overflow-y: auto;
    }
  }
}
</style>

<style lang="less">
.anchorBL {
  display: none;
}
</style>
