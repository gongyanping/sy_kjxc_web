<template>
  <el-dialog title="大队值班领导" :visible.sync="visible" @closed="onClosed" custom-class="blue">
    <el-table :data="gridData">
      <el-table-column property="date" label="日期" width="150"></el-table-column>
      <el-table-column property="name" label="姓名" width="200"></el-table-column>
      <el-table-column property="address" label="地址"></el-table-column>
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
      gridData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    };
  },
  methods: {
    onClosed () {
      this.visible = false;
      this.$emit('onDutyleaderClose')
    }
  }
};
</script>
