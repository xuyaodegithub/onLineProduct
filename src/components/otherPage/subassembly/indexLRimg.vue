<template>
  <div id="indexLR">
   <!-- <div class="header" v-if="isTitle==='vList'">
      <label>分类名称：</label>
      <el-input v-model="isName" size="mini"></el-input>
      <el-button size="mini" type="primary" style="width: 80px;margin-left: 50px;" >搜索</el-button>
    </div>-->
    <div class="contents">
      <keep-alive>
        <component :is="isTitle" :dataList="dataList" v-on:toParese="changeTitle"></component>
      </keep-alive>
    </div>
    <transition name="slide-fade">
      <div class="alertshow" v-drag v-if="isShow">
        <div class="demo incomingHistory">
          <div class="popover-head">
            <span class="title">分类下banner图明细</span><i v-on:click="isShow=false" class="el-icon-close"></i>
          </div>
          <div class="popover-main">
            <div style="display: flex">
              <div style="display: flex;padding: 20px;align-items: center;padding-left: 0;">
                <label style="padding-right: 20px;">图片</label>
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
            <div>
                <label>跳转类型:</label>
                <el-select v-model="linkType" placeholder="请选择" size="mini" @change="changeType">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div  v-if="linkType===9"  style="margin-top: 20px;">
                <label>选择活动:</label>
                <el-select v-model="activeid" placeholder="请选择活动" size="mini" @change="changeUrl">
                  <el-option
                    v-for="item in listActiveResult.result"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            <div style="margin-top: 20px;">
              <label>跳转链接:</label>
              <el-input v-model="url" placeholder="请输入内容" size="mini" disabled></el-input>

            </div>
            <div style="display: flex;justify-content: center;padding: 15px;">
              <el-button type="primary" plain @click="saveProduct()" size="small" style="margin-right: 100px;">
                保存
              </el-button>
              <el-button type="danger" plain @click="deleteSave()" size="small">
                删除banner图
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import qs from 'qs'
  import vPopover from '../../popover/popover.vue'
  import vList from '../page/indeximgseach.vue'
  import vUpdata from '../page/updataseach.vue'
  export default {
  name: 'indexchange',
  data () {
    return {
      isName:'',
      isTitle:'vList',
      dataList:[],
      detialData:{},
      isShow:false,
      dialogImageUrl:'',
      linkType:'',
      activeid:'',
      parseVal:{},
      options2: [
        {value: 3, label: '无'},
        {value: 9, label: '活动'},
        {value: 10, label: '特卖 '},
        {value: 13, label: '试用首页 '},
        {value: 18, label: '发现首页'}
//        {value: 13, label: '试用中心'}
      ],
      url:''
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
     'popoverAlive','CouponWithGoodsResult','listActiveResult'
    ])
  },
  components:{
    vList,vUpdata
  },
  mounted(){
      this.getIndexList()
      this.listActiveActions()
    },
  methods: {
    ...mapActions([
'popoverAlert','listActiveActions'
    ]),
    upSuccessfirst(response, file, fileList) {
      this.dialogImageUrl = 'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/' + response.result
    },
      getIndexList(){
        this.$http.get(this.$store.state.editor.axiosUrl+'/admin/product/category/advers/getAllCategory')
          .then((res)=>{
            if(res.data.code===0){
              this.dataList=res.data.result
            }else{
              this.$message({
                message:'请求错误',
                type:'warning'
              })
            }
          }).catch(err=>{
            console.log(err)
        })
      },
    changeTitle(val){
        this.isShow=val.title
        this.detialData=val.item
        this.parseVal=val.parseVal
        this.dialogImageUrl=val.item.length>0 ? val.item[0].image : ''
        this.linkType=this.detialData.length>0 ? this.detialData[0].linkType: ''
        this.url=this.detialData.length>0 ? this.detialData[0].url: ''
        this.activeid=this.detialData.length>0 ? Number(this.detialData[0].url.split('=')[1]): ''
    },
    changeType(urlType){
      if(urlType===3)  this.url='#'
      else if(urlType===9) {
      this.url=''
      this.activeid=''
      }
      else if(urlType===10) this.url=this.$store.state.editor.axiosQian+'/index/pinkIndex'
      else if(urlType===13) this.url=this.$store.state.editor.axiosQian+'/try/newCenter'
      else if(urlType===18) this.url=this.$store.state.editor.axiosQian+'/index/findIndex'
      else this.url=''
    },
    changeUrl(urls){
      this.url=this.$store.state.editor.axiosQian+'/activity/newact?id='+urls
    },
    saveProduct(){
//      let _self=this
        let data={
//          id:this.detialData[0].id,
          image:this.dialogImageUrl,
          linkType:this.linkType,
          url:this.url
        }
        if(this.detialData.length>0) data.id=this.detialData[0].id
        else data.catId=this.parseVal.id
        if(!this.dialogImageUrl || !this.linkType || !this.url){
          this.$message({
            message:'请把信息填写完整',
            type:'warning'
          })
          return
        }
        this.$http.post(this.$store.state.editor.axiosUrl+'/admin/product/category/advers/save', qs.stringify(data)
        ).then((res)=>{
            if(res.data.code===0){
              this.$message({
                message:'操作成功',
                type:'success'
              })
              this.isShow=false
            }else{
              this.$message({
                message:res.code.message,
                type:'warning'
              })
            }
        }).catch(err=>{
          console.log(err)
        })
    },
    deleteSave(){
      if(this.detialData.length===0){
        this.$message({
          message:'此分类下暂无banner图',
          type:'warning'
        })
        return
      }
      this.$confirm('确定要删除分类下的banner图么？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data={
          id:this.detialData[0].id
        }
        this.$http.post(this.$store.state.editor.axiosUrl+'/admin/product/category/advers/delete',qs.stringify(data)).then(res=>{
          if(res.data.code===0){
            this.$message({
              message:'操作成功',
              type:'success'
            })
            this.isShow=false
          }else{
            this.$message({
              message:res.code.message,
              type:'warning'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style scoped lang="scss">
  #indexLR{
   .header{
     margin-bottom: 20px;
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
  .demo{
    width: 450px;
    height: auto;
    background: #F0FAFF;
    margin-left: -300px;
    margin-top: -220px;
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
  .popover-head .small-title{
    font-size: 12px;
    color: #999999;
    font-weight: normal;
  }
  .popover-main{
    padding: 20px 12.5px;
    width: calc(100% - 25px);
  }
  .el-input,.el-select{
    width:200px;
  }
</style>
