import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import HelloWorld from '@/components/activeList/subassembly/huodong.vue'
//优惠券
import CouponActive from '@/components/Coupon/subassembly/CouponActiveIndex.vue'
import Coupon from '@/components/Coupon/subassembly/CouponIndex.vue'
import StoreCoupon from '@/components/Coupon/subassembly/upStoreYHQ.vue'
import StoreCount from '@/components/Coupon/subassembly/CouponCount.vue'
import StoreCountDetial from '@/components/Coupon/page/CouponCountDetial.vue'
//特卖商品管理
import Saleofgoods from '@/components/commodity/subassembly/SaleOfGoods.vue'
import seachMenuList from '@/components/commodity/subassembly/seachMenuList.vue'
import OnTrialManage from '@/components/commodity/subassembly/OnTrialManage.vue'
import supervisionIndex from '@/components/SupervisionSet/subassembly/supervisionIndex.vue'
import pinkSet from '@/components/SupervisionSet/subassembly/pinkSet.vue'
import starStatistics from '@/components/SupervisionSet/subassembly/starStatistics.vue'
import ProductIncomeDistribution from '@/components/SupervisionSet/subassembly/ProductIncomeDistribution.vue'
import findToWatch from '@/components/SupervisionSet/subassembly/findToWatch.vue'
//发现后台
import indexchange from '@/components/otherPage/subassembly/indexchange.vue'
import indexImg from '@/components/otherPage/subassembly/indexLRimg.vue'
import jindouSet from '@/components/otherPage/subassembly/jindouSet.vue'

Vue.use(Router)
import find from '@/components/SupervisionSet/subassembly/findNumber.vue'
import findMsg from '@/components/SupervisionSet/subassembly/findMsg.vue'
import bossBuy from '@/components/SupervisionSet/subassembly/bossBuy.vue'

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Coupon-active',
      name:"CouponActive",
      component:CouponActive
    },
    {
      path: '/Coupon-platform',
      name:"Coupon",
      component:Coupon
    },
    {
      path: '/Coupon-store',
      name:"StoreCoupon",
      component:StoreCoupon
    },
    {
      path: '/Coupon-count',
      name:"StoreCount",
      component:StoreCount
    }/*,
    {
      path: '/Coupon-countDetial/:id',
      name:"StoreCountDetial",
      component:StoreCountDetial
    }*/,
    {
      path: '/Coupon-countDetial',//优惠券管理
      name:"StoreCountDetial",
      component:StoreCountDetial
    },{
      path: '/Saleofgoods',//特卖商品管理
      name:"Saleofgoods",
      component:Saleofgoods
    },{
      path: '/seachMenuList',//菜单管理
      name:"seachMenuList",
      component:seachMenuList
    },{
      path: '/OnTrialManage',//试用商品管理
      name:"OnTrialManage",
      component:OnTrialManage
    },{
      path: '/supervisionIndex',//开通经理设置
      name:"supervisionIndex",
      component:supervisionIndex
    },{
      path: '/pinkSet',//vip设置
      name:"pinkSet",
      component:pinkSet
    },{
      path: '/starStatistics',//明细经理统计
      name:"starStatistics",
      component:starStatistics
    },{
      path: '/ProductIncomeDistribution',//产品配置
      name:"ProductIncomeDistribution",
      component:ProductIncomeDistribution
    },{
      path: '/find',//发现账号管理
      name:"find",
      component:find
    },{
      path: '/findMsg',//发现总列表
      name:"findMsg",
      component:findMsg
    },{
      path: '/bossBuy',//总监申请列表
      name:"bossBuy",
      component:bossBuy
    },{
      path: '/findToWatch',//发现审核
      name:"findToWatch",
      component:findToWatch
    },{
      path: '/indexchange',//首页轮播图
      name:"indexchange",
      component:indexchange
    },{
      path: '/indexImg',//欢乐送左右图
      name:"indexImg",
      component:indexImg
    },{
      path: '/jindouSet',//金豆配置
      name:"jindouSet",
      component:jindouSet
    }
  ]
})
router.beforeEach((to,from,next)=> {
 // console.log(store.state.editor.axiosUrl)
  next()
})
export default router
