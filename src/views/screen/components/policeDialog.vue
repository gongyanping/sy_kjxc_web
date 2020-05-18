<!--
 * @Author: gyp
 * @Date: 2020-05-11 20:36:48
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-18 15:12:28
 * @Description: 点击每一个块茎平台，查看它的详情
 * @FilePath: \sy_kjxc_web\src\views\screen\components\policeDialog.vue
 -->
<template>
  <div class="policeDialog">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      @closed="onClosed"
      width="60%"
      custom-class="blue"
    >
      <div class="content">
        <ul class="groupList">
          <li class="title">
            分组情况一览
          </li>
          <li :class="groupIndex === index" v-for="(item, index) in platformGroupList" :key="index" @click="onGroupClick(item, index)">
            {{ item.name }}
          </li>
        </ul>
        <div class="main">
          <ul class="tabWrap">
            <li :class="tabIndex === 'user'" @click="onTabClick('user')">人员列表</li>
            <li :class="tabIndex === 'equip'" @click="onTabClick('equip')">所属装备</li>
          </ul>
          <dutyleader-dialog v-if="tabIndex === 'user'" />
          <equip-table v-if="tabIndex === 'equip'" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import dutyleaderDialog from './dutyleaderDialog'; // 人员table
import equipTable from './equipTable'; // 设备table
export default {
  name: 'police-dialog',
  components: {
    dutyleaderDialog,
    equipTable
  },
  props: ['policeVisible', 'title'],
  watch: {
    policeVisible (newVal) {
      this.visible = newVal;
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
  created () {
    this.findByPlatformId(); // 分组列表
    this.getUserList(); // 人员列表
  },
  methods: {
    // 关闭弹出框
    onClosed () {
      this.visible = false;
      this.$emit('onPoliceClose');
    },
    // 根据平台id查询所有小组
    findByPlatformId () {
      this.$api.screen.findByPlatformId()
        .then(res => {
          if (res.data.code === 0) {
            this.platformGroupList = res.data.data;
            if (this.platformGroupList.length) {
              // 有小组数据，赋值选中第一个
              this.platformGroupId = this.platformGroupList[0].id; // 默认给选中第一项
            }
          }
        })
    },
    // 人员列表
    getUserList () {
      if (this.platformGroupId) {
        // 分组id是必传
        let params = {
          groupId: this.platformGroupId
        }
        this.$api.screen.findUserVo(params)
          .then(res => {
            if (res.data.code === 0) {
              this.userData = res.data.data;
            }
          })
      }
    },
    // 设备列表
    getEquipList () {
      let params = {
        groupId: this.findEquipmentForGroupId
      }
      this.$api.findUserVo(params)
        .then(res => {
          if (res.data.code === 0) {
            this.equipData = res.data.data;
          }
        })
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
      if (this.tabIndex === 'user') {
      // 人员列表
        this.getUserList();
      } else {
        // 设备列表
        this.getEquipList();
      }
    },
    /**
     * tab标签页点击查看
     * @param {String} tab 标签类型标识
     */
    onTabClick (tab) {
      if (this.tabIndex !== tab) {
        this.tabIndex = tab;
        if (tab === 'user') {
          this.getUserList();
        } else {
          this.getEquipList();
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.policeDialog {
  .content {
    display: flex;
    height: 685px;
    .groupList {
      width: 200px;
      height: 100%;
      border: solid 1px #1e6abc;
      box-shadow: 0 0 5px #1e6abc;
    }
  }
}
</style>
