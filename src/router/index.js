import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
// import HelloWorld from '@/components/activeList/subassembly/huodong.vue'
//优惠券
// import CouponActive from '@/components/Coupon/subassembly/CouponActiveIndex.vue'
// import Coupon from '@/components/Coupon/subassembly/CouponIndex.vue'
// import StoreCoupon from '@/components/Coupon/subassembly/upStoreYHQ.vue'
// import StoreCount from '@/components/Coupon/subassembly/CouponCount.vue'
// import StoreCountDetial from '@/components/Coupon/page/CouponCountDetial.vue'
//特卖商品管理
// import Saleofgoods from '@/components/commodity/subassembly/SaleOfGoods.vue'
// import seachMenuList from '@/components/commodity/subassembly/seachMenuList.vue'
// import OnTrialManage from '@/components/commodity/subassembly/OnTrialManage.vue'
// import supervisionIndex from '@/components/SupervisionSet/subassembly/supervisionIndex.vue'
// import pinkSet from '@/components/SupervisionSet/subassembly/pinkSet.vue'
// import starStatistics from '@/components/SupervisionSet/subassembly/starStatistics.vue'
// import ProductIncomeDistribution from '@/components/SupervisionSet/subassembly/ProductIncomeDistribution.vue'
// import findToWatch from '@/components/SupervisionSet/subassembly/findToWatch.vue'
//发现后台
// import indexchange from '@/components/otherPage/subassembly/indexchange.vue'
// import indexImg from '@/components/otherPage/subassembly/indexLRimg.vue'
// import jindouSet from '@/components/otherPage/subassembly/jindouSet.vue'

Vue.use(Router)
// import find from '@/components/SupervisionSet/subassembly/findNumber.vue'
// import findMsg from '@/components/SupervisionSet/subassembly/findMsg.vue'
// import bossBuy from '@/components/SupervisionSet/subassembly/bossBuy.vue'

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import(/* webpackChunkName: "HelloWorld" */ '@/components/activeList/subassembly/huodong.vue')
    },
    {
      path: '/Coupon-active',
      name:"CouponActive",
      component:() => import(/* webpackChunkName: "CouponActive" */ '@/components/Coupon/subassembly/CouponActiveIndex.vue')
    },
    {
      path: '/Coupon-platform',
      name:"Coupon",
      component:() => import(/* webpackChunkName: "Coupon" */ '@/components/Coupon/subassembly/CouponIndex.vue')
    },
    {
      path: '/Coupon-store',
      name:"StoreCoupon",
      component:() => import(/* webpackChunkName: "StoreCoupon" */ '@/components/Coupon/subassembly/upStoreYHQ.vue')
    },
    {
      path: '/Coupon-count',
      name:"StoreCount",
      component:() => import(/* webpackChunkName: "StoreCount" */ '@/components/Coupon/subassembly/CouponCount.vue')
    }/*,
    {
      path: '/Coupon-countDetial/:id',
      name:"StoreCountDetial",
      component:StoreCountDetial
    }*/,
    {
      path: '/Coupon-countDetial',//优惠券管理
      name:"StoreCountDetial",
      component:() => import(/* webpackChunkName: "StoreCountDetial" */ '@/components/Coupon/page/CouponCountDetial.vue')
    },{
      path: '/Saleofgoods',//特卖商品管理
      name:"Saleofgoods",
      component:() => import(/* webpackChunkName: "Saleofgoods" */ '@/components/commodity/subassembly/SaleOfGoods.vue')
    },{
      path: '/seachMenuList',//菜单管理
      name:"seachMenuList",
      component:() => import(/* webpackChunkName: "seachMenuList" */ '@/components/commodity/subassembly/seachMenuList.vue')
    },{
      path: '/OnTrialManage',//试用商品管理
      name:"OnTrialManage",
      component:() => import(/* webpackChunkName: "OnTrialManage" */ '@/components/commodity/subassembly/OnTrialManage.vue')
    },{
      path: '/supervisionIndex',//开通经理设置
      name:"supervisionIndex",
      component:() => import(/* webpackChunkName: "supervisionIndex" */ '@/components/SupervisionSet/subassembly/supervisionIndex.vue')
    },{
      path: '/pinkSet',//vip设置
      name:"pinkSet",
      component:() => import(/* webpackChunkName: "pinkSet" */ '@/components/SupervisionSet/subassembly/pinkSet.vue')
    },{
      path: '/starStatistics',//明细经理统计
      name:"starStatistics",
      component:() => import(/* webpackChunkName: "starStatistics" */ '@/components/SupervisionSet/subassembly/starStatistics.vue')
    },{
      path: '/ProductIncomeDistribution',//产品配置
      name:"ProductIncomeDistribution",
      component:() => import(/* webpackChunkName: "ProductIncomeDistribution" */ '@/components/SupervisionSet/subassembly/ProductIncomeDistribution.vue')
    },{
      path: '/find',//发现账号管理
      name:"find",
      component:() => import(/* webpackChunkName: "find" */ '@/components/SupervisionSet/subassembly/findNumber.vue')
    },{
      path: '/findMsg',//发现总列表
      name:"findMsg",
      component:() => import(/* webpackChunkName: "findMsg" */ '@/components/SupervisionSet/subassembly/findMsg.vue')
    },{
      path: '/bossBuy',//总监申请列表
      name:"bossBuy",
      component:() => import(/* webpackChunkName: "bossBuy" */ '@/components/SupervisionSet/subassembly/bossBuy.vue')
    },{
      path: '/findToWatch',//发现审核
      name:"findToWatch",
      component:() => import(/* webpackChunkName: "findToWatch" */ '@/components/SupervisionSet/subassembly/findToWatch.vue')
    },{
      path: '/indexchange',//首页轮播图
      name:"indexchange",
      component:() => import(/* webpackChunkName: "indexchange" */ '@/components/otherPage/subassembly/indexchange.vue')
    },{
      path: '/indexImg',//欢乐送左右图
      name:"indexImg",
      component:() => import(/* webpackChunkName: "indexchange" */ '@/components/otherPage/subassembly/indexLRimg.vue')
    },{
      path: '/jindouSet',//金豆配置
      name:"jindouSet",
      component:() => import(/* webpackChunkName: "jindouSet" */ '@/components/otherPage/subassembly/jindouSet.vue')
    }
  ]
})
router.beforeEach((to,from,next)=> {
 // console.log(store.state.editor.axiosUrl)
  next()
})
export default router
