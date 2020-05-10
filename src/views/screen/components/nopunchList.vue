<template>
  <el-dialog title="大队值班领导" :visible.sync="visible" @closed="onClosed" custom-class="blue">
    <el-table :data="gridData" border class="blueTable" style="100%">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="tel" label="电话" />
      <el-table-column prop="platformparent" label="局" />
      <el-table-column prop="platform" label="平台" />
      <el-table-column prop="address1" label="组" />
      <el-table-column prop="address2" label="应打卡时间" />
      <el-table-column prop="address3" label="打卡申诉" />
      <el-table-column prop="address4" label="详情" />
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
    onClosed () {
      this.visible = false;
      this.$emit('onDutyleaderClose')
    }
  }
};
</script>
