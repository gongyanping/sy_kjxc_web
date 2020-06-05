<!--
 * @Author: gyp
 * @Date: 2020-05-08 12:44:26
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-05 17:23:46
 * @Description: 大屏
 * @FilePath: \sy_kjxc_web\src\views\screen\index.vue
 -->
<template>
  <el-container class="container">
    <el-header class="headerWrap">邵阳快警监控大屏</el-header>
    <el-container class="mainContainer">
      <el-aside class="leftWrap">
        <comm-box
          :title="'快警平台信息(' + this.platformList.length + ')'"
          :customStyle="'lefttopBox'"
          @onTitleClick="onTitleClick"
        >
          <el-scrollbar slot="content" class="scrollBar">
            <police-list :data="platformList" @onPoliceOpen="onPoliceOpen" />
          </el-scrollbar>
        </comm-box>
        <comm-box
          :title="'巡检车辆'"
          :customStyle="'leftbotBox'"
          @onTitleClick="onTitleClick"
        >
          <div slot="content" class="whAuto">
            <ul class="carNav">
              <li
                :class="{ active: index === curnavIndex }"
                v-for="(item, index) in carnavData"
                :key="index"
                @click="changeCarList(item.value)"
              >
                {{ item.name }}
              </li>
            </ul>
            <div class="seize40"></div>
            <el-scrollbar class="scrollBar">
              <patrolcar-list :data="patrolcarList" />
            </el-scrollbar>
          </div>
        </comm-box>
      </el-aside>
      <el-main>
        <comm-box :customStyle="'headStatistic'" @onTitleClick="onTitleClick">
          <ul slot="content" class="headstaWrap">
            <li
              class="staItem"
              v-for="(item, index) in headStaData"
              :key="index"
              @click="onStatopClick(item.title)"
            >
              <div class="staitem-icon">
                <svg-icon :icon-class="item.icon" />
              </div>
              <div class="staitem-content">
                <div :class="['staitem-name', 'staitem' + index]">
                  {{ item.title }}
                </div>
                <div v-if="item.title === '平均处警时长'" class="staitem-num">
                  {{ item.value }}
                </div>
                <count-to
                  v-else
                  class="staitem-num"
                  :startVal="0"
                  :endVal="item.value"
                  :duration="2000"
                />
              </div>
            </li>
          </ul>
        </comm-box>
        <baidu-map
          class="map"
          :center="cityName"
          :zoom="zoom"
          :scroll-wheel-zoom="true"
          :continuous-zoom="true"
          :mapStyle="mapStyle"
          @ready="handler"
        >
          <!-- 网格图 -->
          <bm-polygon
            v-for="(polygon, index) of showPolygons"
            :key="index"
            :path="polygon.coordList"
            :stroke-color="'#ffffff'"
            :stroke-weight="2"
            :stroke-opacity="0.5"
            :stroke-style="'dashed'"
            :fill-color="'#ffffff'"
            :fill-opacity="0.2"
          />
          <!-- 点位置 -->
          <bm-marker
            v-for="marker of showMarkers"
            :position="{ lng: marker.lng, lat: marker.lat }"
            :key="marker.id"
            @click="onMarkerClick(marker)"
            :icon="{ url: marker.icon, size: { width: 40, height: 40 } }"
            :offset="{ width: 0, height: -40 }"
          >
            <bm-label
              v-if="marker.carCode"
              :content="marker.carCode"
              :labelStyle="{
                backgroundColor: 'yellow',
                color: '#000',
                fontSize: '17px',
                fontFamily: '微软雅黑',
                fontWeight: 'bold',
                padding: '1px',
                border: '0',
                zIndex: '5'
              }"
              :offset="{ width: -30, height: -25 }"
            />
          </bm-marker>
        </baidu-map>
        <comm-box :customStyle="'vedioBox'" v-show="showView">
          <div slot="content" class="videoWrap">
            <KedaVideo
              ref="Keda"
              :videoStyle="videoStyle"
              :videoTitle="videoName"
              @close="videoClose"
            />
          </div>
        </comm-box>
      </el-main>
      <el-aside class="rightWrap">
        <comm-box
          :title="'大队值班领导'"
          :customStyle="'righttopBox'"
          @onTitleClick="onTitleClick"
        >
          <el-scrollbar slot="content" class="scrollBar">
            <dutyleader-list
              :data="dutyLeaderList"
              @onUserClick="onUserClick"
            />
          </el-scrollbar>
        </comm-box>
        <comm-box
          :title="'实时警情'"
          :titleStyle="'orange'"
          :customStyle="'rightbotBox'"
        >
          <el-scrollbar slot="content" class="scrollBar">
            <realtimealert-list :data="realtimeAlertList" />
          </el-scrollbar>
        </comm-box>
      </el-aside>
    </el-container>
    <police-dialog
      :platformId="platformId"
      :title="platformTitle"
      :policeVisible="policeVisible"
      @onUserClick="onUserClick"
      @onPoliceClose="onPoliceClose"
    />
    <dutyleader-dialog
      :dutyleaderVisible="dutyleaderVisible"
      @onDutyleaderClose="onDutyleaderClose"
    />
    <userdetail-dialog
      v-if="userdetailVisible"
      :userId="currentUserId"
      @onUserdetailClose="onUserdetailClose"
    />
    <policesituation-dialog
      v-if="situationVisible"
      @onSituationClose="situationVisible = false"
    />
    <dealsituation-dialog
      v-if="dealsituaVisible"
      @onDealsituaClose="dealsituaVisible = false"
    />
    <nopunch-dialog
      v-if="nopunchVisible"
      @onNopunchClose="nopunchVisible = false"
    />
    <datacheck-dialog
      v-if="datacheckVisible"
      @onDatacheckClose="datacheckVisible = false"
    />
    <recordlist-dialog
      v-if="recordlistVisible"
      :userId="currentUserId"
      @onrecordlistClose="recordlistVisible = false"
    />
    <patroltask-dialog
      v-if="patroltaskVisible"
      :userId="currentUserId"
      @onPatroltaskClose="patroltaskVisible = false"
    />
    <maptrack-dialog
      v-if="maptrackVisible"
      :userId="currentUserId"
      @onMaptrackClose="maptrackVisible = false"
    />
  </el-container>
