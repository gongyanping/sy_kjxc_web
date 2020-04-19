<!--
 * @Author: gyp
 * @Date: 2020-04-15 10:36:38
 * @LastEditors: gyp
 * @LastEditTime: 2020-04-15 12:37:44
 * @Description: 导航菜单
 * @FilePath: \sy_kjxc_web\src\layout\components\Sidebar\index.vue
 -->

<template>
  <el-menu
    default-active="1-1"
    class="el-menu-vertical-demo"
    :router="true"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">巡逻管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1" route="/patrolPoint">巡逻点管理</el-menu-item>
        <el-menu-item index="1-2" route="/clockinRecord">打卡记录</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
