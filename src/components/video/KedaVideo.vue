<template>
  <div ref="videoPage" class="video-page" :style="videoStyle">
    <div class="video-header">
      <!-- <div class="left"><span class="menus">暂停</span><span class="menus">截屏</span></div> -->
      <div class="title">
        {{videoTitle}}
      </div>
      <div class="right" @click="close" style="cursor: pointer">
        <i class="el-icon-close"></i>
      </div>
    </div>
    <div class="video-container">
      <div class="list-menu">
        <vue-custom-scrollbar class="warp" :settings="settings">
          <div v-for="(channel, index) in channels" :key="index" :class="['item', 'menuClass', {active: index === currentIndex}]" @click="startRealPlay(index)"
               style="cursor: pointer;">
            {{channel.channelName}}
          </div>
        </vue-custom-scrollbar>
      </div>
      <div class="video-content">
        <div class="video-play" v-resize="onResize">
          <object class="video-object" id="mcuocx" ref="mcuocx" name="name_mcuocx"
                  classid="clsid:24E9635B-FE64-47A0-B0E0-A76E0E06B3D0"></object>
        </div>
        <div class="video-tool" @dblclick="zoom">
          <i class="iconfont icon-ai08" @click="stopRealPlay"></i>
          <i :class="videoInfo.voiceClass" class="cursorp"  @click="voice"></i>
          <span class="error">{{error}}</span>
          <span class="high" @click="switchQuality">{{videoInfo.highText}}</span>
          <i class="iconfont icon-quanping cursorp" @click="zoom"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 兼容低版本IE
import 'babel-polyfill';
import resize from 'vue-resize-directive';
import vueCustomScrollbar from 'vue-custom-scrollbar';

