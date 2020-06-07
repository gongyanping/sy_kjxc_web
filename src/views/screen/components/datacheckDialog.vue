<!--
 * @Author: gyp
 * @Date: 2020-05-11 09:13:28
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-05 16:10:10
 * @Description: 数据考核列表弹出框
 * @FilePath: \sy_kjxc_web\src\views\screen\components\datacheckDialog.vue
 -->
<template>
<div class="dataCheck">
  <el-dialog title="数据考核" :visible.sync="visible" width="60%" @closed="onClosed" custom-class="blue">
    <el-table :data="tableData" border class="blueTable" style="100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="platformparent" label="平台" min-width="100" />
      <el-table-column prop="date" label="巡逻时间" min-width="110" />
      <el-table-column prop="point" label="巡逻点" align="center" min-width="60" />
      <el-table-column prop="noclock" label="未打卡数" align="center" min-width="60" />
      <el-table-column prop="clock" label="打卡数" align="center" min-width="60" />
      <el-table-column prop="policenum" label="已出警数" align="center" min-width="60" />
      <!-- <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'datacheck-dialog',
  data () {
    return {
      visible: true, // 弹出框可见性
      tableData: [
        {
          platformparent: '新邵县 2号平台',
          date: '2020-06-01 07：10：15',
          point: 5,
          noclock: 2,
          clock: 5,
          policenum: 7
        },
        {
          platformparent: '南公园5 号平台',
          date: '2020-04-16 20：20：19',
          point: 6,
          noclock: 1,
          clock: 4,
          policenum: 5
        },
        {
          platformparent: '新邵县 2号平台',
          date: '2020-06-01 07：10：15',
          point: 5,
          noclock: 2,
          clock: 5,
          policenum: 7
        },
        {
          platformparent: '南公园5 号平台',
          date: '2020-04-16 20：20：19',
          point: 6,
          noclock: 1,
          clock: 4,
          policenum: 5
        },
        {
          platformparent: '新邵县 2号平台',
          date: '2020-06-01 07：10：15',
          point: 5,
          noclock: 2,
          clock: 5,
          policenum: 7
        }
      ]
    };
  },
  methods: {
    // 关闭弹出框
    onClosed () {
      this.$emit('onDatacheckClose')
    },
    // 每行点击操作
    handleClick () {

    }
  }
};
</script>

<style lang="less" scoped>
.dataCheck {
  /deep/ .blue.el-dialog {
    height: 600px;
  }
}
</style>
