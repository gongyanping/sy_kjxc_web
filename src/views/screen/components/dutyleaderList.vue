<!--
 * @Author: gyp
 * @Date: 2020-05-11 09:13:28
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-11 10:02:50
 * @Description: 大队值班领导列表
 * @FilePath: \sy_kjxc_web\src\views\screen\components\dutyleaderList.vue
 -->
<template>
  <ul class="dutyleaderList">
    <li class="dutyItem" v-for="(item, index) in data" :key="index">
      <span class="addr"> {{ item.name }} </span>
      <span class="person">{{ item.human }}</span>
      <span class="phone">{{ item.phone }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'dutyleader-list',
  props: ['data']
};
</script>
<style lang="less" scoped>
.dutyleaderList {
  .dutyItem {
    padding: 8px 15px;
    border-bottom: solid 1px #2c58a6;
    color: #eee;
    font-size: 14px;
    cursor: pointer;
    &:first-of-type {
      padding: 2px 15px 8px;
    }
    .person {
      margin: 0 8px;
    }
    &:hover {
      color: #25f3e6;
    }
  }
}
</style>
