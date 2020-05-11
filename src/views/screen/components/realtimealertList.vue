<!--
 * @Author: gyp
 * @Date: 2020-05-11 09:13:28
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-11 10:01:02
 * @Description: 实时警情列表
 * @FilePath: \sy_kjxc_web\src\views\screen\components\realtimealertList.vue
 -->
<template>
  <ul class="realtimealertList">
    <li class="realtimeItem" v-for="(item, index) in data" :key="index">
      <div class="top">
        <div class="palt">{{ item.palt }}</div>
        <div class="time">{{ item.time }}</div>
      </div>
      <div class="bot">
        <div class="level">{{ item.level }}</div>
        <div class="descri">{{ item.descri }}</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'realtimealert-list',
  props: ['data']
};
</script>
<style lang="less" scoped>
.realtimealertList {
  .realtimeItem {
    padding: 8px 15px;
    border-bottom: solid 1px #2c58a6;
    color: #f2c684;
    font-size: 14px;
    cursor: pointer;
    &:first-of-type {
      padding: 2px 15px 8px;
    }
    .top {
      display: flex;
      .palt {
        width: 65%;
        margin-right: 10px;
      }
      .time {
        width: calc(35% - 10px);
      }
    }
    .bot {
      margin-top: 5px;
      display: flex;
      .level {
        width: 30%;
        margin-right: 10px;
      }
      .descri {
        width: calc(70% - 10px);
      }
    }
    &:hover {
      color: #25f3e6;
    }
  }
}
</style>
