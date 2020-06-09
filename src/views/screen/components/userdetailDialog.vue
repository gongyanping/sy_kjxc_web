<!--
 * @Author: gyp
 * @Date: 2020-06-04 10:36:16
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-09 17:35:15
 * @Description: 用户详情展示
 * @FilePath: \sy_kjxc_web\src\views\screen\components\userdetailDialog.vue
-->
<template>
  <el-dialog
    title="人员详情"
    :visible.sync="visible"
    @closed="onClosed"
    custom-class="blue"
    width="50%"
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
          <span class="val">{{ userInfo.sum }} km</span>
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
  props: ['userId'],
  data () {
    return {
      visible: true, // 弹出框可见性
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
      this.$emit('onUserdetailClose');
    }
  }
};
</script>

<style lang="less" scoped>
.userDetail {
  .basicUser {
    color: #fff;
    overflow: hidden;
    border: 1px solid #2C58A6;
    -webkit-box-shadow: inset 0 0 3px #2C58A6;
    box-shadow: inset 0 0 3px #2C58A6;
    padding: 5px 20px;
    > li {
      float: left;
      width: 50%;
      height: 44px;
      line-height: 44px;
      font-size: 16px;
      border-bottom: dotted 1px #2c58a6;
      &:last-of-type, &:nth-last-of-type(2) {
        border-bottom: none;
      }
      .title {
        color: #25f3e6;
        color: #ddd;
      }
    }
  }
}
/deep/ .blue.el-dialog {
  height: 480px;
}
</style>
