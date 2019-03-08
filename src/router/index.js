import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Home from '@/components/navi/Home'
import Index from '@/components/index/Index'
import GoodsList from '@/components/miaosha/GoodsList'
import OrderList from '@/components/miaosha/OrderList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      component: Home,
      children: [
        {path: '/Index', component: Index, name: '首页'},
        {path: '/GoodsList', component: GoodsList, name: '秒杀商品'},
        {path: '/OrderList', component: OrderList, name: '我的订单'}
      ]
    }
  ]
})