</template>

<script>
import CountTo from 'vue-count-to'; // 数字滚动
import commBox from '@/components/commBox'; // 公用容器
import policeList from './components/policeList'; // 快警平台信息
import patrolcarList from './components/patrolcarList'; // 巡检车辆
import dutyleaderList from './components/dutyleaderList'; // 大队值班领导--列表
import realtimealertList from './components/realtimealertList'; // 实时警情
import policeDialog from './components/policeDialog'; // 快警平台信息--弹出框
import dutyleaderDialog from './components/dutyleaderDialog'; // 大队值班领导--弹出框
import userdetailDialog from './components/userdetailDialog'; // 用户详情--弹出框
import policesituationDialog from './components/policesituationDialog'; // 当日警情
import dealsituationDialog from './components/dealsituationDialog'; // 当日警情
import nopunchDialog from './components/nopunchDialog'; // 今日未打卡列表
import datacheckDialog from './components/datacheckDialog'; // 今日未打卡列表
import recordlistDialog from './components/recordlistDialog'; // 打卡记录
import patroltaskDialog from './components/patroltaskDialog'; // 巡逻任务
import maptrackDialog from './components/maptrackDialog'; // 地图轨迹
import KedaVideo from '@/components/video/KedaVideo'; // 监控视频
import basicScreen from './mixins.js';
export default {
  name: 'screen',
  components: {
    CountTo,
    commBox,
    policeList,
    patrolcarList,
    dutyleaderList,
    realtimealertList,
    policeDialog,
    dutyleaderDialog,
    userdetailDialog,
    policesituationDialog,
    dealsituationDialog,
    nopunchDialog,
    datacheckDialog,
    recordlistDialog,
    patroltaskDialog,
    maptrackDialog,
    KedaVideo
  },
  mixins: [basicScreen],
  created () {
    this.getPoliceCarInit(); // 获取全部信息
    this.findPlatform(); // 获取快警平台信息
    this.findUserByIdentity(); // 获取大队值班领导
  },
  mounted () {
    this.setTimer();
    /**
     * 播放监控视频
     * @param {String} id 设备id
     * @param {String} videoTitle 车辆名称
     */
    let self = this;
    window.tapclick = (id, videoTitle) => {
      self.showView = true;
      self.videoName = videoTitle;
      self.videoProps = this.viewUrlMap[id];
      self.$refs.Keda.play(this.videoProps);
      self.lastInfoBox.close();
      setTimeout(() => {
        self.centerPointVideo = id;
      }, 300);
    };
  },
  beforeDestroy () {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
<style lang="less">
.anchorBL {
  display: none;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.scrollBar {
  height: 100%;
}
</style>

<style lang="less">
// 点信息弹出框窗口
.infoBox {
  > img {
    z-index: 1;
  }
}
.myInfobox {
  border: 1px solid #2c58a6;
  box-shadow: 0 0 1px #2c58a6;
  box-sizing: border-box;
  position: relative;
  width: 350px;
  height: 300px;
  background: #2c3e50;
  .border-common {
    width: 10px;
    height: 10px;
    position: absolute;
  }
  .top-left {
    .border-common();
    border-left: 2px solid #5ab1ef;
    border-top: 2px solid #5ab1ef;
    left: -1px;
    top: -1px;
  }

  .top-right {
    .border-common();
    border-right: 2px solid #5ab1ef;
    border-top: 2px solid #5ab1ef;
    right: -1px;
    top: -1px;
  }

  .bottom-left {
    .border-common();
    border-left: 2px solid #5ab1ef;
    border-bottom: 2px solid #5ab1ef;
    left: -1px;
    bottom: -1px;
  }

  .bottom-right {
    .border-common();
    border-right: 2px solid #5ab1ef;
    border-bottom: 2px solid #5ab1ef;
    right: -1px;
    bottom: -1px;
  }
  .top {
    display: flex;
    font-size: 16px;
    margin: 20px 5px 5px;
    padding: 0 5px;
    .pName {
      width: 35%;
      color: #5ab1ef;
    }
    .sName {
      text-align: right;
      width: 65%;
      color: #ffffff;
    }
  }
  .center {
    display: flex;
    font-size: 16px;
    margin: 5px;
    padding: 0 5px;
    .carName {
      width: 70%;
      color: #5ab1ef;
    }
    .leaderName {
      text-align: right;
      width: 30%;
      color: #ffffff;
    }
  }
}
</style>
