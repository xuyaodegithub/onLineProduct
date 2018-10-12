<template>
  <div>
    <div id="indexchange">
      <div>
        <label>首次关注公众号</label>
        <el-input v-model="isNumber" size="mini"></el-input>
      </div>
      <div>
        <label>首次下载APP</label>
        <el-input v-model="isFirst" size="mini"></el-input>
      </div>
      <div>
        <label>首次兑换SNRC</label>
        <el-input v-model="isSNRC" size="mini"></el-input>
      </div>
      <div>
        <label>新人首次下单</label>
        <el-input v-model="isNewman" size="mini"></el-input>
      </div>
      <div>
        <label>开通店主</label>
        <el-input v-model="isNewPink" size="mini"></el-input>
      </div>
      <div>
        <label>每日发布发现</label>
        <el-input v-model="isEveryDayFind" size="mini"></el-input>
      </div>
      <div>
        <label>每日分享</label>
        <el-input v-model="isEveryDayShare" size="mini"></el-input>
      </div>
      <div>
        <label>每日推荐新人</label>
        <el-input v-model="isEveryDayNew" size="mini"></el-input>
      </div>
      <div>
        <label>每日下单(除试用)</label>
        <el-input v-model="isEveryDayBuy" size="mini"></el-input>
      </div>
    </div>
    <el-button size="small" type="primary" @click="saveUp()" style="margin: 100px 200px;">确认提交</el-button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  export default {
  name: 'indexchange',
  data () {
    return {
      isNumber:'',
      isFirst:'',
      isSNRC:'',
      isNewman:'',
      isNewPink:'',
      isEveryDayFind:'',
      isEveryDayShare:'',
      isEveryDayNew:'',
      isEveryDayBuy:'',
    }
  },
  watch:{
//    seachWhicheResult2(curVal,oldVal){
//      if(curVal===1){
//        this.statusOkOrNo=0
//      }else{
//        this.statusOkOrNo=1
//      }
//    }
    getMemberTaskListInfoResult:{
      handler(newVal,oldVal){
        this.isNumber=newVal.firstFollowPublicAccountGoldBean
        this.isFirst=newVal.firstLoginInAppGoldBean
        this.isSNRC=newVal.firstExchangeSNRCGoldBean
        this.isNewman=newVal.firstOrderGoldBean
        this.isNewPink=newVal.openStoreGoldBean
        this.isEveryDayFind=newVal.publicFindGoldBean
        this.isEveryDayShare=newVal.shareGoldBean
        this.isEveryDayNew=newVal.newMemberGoldBean
        this.isEveryDayBuy=newVal.orderGoldBean

      },
      deep:true
    }
  },
  computed:{
    ...mapGetters([
     'popoverAlive','getMemberTaskListInfoResult'
    ])
  },
  components:{

  },
    mounted(){
      this.getMemberTaskListInfoActions()
    },
  methods: {
    ...mapActions([
'popoverAlert','getMemberTaskListInfoActions','updataMemberTaskListInfoActions'
    ]),
    saveUp(){
      let data={
        firstFollowPublicAccountGoldBean:this.isNumber,
        firstLoginInAppGoldBean:this.isFirst,
        firstExchangeSNRCGoldBean:this.isSNRC,
        firstOrderGoldBean:this.isNewman,
        openStoreGoldBean:this.isNewPink,
        publicFindGoldBean:this.isEveryDayFind,
        shareGoldBean:this.isEveryDayShare,
        newMemberGoldBean:this.isEveryDayNew,
        orderGoldBean:this.isEveryDayBuy
      }
      this.updataMemberTaskListInfoActions(data)
    }
  }
}
</script>

<style scoped lang="scss">
  #indexchange {
    .el-input{
      width:150px;
    }
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    label {
      display: inline-block;
      width: 120px;
      text-align: right;
      margin: 20px 0;
    }
  }
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.alertshow{
  position: fixed;
  left:50%;
  top:50%;
  z-index:1000;
}
</style>
