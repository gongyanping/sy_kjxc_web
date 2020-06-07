<!--
 * @Author: gyp
 * @Date: 2020-05-11 09:13:28
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-05 16:08:59
 * @Description: 未打卡记录列表弹出框
 * @FilePath: \sy_kjxc_web\src\views\screen\components\nopunchDialog.vue
 -->
<template>
  <div class="noPunch">
    <el-dialog
      title="今日未打卡列表"
      :visible.sync="visible"
      width="60%"
      @closed="onClosed"
      custom-class="blue"
    >
      <el-table :data="tableData" border class="blueTable" style="100%">
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="tel" label="电话" />
        <el-table-column prop="platformparent" label="局" />
        <el-table-column prop="platform" label="平台" />
        <el-table-column prop="address1" label="组" />
        <el-table-column prop="address2" label="应打卡时间" min-width="90" />
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
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'nopunch-dialog',
  data () {
    return {
      visible: true, // 弹出框可见性
      tableData: [
        {
          name: '邓治民',
          tel: '13973919017',
          platformparent: '武冈市2号平台',
          platform: '庆丰路邮政银行',
          address1: '3',
          address2: '2020-06-01 14:00'
        },
        {
          name: '邓治民',
          tel: '13973919017',
          platformparent: '武冈市2号平台',
          platform: '庆丰路邮政银行',
          address1: '3',
          address2: '2020-06-01 14:00'
        },
        {
          name: '邓治民',
          tel: '13973919017',
          platformparent: '武冈市2号平台',
          platform: '庆丰路邮政银行',
          address1: '3',
          address2: '2020-06-01 14:00'
        },
        {
          name: '邓治民',
          tel: '13973919017',
          platformparent: '武冈市2号平台',
          platform: '庆丰路邮政银行',
          address1: '3',
          address2: '2020-06-01 14:00'
        }
      ]
    };
  },
  methods: {
    // 关闭弹出框
    onClosed () {
      this.$emit('onNopunchClose');
    },
    // 每行点击操作
    handleClick () {}
  }
};
</script>

<style lang="less" scoped>
.noPunch {
  /deep/ .blue.el-dialog {
    height: 600px;
  }
}
</style>
