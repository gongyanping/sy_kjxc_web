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
        <comm-box :customStyle="'lefttopBox'">
          <div slot="content">
            快警平台信息
            <!--({{platformList.length+4}}) <el-input prefix-icon="el-icon-search" icon="search" name="title" v-model="search" clearable
                      size="mini" style="width:60%;background:transparent;color: #ffffff;margin-left: 0.1rem;"
            placeholder="分局名/平台名"></el-input>-->
          </div>
          <el-scrollbar style="height: 92%;">
            <!-- <div class="platformInfo" v-for="item in platformList"
                 style='border-top:none;border-left:none;border-right:none' @click="platformNameClick(item)">
              <div class="flexParentClass" style="justify-content:space-between;padding: 0.05rem 0.1rem 0.1rem;">
                <div style="font-size: 0.1rem;">{{item.parentName}}</div>
                <div style="font-size: 0.1rem;">{{item.deptName}}</div>
              </div>
              <div class="flexParentClass" style="justify-content:space-between;padding: 0rem 0.1rem 0.05rem;">
                <div style="font-size: 0.1rem;">人数: {{item.deptCount}}</div>
                <div style="font-size: 0.1rem;">平台长:{{item.leader}}</div>
              </div>
            </div>-->
          </el-scrollbar>
        </comm-box>
        <comm-box :customStyle="'leftbotBox'">
          <div slot="content"></div>
        </comm-box>
      </el-aside>
      <el-main>
        <comm-box :customStyle="'headStatistic'">
          <ul slot="content" class="headstaWrap">
            <li
              class="staItem"
              v-for="(item, index) in headStaData"
              :key="index"
            >
              <div class="staitem-icon">
                <svg-icon :icon-class="item.icon" />
              </div>
              <div class="staitem-content">
                <div class="staitem-name">{{ item.title }}</div>
                <count-to
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
          :center="center"
          :zoom="zoom"
          :scroll-wheel-zoom="true"
        >
        </baidu-map>
      </el-main>
      <el-aside class="leftWrap">
        <comm-box :customStyle="'lefttopBox'">
          <div slot="content"></div>
        </comm-box>
        <comm-box :customStyle="'leftbotBox'">
          <div slot="content"></div>
        </comm-box>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import CountTo from 'vue-count-to';
import commBox from '@/components/commBox';
import basicScreen from './mixins.js';
export default {
  name: 'screen',
  components: {
    CountTo,
    commBox
  },
  mixins: [basicScreen]
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
