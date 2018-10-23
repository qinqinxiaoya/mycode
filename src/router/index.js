import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import home from '../components/tabbar/HomeContainer.vue'
import member from '../components/tabbar/MemberContainer.vue'
import search from '../components/tabbar/SearchContainer.vue'
import shopcar from '../components/tabbar/ShopCarContainer.vue'
import newslist from '../components/news/NewsList.vue'
import newsinfo from '../components/news/NewsInfo.vue'
import photolist from '../components/photos/PhotoList.vue'
import photoinfo from '../components/photos/PhotoInfo.vue'
import productlist from '../components/products/ProductList.vue'


var router = new Router({
  routes: [
    {path: '/home',component: home},
    {path: '/member',component: member},
    {path: '/search',component: search},
    {path: '/shopcar',component: shopcar},
    {path:'/home/newslist',component:newslist},
    {path:'/home/newsinfo/:id',component:newsinfo},
    {path:'/home/photolist',component:photolist},
    {path:'/home/photoinfo/:id',component:photoinfo},
    {path:'/home/productlist',component:productlist},

    {path:'/',redirect: './home'},
   
  ],
  linkActiveClass: 'mui-active'
});
export default router;