<!--
 * @Author: gyp
 * @Date: 2020-06-04 16:34:45
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-04 16:58:14
 * @Description: 警情数弹出框
 * @FilePath: \sy_kjxc_web\src\views\screen\components\policesituationDialog.vue
-->
<template>
  <div class="policeSituation">
    <el-dialog
      :title="当日警情"
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
            <el-table-column prop="dname" label="单位" align="center" />
            <el-table-column prop="scase" label="刑事案件" align="center" />
            <el-table-column prop="dcase" label="治安案件" align="center" />
            <el-table-column prop="ocase" label="其他案件" align="center" />
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'policesituation-dialog',
  props: ['situationVisible'],
  watch: {
    situationVisible (newVal) {
      this.visible = newVal;
    }
  },
  data () {
    return {
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
      this.visible = false;
      this.$emit('onSituationClose');
    }
  }
}
</script>

<style lang="less" scoped>
  .policeSituation{
    .content {
      display: flex;
      .statisWrap {
        width: 30%;
        height: 100%;
        border: 0.01rem solid #1e6abc;
        box-shadow: 0 0 0.05rem #1e6abc;
        display: flex;
        .classifyWrap {
          width:48%;
          font-size: 0.15rem;
          color:#25f3e6;
          > div {
             width:100%;
             padding: 20px;
          }
        }
        .tableWrap {
          width: 70%;
          height: 100%;
        }
      }
    }
  }
</style>
