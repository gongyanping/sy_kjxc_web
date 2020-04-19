<template>
  <div id="login">
    <div class="login-box">
      <div class="login-box-container">
        <div class="login-box-container_hd">
          <img src="../assets/image/xzsp_login.png"/>
        </div>
        <div class="login-box-container_bd">
          <div class="title">登录</div>
          <div class="title_hr"></div>
          <div class="user-it first-user-it">
            <img src="../assets/image/login_userName_icon_xzsp.png"/>
            <input
              type="text"
              placeholder="请输入用户名"
              v-model="userIdNum"
              @keydown="hideLoginType"
              @keyup="enterKeyLogin"
            />
          </div>
          <!--<p v-if="roleDepartment != null" class="Department">{{ roleDepartment }}：</p>
          <div class="login-type" :class="{ 'is-Animation': showClass }">
            <p
              v-for="(item, i) in roles"
              :key="i"
              :class="{ 'is-seleted': item.selected }"
              @click="chooseRole(item, i)"
            >
              {{ item.roleName }}
            </p>
          </div>-->
          <div class="user-it first-user-it">
            <img src="../assets/image/login_userPassWord_icon_xzsp.png"/>
            <input type="password" placeholder="请输入密码" v-model="password" @keyup="enterKeyLogin"/>
          </div>
          <div class="user-it yzm-div-user-it">
            <div class="yzm-user-it">
              <!--<img src="../assets/image/login_userCode_icon.png"/>-->
              <input
                type="text"
                placeholder="请输入验证码"
                v-model="verificationCode"
                style="width:90px"
                @keyup="enterKeyLogin(1)"
              />
            </div>
            <div class="code" @click="refreshCode">
              <identifyCode :identifyCode="identifyCode" class="codeBox"></identifyCode>
            </div>
          </div>
          <!--<div class="rember-password">
            <div class="checked user-seleted" @click="handleCheck">
              <img src="../assets/image/login_userSelect_icon.png" alt v-show="isChecked"/>
            </div>
            <span class="user-seleted">记住密码</span>
          </div>-->
          <div class="login-btn" @click="isClick&&onLogin()" ref="loginClick">登录</div>
        </div>
      </div>
      <div class="login-box-foot">技术支持：中电万维信息技术有限公司</div>
    </div>
  </div>
</template>

<script>

