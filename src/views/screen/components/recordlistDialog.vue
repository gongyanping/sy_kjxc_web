<!--
 * @Author: gyp
 * @Date: 2020-06-05 16:19:47
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-09 18:19:49
 * @Description: 打卡记录
 * @FilePath: \sy_kjxc_web\src\views\screen\components\recordlistDialog.vue
-->

<template>
  <div class="recordList">
    <el-dialog
      :title="userName + '的打卡列表'"
      :visible.sync="visible"
      @closed="onClosed"
      custom-class="blue"
    >
      <el-table :data="tableDatas && tableDatas.rows" border class="blueTable" style="100%">
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="lineName" label="线路" min-width="110" />
        <el-table-column prop="spotName" label="点位"  min-width="100" />
        <el-table-column prop="hasClocked" label="状态">
          <template slot-scope="scope">
            {{ stateArry[scope.row.state] }}
          </template>
        </el-table-column>
        <el-table-column prop="platform" label="类型">
          <template slot-scope="scope">
            {{ scope.row.type === '1' ? '手机' : '考勤机' }}
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="负责人" />
        <el-table-column prop="phone" label="电话" min-width="90" />
        <el-table-column prop="clockTime" label="时间" min-width="200" />
      </el-table>
      <Pagination :tabledatas="tableDatas" :isScreen="true" @comgetData="getRecordList" />
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
export default {
  name: 'recordlist-dialog',
  props: ['userId', 'userName'],
  components: {
    Pagination
  },
  data () {
    return {
      visible: true, // 弹出框可见性
      stateArry: ['未打卡', '已打卡', '出警中', '请假', '打卡申诉处理中', '打卡申诉通过'],
      tableDatas: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        rows: []
      } // 表格数据
    };
  },
  created () {
    this.getRecordList();
  },
  methods: {
    getRecordList (pageNumber = 1) {
      let params = {
        userId: this.userId,
        pageNumber: pageNumber,
        pageSize: 10,
        name: '',
        state: '',
        date: ''
      };
      this.$api.screen.userAllClockedList(params).then(res => {
        this.tableDatas = {
          ...res.data,
          pageNum: pageNumber,
          pageSize: 10
        };
      })
    },
    // 关闭弹出框
    onClosed () {
      this.$emit('onrecordlistClose');
    }
  }
};
</script>
