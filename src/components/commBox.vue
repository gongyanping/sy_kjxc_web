<!--
 * @Author: gyp
 * @Date: 2020-05-08 13:53:04
 * @LastEditors: gyp
 * @LastEditTime: 2020-06-01 17:00:51
 * @Description: 统一的有边框的容器
 * @FilePath: \sy_kjxc_web\src\components\commBox.vue
 -->

<template>
  <div :class="['mybox', customStyle]">
    <div class="top-left"></div>
    <div class="top-right"></div>
    <div class="bottom-left"></div>
    <div class="bottom-right"></div>
    <div :class="[{'title': title}, titleStyle]" @click="onClick(title)">{{ title }}</div>
    <div class="content_wrap">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String, // 标题
    titleStyle: {
      // 标题样式
      type: String,
      default () {
        return '';
      }
    },
    customStyle: {
      // 容器样式
      type: String,
      default () {
        return '';
      }
    }
  },
  methods: {
    onClick (name) {
      this.$emit('onTitleClick', name)
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
  .border-common{
    width: 10px;
    height: 10px;
    position: absolute;
  }
  .top-left {
    .border-common();
    border-left: 2px solid #5ab1ef;
    border-top: 2px solid #5ab1ef;
    left: -1px;
    top: -1px;
  }

  .top-right {
    .border-common();
    border-right: 2px solid #5ab1ef;
    border-top: 2px solid #5ab1ef;
    right: -1px;
    top: -1px;
  }

  .bottom-left {
    .border-common();
    border-left: 2px solid #5ab1ef;
    border-bottom: 2px solid #5ab1ef;
    left: -1px;
    bottom: -1px;
  }

  .bottom-right {
    .border-common();
    border-right: 2px solid #5ab1ef;
    border-bottom: 2px solid #5ab1ef;
    right: -1px;
    bottom: -1px;
  }
}

// 公用的标题
.title {
  font-size: 18px;
  color: #25f3e6;
  text-shadow: 0 0 5px #25f3e6;
  height: 40px;
  .flex-center();
  padding: 0 10px;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
}

.content_wrap {
  padding: 0;
  width: 100%;
  height: calc(100% - 40px);
}

// 颜色
.orange {
  color: #ffa500;
  text-shadow: 0 0 5px #fda500;
}
</style>
