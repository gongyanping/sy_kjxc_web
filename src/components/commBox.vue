<!--
 * @Author: gyp
 * @Date: 2020-05-08 13:53:04
 * @LastEditors: gyp
 * @LastEditTime: 2020-05-08 17:29:11
 * @Description: 统一的有边框的容器
 * @FilePath: \sy_kjxc_web\src\components\commBox.vue
 -->

<template>
  <div :class="['mybox', customStyle]">
    <div class="top-left"></div>
    <div class="top-right"></div>
    <div class="bottom-left"></div>
    <div class="bottom-right"></div>
    <div class="content_wrap">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customStyle: {
      type: String,
      default () {
        return '';
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/index.less";
.mybox {
  .commBorder();
  box-sizing: border-box;
  position: relative;
  .top-left {
    width: 10px;
    height: 10px;
    border-left: 2px solid #5ab1ef;
    border-top: 2px solid #5ab1ef;
    position: absolute;
    left: -1px;
    top: -1px;
  }

  .top-right {
    width: 0.1rem;
    height: 0.1rem;
    border-right: 0.02rem solid #5ab1ef;
    border-top: 0.02rem solid #5ab1ef;
    position: absolute;
    right: -0.01rem;
    top: -0.01rem;
  }

  .bottom-left {
    width: 0.1rem;
    height: 0.1rem;
    border-left: 0.02rem solid #5ab1ef;
    border-bottom: 0.02rem solid #5ab1ef;
    position: absolute;
    left: -0.01rem;
    bottom: -0.01rem;
  }

  .bottom-right {
    width: 0.1rem;
    height: 0.1rem;
    border-right: 0.02rem solid #5ab1ef;
    border-bottom: 0.02rem solid #5ab1ef;
    position: absolute;
    right: -0.01rem;
    bottom: -0.01rem;
  }
}

.content_wrap {
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
