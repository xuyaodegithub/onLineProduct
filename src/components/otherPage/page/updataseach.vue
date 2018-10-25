<template>
  <div class="demo incomingHistory">
     <div style="display: flex">
       <label>图片</label>
       <div style="display: flex;padding: 20px;align-items: center;">
         <img :src="dialogImageUrl" alt="" v-if="dialogImageUrl" style="width: 200px;height: 150px;">
         <el-upload
           class="upload-demo"
           name="img"
           action="http://ol-h5-admin.olquan.cn/admin/buildblocks/uploadImage"
           :on-success="upSuccessfirst"
           :show-file-list="false">
           <el-button size="mini" type="primary" style="margin-left: 15px;" >点击上传</el-button>
         </el-upload>
       </div>
     </div>
      <el-button type="primary" plain @click="saveProduct()" size="small">
        保存
      </el-button>
    </div>
</template>

<style lang="scss" scoped>
  .popover-main{
    padding: 15px 12.5px;
    width: calc(100% - 25px);
    .el-input{
      display: inline-block;
    }
    &>div:first-child{
      margin-top: 0;
    }
    &>div{
      margin-top: 40px;
    }
    label{
      display: inline-block;
      width:140px;
      text-align: right;
      margin-right:20px;
    }
  }

  .popover-main .el-input,.popover-main .el-select{
    width:300px;
  }
  .popover-main > .el-button{
    width: 100px;
    display: block;
    margin-left:250px;
    margin-top: 20px;
  }
  .el-button--mini, .el-button--mini.is-round{
    padding:7px;font-size: 12px;
  }
  p .el-radio+.el-radio{
    margin-left: 0;
  }
 /* p .el-radio-group{
    width:160px;
  }*/
</style>
<script>
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    props:['detialData'],
    data() {
      return {
        type:'',
        sort:'',
        linkType:'',
        url:'',
        title:'',
        price:'',
        isAudio:'',
        dataTime:'',
        dialogImageUrl:'',
      };
    },
    components:{

    },
    activated(){
      this.dialogImageUrl=this.detialData[0].image
    },
    watch:{

    },
    computed:{
      ...mapGetters([
      'loading','popoverAlive',
      ]),
    },
    methods: {
      ...mapActions([
        'popoverAlert',
      ]),
      upSuccessfirst(response, file, fileList) {
        this.dialogImageUrl = 'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
      },
      saveProduct(){

      },
      goBakk(){
        this.$emit('toParese',{title:'vList',item:[]})
      }
    }
  };
</script>
