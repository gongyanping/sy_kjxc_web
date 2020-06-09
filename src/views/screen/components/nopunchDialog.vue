<!--
 * @Author: gyp
 * @Date: 2020-05-11 09:13:28
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-09 17:55:39
 * @Description: 未打卡记录列表弹出框
 * @FilePath: \sy_kjxc_web\src\views\screen\components\nopunchDialog.vue
 -->
<template>
  <div class="noPunch">
    <el-dialog
      title="今日未打卡列表"
      :visible.sync="visible"
      @closed="onClosed"
      custom-class="blue"
    >
      <el-table :data="tableDatas && tableDatas.rows" border class="blueTable" style="100%">
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="userName" label="姓名" min-width="50" />
        <el-table-column prop="phone" label="电话" min-width="50" />
        <el-table-column prop="plantformName" label="局" min-width="50" />
        <el-table-column prop="lineName" label="线路" min-width="80" />
        <el-table-column prop="spotName" label="点" min-width="80" />
        <el-table-column prop="clockTime" label="应打卡时间" min-width="110" />
        <!-- <el-table-column label="打卡申诉" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >资料</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="详情资料" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>
      <Pagination :tabledatas="tableDatas" :isScreen="true" @comgetData="getNopunchlist" />
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
export default {
  name: 'nopunch-dialog',
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
    this.getNopunchlist();
  },
  methods: {
    getNopunchlist (pageNumber = 1) {
      let today = new Date();
      let month = today.getMonth() + 1;
      let day = today.getDate();
      let nowDate = today.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
      let params = {
        userId: '',
        pageSize: 10,
        pageNumber,
        name: '',
        state: 0,
        date: nowDate
      }
      this.$api.screen.userAllClockedList(params).then(res => {
        this.tableDatas = {
          ...res.data,
          pageNum: pageNumber,
          pageSize: 10
        }
      })
    },
    // 关闭弹出框
    onClosed () {
      this.$emit('onNopunchClose');
    },
    // 每行点击操作
    handleClick () {}
  }
};
</script>
