<!--
 * @Author: gyp
 * @Date: 2020-06-15 15:01:15
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-15 15:40:41
 * @Description: 实时警情数列表
 * @FilePath: \sy_kjxc_web\src\views\screen\components\realtimeAlertNum.vue
-->
<template>
  <div class="dataCheck">
    <el-dialog
      title="数据考核"
      :visible.sync="visible"
      @closed="onClosed"
      custom-class="blue"
    >
      <el-table
        :data="tableDatas && tableDatas.rows"
        border
        class="blueTable"
        style="100%"
      >
        <el-table-column type="index" label="序号" width="50" align="center" />

        <el-table-column prop="platformName" label="报警方式" min-width="100" />
        <el-table-column prop="date" label="接警座席号" min-width="100" />
        <el-table-column
          prop="lineName"
          label="接警组织名"
          align="center"
          min-width="110"
        />
        <el-table-column
          prop="appealClockCount"
          label="警情类型"
          align="center"
          min-width="60"
        />
        <el-table-column
          prop="hasClockCount"
          label="接警员"
          align="center"
          min-width="60"
        />

        <el-table-column
          prop="alarmCount"
          label="报警人姓名"
          align="center"
          min-width="60"
        />
        <el-table-column
          prop="alarmCount"
          label="报警人性别"
          align="center"
          min-width="60"
        />
        <el-table-column
          prop="alarmCount"
          label="报警人电话"
          align="center"
          min-width="60"
        />
        <el-table-column
          prop="alarmCount"
          label="报警类型"
          align="center"
          min-width="60"
        />
        <el-table-column
          prop="alarmCount"
          label="所管派出所"
          align="center"
          min-width="60"
        />

        <el-table-column
          prop="alarmCount"
          label="警情级别"
          align="center"
          min-width="60"
        />
        <el-table-column
          prop="alarmCount"
          label="报警时间"
          align="center"
          min-width="60"
        />
        <el-table-column
          prop="alarmCount"
          label="入库时间"
          align="center"
          min-width="60"
        />
        <el-table-column
          prop="alarmCount"
          label="查看明细"
          align="center"
          min-width="60"
        />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >明细</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :tabledatas="tableDatas"
        :isScreen="true"
        @comgetData="getAlertnumList"
      />
      <el-dialog
        width="100%"
        title="查看明细"
        :visible.sync="innerVisible"
        append-to-body
        @closed="onInnerClosed"
      >
        <ul class="detail">
          <li class="detail-item">
            <label>重大警情</label>
            <div></div>
          </li>
          <li class="detail-item">
            <label>案发地点</label>
            <div></div>
          </li>
          <li class="detail-item">
            <label>报警内容</label>
            <div></div>
          </li>
          <li class="detail-item">
            <label>按警录音号</label>
            <div></div>
          </li>
        </ul>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
export default {
  name: 'realtimenum-dialog',
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
      }, // 表格数据
      innerVisible: false // 内层弹出框可见性
    };
  },
  created () {
    this.getAlertnumList();
  },
  methods: {
    getAlertnumList (pageNumber = 1) {
      let today = new Date();
      let month = today.getMonth() + 1;
      let day = today.getDate();
      let nowDate =
        today.getFullYear() +
        '-' +
        (month < 10 ? '0' + month : month) +
        '-' +
        (day < 10 ? '0' + day : day);
      let params = {
        startDate: nowDate,
        endDate: nowDate,
        pageSize: 10,
        pageNumber
      };
      this.$api.screen.checkList(params).then(res => {
        this.tableDatas = {
          ...res.data,
          pageNum: pageNumber,
          pageSize: 10
        };
      });
    },
    // 关闭弹出框
    onClosed () {
      this.$emit('onDatacheckClose');
    },
    // 每行点击操作
    handleClick () {
      this.innerVisible = true;
    },
    // 关闭内层弹出框
    onInnerClosed () {
      this.innerVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  border: dotted 1px #2c58a6;
  .detail-item {
    display: flex;
    align-items: flex-start;
    border-bottom: dotted 1px #2c58a6;
    padding: 20px;
    > label {
      width: 200px;
      color: #eee;
    }
    > div {
      width: calc(100% - 200px);
      color: #fff;
    }
  }
}
</style>
