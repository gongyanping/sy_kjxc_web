<template>
  <ul class="clockinList">
    <li>
      <el-button type="primary" plain size="small" @click="goBack">返回</el-button>
    </li>
    <li v-for="(item, index) in recordList" :key="index">
      <div class="locate" @click="handleLocate(item)">
        <img :src="item.icon" />
        <span>{{ item.idx }}</span>
      </div>
      <div class="top">
        <span :title="item.userName">姓名：{{item.userName}}</span>
        <span :title="item.clocktime">打卡时间：{{item.clocktime}}</span>
      </div>
      <div class="center">
        <div class="center-left">
          <span class="one">打卡类型：{{typeOptions[parseInt(item.type)]}}</span>
          <span class="one">
            打卡状态：
            <span
              :class="{'red':['0','3','4'].includes(item.state), 'green': ['1','2','5'].includes(item.state)}"
            >
              <span v-if="['0','3','4'].includes(item.state)">未打卡</span>
              <span v-if="['1','2','5'].includes(item.state)">已打卡</span>
              <span v-if="!['0', '1'].includes(item.state)" :title="punchclockName[item.state]">
                <span>-</span>{{punchclockName[item.state]}}
              </span>
            </span>
          </span>
          <span :title="item.spotName" class="two">打卡点名：{{item.spotName}}</span>
          <span :title="item.address" class="two">具体地点：{{item.address}}</span>
        </div>
        <el-popover
          placement="left-start"
          :title="item.name"
          width="500"
          v-if="item.picUrl && item.picUrl.length"
        >
          <el-carousel>
            <el-carousel-item v-for="(picOne, index) in item.picUrl" :key="index">
              <img :src="picOne" style="width:100%;height:auto" />
            </el-carousel-item>
          </el-carousel>
          <el-button
            type="primary"
            plain
            size="small"
            slot="reference"
          >查看图片</el-button>
        </el-popover>
        <el-button
          v-else
          type="primary"
          plain
          size="small"
          @click="viewNopic"
        >查看图片</el-button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'clockin-list',
  props: ['recordList', 'punchclockList'],
  data () {
    return {
      typeOptions: ['', '手机', '指纹']
    };
  },
  created () {
    this.punchclockName = this.punchclockList.map(item => item.name);
  },
  methods: {
    handleLocate (row) {
      const { lon, lat } = row;
      this.$emit('handleLocate', lon, lat);
    },
    viewNopic () {
      this.$message.error('暂无图片');
    },
    goBack () {
      this.$emit('setTabIndex', 1);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/index.less";
.clockinList {
  width: 100%;
  > li {
    position: relative;
    .locate {
      position: absolute;
      left: 1px;
      top: 27px;
      width: 30px;
      height: 30px;
      color: #ffffff;
      cursor: pointer;
      .flex-center();
      justify-content: center;
      > img {
        width: 30px;
      }
      > span {
        position: absolute;
        top: 3px;
        font-size: 12px;
      }
    }
    padding: 15px 15px 15px 30px;
    font-size: 14px;
    color: #333333;
    border-bottom: solid 1px #dddddd;
    position: relative;
    .top {
      .flex-center();
      > span {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:first-of-type {
          width: 38%;
          margin-right: 10px;
        }
        &:nth-last-of-type {
          width: calc(62% - 10px);
        }
      }
    }
    .center {
      .flex-center();
      margin-top: 12px;
      .center-left {
        width: 68%;
        margin-right: 15px;
        .one,
        .two {
          width: 100%;
          display: inline-block;
          .ellipsis();
        }
        .red {
          color: red;
        }
        .green {
          color: #01a401;
        }
      }

      .three {
        padding: 0;
      }
    }
  }
}
</style>
