<!--
 * @Author: gyp
 * @Date: 2020-05-11 09:13:28
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-04 14:37:18
 * @Description: 大队值班领导列表
 * @FilePath: \sy_kjxc_web\src\views\screen\components\dutyleaderList.vue
 -->
<template>
  <ul class="dutyleaderList">
    <li class="dutyItem" v-for="(item, index) in data" :key="index" @click="onItemClick(item.id, item.userName)">
      <span class="addr"> {{ item.id }} </span>
      <span class="person">{{ item.userName }}</span>
      <span class="phone">{{ item.telephone }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'dutyleader-list',
  props: ['data'],
  methods: {
    onItemClick (userId, userName) {
      this.$emit('onUserClick', userId, 'look', userName);
    }
  }
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
    display: flex;
    &:first-of-type {
      padding: 2px 15px 8px;
    }
    .addr {
      max-width: 40%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
