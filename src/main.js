//入口文件
import Vue from 'vue';
//导入mint-ui包
import {Header,Swipe, SwipeItem,Button,Loadmore} from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Loadmore.name, Loadmore);

//引用懒加载
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);

//引用mui样式
import './assets/mui/css/mui.min.css';
import './assets/mui/css/icons-extra.css';
// 引用图片缩略图插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);
// Vue.use(preview, {
//   mainClass: 'pswp--minimal--dark',
//   barsSize: {top: 0, bottom: 0},
//   captionEl: false,
//   fullscreenEl: false,
//   shareEl: false,
//   bgOpacity: 0.85,
//   tapToClose: true,
//   tapToToggleControls: false
// });
//导入app根组件
import app from './App.vue';
//引入路由包
import Router from 'vue-router';
Vue.use(Router);
//引入moment包
import moment from 'moment';
//定义过滤器
Vue.filter('dateFormat',function(datastr,pattern="YYYY-MM-DD HH-mm-ss"){
  return moment(datastr).format(pattern);
});
//导入vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);

//设置请求根路径
Vue.http.options.root = 'http://027xin.com:8899';
//导入路由模块
import router from './router/index.js';


var vm = new Vue({
  el:'#app',
  render:c => c(app),
  router//将路由模块挂载到实例对象上
});