export default {
  name: 'kedaVideo',
  props: ['videoStyle', 'videoTitle'],
  components: {
    vueCustomScrollbar
  },
  data () {
    return {
      mcuocx: null,
      isInitMcuOcx: false,
      playId: -1,
      windowIndex: 0,
      currentIndex: 0,
      error: '',
      settings: {
        maxScrollbarLength: 10

      },
      loginInfo: {
        ip: '218.76.207.38:82',
        user: 'admin123@kedacom',
        pwd: 'kedacom2019'
      },
      videoInfo: {
        voice: 1,
        voiceClass: 'iconfont icon-shengyinfangda',
        high: 0,
        highText: '清晰',
        recpos: 1,
        ptzCmd: '',
        ptzRange: '',
        level: '',
        holdTime: ''
      },
      channels: []
    };
  },
  watch: {
    'videoInfo.voice': function (newVal) {
      this.videoInfo.voiceClass = newVal ? 'iconfont icon-shengyinfangda' : 'iconfont icon-shengyinguanbi';
    },
    'videoInfo.high': function (newVal) {
      this.videoInfo.highText = newVal ? '流畅' : '清晰';
    }
  },
  methods: {
    close () {
      this.error = '';
      this.$emit('close')
      this.stopRealPlay();
    },
    rightClick () {
      this.showMenu = true
    },
    onResize (div) {
      let vm = this;
      if (vm.mcuocx && vm.isInitMcuOcx) {
        vm.mcuocx.SetWndSize(Math.floor(div.clientWidth), Math.floor(div.clientHeight));
      }
    },
    initMcuOcx () {
      let vm = this;
      vm.mcuocx = vm.$refs.mcuocx;
      if (vm.mcuocx) {
        try {
          vm.mcuocx.Init();
          vm.isInitMcuOcx = true;
        } catch (err) {
          vm.error = 'McuOcx不可用，请使用IE浏览器';
        }
      }
    },
    unInitMcuOcx () {
      let vm = this;
      if (vm.mcuocx && vm.isInitMcuOcx) {
        vm.mcuocx.StopRealPlay(vm.playId, vm.windowId);
        vm.mcuocx.LogOut();
        vm.mcuocx.UnInit();
      }

      return true;
    },
    getLoginInfo () {
      let vm = this;
      let result = '<TLoginInfo>' +
          '<strUser>' + vm.loginInfo.user + '</strUser>' +
          '<strPWD>' + vm.loginInfo.pwd + '</strPWD>' +
          '<strIP>' + vm.loginInfo.ip + '</strIP>' +
          '</TLoginInfo>';
      return result;
    },
    getChannelInfo (index) {
      let vm = this;
      let info = vm.channels[index];
      let result = '<TDEVCHN>' +
          '<strDomainID>' + info.domainId + '</strDomainID>' +
          '<strDeviceID>' + info.puid + '@' + info.domainName + '</strDeviceID>' +
          '<strChn>' + info.channelId + '</strChn>' +
          '<strSrc>' + info.channelId + '</strSrc>' +
          '</TDEVCHN>';
      return result;
    },
    getStreamInfo (index) {
      let vm = this;
      let info = vm.channels[index];
      let result = '<TStream_Param>' +
          '<strServerIp></strServerIp>' +
          '<strServerPort></strServerPort>' +
          '<strManu>' + info.domainName + '</strManu>' +
          '<strHighDefinition>' + vm.videoInfo.high + '</strHighDefinition>' +
          '<strRecPlace>' + vm.videoInfo.recpos + '</strRecPlace>' +
          '</TStream_Param>';

      return result;
    },
    getPTZInfo () {
      let vm = this;
      let result = '<TPtzCmd>' +
          '<strPtzCmd>' + vm.videoInfo.ptzCmd + '</strPtzCmd>' +
          '<strPtzRange>' + vm.videoInfo.ptzRange + '</strPtzRange>' +
          '<strLevel>' + vm.videoInfo.level + '</strLevel>' +
          '<strHoldTime' + vm.videoInfo.holdTime + '</strHoldTime>' +
          '</TPtzCmd>';

      return result;
    },
    startRealPlay (index) {
      let vm = this;
      vm.currentIndex = index;
      if (!vm.mcuocx || !vm.isInitMcuOcx) {
        return;
      }

      vm.stopRealPlay();

      let loginInfo = vm.getLoginInfo();
      let channelInfo = vm.getChannelInfo(index);
      let streamInfo = vm.getStreamInfo(index);
      // let info = vm.channels[index];

      vm.mcuocx.SetWndStyle(1);

      // 0 is tcp;  1 is udp
      vm.mcuocx.SetStreamPattern(1);
      let playId = vm.mcuocx.StartRealPlay(loginInfo, channelInfo, streamInfo, vm.windowIndex)
      if (playId === -1) {
        let code = vm.mcuocx.GetLastErrCode();
        if (code === 40001) {
          vm.error = '浏览失败:' + playId + ' 错误码：' + code;
        } else if (code === 60005) {
          vm.error = '浏览失败: 监控关闭' + playId + ' 错误码：' + code
        } else {
          vm.error = '浏览失败:' + playId + ' 错误码：' + code;
        }
      } else {
        vm.error = '';
        vm.playId = playId;
        vm.mcuocx.SetWndSoundEnable(vm.windowIndex, vm.videoInfo.voice);
      }
    },
    stopRealPlay () {
      let vm = this;
      alert(vm.playId)
      if (vm.playId !== -1) {
        let result = vm.mcuocx.StopRealPlay(vm.playId, vm.windowIndex);
        if (result === -1) {
          let code = vm.mcuocx.GetLastErrCode();
          vm.error = '操作失败：' + result + ', 错误码：' + code;
        } else {
          vm.playId = -1;
          vm.error = '';
        }
      }
    },
    switchQuality () {
      let vm = this;
      if (vm.playId !== -1) {
        vm.videoInfo.high = vm.videoInfo.high ? 0 : 1;
        let channelInfo = vm.getChannelInfo(vm.currentIndex);
        let streamInfo = vm.getStreamInfo(vm.currentIndex);
        let result = vm.mcuocx.SwitchPicQuality(vm.playId, channelInfo, streamInfo, vm.windowIndex);
        if (result === -1) {
          let code = vm.mcuocx.GetLastErrCode();
          vm.error = '操作失败：' + result + ', 错误码：' + code;
        } else {
          vm.error = '';
        }
      }
    },
    zoom () {
      let vm = this;
      if (vm.mcuocx && vm.isInitMcuOcx) {
        vm.mcuocx.PleaseZoom();
      }
    },
    voice () {
      let vm = this;
      alert(vm.videoInfo.voice);
      if (vm.playId !== -1) {
        vm.videoInfo.voice = vm.videoInfo.voice ? 0 : 1;
        alert(vm.videoInfo.voice);
        vm.mcuocx.SetWndSoundEnable(vm.windowIndex, 0);
      }
    },
    play (channels) {
      let vm = this;
      if (channels.length !== 0) {
        vm.currentIndex = 0;
        vm.channels = channels;
        vm.startRealPlay(vm.currentIndex);
      } else {
        vm.channels = [];
      }
    },
    startPlatformRec (index) {
      let vm = this;
      if (vm.playId !== -1) {
        let channelInfo = vm.getChannelInfo(index);
        let result = vm.mcuocx.StartPlatRec(channelInfo);
        if (result === -1) {
          let code = vm.mcuocx.GetLastErrCode();
          vm.error = '操作失败结果：' + vm.playId + ', 错误码：' + code;
        } else {
          vm.error = '';
        }
      }
    }
  },
  mounted () {
    let vm = this;
    vm.initMcuOcx();

    window.onunload = vm.unInitMcuOcx;
  },
  directives: { resize }
}

