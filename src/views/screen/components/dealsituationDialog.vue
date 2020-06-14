<!--
 * @Author: gyp
 * @Date: 2020-06-04 16:34:45
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-12 16:52:14
 * @Description: 处警情况弹出框
 * @FilePath: \sy_kjxc_web\src\views\screen\components\dealsituationDialog.vue
-->
<template>
  <div class="dealSituation">
    <el-dialog :title="'处警情况'" :visible.sync="visible" @closed="onClosed" custom-class="blue">
      <div class="content">
        <div class="statisWrap">
          <div class="title">处警情况一览</div>
          <el-scrollbar class="scrollerWrap">
            <div
              :class="['platformInfo', {'active': index === curIndex}]"
              v-for="(item, index) in platformVoList"
              :key="index"
              @click="changeTable(index, item)"
            >
              <div class="basic">
                <div>{{ item.platformName }}</div>
                <div>{{ item.useTime }}</div>
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class="tableWrap">
          <el-table
            :data="tableDetailList"
            border
            :max-height="maxHeight"
            class="blueTable"
            style="100%"
          >
            <el-table-column prop="useTime" label="时长" align="center" />
            <el-table-column prop="JJTime" label="接警时间" align="center" />
            <el-table-column prop="DJTime" label="到警时间" align="center" />
            <el-table-column prop="userName" label="处警民警" align="center" />
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formateTime } from '@/utils/common.js';
export default {
  name: 'dealsituation-dialog',
  data () {
    return {
      visible: true,
      curIndex: 0,
      platformVoList: [
        {
          platformName: 1,
          useTime: 1,
          userVoList: [{
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }, {
            useTime: 1,
            JJTime: 11,
            DJTime: 1,
            userName: 1
          }]
        },
        {
          platformName: 1,
          useTime: 1
        },
        {
          platformName: 1,
          useTime: 1
        },
        {
          platformName: 1,
          useTime: 1
        },
        {
          platformName: 1,
          useTime: 1
        },
        {
          platformName: 1,
          useTime: 1
        },
        {
          platformName: 1,
          useTime: 1
        },
        {
          platformName: 1,
          useTime: 1
        },
        {
          platformName: 1,
          useTime: 1
        },
        {
          platformName: 1,
          useTime: 1
        },
        {
          platformName: 1,
          useTime: 1
        },
        {
          platformName: 1,
          useTime: 1
        },
        {
          platformName: 1,
          useTime: 1
        },
        {
          platformName: 1,
          useTime: 1
        },
        {
          platformName: 1,
          useTime: 1
        },
        {
          platformName: 1,
          useTime: 1
        },
        {
          platformName: 1,
          useTime: 1
        },
        {
          platformName: 1,
          useTime: 1
        },
        {
          platformName: 1,
          useTime: 1
        }
      ],
      tableDetailList: [],
      htmlWidth:
        document.documentElement.clientWidth || document.body.clientWidth,
      maxHeight: 616
    };
  },
  created () {
    this.maxHeight = this.htmlWidth <= 1366 ? 396 : 616;
    // this.getAvgDealAlertTime();
    if (this.platformVoList[0].userVoList) {
      this.tableDetailList = this.platformVoList[0].userVoList;
    } else {
      this.tableDetailList = [];
    }
  },
  methods: {
    getAvgDealAlertTime () {
      this.$api.screen.avgDealAlertTime().then(res => {
        if (res.data.data) {
          this.platformVoList = res.data.data.platformVoList.map(item => {
            item.useTime = formateTime(item.useTime);
            if (item.userVoList && item.userVoList.length) {
              item.userVoList.map(every => {
                every.useTime = formateTime(every.useTime);
              });
            }
            return item;
          });
        }
      });
    },
    changeTable: function (index, row) {
      const { userVoList } = row;
      this.curIndex = index;
      if (userVoList) {
        this.tableDetailList = userVoList;
      } else {
        this.tableDetailList = [];
      }
    },
    onClosed () {
      this.$emit('onDealsituaClose');
    }
  }
};
</script>

<style lang="less" scoped>
.dealSituation {
  @media screen and (max-width: 1366px) {
    .content {
      height: 396px;
    }
  }
  @media screen and (min-width: 1367px) {
    .content {
      height: 618px;
    }
  }
  .content {
    display: flex;
    .statisWrap {
      width: 280px;
      height: 100%;
      border: 1px solid #1e6abc;
      box-shadow: 0 0 5px #1e6abc;
      .title {
        width: 100%;
        width: 100%;
        height: 48px;
        color: #25f3e6;
        line-height: 48px;
        font-size: 18px;
        padding: 0 10px;
        color: #25f3e6;
      }
      .scrollerWrap {
        width: 100%;
        height: calc(100% - 48px);
        padding: 0 5px;
        .platformInfo {
          border: 1px solid #1e6abc;
          margin-bottom: 10px;
          color: #fff;
          &.active {
            background: #152e53;
          }
          &:hover {
            box-shadow: 0 0 5px #1e6abc;
            text-shadow: 0 0 3px #fff;
          }
          .basic {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            font-size: 16px;
            cursor: pointer;
          }
        }
      }
    }
    .tableWrap {
      width: calc(100% - 300px);
      margin-left: 20px;
      height: 100%;
    }
  }
  @media screen and (max-width: 1366px){
    /deep/ .blue.el-dialog {
      height: 500px;
    }
  }
}
</style>