// 验证码图片组件
import identifyCode from '../components/identifyCode';
// 引入加密工具crypto.js
// import { Encrypt } from '../utils/crypto.js';
let Base64 = require('js-base64').Base64;
export default {
  name: 'login',
  components: {
    identifyCode: identifyCode
  },
  data () {
    return {
      userAvatar: '',
      isClick: true,
      isChecked: false,
      userIdNum: '',
      identifyCode: '', // 验证码
      user: '请选择部门',
      errId: false,
      userName: '',
      password: '',
      isClose: false,
      roleAccount: '',
      verificationCode: '',
      roleId: '',
      roles: [],
      // roleDepartment: null,
      showClass: false,
      loginName: '',
      userLevel: ''
    };
  },
  created () {
    let _user = this.$cookies.get('_user');
    if (_user) {
      // 账号及密码加密
      // this.userIdNum = Encrypt(_user.userIdNum);
      // this.password = Encrypt(_user.pwd);
      this.userIdNum = Base64.decode(_user.userIdNum);
      this.password = Base64.decode(_user.pwd);
      this.isChecked = true;
      // this.getDepartmentMsg();
    }
    this.getCode();
  },
  methods: {
    hideLoginType () {
      this.showClass = false;
      this.password = '';
      this.isChecked = false;
    },
    handleCheck () {
      this.isChecked = !this.isChecked;
    },
    // 初始化验证码
    getCode () {
      this.$api.user.getVerifyCode().then(resp => {
        if (resp.data.code === 0) {
          this.identifyCode = resp.data.data;
          // 自动填充
          this.verificationCode = this.identifyCode;
        }
      });
    },
    refreshCode () {
      this.getCode();
    },
    // 失去光标获取用户数据
    /* getDepartmentMsg () {
      if (this.userIdNum) {
        let that = this;
        this.$api.user.accountList({ loginAccount: this.userIdNum })
          .then(resp => {
            if (resp.data.code === 0) {
              that.roleAccount = resp.data.data[0].loginAccount;
              // that.roleDepartment = resp.data.data[0].department;
              that.userAvatar = resp.data.data[0].userAvatar;
              that.userLevel = resp.data.data[0].userLevel;
              that.roles = resp.data.data[0].roles;
              that.loginName = resp.data.data[0].userName;
              that.roles.forEach((item, i) => {
                if (i === 0) {
                  item.selected = true;
                  this.roleId = item.roleId;
                } else {
                  item.selected = false;
                }
              });
              that.showClass = true;
            } else {
              this.$message.error(resp.data.message);
            }
          })
          .catch(err => {
            console.log('err :', err);
            this.$message.error('账号下暂无相应部门信息，请确定该帐号信息无误后再次尝试');
            this.refreshCode();
          });
      } else {
        this.$message.warning('请输入账号');
      }
    }, */
    chooseRole (item, index) {
      if (item.selected) {
        return;
      }
      this.roleId = item.roleId;
      this.roles.forEach((item, i) => {
        item.selected = i === index;
      });
      this.$forceUpdate();
    },
    onLogin () {
      let that = this;
      if (!this.userIdNum) {
        this.$message.warning('请输入账号');
        return;
      }
      if (!this.password) {
        this.$message.warning('请输入密码');
        return;
      }
      if (!this.verificationCode) {
        this.$message.warning('请输入验证码');
        this.getCode();
        return;
      }
      if (this.verificationCode === this.identifyCode) {
        if (!this.isChecked) {
          // 移除‘记住密码’时保存的用户信息
          this.$cookies.remove('_user');
        }
        this.isClick = false;
        this.$store
          .dispatch('newLogin', {
            form: {
              // loginAccount: Encrypt(this.userIdNum),
              // password: Encrypt(this.password),
              loginAccount: Base64.encode(this.userIdNum),
              password: Base64.encode(this.password),
              // roleId: this.roleId || null,
              // loginName: this.loginName,
              // department: this.roleDepartment,
              // userLevel: this.userLevel,
              // userAvatar: this.userAvatar,
              code: this.verificationCode
            },
            vm: that,
            remberPassWord: this.isChecked
          })
          .then(result => {
            if (result === 'error') {
              this.isClick = true;
              that.verificationCode = '';
              that.getCode();
            }
          });
      } else {
        this.$message.error('验证码错误，请重新输入！');
        this.getCode();
      }
    },
    // 回车登陆
    enterKeyLogin (obj) {
      if (obj === 1) {
        if (this.verificationCode.length >= 5) {
          this.verificationCode = this.verificationCode.substring(0, 4);
        }
      }
      if (event && event.keyCode === 13) {
        this.$refs.loginClick.click();
      }
    }
  }
}
</script>

