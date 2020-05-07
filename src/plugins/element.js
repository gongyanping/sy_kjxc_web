/*
 * @Author: gyp
 * @Date: 2020-03-17 09:42:11
 * @LastEditors: gyp
 * @LastEditTime: 2020-03-25 16:59:53
 * @Description: 按需引入element-ui的组件
 * @FilePath: \gs_xzsp_web\src\plugins\element.js
 */
import Vue from 'vue'
import { Container, Header, Aside, Main, Carousel, CarouselItem, TimePicker, Button, Alert, Image, Tooltip, Tree, Row, Col, Radio, Input, InputNumber, RadioGroup, RadioButton, Popover, Table, TableColumn, Pagination, Icon, Form, FormItem, Select, Option, DatePicker, Menu, Submenu, MenuItem, MenuItemGroup, Progress, Scrollbar, Tabs, TabPane, Checkbox, CheckboxButton, CheckboxGroup, Tag, Autocomplete, Dialog, Upload, Dropdown, DropdownMenu, DropdownItem, Message, MessageBox } from 'element-ui'
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(TimePicker);
Vue.use(Button);
Vue.use(Alert);
Vue.use(Image);
Vue.use(Tooltip);
Vue.use(Tree);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Popover);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Icon);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Progress);
Vue.use(Scrollbar);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Tag);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Upload);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
