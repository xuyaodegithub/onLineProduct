<template>
  <div style="padding:0 100px;">
   <div class="title">
    素材管理
   </div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item :index="1">图文消息</el-menu-item>
      <el-menu-item :index="2">图片</el-menu-item>
    </el-menu>
    <div class="flex">
      <div v-if="activeIndex===1">
        图文消息（共{{dataList.total_count}}条）
      </div>
      <div v-if="activeIndex===2">
        图片（共{{picList.total_count}}条）
      </div>
      <div v-if="activeIndex===1">
        <el-button type="success"  size="mini" icon="el-icon-back" v-if="isTitle!=='seachList' && activeIndex!==2" style="height: 40px;" @click="goback()">返回</el-button>
        <div v-else>
          <el-input v-model="isSeach" placeholder="请输入搜索内容">
            <el-button slot="append" icon="el-icon-search" @click="seachMsg"></el-button>
          </el-input>
          <el-button type="success" size="mini" icon="el-icon-plus" @click="addNews()" style="height: 40px;">新增图文素材</el-button>
        </div>
      </div>
      <div v-if="activeIndex===2">
        <el-upload
          class="upload-demo"
          name="file"
          action="http://ol-h5-admin.olquan.cn/admin/weixin/messageSend/addMaterial"
          :on-success="upSuccessfirst"
          :show-file-list="false">
          <span style="font-size: 12px;color: #777777;">(大小不超过5M，已开启图片水印)</span>
          <el-button size="small" type="success">点击上传</el-button>
        </el-upload>
      </div>

    </div>
    <div style="margin-top: 30px;">
      <keep-alive>
        <component :is="isTitle" :picDataList="picList" :newsList="dataList.item" v-on:toParese="changeTitle" :type="addOrupdata" :oneDetial="detialMsg"></component>
      </keep-alive>
    </div>
    <div class="block" v-if="isTitle==='seachList' || isTitle==='picList'">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="isTitle==='seachList' ? dataList.total_count : picList.total_count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import seachList from '../page/seachList.vue'
  import newNews from '../page/newNews.vue'
  import picList from '../page/picList.vue'
  import qs from 'qs'
  export default {
  name: 'newsMannage',
  data () {
    return {
      baseUrl:this.$store.state.editor.axiosUrl,
      isSeach:'',
      isTitle:'seachList',
      dataList:[],
      page:1,
      rows:10,
      type:'news',
      Pictype:'image',
      activeIndex:1,
      addOrupdata:'add',
      detialMsg:'',
      picList:[]
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

      },
      deep:true
    }
  },
  computed:{
    ...mapGetters([
     'popoverAlive','loading'
    ])
  },
  components:{
    seachList,newNews,picList
  },
    mounted(){
      this.getNewsList(1)
      this.getNewsList(2)
    },
  methods: {
    ...mapActions([
'popoverAlert'
    ]),
    //获取列表
    getNewsList(num){
      let data={
        type:this.type,
        page:this.page,
        rows:this.rows
      }
      if(num===2) data.type=this.Pictype
      this.$http.post(this.$store.state.editor.axiosUrl+'/admin/weixin/messageSend/batchGetMaterial',qs.stringify(data)).then(res=>{
          if(res.data.result.errcode===0){
            if(num===2){
              this.picList=res.data.result
            }else{
              this.dataList=res.data.result
            }
          }
      }).catch(err=>{

      })
    },
    addNews(){
        this.isTitle='newNews'
        this.addOrupdata='add'
    },
    goback(){
      this.isTitle='seachList'
    },
    seachMsg(){

    },
    handleSelect(key, keyPath){
      console.log(key, keyPath)
      this.activeIndex=key
      this.page=1
      this.rows=10
      if(key===2) this.isTitle='picList'
      else this.isTitle='seachList'
    },
    handleSizeChange(val) {
//      console.log(`每页 ${val} 条`);
      this.rows=val
      if(this.isTitle==='picList'){
        this.getNewsList(2)
      }else{
        this.getNewsList(1)
      }

    },
    handleCurrentChange(val) {
//      console.log(`当前页: ${val}`);
      this.page=val
      if(this.isTitle==='picList'){
        this.getNewsList(2)
      }else{
        this.getNewsList(1)
      }
    },
    upDataThis(){},
    deleteThis(){},
    changeTitle(val){
      console.log(val)
      if(val.type==='updataImg'){
        this.page=1
        this.rows=10
        this.getNewsList(2)
        return
      }
      if(val.type==='sedOneMethod'){
        this.page=1
        this.rows=10
        this.getNewsList(1)
        return
      }
      this.isTitle=val.title
      this.detialMsg=val.item
      this.addOrupdata=val.type
      if(val.type){
        // this.page=1
        // this.rows=10
        this.getNewsList(1)
      }
    },
    upSuccessfirst(response, file, fileList) {
    if(response.code===0){
      this.getNewsList(2)
      this.$message({
        message:'上传成功',
        type:'success'
      })
      }else{
      this.$message({
        message:'上传失败',
        type:'warning'
      })
    }

    },
  }
}
</script>

<style scoped lang="scss">
.title{
  font-size: 24px;
  line-height: 90px;
  color: #000;
  font-weight: 600;
}
.el-input{
  width:300px;
}
.block{
  text-align: right;
  padding-right: 100px;
  margin-top: 15px;
}
.flex{
  justify-content: space-between;
  font-size: 22px;
  line-height: 40px;
  margin-top: 20px;
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
