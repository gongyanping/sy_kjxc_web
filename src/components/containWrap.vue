<!--
 * @Author: gyp
 * @Date: 2020-03-31 13:53:04
 * @LastEditors: gyp
 * @LastEditTime: 2020-04-08 16:59:17
 * @Description: 统一的含标题容器
 * @FilePath: \gs_xzsp_web\src\components\containWrap.vue
 -->

 <template>
    <div class="containWrap" :style="{width: width, height: height}">
      <span class="line_icon"></span>
      <div class="title_wrap">
        <span class="title">{{ title }}</span>
        <slot name="more" />
        <div class="bott_line"></div>
      </div>
      <div class="content_wrap">
        <slot name="content" />
      </div>
    </div>
 </template>

<script>
export default {
  props: {
    title: String,
    width: {
      type: String,
      default () {
        return 'auto'
      }
    },
    height: {
      type: String,
      default () {
        return '100%'
      }
    }
  }
}
</script>

 <style lang="less" scoped>
  @import '~@/styles/index.less';
   .containWrap{
     border: solid 1px #DDDDDD;
     border-top: solid 4px #DDDDDD;
     background: #ffffff;
     box-sizing: border-box;
     position: relative;
     height: 100%;
     .line_icon{
       width: 133px;
       height: 4px;
       background: @themeColor;
       position: absolute;
       top: -4px;
       left: 0;
     }
     .title_wrap{
        height: 46px;
        line-height: 46px;
        position: relative;
        padding: 0 24px;
        display: flex;
        justify-content: space-between;
        .title{
          font-size: 21px;
          font-weight: bold;
          color: @themeColor;
        }
        .bott_line{
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          background:linear-gradient(to left,#ffffff,#dddddd,#ffffff);
        }
     }
     .content_wrap{
       padding: 0 24px;
       height: calc(100% - 46px);
     }
   }
 </style>