</script>

<style lang="less" scoped>
  .video-page {
    background: #000000;
    .video-header {
      width: 100%;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      background: #212F3D;
      border-bottom: 0.3px solid #566573;
      .left, .right {
        padding: 8px;
        font-size: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .title {
        flex: 1;
        width: 100%;
        font-size: 0.1rem;
        text-align: center;
        padding: 5px 0px 5px 0px;
      }
    }
    .video-container {
      width: 100%;
      height: calc(100% - 25px);
      display: flex;
      .list-menu {
        width: 60px;
        position: relative;
        background: #212F3D;
        overflow-y: hidden;
        .warp {
          position: absolute;
          margin: auto;
          width: 100%;
          top: 0px;
          bottom: 0px;
          .item {
            width: 100%;
            color: #FFFFFF;
            font-size: 0.1rem;
            text-align: center;
            padding: 5px 0px 5px 0px;
            border-bottom: 0.3px solid #566573;
            &.active {
              background: #152e53;
            }
          }
        }
      }

      .video-content {
        flex: 1;
        position: relative;
        .video-play {
          width: 100%;
          height: calc(100% - 25px);
        }
        .video-play {
          display: flex;
          align-items: center;
        }
        .video-object {
          width: 100%;
          height: 100%;
        }
        .video-tool {
          padding: 4px 5px 4px 5px;
          position: absolute;
          left: 0px;
          right: 0px;
          bottom: 0px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #212F3D;
          color: #FFFFFF;
          .high {
            font-size: 0.1rem;
          }
          .error {
            flex: 1;
            color: #FF0000;
            font-size: 8px;
            margin-left: 10px;
          }
          i {
            margin-left: 2px;
          }
          .cursorp {
            cursor: pointer;
          }
        }
      }
    }
  }

  .menuClass:hover {
    border-bottom: 1px solid #ffffff;
    box-shadow: 0 0 0.05rem #ffffff;
  }
  .menus {
    background: rgba(255,255,255,0.2);
    width: 150%;
    margin-left: 10px;
    color: #fff;
  }
  .menus:hover {
    background: rgba(0,0,0,0.5);
    cursor: pointer;
    color: silver;
  }
</style>
