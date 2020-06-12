<!--
 * @Author: gyp
 * @Date: 2020-06-04 16:34:45
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-12 16:12:57
 * @Description: 警情数弹出框
 * @FilePath: \sy_kjxc_web\src\views\screen\components\policesituationDialog.vue
-->
<template>
  <div class="policeSituation">
    <el-dialog
      :title="'当日警情'"
      :visible.sync="visible"
      @closed="onClosed"
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
              {{ policeDatas.alertSum }}
            </li>
            <li>
              {{ policeDatas.alertType2 }}
            </li>
            <li>
              {{ policeDatas.alertType1 }}
            </li>
            <li>
              {{ policeDatas.alertType3 }}
            </li>
          </ul>
        </div>
        <div class="tableWrap">
          <el-table :data="policeDatas && policeDatas.alarmVoList" border class="blueTable" style="100%">
            <el-table-column prop="platformName" label="单位" align="center" min-width="100" />
            <el-table-column prop="alertType2Sum" label="刑事案件" align="center" min-width="50"/>
            <el-table-column prop="alertType1Sum" label="治安案件" align="center" min-width="50"/>
            <el-table-column prop="alertType3Sum" label="其他案件" align="center" min-width="50"/>
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
      policeDatas: {
        alertSum: 0,
        alertType1: 0,
        alertType2: 0,
        alertType3: 0,
        alarmVoList: []
      }
    }
  },
  created () {
    this.getTodayalert();
  },
  methods: {
    getTodayalert () {
      this.$api.screen.todayAlert().then(res => {
        if (res.data.data) {
          this.policeDatas = res.data.data;
        }
      })
    },
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
