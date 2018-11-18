<template>
  <div class="demo incomingHistory">
    <div class="popover-head">
      <span class="title">选择图片</span><i v-on:click="popoverAlert()" class="el-icon-close"></i>
    </div>
    <div class="popover-main">

    </div>
  </div>
</template>

<style lang="scss" scoped>
  .demo{
    width: 600px;
    background: #F0FAFF;
    margin-left: -300px;
    margin-top: -240px;
    border-radius: 5px;
    border: 1px solid #90CCE8;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    overflow: hidden;
    color: #333333;
  }
  .popover-head{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #F0FAFF;
    font-size: 14px;
    border-bottom: 1px solid #C5E2F0;
  }
  .popover-head i{
    float: right;
    color: #A1C1E2;
    font-size: 12px;
    margin-top: 13px;
    margin-right: 12px;
    cursor: pointer;
  }
  .popover-head .title{
    margin-left: 15px;
    font-weight: bold;
  }
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
      margin-top: 20px;
    }
    label{
      display: inline-block;
      width:140px;
      text-align: right;
      margin-right:20px;
    }
  }

  .popover-main .el-input,.popover-main .el-select{
    width:200px;
  }
  .popover-main > .el-button{
    width: 100px;
    display: block;
    margin: 0 auto;
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
    data() {
      return {

      };
    },
    components:{

    },
    mounted(){

    },
    computed:{
      ...mapGetters([
      'loading','popoverAlive'
      ]),
    },
    methods: {
      ...mapActions([
        'popoverAlert'
      ]),
      upSuccessfirst(response, file, fileList) {
        this.dialogImageUrl = 'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
      },

    }
  };
</script>
