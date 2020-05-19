<!--
 * @Author: gyp
 * @Date: 2020-03-24 16:38:14
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-19 15:04:13
 * @Description: 分页公用组件
 * @FilePath: \sy_kjxc_web\src\components\Pagination.vue
 -->
<template>
  <div class="comm-table-flooter" v-if="tabledatas && tabledatas.total > 0">
    <el-pagination
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next"
      background
      @size-change="handleSizeChange"
      :page-sizes="$store.state.pageSizes"
      :current-page.sync="tabledatas.pageNum"
      :page-size="tabledatas.pageSize"
      :total="tabledatas.total"
      :pager-count="5"
      :hide-on-single-page="false">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    tabledatas: {
      type: Object,
      default () {
        return {
          total: 0,
          pageNum: 1,
          pageSize: 10
        }
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      /* 分页  */
      this.$emit('comgetData', val, 1);
    },
    handleCurrentChange (val) {
      /* 分页 */
      this.$emit('comgetData', val);
    }
  }
};
</script>

<style lang="less" scoped>
  .comm-table-flooter{
    background: #ffffff;
    padding: 12px 0;
    text-align: center;
    .el-pagination{
      white-space: normal;
    }
  }
</style>
