<!--
 * @Author: gyp
 * @Date: 2020-05-11 09:13:28
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-10 15:19:38
 * @Description: 数据考核列表弹出框
 * @FilePath: \sy_kjxc_web\src\views\screen\components\datacheckDialog.vue
 -->
<template>
<div class="dataCheck">
  <el-dialog title="数据考核" :visible.sync="visible" @closed="onClosed" custom-class="blue">
    <el-table :data="tableDatas && tableDatas.rows" border class="blueTable" style="100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="platformName" label="平台" min-width="100" />
      <el-table-column prop="date" label="巡逻时间" min-width="100" />
      <el-table-column prop="lineName" label="巡逻线路" align="center" min-width="110" />
      <el-table-column prop="appealClockCount" label="未打卡数" align="center" min-width="60" />
      <el-table-column prop="hasClockCount" label="打卡数" align="center" min-width="60" />
      <el-table-column prop="alarmCount" label="已出警数" align="center" min-width="60" />
      <!-- <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <Pagination :tabledatas="tableDatas" :isScreen="true" @comgetData="getCheckList" />
  </el-dialog>
</div>
</template>

<script>
import Pagination from '@/components/Pagination';
export default {
  name: 'datacheck-dialog',
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
    this.getCheckList();
  },
  methods: {
    getCheckList (pageNumber = 1) {
      let today = new Date();
      let month = today.getMonth() + 1;
      let day = today.getDate();
      let nowDate = today.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
      let params = {
        startDate: nowDate,
        endDate: nowDate,
        pageSize: 10,
        pageNumber
      }
      this.$api.screen.checkList(params).then(res => {
        this.tableDatas = {
          ...res.data,
          pageNum: pageNumber,
          pageSize: 10
        }
      })
    },
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
