<!--
 * @Author: gyp
 * @Date: 2020-03-23 23:57:51
 * @LastEditors: gyp
 * @LastEditTime: 2020-04-14 16:06:02
 * @Description:
 * @FilePath: \gs_xzsp_web\src\layout\components\Sidebar\index.vue
 -->
<template>
  <div class="sideBar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :background-color="'#ffffff'"
        :unique-opened="true"
        :active-text-color="'#0654B4'"
        :collapse-transition="true"
        @select="handleSelect"
        mode="vertical"
      >
        <sidebar-item v-for="item in data" :key="item.id" :item="item" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem';

export default {
  components: { SidebarItem },
  computed: {},
  data () {
    return {
      data: [
      ]
    };
  },
  methods: {
    handleSelect (key) {
      console.log(key)
      this.$store.commit('SET_fstmenuId', key);
      this.$store.commit('GET_UPDATENUM', UPDATE => {
        // 更新二级菜单点击次数，解决二级菜单目录重复点击无法刷新的问题
        this.$store.commit('SET_UPDATENUM', UPDATE + 1);
      });
    }
  },
  mounted () {
    // 获取一级菜单
    this.$api.sys
      .findAllByRole()
      .then(resp => {
        if (resp.data.code === 0) {
          resp.data.data.forEach(element => {
            element.checked = false;
          });
          this.data = resp.data.data;
          console.log(this.data);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>

<style lang="less" scoped>
.sideBar {
  height: calc(100% - 190px);
}
</style>
<style lang="less">
.sideBar {
  padding-right: 13px;
  padding-left: 13px;
  .el-scrollbar {
    height: 100%;
    overflow-x: hidden !important;
    overflow-y: auto;
    .el-scrollbar__wrap {
      overflow-x: hidden;
      overflow-y: auto;
      height: 100%;
      margin: 0 !important;
      .el-menu {
        border: none;
      }
    }
  }
}
</style>
