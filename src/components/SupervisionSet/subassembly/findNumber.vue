<template>
  <div id="smalltitle">
    <p id="toindex">
      <!--<router-link to="index">首页</router-link> &gt; 发现账号管理-->
      <el-button type="success" round size="mini" icon="el-icon-plus"
                 style="margin-top: 10px;float: right;margin-right: 50px;" @click="addGoods('third')"
                 v-if="title=='vSeach'">新增会员账号
      </el-button>
      <el-button type="success" round size="mini" icon="el-icon-plus"
                 style="margin-top: 10px;float: right;margin-right: 50px;" @click="addGoods('first')"
                 v-if="title=='vSeach'">新增平台账号
      </el-button>
      <!--<el-button type="success" round size="mini" icon="el-icon-plus"
                 style="margin-top: 10px;float: right;margin-right: 50px;" @click="putMsg()"
                 v-else-if="title=='vNewmsg'">新增文章
      </el-button>-->
      <el-button type="success" size="mini" round style="position: absolute;right:180px;top: 90px;z-index:100;"
                 icon="el-icon-back"
                 @click="goBack()" v-else>返回
      </el-button>
    </p>
    <div style="margin-bottom: 20px;" v-if="title==='vSeach'">
      <label>账号昵称:</label>
      <el-input v-model="isName" placeholder="请输入产品名称" size="mini"></el-input>
      <label style="margin-left: 15px;">类型:</label>
      <el-radio-group v-model="isNum"><!--:disabled="classWh === '1'"-->
        <el-radio :label="1" style="width: auto;">平台账号</el-radio>
        <el-radio :label="2" style="width: auto;">会员账号</el-radio>
      </el-radio-group>
      <el-button type="primary" style="width:100px;margin-left: 50px;" round size="mini" icon="el-icon-search"
                 @click="seachGoodsList()">筛选
      </el-button>
    </div>
    <div class="content">
      <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="平台账号" name="first">
          <keep-alive>
            <component :is="title" v-on:to-change="changeTitle" :msg="seachMsg" :msgData="msgData"></component>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="会员账号" name="third">
          <vSeach2 :msg="seachMsg"></vSeach2>
        </el-tab-pane>
      </el-tabs>

    </div>
    <div class="alertshow" v-if="popoverAlive.openOrClose" v-drag>
      <v-popover></v-popover>
    </div>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
  import vNew from '../page/newNumber.vue'
  import vSeach from '../page/seachNumber.vue'
  import vSeach2 from '../page/seachNumber2.vue'
  import vNewmsg from '../page/newMsg.vue'
  import vListmsg from '../page/seachMsg.vue'
  import vPopover from '../../popover/popover.vue'

  export default {
    name: 'findNumber',
    data() {
      return {
        activeName2:'first',
        title: 'vSeach',
        isName: '',
        classFF:'',
        isNum:1,
        backTwo:false,
        trueOrFalse:false,
        seachMsg: {
          accountName: '',
          page: 1,
          rows: 10,
          filter_I_type:1
        },
        msgData: {
          type: '',
          item: '',
          id: '',
          which: '',
          numnew:''
        }
      }
    },
    watch: {
      activeName2(curVal,oldVal){
        let data={
          page:1,
          rows:10,
          filter_I_type:1
        }
        if(curVal==='first'){
          this.classFF = 'first'
        }
      if(curVal==='first' && this.trueOrFalse){
        this.findAccountActions(data)
      }else if(curVal==='third' && this.trueOrFalse){
        data.filter_I_type=2
        this.findAccountActions(data)
      }
        this.trueOrFalse=false
    }
    },
    computed: {
      ...mapGetters([
        'popoverAlive',
      ])
    },
    components: {
      vNew, vSeach, vNewmsg, vListmsg, vPopover,vSeach2
    },
    mounted() {

    },
    methods: {
      ...mapActions([
        'popoverAlert', 'findAccountActions'
      ]),
      seachGoodsList() {
//        let data = {
          this.seachMsg.accountName=this.isName
          this.seachMsg.page=1
          this.seachMsg.rows=10
          this.seachMsg.filter_I_type=this.isNum
//          this.seachMsg.filter_I_type=''
//          page: this.page,
//          rows: this.rows
//        }
        if(this.isNum===1){
          this.activeName2='first'
        }else{
          this.activeName2='third'
        }
        this.findAccountActions(this.seachMsg)
      },
      changeTitle(data) {
        this.msgData.type = data.type
        this.msgData.item = data.data
        this.msgData.which = data.which
//        this.classFF = data.classFF
        if (data.id) {
          this.msgData.id = data.id
        }
        if(data.numnew){
          this.msgData.numnew = data.numnew
        }
        this.title = data.title
      },
      addGoods(val) {
        this.trueOrFalse=true
        this.title = 'vNew'
        this.msgData.type = 'add'
        this.msgData.item = {}
        this.msgData.which = 1
        this.activeName2='first'
        this.classFF=val
        if(val){
          this.msgData.numnew = val
//          this.activeName2=val
        }
        if(val==='third'){
          this.backTwo=true
        }else{
          this.backTwo=false
        }
      },
      goBack() {
        this.trueOrFalse=true
        if(/*this.msgData.which === 1 && this.classFF === 'third' && */this.backTwo){
          this.activeName2='third'
          this.backTwo=false
        }else{
          this.activeName2='first'
        }
        if (this.msgData.which === 1) {
          this.title = 'vSeach'
        } else if (this.msgData.which === 2) {
          this.title = 'vListmsg'
          this.msgData.which = 1
        }

      },
      handleClick(tab, event) {
        this.isName=''
        this.seachMsg.accountName=''
        this.seachMsg.page=1
        this.seachMsg.rows=10
//        let data={
//            page:1,
//            rows:10,
//        }
        if(tab.name==='first'){
          this.seachMsg.filter_I_type=1
        }else{
          this.seachMsg.filter_I_type=2
        }
        this.findAccountActions(this.seachMsg)
      },

    }
  }
</script>

<style scoped lang="scss">
  #smalltitle {
    font-size: 14px;
    .el-input {
      display: inline-block;
      width: 150px;
    }
    label {
      margin-right: 15px;
    }
  }

  #toindex {
    font: 16px/36px "微软雅黑";
    background: none;
    border: 0;
    margin: 0;
    color: #333;
    font-weight: 600;
    text-indent: 0;
    overflow: hidden;
    margin-bottom: 15px;
  }
  .el-radio+.el-radio{
    margin-left:5px;
  }
  .alertshow {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 1000;
  }
</style>
