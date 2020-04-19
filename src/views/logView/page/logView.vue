<template>
  <div class="user">
    <!--页头-->
    <div class="us_title">
      <span>日志中心</span>
    </div>
    <!--搜索-->
    <div class="searchBar">
      <div class="search">
        <div class="icon"></div>
        <el-input placeholder="请输入操作人"
                  v-model="inputInfo">
        </el-input>
        <el-button slot="append"
                   @click="searchUser">查询</el-button>
        <!--<div v-show="ExcelShow" class="export" title="导出Excel表格" @click="download"></div>-->
      </div>
    </div>
    <!--表单-->
    <div class="newtable">
      <el-table ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column label="序号"
                         type="index"
                         width="100px">
        </el-table-column>
        <!--<el-table-column prop="logId"
                         label="日志ID"
                         show-overflow-tooltip>
        </el-table-column>-->
        <el-table-column prop="creator"
                         label="操作人"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="logIp"
                         label="操作人IP"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="operatorTime"
                         label="操作时间"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="operatorModel"
                         label="操作模块"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="logType"
                         label="日志类型"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="operatorStatus"
                         label="操作状态"
                         show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>

    <!--分页-->
    <el-pagination @current-change="handleCurrentChange"
                   @size-change="handleSizeChange"
                   layout="total,sizes,prev, pager, next"
                   :page-sizes="$store.state.pageSizes"
                   class="getpage"
                   background
                   :current-page.sync="pageNum"
                   :page-size="pageSize"
                   :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'noctce-main',
  data () {
    return {
      tableData: null, // table数据
      pageNum: 1,
      pageSize: 10,
      total: null,
      menuId: '',
      listUp: [],
      listRow: [],
      listCustom: [],
      inputInfo: ''
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val;
      this.handleCurrentChange()
    },
    // 搜索
    searchUser () {
      this.getData();
    },
    // 选择select
    handleSelectionChange () {

    },
    // 分页
    handleCurrentChange (page) {
      this.pageNum = page;
      this.getData();
    },
    // 初始化数据
    getData () {
      this.$api.log.logList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        creator: this.inputInfo
      })
        .then(resp => {
          if (resp.data.data) {
            this.tableData = resp.data.data.list;
            this.pageNum = resp.data.data.pageNum;
            this.pageSize = resp.data.data.pageSize;
            this.total = resp.data.data.total;
          }
        }).catch(err => {
          console.error(err)
        });
      let tabIndex = 1; // tabindex用来获取当前菜单下的第几个页面的按钮
      this.$api.operator.listByMenuId({
        tabIndex: tabIndex,
        menuId: this.menuId
      }).then(resp => {
        this.listUp = resp.data.data.listUp;
        this.listRow = resp.data.data.listRow;
        this.listCustom = resp.data.data.listCustom;
      }).catch(err => {
        console.error(err)
      });
    }
  },
  created () {
    this.$store.commit('GET_fstmenuId', menuId => {
      this.menuId = menuId
    });
    this.getData();
  }
}
</script>

<style scoped>
.user {
  /*margin-left: 209px;*/
  height: 100%;
  padding: 0px 18px;
  overflow: auto;
  background: #ffffff;
}

.us_title {
  padding: 14px 0;
  border-bottom: 1px solid #eaedf1;
}

.us_title span {
  font-size: 16px;
  color: #333;
  padding-left: 10px;
  border-left: 3px solid #2698ff;
}
.searchBar {
  display: flex;
  justify-content: flex-end;
}
.topAll {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 20px;
}

.getpage {
  padding: 25px 0;
  text-align: center;
}

.newtable {
  border: 1px solid #e1e6eb;
  text-align: center;
  /*margin-top: 30px;*/
}
</style>

