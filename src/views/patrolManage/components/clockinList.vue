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
          <span :title="item.state" class="one">打卡状态：<span :class="[item.state === '0' ? 'red' : 'green']">{{item.state === '0' ? '未打卡' : '已打卡' }}</span></span>
          <span :title="item.spotName" class="two">打卡点名：{{item.spotName}}</span>
          <span :title="item.address" class="two">具体地点：{{item.address}}</span>
        </div>
        <el-popover placement="left-start" :title="item.name" width="500">
          <el-carousel>
            <el-carousel-item v-for="item in 2" :key="item">
              <img
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                style="width:100%;height:auto"
              />
            </el-carousel-item>
          </el-carousel>
          <el-button
            type="primary"
            plain
            size="small"
            slot="reference"
            @click="viewPic(item.userId)"
          >查看图片</el-button>
        </el-popover>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'clockin-list',
  props: ['recordList'],
  data () {
    return {
      typeOptions: ['', '手机', '指纹']
    };
  },
  methods: {
    handleLocate (row) {
      const { lon, lat } = row;
      this.$emit('handleLocate', lon, lat);
    },
    viewPic () {
      this.$api.clockinRecord
        .selectPicByDetailsId({
          patrolClockDetailsId: '44287282999045208df0ec444510dbf0'
        })
        .then(res => {
          console.log(res);
        });
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
          color: green;
        }
      }

      .three {
        padding: 0;
      }
    }
  }
}
</style>
