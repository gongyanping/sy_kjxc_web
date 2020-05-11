<!--
 * @Author: gyp
 * @Date: 2020-05-11 20:36:48
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-11 21:56:38
 * @Description: 点击每一个块茎平台，查看它的详情
 * @FilePath: \sy_kjxc_web\src\views\screen\components\policeDialog.vue
 -->
<template>
  <div class="policeDialog">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      @closed="onClosed"
      width="60%"
      custom-class="blue"
    >
    <ul class="groupList">
       <li>
       </li>
    </ul>
    <div>
      <ul>
        <li>人员列表</li>
        <li>所属装备</li>
      </ul>
      <dutyleader-dialog />
    </div>
    </el-dialog>
  </div>
</template>
<script>
import dutyleaderDialog from './dutyleaderDialog';
export default {
  name: 'police-dialog',
  components: {
    dutyleaderDialog
  },
  props: ['policeVisible', 'title'],
  watch: {
    policeVisible (newVal) {
      this.visible = newVal;
    }
  },
  data () {
    return {
      visible: false // 弹出框可见性
    }
  },
  methods: {
    // 关闭弹出框
    onClosed () {
      this.visible = false;
      this.$emit('onPoliceClose')
    }
  }
};
</script>
