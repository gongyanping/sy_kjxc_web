<!--
 * @Author: gyp
 * @Date: 2020-05-12 16:31:30
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-12 17:23:04
 * @Description: 设备table表格
 * @FilePath: \sy_kjxc_web\src\views\screen\components\equipTable.vue
 -->

<template>
  <div class="equipTable">
    <el-table :data="tableDatas && tableDatas.rows" border class="blueTable" style="100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="name" label="装备名"  min-width="80"/>
      <el-table-column prop="tel" label="类型" min-width="60" />
      <el-table-column prop="createTime" label="入库时间" min-width="60" />
    </el-table>
    <Pagination :tabledatas="tableDatas" :isScreen="true" @comgetData="findEquipmentForGroupId" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
export default {
  name: 'equip-table',
  props: ['platformGroupId'],
  watch: {
    platformGroupId (newVal) {
      if (newVal) {
        this.findEquipmentForGroupId();
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
    this.findEquipmentForGroupId();
  },
  methods: {
    findEquipmentForGroupId (pageNumber = 1) {
      let params = {
        groupId: this.platformGroupId,
        pageNumber: pageNumber,
        pageSize: 10
      };
      this.$api.screen.findEquipmentForGroupId(params).then(res => {
        this.tableDatas = {
          ...res.data,
          pageNum: pageNumber,
          pageSize: 10
        };
        console.log(this.tableDatas);
      });
    },
    // 每行点击操作
    handleClick () {}
  }
};
</script>

<style lang="less" scoped>
  .equipTable {
    margin-top: 5px;
  }
</style>
