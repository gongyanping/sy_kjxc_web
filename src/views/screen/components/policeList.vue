<!--
 * @Author: gyp
 * @Date: 2020-05-09 08:56:33
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-11 21:51:03
 * @Description: 快警平台信息列表
 * @FilePath: \sy_kjxc_web\src\views\screen\components\policeList.vue
 -->
<template>
  <ul class="policeList">
    <li class="policeItem" v-for="(item, index) in data" :key="index" @click="onClick(item)">
      <div class="top">
        <div>{{ item.parentName }}</div>
        <div>{{ item.name }}</div>
      </div>
      <div class="bot">
        <div>人数: {{ item.userNum }}</div>
        <div>{{ item.platformLeaderName ? '平台长：' + item.platformLeaderName : ''}}</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'police-list',
  props: ['data'],
  methods: {
    /**
     * 点击每行的操作
     * @param {Object} row 每行的数据
     */
    onClick (row) {
      this.$emit('onPoliceOpen', row);
    }
  }
};
</script>
<style lang="less" scoped>
.policeList {
  .policeItem {
    padding: 8px 15px;
    border-bottom: solid 1px #2c58a6;
    color: #eee;
    font-size: 14px;
    cursor: pointer;
    &:first-of-type {
      padding: 6px 15px 8px;
    }
    .top,
    .bot {
      display: flex;
      justify-content: space-between;
    }
    .bot {
      margin-top: 5px;
    }
    &:hover {
      text-shadow: 0 0 3px #fff;
      box-shadow: inset 0 0 5px #2C58A6;
    }
  }
}
</style>
