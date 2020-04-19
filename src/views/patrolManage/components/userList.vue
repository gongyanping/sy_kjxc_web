<template>
  <ul class="userList">
    <li v-for="(item, index) in userList" :key="index">
      <img class="locate" :src="item.icon" />
      <p class="ellipsis">
        <b>姓名：</b>
        <span class="user" @click="handleViewRecord(item)">{{item.userName}}</span>
      </p>
      <p class="parentPlatform ellipsis">
        <b>所属局：</b>
        {{item.parentPlatformName}}
      </p>
      <p class="ellipsis">
        <b>所属平台：</b>
        {{item.platformName}}
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'user-list',
  props: ['userList', 'markers'],
  methods: {
    handleViewRecord (item) {
      const { userId } = item;
      let userRecord = this.markers.filter((item) => {
        if (item.userId === userId) {
          return item;
        }
      })
      userRecord.sort((a, b) => {
        return Date.parse(b.clocktime) - Date.parse(a.clocktime)
      })
      userRecord = userRecord.map((item, index) => {
        item.idx = index + 1;
        return item;
      })
      this.$emit('handleViewRecord', userRecord)
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/styles/index.less';
.userList {
  > li {
    padding: 15px 15px 15px 30px;
    font-size: 14px;
    color: #333333;
    border-bottom: solid 1px #dddddd;
    position: relative;
    .locate {
      position: absolute;
      left: 1px;
      top: 27px;
      width: 30px;
      height: 30px;
      .flex-center();
      justify-content: center;
    }
    .user {
      color: #409EFF;
      cursor: pointer;
      &:hover{
        color: #008CFF;
      }
    }
    .parentPlatform {
      margin: 5px 0;
    }
  }
}
</style>
