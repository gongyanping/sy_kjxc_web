<!--
 * @Author: gyp
 * @Date: 2020-04-16 09:31:26
 * @LastEditors: gyp
 * @LastEditTime: 2020-04-17 11:52:03
 * @Description:
 * @FilePath: \sy_kjxc_web0417\src\views\patrolManage\components\patrolpointList.vue
 -->
<template>
  <ul class="patrolpointList">
    <li v-for="(item, index) in datatables" :key="index">
      <div>
        <p class="name" @click="handleLocate(item)">
          <i class="el-icon-location-information location-icon"></i>
          {{ item.name }}
        </p>
        <p class="time">时间：{{ item.createTime }}</p>
        <p class="ellipsis">地址：{{ item.address }}</p>
      </div>
      <div style="text-align:right;">
        <el-button class="bt-edit" type="primary" size="mini" @click="handleEdit(item)">编辑</el-button>
        <p style="margin-top: 5px;">
          <el-button class="bt-edit" type="primary" size="mini" @click="handleCopy(item)" plain>复制</el-button>
        </p>
      </div>
      <i class="el-icon-close delIcon" @click="onDelete(item.id, item.name)"></i>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'patrolpoint-list',
  props: ['datatables'],
  methods: {
    handleLocate (row) {
      const { id, lon, lat } = row;
      this.$emit('handleLocate', id, lon, lat);
    },
    handleEdit (row) {
      this.$emit('handleEdit', row);
    },
    handleCopy (row) {
      this.$confirm('是否复制出一个该巡逻点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(() => {
          delete row.id;
          this.$emit('onSavePoint', row);
        })
        .catch(() => {
          this.$message.info('已取消复制');
        });
    },
    onDelete (id, name = '该') {
      this.$confirm('是否删除' + name + '巡逻点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(() => {
          let params = this.$qs.stringify({ id });
          this.$api.patrolPoint.delete(params).then(() => {
            this.$message.success('删除成功');
            this.$emit('getList');
          });
        })
        .catch(() => {
          this.$message.info('已取消删除');
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/index.less";
.patrolpointList {
  width: 100%;
  > li {
    .flex-center();
    justify-content: space-between;
    padding: 20px 15px;
    font-size: 14px;
    color: #333333;
    border-bottom: solid 1px #dddddd;
    position: relative;
    > div {
      width: 300px;
      .name {
        font-weight: bold;
        cursor: pointer;
        .ellipsis();
        &:hover {
          color: #409eff;
        }
        .location-icon {
          color: #f56c6c;
        }
      }
      .time {
        margin: 8px 0;
      }
    }
    .bt-edit {
      position: relative;
      top: 5px;
    }
    .delIcon {
      position: absolute;
      top: 5px;
      right: 8px;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
