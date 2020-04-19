<template>
  <div id="SidebarItem">
    <template v-if="!item.childList||item.childList.length === 0">
      <router-link :to="item.url || ''">
        <el-menu-item
          :index="item.id"
          class="submenu-title-noDropdown"
          @click="handleItemClick(item)"
        >
          <div slot="title" :class="{firstTitleColor:item.checked&&item.parentId==='0'}">
            <img
              :src="item.menuPicture"
              class="title_img"
              v-if="item.parentId==='0'&&item.menuPicture"
            />
            <div
              :class="{title_circle_bule:true,title_circle_gray:!item.checked}"
              v-if="item.parentId!=='0'"
            ></div>
            <span
              :class="{title_span:true,w2:item.name.length===2?true:false,w3:item.name.length===3?true:false,text_color:item.checked}"
            >{{item.name}}</span>
            <!--<item :icon="item.image" :title="item.name" />-->
          </div>
        </el-menu-item>
      </router-link>
    </template>

    <el-submenu v-else :index="item.id">
      <div
        slot="title"
        @click="handleItemClick(item)"
        :class="{firstTitleColor:item.checked&&item.parentId==='0'}"
      >
        <img :src="item.menuPicture" class="title_img" v-if="item.parentId==='0'&&item.menuPicture" />
        <div
          :class="{title_circle_bule:true,title_circle_gray:!item.checked}"
          v-if="item.parentId!=='0'"
        ></div>
        <span
          :class="{title_span:true,w2:item.name.length===2?true:false,w3:item.name.length===3?true:false,text_color:item.checked}"
        >{{item.name}}</span>
        <!--<item :icon="item.image" :title="item.name" />-->
      </div>
      <sidebar-item
        v-for="child in item.childList"
        :key="child.id"
        :item="child"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: ['item'],
  methods: {
    handleItemClick (item) {
      if (this.$store.state.lastChecked) {
        this.$store.state.lastChecked.checked = false;
      }
      item.checked = true;
      this.$store.state.lastChecked = item;
    }
  }
};
</script>
<style lang="less">
#SidebarItem {
  .firstTitleColor {
    background: rgba(242, 248, 253, 1);
  }
  .el-menu-item,
  .el-submenu__title {
    height: 66.67px;
    line-height: 66.67px;
  }
  .el-menu-item,
  .el-submenu__title {
    padding: 0 !important;
  }
  .title_circle_bule {
    width: 11px;
    height: 11px;
    background: rgba(0, 80, 179, 1);
    border-radius: 50%;
    opacity: 1;
    display: inline-block;
    margin-left: 32.5px;
    margin-right: 32.5px;
  }
  .title_circle_gray {
    background: #dbdbdb;
  }
  .title_img {
    width: 32px;
    height: 32px;
    margin-right: 18.67px;
    margin-left: 25.33px;
  }
  .title_span {
    width: 4em;
    height: 16px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 32px;
    color: rgba(51, 51, 51, 1);
    opacity: 1;
  }
  .w2 {
    letter-spacing: 2em; /*如果需要y个字两端对齐，则为(x-y)/(y-1),这里是（4-2）/(2-1)=2em */
    margin-right: -2em;
  }
  .w3 {
    letter-spacing: 0.5em; /*如果需要y个字两端对齐，则为(x-y)/(y-1),这里是（4-3）/(3-1)=0.5em */
    margin-right: -0.5em;
  }
  .text_color {
    color: #0654b4;
  }
}
</style>