<style lang="less" scoped>
  /*占位符颜色*/
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #999999;
  }
  input:-moz-placeholder, textarea:-moz-placeholder {
    color: #999999;
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #999999;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #999999;
  }
  #login {
    height: 100%;
    width: 100%;
    overflow: auto;

    .login-box {
      height: 100%;
      width: 100%;
      background-image: url('../assets/image/login_bj_xzsp.png');
      background-size: 100% 100%;
      position: relative;
      overflow: hidden;

      * {
        box-sizing: border-box;
      }

      &-foot{
        position: absolute;
        bottom: 41px;
        font-size: 17px;
        color: #FFFFFF;
        text-align: center;
        width: 100%;
        font-weight: 500;
      }
      &-container {
        width: 500px;
        position: absolute;
        top: 15%;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 1;

        &_hd {
          width: 500px;
          // height: 180px;
          img {
            height: auto;
            width: 500px;
          }
        }

        &_bd {
          min-height: 338px;
          width: 318px;
          margin: 20px auto 0;
          background-color: #ffffff;
          border-radius: 5px;
          padding: 18px 17px 0;
          position: relative;
          background-image: radial-gradient(circle at right 58px, #1485ec, #1485ec 10px, transparent 11px),
          radial-gradient(circle at left 58px, #1d66e3, #1d66e3 10px, transparent 11px);
          .title {
            font-size: 24px;
            line-height: 24px;
            color: #215de2;
            text-align: center;
            font-weight: bold;
            margin-bottom: 15px;
          }

          .title_hr {
            height: 1px;
            background-color: #215de2;
            margin-bottom: 26px;
          }

          .user-it {
            height: 43px;
            width: 258px;
            background-color: #fff;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            border: 1px solid #858585;
            margin: 0 auto;

            img {
              height: 15px;
              width: 14px;
              margin-left: 15px;
              margin-right: 15px;
            }

            input {
              border: none;
              outline: none;
              background-color: #fff;
              height: 30px;
              line-height: 30px;
              color: #666666;
              // width: 180px;
              flex: 1;
            }

            .code {
              height: 35px;
              width: 95px;
              position: relative;
              cursor: pointer;
            }

            .codeBox {
              position: absolute;
              top: -4px;
              right: -9px;
              width: 0.9rem;
              height: 0.4rem;
              background-color: #f8f8f8;
              border-radius: 3px;
            }
          }
          .yzm-div-user-it{
            border: none;
            .yzm-user-it{
              width: 154px;
              height: 43px;
              border: 1px solid #858585;
              border-radius: 5px;
              line-height: 43px;
              padding-left: 15px;
            }
          }

          .first-user-it {
            margin-bottom: 18px;
          }

          .login-type {
            height: 0;
            overflow: hidden;
            display: flex;
            transition: all 0.5s linear;
            flex-wrap: wrap;
            max-height: 0;

            p {
              height: 30px;
              padding: 0 14px;
              line-height: 30px;
              background-color: rgba(255, 255, 255, 0.3);
              border-radius: 15px;
              font-size: 14px;
              color: #ffffff;
              cursor: pointer;
              margin-right: 20px;
              margin-bottom: 20px;

              &:last-child {
                margin-right: 0;
              }
            }

            .is-seleted {
              background-color: #fff;
              color: #1c4094;
            }
          }

          .is-Animation {
            height: auto;
            max-height: 100px;
          }

          .rember-password {
            height: 17px;
            color: #fff;
            font-size: 14px;
            display: flex;
            line-height: 17px;

            .checked {
              width: 17px;
              height: 16px;
              background-color: #2d8cf0;
              border: solid 1px #269af3;
              margin-right: 12px;
              cursor: pointer;
              text-align: center;

              img {
                height: 11px;
                width: 11px;
              }
            }
          }

          .login-btn {
            width: 257px;
            height: 45px;
            background-color: #215de2;
            border-radius: 5px;
            margin: 24px auto 0;
            text-align: center;
            line-height: 40px;
            font-size: 18px;
            color: #fff;
            cursor: pointer;
            letter-spacing: 8px;
          }
        }
      }

      .Department {
        width: 100%;
        padding-bottom: 10px;
        color: white;
        font-size: 14px;
        padding-left: 5px;
      }

      &_ft {
        height: 45px;
        width: 500px;
        text-align: center;
        position: absolute;
        bottom: 2%;
        color: #d5e4ff;
        font-size: 14px;
        left: 0;
        right: 0;
        margin: auto;
        letter-spacing: 3px;

        p:first-child {
          margin-bottom: 10px;
        }
      }

      .user-seleted {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    }
  }
</style>
