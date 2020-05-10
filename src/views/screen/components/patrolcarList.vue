<template>
  <ul class="patrolcarList">
    <li class="patrolcarItem" v-for="(item, index) in data" :key="index">
        <div class="car">{{item.car}}</div>
        <div class="status">{{item.status}}</div>
        <el-button size="mini" class="bt-tool">监控</el-button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'patrolcar-list',
  props: ['data']
};
</script>
<style lang="less" scoped>
.patrolcarList {
  .patrolcarItem {
    padding: 8px 15px;
    border-bottom: solid 1px #2c58a6;
    color: #eee;
    font-size: 14px;
    display: flex;
    align-items: center;
    .car, .status{
        flex: 1;
    }
    .bt-tool {
        background: #214682;
        border: solid 1px #2c58a6;
        color: #fda502;
        &:hover {
            color: #fff;
        }
    }
  }
}
</style>
