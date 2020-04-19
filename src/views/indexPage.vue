<template>
  <div id="indexPage">
    <div class="user_control">
      <systemHeader @getOut="getOut" @gohome="gohome"></systemHeader>
      <div class="main clearfloat">
        <div class="sidebar_a f-l">
          <div class="user_header">
           <img src="@/assets/image/user_header.png">
          </div>
          <div class="user_name">{{loginName}}</div>
          <div class="user_department">
            所属部门：{{department}}
          </div>
          <div class="hr"></div>
        </div>
        <div class="sidebar_b f-l">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import systemHeader from '@/components/systemHeader';

export default {
  name: 'indexPage',
  components: {
    systemHeader
  },
  mounted () {
    this.$router.push('/indexPage');
  },
  data () {
    return {
      loginName: sessionStorage.getItem('loginName'),
      department: sessionStorage.getItem('department')
    }
  },
  methods: {
    getOut () {
      sessionStorage.removeItem('token');
      localStorage.removeItem('leftList');
      localStorage.removeItem('leftList1');
      window.location.href = process.env.VUE_APP_LoginUrl;
    },
    gohome () {
      this.$router.push({ path: '/indexPage' });
    }
  }
}
</script>

<style lang="less" scoped>
  #indexPage {
    height: 100%;
    .user_control {
      background-color: #e9edf1;
      position: relative;
      height: 100%;
      width: 100%;
      overflow-x: auto;
      .main{
        border-radius: 4px;
        height: 100%;
        margin: 105px auto 0 auto;
        width: 1600px;
        .sidebar_a{
          width: 185px;
          height: 100%;
          margin-right: 10px;
          border-right: #d8d8d8 2px solid;
          background-color: #ffffff;
          .user_header{
            margin-top: 25px;
            text-align:center;
            img{
              width: 110px;
              height: 110px;
            }
          }
          .user_name{
            margin-top: 20px;
            text-align: center;
          }
          .user_department{
            margin-top: 14px;
            margin-bottom: 20px;
            text-align: center;
          }
          .hr{
            height: 2px;
            background-color: #51a2d7;
          }
        }
        .sidebar_b{
          width: 1500px;
          height: 100%;
        }
      }
    }

    .mynav {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 80;
      height: 100%;
    }
  }
</style>
