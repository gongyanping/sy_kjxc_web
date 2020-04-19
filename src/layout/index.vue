<template>
  <div id="indexPage">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'indexPage',
  data () {
    return {
      loginName: sessionStorage.getItem('loginName'),
      department: sessionStorage.getItem('department'),
      userAvatar: sessionStorage.getItem('userAvatar')
    };
  },
  methods: {
    getOut () {
      sessionStorage.removeItem('token');
      localStorage.removeItem('leftList');
      localStorage.removeItem('leftList1');
      window.location.href = process.env.VUE_APP_LoginUrl;
    },
    gohome () {
      this.$router.push({ path: '/' });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/index.less";
#indexPage {
  background-color: #f5f5f5;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  .main {
    min-height: calc(100% - 80px);
    margin: 0 auto;
    margin-top: 80px;
    width: 100%;
    overflow: auto;
    display: flex;
    .sidebar_a {
      width: 240px;
      height: calc(100vh - 80px);
      background-color: #ffffff;
      padding: 0;
      box-sizing: border-box;
      .side_header {
        background: #fff;
        padding: 13px 13px 0 13px;
        box-sizing: border-box;
        .user_header {
          background: rgba(65, 166, 255, 0.05);
          padding: 13px;
          .user_basic {
            display: flex;
            justify-content: center;
            color: #333333;
            img {
              width: 80px;
              height: 80px;
            }
            .user_name {
              margin: 13px 0 0 27px;
            }
          }
          .user_department {
            margin-top: 13px;
            height: 32px;
            margin-bottom: 6px;
            text-align: center;
            font-size: 16px;
            color: #666666;
          }
        }
        .hr {
          height: 4px;
          background-color: @themeColor;
          margin-top: 13px;
        }
      }
    }
    .sidebar_b {
      width: 100%;
      height: 100%;
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 70px;
  }
}
</style>
