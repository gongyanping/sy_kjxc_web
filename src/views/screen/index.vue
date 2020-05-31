<!--
 * @Author: gyp
 * @Date: 2020-05-08 12:44:26
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-26 17:33:27
 * @Description: 大屏
 * @FilePath: \sy_kjxc_web\src\views\screen\index.vue
 -->
<template>
  <el-container class="container">
    <el-header class="headerWrap">邵阳快警监控大屏</el-header>
    <el-container class="mainContainer">
      <el-aside class="leftWrap">
        <comm-box :title="'快警平台信息(' + this.platformList.length + ')'" :customStyle="'lefttopBox'" @onTitleClick="onTitleClick">
          <el-scrollbar slot="content" class="scrollBar">
            <police-list :data="platformList" @onPoliceOpen="onPoliceOpen" />
          </el-scrollbar>
        </comm-box>
        <comm-box :title="'巡检车辆'" :customStyle="'leftbotBox'" @onTitleClick="onTitleClick">
          <div slot="content" class="whAuto">
            <el-scrollbar class="scrollBar">
              <ul class="carNav">
                <li
                  :class="{'active': index === curnavIndex}"
                  v-for="(item, index) in carnavData"
                  :key="index"
                  @click="curnavIndex = item.value"
                >{{ item.name }}</li>
              </ul>
              <patrolcar-list :data="patrolcarList" />
            </el-scrollbar>
          </div>
        </comm-box>
      </el-aside>
      <el-main>
        <comm-box :customStyle="'headStatistic'" @onTitleClick="onTitleClick">
          <ul slot="content" class="headstaWrap">
            <li class="staItem" v-for="(item, index) in headStaData" :key="index">
              <div class="staitem-icon">
                <svg-icon :icon-class="item.icon" />
              </div>
              <div class="staitem-content">
                <div :class="['staitem-name', 'staitem' + index]">{{ item.title }}</div>
                <count-to class="staitem-num" :startVal="0" :endVal="item.value" :duration="2000" />
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
        <!-- <bm-marker
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
          /> -->
        </baidu-map>
        <comm-box :customStyle="'vedioBox'" v-if="1 < 0">
          <div slot="content" class="videoWrap">
            <KedaVideo ref="Keda" :videoStyle='videoStyle' :videoTitle="'测试'" />
          </div>
        </comm-box>
      </el-main>
      <el-aside class="rightWrap">
        <comm-box :title="'大队值班领导'" :customStyle="'righttopBox'" @onTitleClick="onTitleClick">
          <el-scrollbar slot="content" class="scrollBar">
            <dutyleader-list :data="dutyLeaderList" />
          </el-scrollbar>
        </comm-box>
        <comm-box :title="'实时警情'" :titleStyle="'orange'" :customStyle="'rightbotBox'">
          <el-scrollbar slot="content" class="scrollBar">
            <realtimealert-list :data="realtimeAlertList" />
          </el-scrollbar>
        </comm-box>
      </el-aside>
    </el-container>
    <police-dialog :platformId="platformId" :title="platformTitle" :policeVisible="policeVisible" @onPoliceClose="onPoliceClose" />
    <dutyleader-dialog :dutyleaderVisible="dutyleaderVisible" @onDutyleaderClose="onDutyleaderClose" />
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
    KedaVideo
  },
  mixins: [basicScreen],
  created () {
    this.getPoliceCarInit(); // 获取全部信息
    this.findPlatform(); // 获取快警平台信息
    this.findUserByIdentity(); // 获取大队值班领导
  },
  mounted () {
    this.initWebSocket();
    // setTimeout(() => {
    //   let fakeChannels = [{
    //     'puid': '889a6842cddc469a80e6317cac526f63',
    //     'channelId': '5',
    //     'domainId': 'a6dd9e0b801a4dddbb8dd928c610ea67',
    //     'domainName': 'kedacom',
    //     'channelName': '车内'
    //   }, {
    //     'puid': '889a6842cddc469a80e6317cac526f63',
    //     'channelId': '4',
    //     'domainId': 'a6dd9e0b801a4dddbb8dd928c610ea67',
    //     'domainName': 'kedacom',
    //     'channelName': '车前'
    //   }]
    //   this.$refs.Keda.play(fakeChannels)
    // }, 3000)
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
