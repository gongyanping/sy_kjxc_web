<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {}
}
</script>

<style lang="less">
@import './styles/index.less';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    width: 100%;
    overflow: hidden;
    font-size: 16px;
  }
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .uploadTitile {
    font-size: 12px;
    color: #999;
  }
  .el-collapse-item__header {
    padding-left: 30px;
  }
  /*统一设置messageBox*/
  .el-message {
    min-width: 300px;
    top: 80px !important;
  }
  /*改树形菜单样式*/
  .tree_menu .el-tree-node__label {
    padding-left: 0 !important;
  }
  /*不显示绿色边框*/
  .el-form-item.is-success .el-input__inner,
  .el-form-item.is-success .el-input__inner:focus,
  .el-form-item.is-success .el-textarea__inner,
  .el-form-item.is-success .el-textarea__inner:focus {
    border-color: #dcdfe6 !important;
  }
  .el-input.is-disabled .el-input__inner,
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff !important;
    color: #606266 !important;
  }

  .el-select-dropdown__item {
    /*color: #606266 !important;*/
    font-weight: normal !important;
    max-width: 990px !important;
    height: auto !important;
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
  }

  .row-hd .el-row {
    overflow: hidden;
    width: 100%;
  }
  .el-row {
    /*overflow: hidden!important;*/
    width: 100% !important;
  }
  /*全局添加高度*/
  .el-button--small {
    /*margin-left: 10px;*/
  }
  .search {
    position: relative;
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .search .el-input {
    width: 220px !important;
  }

  .search .el-input__inner {
    height: 30px;
    line-height: 30px;
    padding-left: 35px;
    box-sizing: border-box;
  }
  .search .el-button {
    width: 40px;
    padding: 0;
    margin-left: 10px;
    font-size: 12px;
    color: #fff;
    background: #2d8cf0;
  }
  .search .icon {
    width: 16px;
    height: 16px;
    display: block;
    position: absolute;
    top: 28px;
    left: 8px;
    z-index: 999;
    background: url('./assets/img/search_icon.png');
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
  }

  .globalIstyle {
    font-size: 16px;
  }
  /*全局lebel行高*/
  .el-form-item__label {
    line-height: 18px;
    padding-top: 11px;
  }

  /*全局的线条(步骤)样式*/
  .hcontent {
    padding: 0 18px;
  .clearfix {
    position: relative;
  .font {
    margin-left: 30px;
  }
  .numberindex {
    position: absolute;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    background-color: #2698ff;
    color: white;
    font-size: 12px;
  }
  }
  }
  .tableContent {
    /*padding-top: 40px;*/
    position: relative;
  .linkLine {
    position: absolute;
    width: 1px;
    border-left: 1px solid #2698ff;
    top: 40px;
    left: 49px;
    bottom: 0;
  }
  }
  /*给原生html写的表格添加斑马纹*/
  .isOdd {
    background-color: #fafafa !important;
  }

  .isOdd:hover {
    background-color: #f5f7fa !important;
  }
  /*全局弹窗按钮样式*/
  .el-button {
    font-size: 12px;
    /*padding: 9px 15px;*/
  }
  .el-button:hover {
    transition: all 0.3s linear !important;
  }
  /*给form表单强行加上星星表示必填项*/
  .requireItem .el-form-item__label::before {
    content: '*';
    display: inline-block;
    margin-right: 4px;
    /*line-height: 10px;*/
    vertical-align: 3px;
    font-family: SimSun;
    font-size: 10px;
    color: #f56c6c;
  }
  /*修改elementui按钮样式*/
  .btn-el {
    padding: 8px 15px;
  }
  //修改上传文件名称长度
    .fileName .el-upload-list__item-name {
      width: 380px;
    }
  .fileName1 .el-upload-list__item-name {
    width: 380px;
  }
  .fileName1 .el-upload__tip {
    margin-top: 0;
  }
  .fileName .el-upload {
    float: left;
  }
  .fileName .el-upload-list {
    float: left;
  }
  .searchClass .el-input {
    width: 180px !important;
    margin-right: 10px;
  }
  body {
    min-width: 95%;
  }
  // .more-dropdown {
  //   margin-right: 10px;
  //   font-size: 25px;
  //   cursor: pointer;
  //   color: #2698ff;
  // }
  .el-input__icon {
    line-height: 30px !important;
  }

  .el-tooltip__popper {
    max-width: 80%;
    word-wrap: break-word;
  }
  /*iview  遮罩*/
  .ivu-drawer-wrap {
    background: rgba(0, 0, 0, 0.4);
    pointer-events: visiblepainted !important;
    transition: all 0.5s;
  }
  .tableHeadBack .el-table thead tr th {
    background: #f5f7fa !important;
  }
  .treeTable th.el-table_2_column_14 {
    text-align: center !important;
  }
  /*去除element ui表单中错误提示信息的外轮廓*/
  .el-form-item__error{
    outline: none;
  }
  /*输入框字数统计样式修改*/
  .el-textarea .el-input__count{
    line-height: 20px;
    bottom: auto!important;
  }
  .el-popover{
    width: 500px!important;
  }
  .el-tag {
    margin-right: 10px;
  }
  ::-webkit-scrollbar {/*隐藏滚轮*/
    display: none;
  }
</style>
