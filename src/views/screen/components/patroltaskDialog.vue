<!--
 * @Author: gyp
 * @Date: 2020-06-05 17:25:09
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-09 18:08:02
 * @Description: 巡逻任务
 * @FilePath: \sy_kjxc_web\src\views\screen\components\patroltaskDialog.vue
-->

<template>
  <div class="recordList">
    <el-dialog
      :title="userName + '的巡逻任务'"
      :visible.sync="visible"
      @closed="onClosed"
      custom-class="blue"
    >
      <el-table :data="tableDatas && tableDatas.rows" border class="blueTable" style="100%">
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="name" label="巡逻点" min-width="80" />
        <el-table-column prop="equCode" label="考勤机编号" min-width="70" />
        <el-table-column prop="equName" label="考勤机名称" min-width="100" />
        <el-table-column prop="address" label="巡逻位置" min-width="110" />
        <el-table-column prop="date" label="打卡时间" min-width="60" />
      </el-table>
      <Pagination :tabledatas="tableDatas" :isScreen="true" @comgetData="getPatroltask" />
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
export default {
  name: 'patroltask-dialog',
  props: ['userId', 'userName'],
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
    this.getPatroltask();
  },
  methods: {
    getPatroltask (pageNumber = 1) {
      let params = {
        userId: this.userId,
        pageNumber: pageNumber,
        pageSize: 10,
        name: ''
      };
      this.$api.screen.userSpotList(params).then(res => {
        this.tableDatas = {
          ...res.data,
          pageNum: pageNumber,
          pageSize: 10
        };
      })
    },
    // 关闭弹出框
    onClosed () {
      this.$emit('onPatroltaskClose');
    }
  }
};
</script>
