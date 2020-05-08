<!--
 * @Author: gyp
 * @Date: 2020-05-08 12:44:26
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-08 19:05:40
 * @Description: 大屏
 * @FilePath: \sy_kjxc_web\src\views\screen\index.vue
 -->
<template>
  <el-container class="container">
    <el-header class="headerWrap">邵阳快警监控大屏</el-header>
    <el-container class="mainContainer">
      <el-aside class="leftWrap">
        <comm-box :title="'快警平台信息'" :customStyle="'lefttopBox'">
            <el-scrollbar slot="content" class="scrollBar">
              <police-list :data="platformList" />
            </el-scrollbar>
        </comm-box>
        <comm-box :title="'巡检车辆'" :customStyle="'leftbotBox'">
          <div slot="content" class="whAuto">
            <ul class="carNav">
              <li :class="{'active': index === curnavIndex}" v-for="(item, index) in carnavData" :key="index" @click="curnavIndex = item.value">
                {{ item.name }}
              </li>
            </ul>
          </div>
        </comm-box>
      </el-aside>
      <el-main>
        <comm-box :customStyle="'headStatistic'">
          <ul slot="content" class="headstaWrap">
            <li class="staItem" v-for="(item, index) in headStaData" :key="index">
              <div class="staitem-icon">
                <svg-icon :icon-class="item.icon" />
              </div>
              <div class="staitem-content">
                <div class="staitem-name">{{ item.title }}</div>
                <count-to class="staitem-num" :startVal="0" :endVal="item.value" :duration="2000" />
              </div>
            </li>
          </ul>
        </comm-box>
        <baidu-map
          class="map"
          :center="center"
          :zoom="zoom"
          :scroll-wheel-zoom="true"
          :mapStyle="mapStyle"
        ></baidu-map>
      </el-main>
      <el-aside class="rightWrap">
        <comm-box :title="'大队值班领导'" :customStyle="'righttopBox'">
          <div slot="content"></div>
        </comm-box>
        <comm-box :title="'实时警情'" :titleStyle="'orange'" :customStyle="'rightbotBox'">
          <div slot="content"></div>
        </comm-box>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import CountTo from 'vue-count-to'; // 数字滚动
import commBox from '@/components/commBox'; // 公用容器
import policeList from './components/policeList'; // 快警平台信息
import basicScreen from './mixins.js';
export default {
  name: 'screen',
  components: {
    CountTo,
    commBox,
    policeList
  },
  mixins: [basicScreen]
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
.scrollBar{
  height: 100%;
}
</style>
