<template>
  <div id="indexLR">
    <div class="left">
    <label>左图:</label>
    <div style="display: flex">
        <img :src="dialogImageUrl" alt=""  v-if="dialogImageUrl" style="width:201px;height: 120px;">
      <el-upload
        class="upload-demo"
        name="img"
        action="/apis/admin/buildblocks/uploadImage"
        :on-success="upSuccessfirst"
        :show-file-list="false">
        <el-button size="mini" type="primary" style="margin-top:40px;margin-left: 15px;" >点击上传</el-button>
        <div style="font-size: 12px;color: orange;margin-top:15px;margin-left: 15px;">图标尺寸 67 : 40</div>
      </el-upload>
      </div>
    </div>
    <div style="font-size: 16px;margin: 30px 0;">
      <span style="display: inline-block;width: 100px;text-align: center;">链接:</span><el-input v-model="CouponWithGoodsResult.productName" size="mini" style="width: 200px;"></el-input>
      <el-button size="mini" type="success" @click="alertAddGoods(3,'left')">关联活动</el-button>
      <el-button size="mini" type="success" @click="alertAddGoods(4,'left')">关联优惠券活动</el-button>
    </div>
    <div class="right">
    <label>右图:</label>
    <div style="display: flex">
        <img :src="dialogImageUrl2" alt=""  v-if="dialogImageUrl2" style="width: 201px;height: 120px;">
      <el-upload
        class="upload-demo"
        name="img"
        action="/apis/admin/buildblocks/uploadImage"
        :on-success="upSuccessfirst2"
        :show-file-list="false">
        <el-button size="mini" type="primary" style="margin-top: 40px;margin-left: 15px;" >点击上传</el-button>
        <div style="font-size: 12px;color: orange;margin-top:15px;margin-left: 15px;">图标尺寸 67 : 40</div>
      </el-upload>
    </div>
    </div>
    <div style="font-size: 16px;margin: 30px 0;">
      <span style="display: inline-block;width: 100px;text-align: center;">链接:</span><el-input v-model="CouponWithGoodsResult.rightName" size="mini" style="width: 200px;"></el-input>
      <el-button size="mini" type="success" @click="alertAddGoods(3,'right')">关联活动</el-button>
      <el-button size="mini" type="success" @click="alertAddGoods(4,'right')">关联优惠券活动</el-button>
    </div>
    <transition name="slide-fade">
      <div class="alertshow" v-if="popoverAlive.openOrClose" v-drag>
        <v-popover></v-popover>
      </div>
    </transition>
    <el-button type="primary" @click="upSave()" size="small" style="margin-left:300px;margin-top: 50px;">确认提交</el-button>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import vPopover from '../../popover/popover.vue'
  export default {
  name: 'indexchange',
  data () {
    return {
      dialogImageUrl:'',
      dialogImageUrl2:'',
      input:'',
      input2:'',
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
  },
  computed:{
    ...mapGetters([
     'popoverAlive','CouponWithGoodsResult'
    ])
  },
  components:{
    vPopover
  },
    mounted(){

    },
  methods: {
    ...mapActions([
'popoverAlert',
    ]),
    upSuccessfirst(response, file, fileList) {
      this.dialogImageUrl = 'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
    },
    upSuccessfirst2(response, file, fileList) {
      this.dialogImageUrl2 = 'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
    },
    alertAddGoods(key,what) {
     if(key === 3){
        this.popoverAlert(['addActive',what])
      }else{
        this.popoverAlert(['addYhqActive',what])
      }
    },
    upSave(){

    }
  }
}
</script>

<style scoped lang="scss">
  #indexLR{
    span{
      margin-right: 20px;
    }
    .left,.right{
      display: flex;
      label{
        margin-right: 20px;
        width:100px;
        line-height: 100px;
        text-align: center;
        font-size: 16px;
      }
    }
    .el-input{
      width:auto;
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
