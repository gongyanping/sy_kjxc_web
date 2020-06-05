<!--
 * @Author: gyp
 * @Date: 2020-06-04 16:34:45
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-05 11:18:45
 * @Description: 警情数弹出框
 * @FilePath: \sy_kjxc_web\src\views\screen\components\policesituationDialog.vue
-->
<template>
  <div class="policeSituation">
    <el-dialog
      :title="'当日警情'"
      :visible.sync="visible"
      @closed="onClosed"
      width="60%"
      custom-class="blue"
    >
      <div class="content">
        <div class="statisWrap">
          <ul class="classifyWrap">
            <li>
              警情总数:
            </li>
            <li>
              刑事案件:
            </li>
            <li>
              治安案件:
            </li>
            <li>
              其他案件:
            </li>
          </ul>
          <ul class="classifyWrap">
            <li>
              48
            </li>
            <li>
              0
            </li>
            <li>
              23
            </li>
            <li>
              25
            </li>
          </ul>
        </div>
        <div class="tableWrap">
          <el-table :data="tableData" border class="blueTable" style="100%">
            <el-table-column prop="dname" label="单位" align="center" min-width="100" />
            <el-table-column prop="scase" label="刑事案件" align="center" min-width="50"/>
            <el-table-column prop="dcase" label="治安案件" align="center" min-width="50"/>
            <el-table-column prop="ocase" label="其他案件" align="center" min-width="50"/>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'policesituation-dialog',
  data () {
    return {
      visible: true,
      tableData: [{
        dname: '北塔分局龙山路1号平台',
        scase: 0,
        dcase: 1,
        ocase: 1
      }, {
        dname: '北塔分局汽车北站2号平台',
        scase: 0,
        dcase: 3,
        ocase: 2
      }, {
        dname: '大祥分局雪峰南路3号平台',
        scase: 0,
        dcase: 5,
        ocase: 1
      }, {
        dname: '大祥分局火车南站4号平台',
        scase: 0,
        dcase: 2,
        ocase: 3
      }, {
        dname: '大祥分局城南公园5号平台',
        scase: 0,
        dcase: 1,
        ocase: 3
      }, {
        dname: '大祥分局沿江桥6号平台',
        scase: 0,
        dcase: 1,
        ocase: 2
      }, {
        dname: '双清分局人民广场7号平台',
        scase: 0,
        dcase: 2,
        ocase: 4
      }, {
        dname: '双清分局陶家冲8号平台',
        scase: 0,
        dcase: 3,
        ocase: 3
      }, {
        dname: '双清分局塔北路9号平台',
        scase: 0,
        dcase: 4,
        ocase: 6
      }]
    }
  },
  methods: {
    onClosed () {
      this.$emit('onSituationClose');
    }
  }
}
</script>

<style lang="less" scoped>
  .policeSituation{
    .content {
      display: flex;
      height: 100%;
      .statisWrap {
        width: 250px;
        height: 100%;
        border: 1px solid #1e6abc;
        box-shadow: 0 0 5px #1e6abc;
        display: flex;
        .classifyWrap {
          width:48%;
          font-size: 18px;
          color:#25f3e6;
          > li {
             width:100%;
             padding: 20px;
          }
        }
      }
      .tableWrap {
        width: calc(100% - 270px);
        margin-left: 20px;
        height: 100%;
      }
    }
    /deep/ .blue.el-dialog {
      height: 600px;
    }
  }
</style>
