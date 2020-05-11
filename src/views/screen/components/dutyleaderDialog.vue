<!--
 * @Author: gyp
 * @Date: 2020-05-11 09:13:28
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-11 21:37:03
 * @Description: 大队值班领导列表弹出框
 * @FilePath: \sy_kjxc_web\src\views\screen\components\dutyleaderDialog.vue
 -->
<template>
  <el-dialog title="大队值班领导" :visible.sync="visible" @closed="onClosed" width="60%" custom-class="blue">
    <el-table :data="tableData" border class="blueTable" style="100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="name" label="姓名"  min-width="60"/>
      <el-table-column prop="tel" label="电话" min-width="60" />
      <el-table-column prop="platformparent" label="照片" min-width="60" />
      <el-table-column prop="num1" label="本月未打卡数" align="center" min-width="60" />
      <el-table-column prop="num2" label="上月未打卡数" align="center" min-width="60" />
      <el-table-column label="操作" align="center" min-width="120">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">打卡记录</el-button>
        <el-button type="text" size="small">巡逻任务</el-button>
        <el-button type="text" size="small">地图轨迹</el-button>
        <el-button type="text" size="small">视频</el-button>
      </template>
    </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: 'dutyleader-dialog',
  props: ['dutyleaderVisible'],
  watch: {
    dutyleaderVisible (newVal) {
      this.visible = newVal;
    }
  },
  data () {
    return {
      visible: false, // 弹出框可见性
      tableData: [
        {
          name: '王小虎',
          tel: '13551070745',
          platformparent: '上海市普陀',
          num1: '213',
          num2: 213
        },
        {
          name: '王小虎',
          tel: '13551070745',
          platformparent: '上海市普陀',
          num1: '213',
          num2: 213
        }, {
          name: '王小虎',
          tel: '13551070745',
          platformparent: '上海市普陀',
          num1: '213',
          num2: 213
        }, {
          name: '王小虎',
          tel: '13551070745',
          platformparent: '上海市普陀',
          num1: '213',
          num2: 213
        }, {
          name: '王小虎',
          tel: '13551070745',
          platformparent: '上海市普陀',
          num1: '213',
          num2: 213
        }
      ] // 表格数据
    };
  },
  methods: {
    // 关闭弹出框
    onClosed () {
      this.visible = false;
      this.$emit('onDutyleaderClose')
    },
    // 每行点击操作
    handleClick () {

    }
  }
};
</script>
