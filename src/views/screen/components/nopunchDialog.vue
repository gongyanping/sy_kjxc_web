<!--
 * @Author: gyp
 * @Date: 2020-05-11 09:13:28
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-11 10:09:46
 * @Description: 未打卡记录列表弹出框
 * @FilePath: \sy_kjxc_web\src\views\screen\components\nopunchDialog.vue
 -->
<template>
  <el-dialog title="今日未打卡列表" :visible.sync="visible" @closed="onClosed" custom-class="blue">
    <el-table :data="tableData" border class="blueTable" style="100%">
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="tel" label="电话" />
      <el-table-column prop="platformparent" label="局" />
      <el-table-column prop="platform" label="平台" />
      <el-table-column prop="address1" label="组" />
      <el-table-column prop="address2" label="应打卡时间" />
      <el-table-column prop="address3" label="打卡申诉">
         <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">资料</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address4" label="详情资料" >
         <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: 'nopunch-dialog',
  props: ['nopunchVisible'],
  watch: {
    nopunchVisible (newVal) {
      this.visible = newVal;
    }
  },
  data () {
    return {
      visible: false, // 弹出框可见性
      tableData: [
        {
          name: '2016-05-02',
          tel: '王小虎',
          platformparent: '上海市普陀区金沙江路 1518 弄',
          platform: '上海市普陀区金沙江路 1518 弄',
          address1: '213',
          address2: '213',
          address3: '213',
          address4: '213'
        },
        {
          name: '2016-05-02',
          tel: '王小虎',
          platformparent: '上海市普陀区金沙江路 1518 弄',
          platform: '上海市普陀区金沙江路 1518 弄',
          address1: '213',
          address2: '213',
          address3: '213',
          address4: '213'
        }, {
          name: '2016-05-02',
          tel: '王小虎',
          platformparent: '上海市普陀区金沙江路 1518 弄',
          platform: '上海市普陀区金沙江路 1518 弄',
          address1: '213',
          address2: '213',
          address3: '213',
          address4: '213'
        }, {
          name: '2016-05-02',
          tel: '王小虎',
          platformparent: '上海市普陀区金沙江路 1518 弄',
          platform: '上海市普陀区金沙江路 1518 弄',
          address1: '213',
          address2: '213',
          address3: '213',
          address4: '213'
        }
      ]
    };
  },
  methods: {
    // 关闭弹出框
    onClosed () {
      this.visible = false;
      this.$emit('onNopunchClose')
    },
    // 每行点击操作
    handleClick () {

    }
  }
};
</script>
