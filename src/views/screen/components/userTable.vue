<!--
 * @Author: gyp
 * @Date: 2020-05-11 09:13:28
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-05 10:48:29
 * @Description: 大队值班领导列表弹出框
 * @FilePath: \sy_kjxc_web\src\views\screen\components\userTable.vue
 -->
<template>
  <div class="userTable">
    <el-table :data="tableDatas && tableDatas.rows" border class="blueTable" style="100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="userName" label="姓名" min-width="50" />
      <el-table-column prop="telephone" label="电话" min-width="60" />
      <el-table-column prop="thisMonthState" label="本月未打卡数" align="center" min-width="60" />
      <el-table-column prop="lastMonthState" label="上月未打卡数" align="center" min-width="60" />
      <el-table-column label="操作" align="center" min-width="110">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.id, 'record')" type="text" size="small">打卡记录</el-button>
          <el-button @click="handleClick(scope.row.id, 'task')" type="text" size="small">巡逻任务</el-button>
          <el-button @click="handleClick(scope.row.id, 'track')" type="text" size="small">地图轨迹</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :tabledatas="tableDatas" :isScreen="true" @comgetData="findUserVo" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
export default {
  name: 'user-table',
  props: ['platformGroupId'],
  watch: {
    platformGroupId (newVal) {
      if (newVal) {
        this.findUserVo();
      }
    }
  },
  components: {
    Pagination
  },
  data () {
    return {
      tableDatas: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        rows: []
      } // 表格数据
    };
  },
  created () {
    this.findUserVo();
  },
  methods: {
    findUserVo (pageNumber = 1) {
      let params = {
        groupId: this.platformGroupId,
        pageNumber: pageNumber,
        pageSize: 10
      };
      this.$api.screen.findUserVo(params).then(res => {
        this.tableDatas = {
          ...res.data,
          pageNum: pageNumber,
          pageSize: 10
        };
        console.log(this.tableDatas);
      });
    },
    /**
     * 人员的操作
     * @param {String} id 人员id
     * @param {String} type 操作类型
     */
    handleClick (id, type) {
      this.$emit('onUserClick', id, type);
    }
  }
};
</script>

<style lang="less" scoped>
  .userTable {
    margin-top: 5px;
  }
</style>
