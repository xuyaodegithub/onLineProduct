<template>
  <div id="smalltitle">
    <p id="toindex">
      <!--<router-link to="index">首页</router-link> &gt; 试用商品管理-->
      <el-button type="success" round size="mini" icon="el-icon-plus" style="margin-top: 10px" @click="addGoods()" v-if="title=='seachOnTrialGoods'">新增产品</el-button>
      <el-button type="success" size="mini" round style="margin-top: 10px" icon="el-icon-back" @click="title='seachOnTrialGoods'" v-else>返回</el-button>
    </p>
    <p v-if="title=='seachOnTrialGoods'">
      <label>产品名称:</label><el-input v-model="Gtitle" placeholder="请输入产品名称" size="mini"></el-input>
      <label>试用类型:</label>
       <el-radio-group v-model="status"><!--:disabled="classWh === '1'"-->
        <el-radio :label="0" style="width: auto;">全部</el-radio>
        <el-radio :label="1" style="width: auto;">普通试用</el-radio>
        <!--<el-radio :label="2" style="width: auto;">新品首试</el-radio>-->
        <el-radio :label="3" style="width: auto;">整点抢</el-radio>
        <el-radio :label="5" style="width: auto;">付邮试</el-radio>
      </el-radio-group>
      <label>状态:</label><!--<el-input v-model="filter_I_status" placeholder="请输入产品名称" size="mini"></el-input>-->
      <el-radio-group v-model="isAudio"><!--:disabled="classWh === '1'"-->
        <el-radio :label=3 style="width: auto;">全部</el-radio>
        <el-radio :label=0 style="width: auto;">下架</el-radio>
        <el-radio :label=1 style="width: auto;">上架</el-radio>
      </el-radio-group>
      <label v-if="status===3">场次时间:</label>
      <el-select v-model="value9" placeholder="请选择" size="mini"  v-if="status===3" clearable style="width: 120px;">
        <el-option
          v-for="(item,index) in timerList"
          :key="index"
          :label="item.timer"
          :value="item.timer">
        </el-option>
      </el-select>
      <!--<label>特卖时间:</label><el-date-picker type="date" placeholder="选择日期" v-model="date1" style="width:150px;" size="mini"></el-date-picker>-->
      <el-button type="primary" style="width:100px;margin-left: 10px;" round size="mini" icon="el-icon-search" @click="seachGoodsList()">搜索</el-button>
    </p>
    <div class="footer-list">
      <keep-alive>
        <component :is="title" v-on:to-change="changeTitle" :msg="seachMsg"></component>
      </keep-alive>
    </div>
    <transition name="slide-fade">
      <div class="alertshow" v-if="popoverAlive.openOrClose" v-drag>
        <v-popover></v-popover>
      </div>
    </transition>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import seachOnTrialGoods from '../page/seachOnTrialGoods.vue'
  import NewOntrial from '../page/newOnTrial.vue'
  import vPopover from '../../popover/popover.vue'
  export default {
  name: 'OnTrial',
  data () {
    return {
      title:'seachOnTrialGoods',
      Gtitle:'',
      isAudio:'',
      status:'',
      value9:'',
      timerList:[
        {timer:'00:00'}, {timer:'01:00'}, {timer:'02:00'}, {timer:'03:00'}, {timer:'04:00'}, {timer:'05:00'}, {timer:'06:00'}, {timer:'07:00'},
        {timer:'08:00'}, {timer:'09:00'}, {timer:'10:00'}, {timer:'11:00'}, {timer:'12:00'}, {timer:'13:00'}, {timer:'14:00'},
        {timer:'15:00'}, {timer:'16:00'}, {timer:'17:00'}, {timer:'18:00'}, {timer:'19:00'}, {timer:'20:00'}, {timer:'21:00'},
        {timer:'22:00'}, {timer:'23:00'},
      ],
      seachMsg:{
        filter_S_productName:'',
       // filter_I_isRecommend:'',
        filter_I_type:'',
        filter_I_status:'',
        sortField:'sort',
        page:1,
        rows:10,
        sortOrder:'asc',
        filter_S_dailyStartTime:''
      }
    }
  },
  watch:{

  },
  computed:{
    ...mapGetters([
'popoverAlive'
    ])
  },
  components:{
    seachOnTrialGoods,NewOntrial,vPopover
  },
    mounted(){

    },
  methods: {
    ...mapActions([
'freeUseProductListActions'
    ]),
    changeTitle(val){
      this.title=val
    },
    seachGoodsList(){
      let obj={
        filter_S_productName:this.Gtitle,
        //filter_I_isRecommend:this.isAudio,//推荐首页
        sortField:'sort',
        filter_I_type:this.status===0 ? '' : this.status,
        page:1,
        rows:10,
        sortOrder:'asc'
      }
      if(this.status===3){
        obj.filter_S_dailyStartTime=this.value9
      }
      if(this.isAudio!==3){
        obj.filter_I_status=this.isAudio
      }
      this.seachMsg=obj
      this.freeUseProductListActions(obj)
      this.$store.commit('SET_PAGE_ROWS',obj)
    },
    addGoods(){
      this.title='NewOntrial'
      let  data={
        type:'add',
        item:{}
      }
      this.$store.commit('UPDATA_SALEGOODS',data)
    }

  }
}
</script>

<style scoped lang="scss">
  #smalltitle p{
    .el-input{
      width:150px;
    }
    &>label{
      margin:0 15px;
      color: #E6A23C;
    }
    .el-radio+.el-radio{
      margin-left:10px;
    }
  }
  #toindex{
    font: 16px/36px "微软雅黑";
    background:none;
    border:0;
    margin:0;
    color: #333;
    font-weight: 600;
    text-indent:0;
    overflow: hidden;
    margin-bottom: 15px;
  }
  #toindex .el-button--mini.is-round{
    float: right;
    width:100px;
    margin-right:30px;
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
