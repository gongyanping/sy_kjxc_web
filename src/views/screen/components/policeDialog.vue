<!--
 * @Author: gyp
 * @Date: 2020-05-11 20:36:48
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-09 18:06:01
 * @Description: 点击每一个块茎平台，查看它的详情
 * @FilePath: \sy_kjxc_web\src\views\screen\components\policeDialog.vue
 -->
<template>
  <div class="policeDialog">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      @closed="onClosed"
      custom-class="blue"
    >
      <div class="content">
        <ul class="groupList">
          <li class="title">分组情况一览</li>
          <li
            :class="{'active': groupIndex === index}"
            v-for="(item, index) in platformGroupList"
            :key="index"
            @click="onGroupClick(item, index)"
          >{{ item.name }}</li>
        </ul>
        <div class="main">
          <ul class="tabWrap">
            <li :class="{'active': tabIndex === 'user'}" @click="onTabClick('user')">人员列表</li>
            <li :class="{'active': tabIndex === 'equip'}" @click="onTabClick('equip')">所属装备</li>
          </ul>
          <user-table
            :platformGroupId="platformGroupId"
            v-if="tabIndex === 'user'"
            @onUserClick="onUserClick"
          />
          <equip-table
            :platformGroupId="platformGroupId"
            v-if="tabIndex === 'equip'"
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import userTable from './userTable'; // 人员table
import equipTable from './equipTable'; // 设备table
export default {
  name: 'police-dialog',
  components: {
    userTable,
    equipTable
  },
  props: ['policeVisible', 'platformId', 'title'],
  watch: {
    policeVisible (newVal) {
      this.visible = newVal;
      if (this.visible) {
        this.findByPlatformId();
      }
    }
  },
  data () {
    return {
      visible: false, // 弹出框可见性
      platformGroupList: [], // 平台分组数据列表
      groupIndex: 0, // 平台分组样式选中
      platformGroupId: '', // 平台分组id
      tabIndex: 'user' // user:人员 equip:设备
    };
  },
  methods: {
    // 关闭弹出框
    onClosed () {
      this.visible = false;
      this.groupIndex = 0;
      this.tabIndex = 'user';
      this.$emit('onPoliceClose');
    },
    // 根据平台id查询所有小组
    findByPlatformId () {
      this.$api.screen
        .findByPlatformId({
          platformId: this.platformId
        })
        .then(res => {
          if (res.data.code === 0) {
            this.platformGroupList = res.data.data;
            if (this.platformGroupList.length) {
              // 有小组数据，赋值选中第一个
              this.platformGroupId = this.platformGroupList[0].id; // 默认给选中第一项
            }
          }
        });
    },
    /**
     * 分组信息点击查看
     * @param {Object} row 每行的数据
     * @param {Number} index 当前行的索引
     */
    onGroupClick (row, index) {
      const { id } = row;
      this.platformGroupId = id;
      this.groupIndex = index;
    },
    /**
     * tab标签页点击查看
     * @param {String} tab 标签类型标识
     */
    onTabClick (tab) {
      if (this.tabIndex !== tab) {
        this.tabIndex = tab;
      }
    },
    /**
     * 人员的操作
     * @param {String} id 人员id
     * @param {String} type 操作类型
     * @param {String} name 人员名称
     */
    onUserClick (id, type, name) {
      this.$emit('onUserClick', id, type, name);
    }
  }
};
</script>

<style lang="less" scoped>
.policeDialog {
  @media screen and (max-width: 1366px){
    .content {
      height: 480px;
    }
  }
  @media screen and (min-width: 1366px){
    .content {
      height: 600px;
    }
  }
  .content {
    display: flex;
    min-height: 400px;
    font-size: 16px;
    color: #eee;
    .groupList {
      width: 200px;
      height: 100%;
      border: solid 1px #1e6abc;
      box-shadow: 0 0 5px #1e6abc;
      > li {
        &.title {
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          cursor: default;
          &:hover {
            text-shadow: none;
            -webkit-box-shadow: none;
            box-shadow: none;
          }
        }
        &.active {
          color: #1e6abc;
        }
        color: #eee;
        padding: 6px 15px;
        border-bottom: solid 1px #1e6abc;
        cursor: pointer;
        &:hover {
          -webkit-box-shadow: inset 0 0 5px #2c58a6;
          box-shadow: inset 0 0 5px #2c58a6;
        }
      }
    }
    .main {
      width: calc(100% - 220px);
      margin-left: 20px;
      .tabWrap {
        display: flex;
        > li {
          padding: 5px 20px;
          border: solid 1px #1e6abc;
          cursor: pointer;
          &:first-of-type {
            border-right: none;
          }
          &.active {
            background: #152e53;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
