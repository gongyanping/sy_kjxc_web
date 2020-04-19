<template>
  <div id="header">
    <div class="logoWrap">
      <img class="logo" src="@/assets/image/pageLogo.png" alt />
      <span>邵阳快警综合管理平台</span>
    </div>
    <div class="head_nav">
      <div class="nowtime">{{ loginData.nowDate }}</div>
      <ul class="sub_nav">
        <li>
          <img src="@/assets/image/home/home_user.png" class="userImg" />
          用户：
          {{ loginData.loginName }}
        </li>
        <li @click="getOut">
          <img src="@/assets/image/home/home_logout.png" />
          注销
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'systemHeader',
  data () {
    return {
      loginData: {
        department: sessionStorage.getItem('department'),
        loginName: sessionStorage.getItem('loginName') || 'ADMIN',
        nowDate: ''
      }
    };
  },
  mounted () {
    setInterval(this.getNowDate, 100);
  },
  methods: {
    getNowDate () {
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
      let minute =
        now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
      let second =
        now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
      let weekdayArry = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ];
      let weekday = weekdayArry[now.getDay()];
      this.loginData.nowDate =
        year +
        '/' +
        month +
        '/' +
        day +
        ' ' +
        hour +
        ':' +
        minute +
        ':' +
        second +
        ' ' +
        weekday;
    },
    getOut () {
      this.$confirm('是否退出当前账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // cancelButtonClass: 'btn-custom-cancel',
        type: 'warning'
      })
        .then(() => {
          this.$emit('getOut');
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
#header {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 99;
  height: 80px;
  overflow: hidden;
  background: #3c4f91;
  // background: #409eff;
  display: flex;
  justify-content: space-between;

  .logoWrap {
    width: 30%;
    color: #ffffff;
    display: flex;
    align-items: center;
    font-size: 26px;
    .logo {
      height: 53px;
      margin: 0 10px 0 30px;
    }
  }

  .head_nav {
    float: right;
    height: 80px;
    width: 250px;
    margin-right: 80px;

    .nowtime {
      padding: 3px 0;
      background: rgba(255, 255, 255, 0.3);
      border: solid 1px rgba(136, 200, 255, 0.5);
      border-top: none;
      border-radius: 0px 0px 17px 17px;
      color: #ffffff;
      font-size: 15px;
      text-align: center;
    }

    .sub_nav {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      padding: 0 5px;

      li {
        font-size: 16px;
        cursor: pointer;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;

        > img {
          width: 22px;
          height: 22px;
          margin-right: 8px;
        }

        .userImg {
          width: 23px;
          height: 23px;
        }
      }
    }
  }
}
</style>
