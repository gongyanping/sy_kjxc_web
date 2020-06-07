<!--
 * @Author: gyp
 * @Date: 2020-05-11 09:13:28
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-03 10:43:24
 * @Description: 巡检车辆列表
 * @FilePath: \sy_kjxc_web\src\views\screen\components\patrolcarList.vue
 -->
<template>
  <ul class="patrolcarList">
    <li class="patrolcarItem" v-for="(item, index) in data" :key="index">
      <div class="car">{{ item.carCode }}</div>
      <div class="status">{{ item.jsonText && item.jsonText.speed && item.jsonText.speed > 0 ? '行驶中' : '暂停中'}}</div>
      <el-button size="mini" class="bt-tool" @click="monitor(item)">监控</el-button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'patrolcar-list',
  props: ['data'],
  methods: {
    monitor (row) {
      this.$emit('monitorCar', row)
    }
  }
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
    .car,
    .status {
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
