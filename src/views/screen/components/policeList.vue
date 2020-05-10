<template>
  <ul class="policeList">
    <li class="policeItem" v-for="(item, index) in data" :key="index">
      <div class="top">
        <div>{{item.parentName}}</div>
        <div>{{item.deptName}}</div>
      </div>
      <div class="bot">
        <div>人数: {{item.deptCount}}</div>
        <div>平台长:{{item.leader}}</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'police-list',
  props: ['data']
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
      padding: 2px 15px 8px;
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
      color: #25f3e6;
    }
  }
}
</style>
