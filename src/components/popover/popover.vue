<template>
    <div class="popover">
        <component :is="popoverAlive.title"></component>
    </div>
</template>

<style scoped>
  .popover{
      z-index: 30;
      position: relative;
      width:auto;
      height: auto;
  }
</style>
<script>
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  import vBalance from './balance.vue'
//活动管理
  import vAddSubass from '../activeList/alert/addSubass.vue'
  import vAddGoods from '../activeList/alert/addGoods.vue'
  import Vdetail from '../activeList/alert/detail.vue'
  import VaddBackground from '../activeList/alert/addBackground.vue'
  import VactiveDress from '../activeList/alert/activeDress.vue'
  import VclassSell from '../activeList/alert/classSell.vue'
  import VactiveLianJian from '../activeList/alert/activeLianjie.vue'

  //优惠券
  import VchoseGoods from '../Coupon/alert/ChoseGoods.vue'
  import VwithYHQ from '../Coupon/alert/withYHQ.vue'
  import VChoseGoodsStore from '../Coupon/alert/ChoseGoodsStore.vue'
  //特卖产品
  import WatchPrice from '../commodity/smallPopver/watchPrice.vue'
  //试用产品
  import OnTrialwatchPrice from '../commodity/smallPopver/OnTrialwatchPrice.vue'
  import addCountry from '../commodity/smallPopver/addCountry.vue'
  import addActive from '../SupervisionSet/page/addActive.vue'
  import addYhqActive from './addYhqActive.vue'
  import vOwnFind from './ownFind.vue'
  import vAddLun from './addLunData.vue'
  export default {
    data() {
      return {
          changeAlert: 'vDemo'
      };
    },
    components:{
     vBalance,vAddSubass,vAddGoods,Vdetail,VaddBackground,VactiveDress,VclassSell,VactiveLianJian,
      VchoseGoods,VwithYHQ,VChoseGoodsStore,WatchPrice,OnTrialwatchPrice,addCountry,addActive,addYhqActive,vOwnFind,
      vAddLun

    },
    methods: {
    },
    computed: {
    // 使用对象展开运算符将 getters 混入 computed 对象中
      ...mapGetters([
        'popoverAlive'
      ])
    }
  };
</script>
