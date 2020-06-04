<!--
 * @Author: gyp
 * @Date: 2020-06-04 10:36:16
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-04 11:17:13
 * @Description: 用户详情展示
 * @FilePath: \sy_kjxc_web\src\views\screen\components\userdetailDialog.vue
-->
<template>
  <el-dialog
    title="人员详情"
    :visible.sync="visible"
    @closed="onClosed"
    custom-class="blue"
  >
    <div class="userDetail">
      <ul class="basicUser">
        <li>
          <span class="title">用户名：</span>
          <span class="val">{{ userInfo.userName }}</span>
        </li>
        <li>
          <span class="title">电话号码：</span>
          <span class="val">{{ userInfo.telephone }}</span>
        </li>
        <li>
          <span class="title">所属平台：</span>
          <span class="val">{{ userInfo.platformName }}</span>
        </li>
        <li>
          <span class="title">小组名称：</span>
          <span class="val">{{ userInfo.groupName }}</span>
        </li>
        <li>
          <span class="title">本月未打卡数：</span>
          <span class="val">{{ userInfo.thisMonthState }}</span>
        </li>
        <li>
          <span class="title">上月未打卡数：</span>
          <span class="val">{{ userInfo.lastMonthState }}</span>
        </li>
        <li>
          <span class="title">本月出警数：</span>
          <span class="val">{{ userInfo.thisMonthAlarm }}</span>
        </li>
        <li>
          <span class="title">巡逻里程：</span>
          <span class="val">{{ userInfo.sum }}</span>
        </li>
        <li>
          <span class="title">本月请假天数：</span>
          <span class="val">{{ userInfo.thisMonthLeave }}</span>
        </li>
        <li>
          <span class="title">上月请假天数：</span>
          <span class="val">{{ userInfo.lastMonthLeave }}</span>
        </li>
        <li>
          <span class="title">车辆编号：</span>
          <span class="val">{{ userInfo.licenseNumber }}</span>
        </li>
        <li>
          <span class="title">人员编号：</span>
          <span class="val">{{ userInfo.userNumber }}</span>
        </li>
        <li>
          <span class="title">上次上班时间：</span>
          <span class="val">{{ userInfo.lastWorkDate }}</span>
        </li>
        <li>
          <span class="title">下次上班时间：</span>
          <span class="val">{{ userInfo.nextWordDate }}</span>
        </li>
      </ul>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'userdetail-dialog',
  props: ['userdetailVisible', 'userId'],
  watch: {
    userdetailVisible (newVal) {
      this.visible = newVal;
    }
  },
  data () {
    return {
      visible: false, // 弹出框可见性
      userInfo: {
        userName: '',
        telephone: '',
        platformName: '',
        groupName: '',
        thisMonthState: '',
        lastMonthState: '',
        thisMonthAlarm: '',
        sum: '',
        thisMonthLeave: '',
        lastMonthLeave: '',
        licenseNumber: '',
        userNumber: '',
        lastWorkDate: '',
        nextWordDate: ''
      }
    };
  },
  created () {
    this.getUserInfo();
  },
  methods: {
    // 查询用户信息
    getUserInfo () {
      this.$api.screen.findUserDetails({ userId: this.userId }).then(res => {
        if (res.data.code === 0) {
          this.userInfo = res.data.data;
        }
      });
    },
    // 关闭弹出框
    onClosed () {
      this.visible = false;
      this.$emit('userdetailClose');
    }
  }
};
</script>

<style lang="less" scoped>
.userDetail {
  .basicUser {
    overflow: hidden;
    > li {
      float: left;
      width: 50%;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      border-bottom: dotted 1px #ccc;
      .title {
        font-weight: bold;
      }
    }
  }
}
</style>
