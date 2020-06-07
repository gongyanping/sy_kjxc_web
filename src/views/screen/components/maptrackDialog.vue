<!--
 * @Author: gyp
 * @Date: 2020-06-05 17:24:12
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-05 17:24:47
 * @Description: 地图轨迹
 * @FilePath: \sy_kjxc_web\src\views\screen\components\maptrackDialog.vue
-->

<template>
  <div class="mapTrack">
    <el-dialog
      :title="userName + '的地图轨迹'"
      :visible.sync="visible"
      width="60%"
      @closed="onClosed"
      custom-class="blue"
    >
      <el-form :inline="true" ref="searchForm" :model="searchForm" label-width="100px">
        <el-form-item label="时间">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="handleTrack" type="success" plain>
            <span v-if="!isTracking">查看轨迹</span>
            <span v-else>关闭轨迹</span>
          </el-button>
        </el-form-item>
      </el-form>
      <baidu-map
        class="map"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        :mapStyle="mapStyle"
        @ready="handler"
      >
        <!-- 轨迹线 -->
        <bm-polyline :path="polylinePaths" />
        <!-- 轨迹运动 -->
        <bm-marker
          v-if="trackMarker"
          :position="trackMarker"
          :icon="{
            url: require('../../../assets/icon/p11.png'),
            size: { width: 32, height: 44 }
          }"
          :offset="{ width: 0, height: -22 }"
        />
      </baidu-map>
    </el-dialog>
  </div>
</template>

<script>
import customMapConfig from '@/assets/json/custom_map_config.json';
export default {
  name: 'maptrack-dialog',
  props: ['userId', 'userName'],
  data () {
    return {
      BMap: null, // 百度地图类
      map: null, // 百度地图实例
      cityName: '邵阳', // 地图城市
      center: { lng: 111.28, lat: 27.14 }, // 地图中心点
      trackMarker: null, // 轨迹点
      polylinePaths: [], // 轨迹线
      searchForm: {
        dateRange: ''
      },
      zoom: 12,
      visible: true,
      isTracking: false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      dateRange: '',
      mapStyle: {
        // 地图自定义样式
        styleJson: customMapConfig
      }
    };
  },
  created () {
    const invoiceEnd = new Date();
    const invoiceStart = new Date();
    invoiceStart.setTime(invoiceStart.getTime() - 3600 * 1000 * 24 * 30);
    this.searchForm.dateRange = [this.formatDate(invoiceStart, 'yyyy-MM-dd hh:mm:ss'), this.formatDate(invoiceEnd, 'yyyy-MM-dd hh:mm:ss')];
    this.gpsList();
  },
  beforeDestroy () {
    clearTimeout(this.timeOut);
    this.timeOut = null;
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
    run () {
      let paths = this.polylinePaths.length; // 获得有几个点
      if (paths > 0) {
        let resetMkPoint = i => {
          this.trackMarker = this.polylinePaths[i];
          if (i < paths) {
          // console.log(i);
            this.timeOut = setTimeout(function () {
              i++;
              resetMkPoint(i);
            }, 500);
          }
        };
        this.timeOut = setTimeout(function () {
          resetMkPoint(0);
        }, 500);
      }
    },
    handleTrack () {
      if (this.isTracking) {
        this.closeTrack();
      } else {
        this.gpsList();
      }
    },
    gpsList () {
      // 真实数据
      const { dateRange } = this.searchForm;
      console.log(dateRange)
      if (dateRange.length === 2) {
        let pp = {
          userId: this.userId,
          startTime: dateRange[0],
          endTime: dateRange[1]
        };
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
            this.isTracking = true;
            this.run();
          } else {
            this.$message.info('暂无轨迹数据');
          }
        });
      } else {
        this.$message.error('必须输入起始时间');
      }
    },
    // 关闭轨迹
    closeTrack () {
      this.isTracking = false;
      this.polylinePaths = [];
      this.trackMarker = null;
      clearTimeout(this.timeOut);
      this.timeOut = null;
    },
    // 关闭弹出框
    onClosed () {
      this.$emit('onMaptrackClose');
    },
    formatDate (date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      };
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + '';
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
        }
      }
      return fmt;
    },
    padLeftZero (str) {
      return ('00' + str).substr(str.length);
    }
  }
};
</script>

<style lang="less" scoped>
.mapTrack {
  .el-form-item {
    margin-bottom: 20px;
  }
  .map {
    width: 100%;
    height: 505px;
  }
  /deep/ .blue.el-dialog {
    height: 680px;
  }
}
</style>
