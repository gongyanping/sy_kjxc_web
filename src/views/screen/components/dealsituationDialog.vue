<!--
 * @Author: gyp
 * @Date: 2020-06-04 16:34:45
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-05 11:27:43
 * @Description: 处警情况弹出框
 * @FilePath: \sy_kjxc_web\src\views\screen\components\dealsituationDialog.vue
-->
<template>
  <div class="dealSituation">
    <el-dialog
      :title="'处警情况'"
      :visible.sync="visible"
      @closed="onClosed"
      custom-class="blue"
    >
      <div class="content">
        <div class="statisWrap">
          <div class="title">
            处警情况一览
          </div>
          <el-scrollbar class="scrollerWrap">
            <div
              :class="['platformInfo', {'active': index === curIndex}]"
              v-for="(item, index) in platformArray"
              :key="index"
              @click="changeTable(index, item.list)"
            >
              <div class="basic">
                <div>{{ item.name }}</div>
                <div>{{ item.time }}</div>
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class="tableWrap">
          <el-table :data="tableDetailList" border class="blueTable" style="100%">
            <el-table-column prop="time" label="时长" align="center" />
            <el-table-column prop="btime" label="接警时间" align="center" />
            <el-table-column prop="etime" label="到警时间" align="center" />
            <el-table-column prop="human" label="处警民警" align="center" />
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dealsituation-dialog',
  data () {
    return {
      visible: true,
      curIndex: 0,
      platformArray: [{
        name: '大祥城南公园5号平台',
        time: '2\'55',
        list: [{
          btime: '07:18:33',
          etime: '07:20:43',
          time: '2\'55',
          human: '张绍,刘洋'
        }, {
          btime: '07:19:33',
          etime: '07:21:43',
          time: '2\'55',
          human: '李涛,张林'
        }, {
          btime: '08:15:33',
          etime: '08:18:26',
          time: '2\'57',
          human: '张绍,张林'
        }, {
          btime: '08:18:33',
          etime: '08:20:33',
          time: '2\'55',
          human: '李涛,刘洋'
        }, {
          btime: '09:44:12',
          etime: '09:45:33',
          time: '2\'53',
          human: '张绍,张林'
        }]
      }, {
        name: '大祥雪峰南路3号平台',
        time: '2\'54',
        list: [{
          btime: '07:18:33',
          etime: '07:20:43',
          time: '2\'56',
          human: '刘军民,邵峰'
        }, {
          btime: '07:19:33',
          etime: '07:21:51',
          time: '2\'52',
          human: '迪亚,毕鑫福'
        }, {
          btime: '09:15:33',
          etime: '09:18:26',
          time: '2\'50',
          human: '刘军民,毕鑫福'
        }, {
          btime: '09:19:33',
          etime: '09:20:33',
          time: '2\'58',
          human: '迪亚,邵峰'
        }]
      }, {
        name: '北塔汽车北站2号平台',
        time: '2\'58',
        list: [{
          btime: '08:18:33',
          etime: '08:21:05',
          time: '2\'57',
          human: '柯文,王建国'
        }, {
          btime: '08:19:33',
          etime: '08:21:51',
          time: '2\'59',
          human: '刘明礼,王建国'
        }, {
          btime: '09:15:33',
          etime: '09:18:26',
          time: '2\'58',
          human: '刘明礼,柯文'
        }, {
          btime: '09:19:33',
          etime: '09:20:33',
          time: '2\'58',
          human: '迪亚,邵峰'
        }]
      },
      {
        name: '绥宁中心街2号平台',
        time: '2\'55',
        list: [{
          btime: '07:18:33',
          etime: '07:20:43',
          time: '2\'50',
          human: '张绍,刘洋'
        }, {
          btime: '07:19:33',
          etime: '07:21:43',
          time: '2\'50',
          human: '李涛,张林'
        }, {
          btime: '08:15:33',
          etime: '08:18:26',
          time: '2\'57',
          human: '张绍,张林'
        }, {
          btime: '08:18:33',
          etime: '08:20:33',
          time: '2\'56',
          human: '李涛,刘洋'
        }, {
          btime: '08:44:12',
          etime: '08:45:33',
          time: '2\'58',
          human: '张绍,张林'
        }]
      },
      {
        name: '北塔江北广场1号平台',
        time: '2\'52',
        list: [{
          btime: '08:18:33',
          etime: '08:20:43',
          time: '2\'50',
          human: '刘军民,邵峰'
        }, {
          btime: '08:19:33',
          etime: '08:21:51',
          time: '2\'58',
          human: '迪亚,毕鑫福'
        }, {
          btime: '09:15:33',
          etime: '09:18:26',
          time: '2\'57',
          human: '刘军民,毕鑫福'
        }, {
          btime: '09:19:33',
          etime: '09:20:33',
          time: '2\'50',
          human: '迪亚,邵峰'
        }]
      },
      {
        name: '大祥城南公园5号平台',
        time: '2\'57',
        list: [{
          btime: '07:17:33',
          etime: '07:20:28',
          time: '2\'55',
          human: '何民,邵铁民'
        }, {
          btime: '08:15:33',
          etime: '08:18:31',
          time: '2\'58',
          human: '廖凡,朱希文'
        }, {
          btime: '08:19:13',
          etime: '08:22:12',
          time: '2\'59',
          human: '朱希文,何民'
        }, {
          btime: '09:18:13',
          etime: '09:20:39',
          time: '2\'56',
          human: '邵铁民,匡觉铭'
        }]
      }],
      tableDetailList: []
    };
  },
  created () {
    this.tableDetailList = this.platformArray[0].list;
  },
  methods: {
    changeTable: function (index, list) {
      this.curIndex = index;
      this.tableDetailList = list;
    },
    onClosed () {
      this.$emit('onDealsituaClose');
    }
  }
};
</script>

<style lang="less" scoped>
.dealSituation {
  .content {
    display: flex;
    height: 100%;
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
        height: clac(100% - 48px);
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
            justify-content:space-between;
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

  /deep/ .blue.el-dialog {
    height: 600px;
  }
}
</style>
