import Vue from 'vue'
import Router from 'vue-router'
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
//发现后台

Vue.use(Router)
import find from '@/components/SupervisionSet/subassembly/findNumber.vue'
import findMsg from '@/components/SupervisionSet/subassembly/findMsg.vue'
import bossBuy from '@/components/SupervisionSet/subassembly/bossBuy.vue'

export default new Router({
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
      path: '/Coupon-countDetial',
      name:"StoreCountDetial",
      component:StoreCountDetial
    },{
      path: '/Saleofgoods',
      name:"Saleofgoods",
      component:Saleofgoods
    },{
      path: '/seachMenuList',
      name:"seachMenuList",
      component:seachMenuList
    },{
      path: '/OnTrialManage',
      name:"OnTrialManage",
      component:OnTrialManage
    },{
      path: '/supervisionIndex',
      name:"supervisionIndex",
      component:supervisionIndex
    },{
      path: '/pinkSet',
      name:"pinkSet",
      component:pinkSet
    },{
      path: '/starStatistics',
      name:"starStatistics",
      component:starStatistics
    },{
      path: '/ProductIncomeDistribution',
      name:"ProductIncomeDistribution",
      component:ProductIncomeDistribution
    },{
      path: '/find',
      name:"find",
      component:find
    },{
      path: '/findMsg',
      name:"findMsg",
      component:findMsg
    },{
      path: '/bossBuy',
      name:"bossBuy",
      component:bossBuy
    }
  ]
})
