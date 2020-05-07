<template>
  <el-container class="container">
    <el-header class="headerWrap">邵阳快警监控大屏</el-header>
    <el-container class="mainContainer">
      <el-aside class="leftWrap">
        <div class="mybox lefttopBox">
          <div class="top-left"></div>
          <div class="top-right"></div>
          <div class="bottom-left"></div>
          <div class="bottom-right"></div>
          <div>
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
        </div>
        <div class="mybox leftbotBox">
          <div class="top-left"></div>
          <div class="top-right"></div>
          <div class="bottom-left"></div>
          <div class="bottom-right"></div>
        </div>
      </el-aside>
      <el-main>
          <div class="mybox headStatistic" style="border:none;box-shadow: none">
            <div class="top-left"></div>
            <div class="top-right"></div>
            <div class="bottom-left"></div>
            <div class="bottom-right"></div>
            <div class="flexParentClass">
              <div class="flexChildClass-4 color939394 borderRadius flexParentClass menu">
                <div class="flexChildClass-3"
                     style="font-size: 0.7rem;color: #25f3e6;padding-top: 0.05rem;margin-right:0.1rem">
                  <svg-icon icon-class="component" class-name="card-panel-icon"/>
                </div>
                <div class="flexChildClass-2">
                  <div class="card-panel-text" style="font-size: 0.1rem;color: #25f3e6;padding-top: 0.15rem">当日警情数</div>
                  <count-to class="card-panel-num"
                            style="font-size: 0.3rem;color: #ffffff;position: relative;bottom: 0.4rem;"
                            :startVal="startVal" :endVal="23" :duration="2000"></count-to>
                </div>
              </div>
              <div class="flexChildClass-4 color939394 borderRadius flexParentClass menu">
                <div class="flexChildClass-3"
                     style="font-size: 0.7rem;color: #25f3e6;padding-top: 0.05rem;margin-right:0.1rem">
                  <svg-icon icon-class="dashboard" class-name="card-panel-icon"/>
                </div>
                <div class="flexChildClass-2">
                  <div class="card-panel-text" style="font-size: 0.1rem;color: #25f3e6;padding-top: 0.15rem">平均处警时长
                  </div>
                  <div class="card-panel-text" style="font-size: 0.2rem;color: #ffffff;position: relative;top: 0.3rem;"
                       >100
                  </div>
                </div>
              </div>
              <div class="flexChildClass-4 color939394 borderRadius flexParentClass menu">
                <div class="flexChildClass-3"
                     style="font-size: 0.7rem;color: red;padding-top: 0.05rem;margin-right:0.1rem">
                  <svg-icon icon-class="chart" class-name="card-panel-icon"/>
                </div>
                <div class="flexChildClass-2">
                  <div class="card-panel-text" style="font-size: 0.1rem;color: red;padding-top: 0.15rem">巡逻处警通报</div>
                  <count-to class="card-panel-num"
                            style="font-size: 0.2rem;color: red;position: relative;bottom: 0.4rem;"
                            :startVal="startVal" :endVal="499" :duration="2000"></count-to>
                </div>
              </div>
              <div class="flexChildClass-4 color939394 borderRadius flexParentClass menu">
                <div class="flexChildClass-3"
                     style="font-size: 0.7rem;color: #f84a4a;padding-top: 0.05rem;margin-right:0.1rem">
                  <svg-icon icon-class="example" class-name="card-panel-icon"/>
                </div>
                <div class="flexChildClass-2">
                  <div class="card-panel-text" style="font-size: 0.1rem;color: red;padding-top: 0.15rem">考核评比</div>
                  <div class="card-panel-text" style="font-size: 0.2rem;color: #f84a4a;position: relative;top: 0.3rem;"
                       >909
                  </div>
                </div>
              </div>
            </div>
          </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  name: 'screen',
  components: {
    CountTo
  },
  data () {
    return {
      startVal: 0
    }
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
