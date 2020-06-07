<!--
 * @Author: gyp
 * @Date: 2020-05-11 09:13:28
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-18 15:32:50
 * @Description: 大队值班领导列表弹出框
 * @FilePath: \sy_kjxc_web\src\views\screen\components\dutyleaderDialog.vue
 -->
<template>
  <el-dialog
    title="大队值班领导"
    :visible.sync="visible"
    @closed="onClosed"
    width="60%"
    custom-class="blue"
  >
    <el-table :data="tableDatas && tableDatas.rows" border class="blueTable" style="100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="userName" label="姓名" min-width="60" />
      <el-table-column prop="telephone" label="电话" min-width="60" />
      <el-table-column prop="imei" label="照片" min-width="60" />
      <el-table-column prop="thisMonthState" label="本月未打卡数" align="center" min-width="60" />
      <el-table-column prop="lastMonthState" label="上月未打卡数" align="center" min-width="60" />
      <el-table-column label="操作" align="center" min-width="120">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.id, 'record', scope.row.userName)" type="text" size="small">打卡记录</el-button>
          <el-button @click="handleClick(scope.row.id, 'task', scope.row.userName)" type="text" size="small">巡逻任务</el-button>
          <el-button @click="handleClick(scope.row.id, 'track', scope.row.userName)" type="text" size="small">地图轨迹</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :tabledatas="tableDatas" :isScreen="true" @comgetData="findUserByIdentity" />
  </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination';
export default {
  name: 'dutyleader-dialog',
  props: ['dutyleaderVisible'],
  watch: {
    dutyleaderVisible (newVal) {
      this.visible = newVal;
      if (this.visible) {
        this.findUserByIdentity();
      }
    }
  },
  components: {
    Pagination
  },
  data () {
    return {
      visible: false, // 弹出框可见性
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
    // 获取数据
    findUserByIdentity (pageNumber = 1) {
      let params = {
        pageNumber: pageNumber,
        pageSize: 10
      };
      this.$api.screen.findUserByIdentity(params).then(res => {
        this.tableDatas = {
          ...res.data,
          pageNum: pageNumber,
          pageSize: 10
        }
        console.log(this.tableDatas)
      });
    },
    // 关闭弹出框
    onClosed () {
      this.visible = false;
      this.$emit('onDutyleaderClose');
    },
    /**
     * 人员的操作
     * @param {String} id 人员id
     * @param {String} type 操作类型
     * @param {String} name 人员名称
     */
    handleClick (id, type, name) {
      alert(id)
      this.$emit('onUserClick', id, type, name);
    }
  }
};
</script>
