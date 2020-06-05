<!--
 * @Author: gyp
 * @Date: 2020-06-05 17:25:09
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-05 17:34:37
 * @Description: 巡逻任务
 * @FilePath: \sy_kjxc_web\src\views\screen\components\patroltaskDialog.vue
-->

<template>
  <div class="recordList">
    <el-dialog
      title="巡逻任务"
      :visible.sync="visible"
      width="60%"
      @closed="onClosed"
      custom-class="blue"
    >
      <el-table :data="tableDatas && tableDatas.rows" border class="blueTable" style="100%">
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="name" label="巡逻点" />
        <el-table-column prop="equCode" label="考勤机编号" />
        <el-table-column prop="equName" label="考勤机名称" />
        <el-table-column prop="address" label="巡逻位置" />
        <el-table-column prop="date" label="打卡时间" />
      </el-table>
      <Pagination :tabledatas="tableDatas" :isScreen="true" @comgetData="getRecordList()" />
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
export default {
  name: 'patroltask-dialog',
  props: ['userId'],
  components: {
    Pagination
  },
  data () {
    return {
      visible: true, // 弹出框可见性
      tableDatas: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        rows: []
      } // 表格数据
    };
  },
  created () {
  },
  methods: {
    // 关闭弹出框
    onClosed () {
      this.$emit('onMaptrackClose');
    }
  }
};
</script>

<style lang="less" scoped>
.recordList {
  /deep/ .blue.el-dialog {
    height: 600px;
  }
}
</style>
