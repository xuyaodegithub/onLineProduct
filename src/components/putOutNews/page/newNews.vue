<template>
    <div class="flex" id="newnews">
      <div class="left">
        <div v-for="(item,index) in arrList" :key="index" class="cu" :class="{'active' : !item.thumb_url,'addborder' : oneNum===index}" @click="choseThis(index)">
          <img :src="item.thumb_url" alt="" v-if="item.thumb_url">
          <div class="zhezhao" v-if="item.thumb_url"></div>
          <div class="zhezhao1" v-if="index!==0 && !item.thumb_url"></div>
          <div class="title" :class="{'over2': index===0, 'over' : index!==0}">
            {{item.title? item.title : '标题'}}
          </div>
          <div class="remove flex">
              <i class="icon iconfont icon-gupiaojiangicon" style="margin-right: 8px;" @click.stop="upTo(index,1)" v-if="index!==0"></i>
              <i class="icon iconfont icon-gupiaojiangicon1" @click.stop="upTo(index,2)"  v-if="index!==arrList.length-1"></i>
              <i class="icon iconfont icon-xitonghoutai-shanchuicon" @click.stop="upTo(index,3)" v-if="index!==0"></i>
          </div>
        </div>
        <p class="cu"><i class="el-icon-plus" @click="addOnenews"></i></p>
      </div>
      <div class="right">
        <el-input placeholder="请在这里输入标题(最多64字符)" class="bigTitle" v-model="isBigTitle" maxlength="64" @input="changeTitle(1)"></el-input>
        <el-input v-model="isouther" placeholder="请输入作者(最多8字符)" class="smallTitle" maxlength="8" @input="changeTitle(2)"></el-input>
        <div class="zhen">请在下方编辑正文</div>
        <div class="edit_container"  style="max-height: 500px;overflow-y: auto;border-bottom:2px solid #e7e7eb;">
          <quill-editor v-model="infoForm"
                        ref="myQuillEditor"
                        class="editer"
                        :options="editorOption" @ready="onEditorReady($event)">
          </quill-editor>
        </div>
        <div class="labeil">
          <label>原文链接:</label><el-input v-model="isUrl" size="small"   @input="changeTitle(3)"></el-input>
        </div>
        <div class="labeil">
          <label>是否开启留言:</label>
          <el-radio-group v-model="isAsk" @change="changeTitle(5)">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">打开</el-radio>
          </el-radio-group>
        </div>
        <div class="labeil" v-if="isAsk===1">
          <label>留言:</label>
          <el-radio-group v-model="radio2" @change="changeTitle(6)">
            <el-radio :label="0">所有人可留言</el-radio>
            <el-radio :label="1">仅关注后可留言</el-radio>
          </el-radio-group>
        </div>
        <div class="zhen">发布样式编辑</div>
        <div class="labeil">
          <label>封面:</label> <el-button plain size="mini" @click="choseImage()">从图片库选择</el-button>
          <img  v-if="arrList[oneNum].thumb_url" :src="arrList[oneNum].thumb_url" alt="" style="display: block;width: 180px;height:90px;margin:10px 0 0 120px;" />
        </div>
        <div class="labeil">
          <label>是否显示封面:</label>
          <el-radio-group v-model="isPic" @change="changeTitle(7)">
            <el-radio :label="0">隐藏</el-radio>
            <el-radio :label="1">显示</el-radio>
          </el-radio-group>
        </div>
        <div class="labeil">
          <label>摘要:</label> <el-input v-model="isDigest" size="small" type="textarea" placeholder="选填,如果不填写会默认抓取正文前54字" :rows="3" maxlength="120" style="width:70%;vertical-align: top;"  @input="changeTitle(4)"></el-input>
        </div>
        <div class="btn">
          <el-button type="success" style="margin-left: 100px;" @click="addNewnews()" v-if="type==='add'">保存</el-button>
          <el-button type="success" style="margin-left: 100px;" @click="updatanews()" v-else>保存</el-button>
          <el-button plain @click="isSend=true">预览</el-button>
          <el-button plain @click="putMethod()">保存并群发</el-button>
        </div>
      </div>
      <transition name="slide-fade">
        <div class="alertshow" v-if="isChoseImg" v-drag>
          <div class="demo incomingHistory">
            <div class="popover-head">
              <span class="title">选择图片</span><i v-on:click="isChoseImg=false" class="el-icon-close"></i>
            </div>
            <div class="popover-main flex">
              <img :src="item.url" alt="" v-for="(item ,index) in picDataList.item" :key="index" @click="choseThisImg(item)" class="cu">
              <el-upload
                class="upload-demo"
                name="file"
                action="http://test-admin-h5.olquan.cn/admin/weixin/messageSend/addMaterial"
                :on-success="upSuccessfirst"
                :show-file-list="false">
                <!--<span style="font-size: 12px;color: #777777;">(大小不超过5M，已开启图片水印)</span>-->
                <el-button size="small" type="success" style="margin-top: 35px;">点击上传</el-button>
              </el-upload>
            </div>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="rows"
                layout="total, sizes, prev, pager, next, jumper"
                :total="picDataList.total_count">
              </el-pagination>
            </div>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="alertshow" v-if="isSend" v-drag>
          <div class="demo incomingHistory">
            <div class="popover-head">
              <span class="title">预览账号</span><i v-on:click="isSend=false" class="el-icon-close"></i>
            </div>
            <div class="popover-main flex">
              <label>预览账号:</label>
              <el-input v-model="isPhone" placeholder="请输入预览账号" class="smallTitle" style="flex: 1;margin-left: 20px;"></el-input>
              <span style="color: #777777;font-size: 14px;">(预览内容会推送到输入的预览账号，在手机上预览)</span>
            </div>
            <el-button type="primary" plain @click="putOneMethod()" style=";margin: 20px 0 50px 300px;width: 100px;">确定</el-button>
          </div>
        </div>
      </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  Quill.register('modules/ImageExtend', ImageExtend)
  // import axios from "axios"
  import qs from 'qs'
  export default {
  name: 'new',
  data () {
    return {
      oneNum:0,
      page:1,
      rows:10,
      isChoseImg:false,
      isImage:'',
      isSend:false,
      isPhone:'',
      isID:'',
      isAsk:0,
      isPic:1,
      arrList:[
       {
         title:'',
         thumb_url:'',
         thumb_media_id:'',//封面素材id
         author:'',//作者//否传
         digest:'',//图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空。如果本字段为没有填写，则默认抓取正文前64个字。//否传
         show_cover_pic:1,//是否显示封面，0为false，即不显示，1为true，即显示
         content:'',//图文消息的具体内容，支持HTML标签，必须少于2万字符，小于1M，且此处会去除JS,涉及图片url必须来源 "上传图文消息内的图片获取URL"接口获取。外部图片url将被过滤。
         content_source_url:'',//图文消息的原文地址，即点击“阅读原文”后的URL
         need_open_comment:0,//Uint32 是否打开评论，0不打开，1打开//否传
         only_fans_can_comment:'',//Uint32 是否粉丝才可评论，0所有人可评论，1粉丝才可评论//否传
       },
      ],
      isBigTitle:'',
      isouther:'',
      isUrl:'',
      radio2:'',
      isDigest:'',
      infoForm: '',
      editorOption: {
        modules: {
          ImageExtend: {
//            headers:(xhr) => {
//               xhr.setRequestHeader('Content-Type','multipart/form-data')
//            },
            loading: true,
            name: 'file',
            action:this.$store.state.editor.axiosUrl+'/admin/weixin/messageSend/uploadImg',
            response: (res) => {
              // console.log(res)
              return res.result
            }
          },
          toolbar: {
            container: container,
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      }
    }
  },
    props:['type','oneDetial','picDataList'],
  watch:{
//    seachWhicheResult2(curVal,oldVal){
//      if(curVal===1){
//        this.statusOkOrNo=0
//      }else{
//        this.statusOkOrNo=1
//      }
//    }
    infoForm(curVal,oldVal){
      this.arrList[this.oneNum].content=curVal
    },
    getMemberTaskListInfoResult:{
      handler(newVal,oldVal){

      },
      deep:true
    }
  },
    activated(){
      this.isPhone=''
      this.isID=''
    if(this.type==='add'){
      this.oneNum=0
      this.isBigTitle=''
      this.isouther=''
      this.infoForm=''
      this.isUrl=''
      this.isAsk=0
      this.radio2=''
      // this.isImage=''
      this.isPic=1
      this.isDigest='',
      this.arrList=[{
        thumb_url:'',
        title:'',
        thumb_media_id:'',//封面素材id
        author:'',//作者//否传
        digest:'',//图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空。如果本字段为没有填写，则默认抓取正文前64个字。//否传
        show_cover_pic:1,//是否显示封面，0为false，即不显示，1为true，即显示
        content:'',//图文消息的具体内容，支持HTML标签，必须少于2万字符，小于1M，且此处会去除JS,涉及图片url必须来源 "上传图文消息内的图片获取URL"接口获取。外部图片url将被过滤。
        content_source_url:'',//图文消息的原文地址，即点击“阅读原文”后的URL
        need_open_comment:0,//Uint32 是否打开评论，0不打开，1打开//否传
        only_fans_can_comment:'',//Uint32 是否粉丝才可评论，0所有人可评论，1粉丝才可评论//否传
      }]
    }else{
      this.oneNum=0
      this.arrList=this.oneDetial.content.news_item
      // console.log(this.arrList[0].content)

      this.isBigTitle=this.arrList[0].title
      this.isouther=this.arrList[0].author
      this.infoForm=this.arrList[0].content.toString().replace(/(data-src)/g,'src')
      this.isUrl=this.arrList[0].content_source_url
      this.isAsk=this.arrList[0].need_open_comment
      this.radio2=this.arrList[0].only_fans_can_comment
     // this.isImage=this.arrList[0].thumb_url
//       this.getImgDetial(this.arrList[0].thumb_media_id)
      this.isPic=this.arrList[0].show_cover_pic
      this.isDigest=this.arrList[0].digest
//      console.log(this.newsList.content.news_item)
    }
    },
  computed:{
    ...mapGetters([
     'popoverAlive','loading'
    ])
  },
  components:{
    quillEditor
  },
    mounted(){

    },
  methods: {
    ...mapActions([
'popoverAlert'
    ]),
    onEditorReady(editor) {
    },
    addOnenews(){
      let data={
          title:'',
          thumb_url:'',
          thumb_media_id:'',//封面素材id
          author:'',//作者//否传
          digest:'',//图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空。如果本字段为没有填写，则默认抓取正文前64个字。//否传
          show_cover_pic:1,//是否显示封面，0为false，即不显示，1为true，即显示
          content:'',//图文消息的具体内容，支持HTML标签，必须少于2万字符，小于1M，且此处会去除JS,涉及图片url必须来源 "上传图文消息内的图片获取URL"接口获取。外部图片url将被过滤。
          content_source_url:'',//图文消息的原文地址，即点击“阅读原文”后的URL
          need_open_comment:0,//Uint32 是否打开评论，0不打开，1打开//否传
          only_fans_can_comment:'',//Uint32 是否粉丝才可评论，0所有人可评论，1粉丝才可评论//否传
        }
      this.arrList.push(data)
      this.oneNum=this.arrList.length-1
      this.choseThis(this.oneNum)
    },
    choseThis(index){
      console.log(this.arrList[index])
      this.oneNum=index
      this.isBigTitle=this.arrList[index].title
      this.isouther=this.arrList[index].author
      this.infoForm=this.arrList[index].content.toString().replace(/(data-src)/g,'src')
      this.isUrl=this.arrList[index].content_source_url
      this.radio2=this.arrList[index].only_fans_can_comment
      // this.isImage=this.arrList[index].thumb_url
      // this.getImgDetial(this.arrList[index].thumb_media_id)
      this.isDigest=this.arrList[index].digest
      this.isAsk=this.arrList[index].need_open_comment
      this.isPic=this.arrList[index].show_cover_pic
    },
    changeTitle(e){//改变标题
      if(e===1) this.arrList[this.oneNum].title=this.isBigTitle
      else if(e===2) this.arrList[this.oneNum].author=this.isouther
      else if(e===3) this.arrList[this.oneNum].content_source_url=this.isUrl
      else if(e===4) this.arrList[this.oneNum].digest=this.isDigest
      else if(e===5) this.arrList[this.oneNum].need_open_comment=this.isAsk
      else if(e===6) this.arrList[this.oneNum].only_fans_can_comment=this.radio2
      else if(e===7) this.arrList[this.oneNum].show_cover_pic=this.isPic
    },
//获取素材
    getImgDetial(id){
      let data={
        "mediaid":id
      }
      console.log(data.paramStr)
      this.$http.post(this.$store.state.editor.axiosUrl+'/admin/weixin/messageSend/getMaterial',qs.stringify(data)).then(res=>{
        if(res.data.code===0){
          this.isImage= res.data.result
        }else{
          console.log(res.data.message)
        }
      }).catch(err=>{
        console.log(err)
      })

    },
    upTo(index,num){
      let item=this.arrList[index]
      this.arrList.splice(index,1)
      if(num===1){
        this.arrList.splice(index-1,0,item)
        this.oneNum=index-1
      }else if(num===2){
        this.arrList.splice(index+1,0,item)
        this.oneNum=index+1
      }else{
        this.oneNum=0
      }
      this.choseThis(this.oneNum)
    },
    addNewnews(callback){
      let data={}
        let arr=[]
        this.arrList.map((item,index)=>{
          let itemArr=Object.keys(item)
          let obj={}
          itemArr.map((val,key)=>{
            if(val!=='thumb_url'){
              obj[val]=item[val]
            }
          })
          arr.push(obj)
        })
        data={"paramStr":JSON.stringify({"articles":arr})}
        this.$http.post(this.$store.state.editor.axiosUrl+'/admin/weixin/messageSend/addNews1',qs.stringify(data)).then(res=>{
          if(res.data.code===0){
              this.isID=res.data.result
              this.$message({
                message:'保存成功',
                type:'success'
              })
            if(callback){
              callback(res.data.result)
            }else{
                this.$emit('toParese',{type:'add',item:{},title:'seachList',tobush:true})
            }
          }else{
            this.$message({
              message:res.data.message,
              type:'warning'
            })
          }
        }).catch(err=>{
          console.log(err)
        })
    },
    //修改
    updatanews(callback){
      let  data={
        paramStr:JSON.stringify({
          media_id:this.oneDetial.media_id,
          index:this.oneNum,
          articles:{
            "title": this.arrList[this.oneNum].title,
            "thumb_media_id": this.arrList[this.oneNum].thumb_media_id,
            "author": this.arrList[this.oneNum].author,
            "digest": this.arrList[this.oneNum].digest,
            "show_cover_pic": this.arrList[this.oneNum].show_cover_pic,
            "content": this.arrList[this.oneNum].content,
            "content_source_url": this.arrList[this.oneNum].content_source_url
          }
        })
      }
      this.$http.post(this.$store.state.editor.axiosUrl+'/admin/weixin/messageSend/updateNews',qs.stringify(data)).then(res=>{
        if(res.data.code===0){
          this.$message({
            message:'修改成功',
            type:'success'
          })
          this.$emit('toParese',{type:'sedOneMethod'})
          if(callback){
            callback(this.oneDetial.media_id)
          }else{
            this.$emit('toParese',{type:'add',item:{},title:'seachList',tobush:true})
          }
        }else{
          this.$message({
            message:res.data.message,
            type:'warning'
          })
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //选择封面
    choseImage(){
      this.isChoseImg=true
    },
    choseThisImg(val){
      console.log(val)
      this.arrList[this.oneNum].thumb_url=val.url
      this.arrList[this.oneNum].thumb_media_id=val.media_id
      this.isChoseImg=false
    },
    handleSizeChange(val) {
//      console.log(`每页 ${val} 条`);
        this.rows=val
        this.getNewsList()
    },
    handleCurrentChange(val) {
//      console.log(`当前页: ${val}`);
      this.page=val
      this.getNewsList()
    },
    //获取列表
    getNewsList(num){
      let data={
        type:'image',
        page:this.page,
        rows:this.rows
      }
      this.$http.post(this.$store.state.editor.axiosUrl+'/admin/weixin/messageSend/batchGetMaterial',qs.stringify(data)).then(res=>{
        if(res.data.result.errcode===0){
            this.picDataList=res.data.result
        }
      }).catch(err=>{
          console.log(err)
      })
    },
    upSuccessfirst(response, file, fileList) {
      if(response.code===0){
        this.$message({
          message:'上传成功',
          type:'success'
        })
        this.$emit('toParese',{type:'updataImg'})
      }else{
        this.$message({
          message:'上传失败',
          type:'warning'
        })
      }

    },
    putMethod(){//群发
      let _self=this
      this.$confirm('确定要群发此条素材么？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(this.type!=='add'){
          this.updatanews(this.allSend)
        }else{
          if(!this.isID){
            let callback=function (res) {
              _self.$emit('toParese',{type:'sedOneMethod'})
              _self.allSend(res)
            }
            this.addNewnews(callback)
          }else{
            this.allSend(this.isID)
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //群发
    allSend(id){
      let data={
        mediaid:id
      }
      this.$http.post(this.$store.state.editor.axiosUrl+'/admin/weixin/messageSend/send',qs.stringify(data)).then(res1=>{
        if(res1.data.code===0){
          this.$message({
            message:'群发成功',
            type:'success'
          })
          this.$emit('toParese',{type:'add',item:{},title:'seachList',tobush:true})
        }else{
          this.$message({
            message:res1.data.message,
            type:'warning'
          })
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    putOneMethod(){
      let _self=this
      if(!this.isPhone){
        this.$message({
          message:'账号不可为空',
          type:'warning'
        })
        return
      }
      if(this.type!=='add'){
        this.updatanews(this.sendPutOut)
      }else{
        if(!this.isID){
          let callback=function (res) {
            _self.$emit('toParese',{type:'sedOneMethod'})
            _self.sendPutOut(res)
          }
          this.addNewnews(callback)
        }else{
          this.sendPutOut(this.isID)
        }
      }
      this.isSend=false
    },
    //预览发送
    sendPutOut(id){
      let data={
        accountNo:this.isPhone,
        mediaid:id
      }
      this.$http.post(this.$store.state.editor.axiosUrl+'/admin/weixin/messageSend/sendPreview',qs.stringify(data)).then(res1=>{
        if(res1.data.code===0){
          this.$message({
            message:'发送成功',
            type:'success'
          })
          // this.$emit('toParese',{type:'add',item:{},title:'seachList',tobush:true})
        }else{
          console.log(res1.data.message)
          this.$message({
            message:res1.data.message,
            type:'warning'
          })
        }
      })
    }
  }
}
</script>

<style  lang="scss">
/*#newnews .title{*/
  /*font-size: 24px;*/
  /*line-height: 90px;*/
  /*color: #000;*/
  /*font-weight: 600;*/
/*}*/
#newnews.flex{
  height:100%;
  overflow-y: auto;
  background-color: #f6f8f9;
}
#newnews .left{
  width: 250px;
  max-height: 500px;
  overflow-y: auto;
  border-right:1px solid #e7e7eb;
  padding:20px;
  margin-right: 20px;
}
#newnews .left .addborder{
  border:2px solid #43b548;
}
#newnews .left > div{
  /*padding:10px;*/
  border:1px solid #e7e7eb;
  width:208px;
  position: relative;
  margin: 0 auto;
}
#newnews .left > div:first-child{
  background-color: #c2c2c2;
  height:125px;
}
#newnews .left > div{
  background-color: #ffffff;
  height:80px;
}
#newnews .left > div:first-child img{
  position: absolute;
  width:100%;
  height:100%;
  top: 0;
  margin:0;
  right: 0;
}
#newnews .left > div:first-child .zhezhao{
  background-color: rgba(0,0,0,0.3);
  position: absolute;
  top:0;
  width:100%;
  height:100%;
  z-index: 12;
  margin:0;
  right: 0;
}
#newnews .left > div .zhezhao1,#newnews .left img{
  position: absolute;
  width:50px;
  height:50px;
  right: 10px;
  top:50%;
  margin-top: -25px;
}
#newnews .left > div .zhezhao1{
  background-color: #f6f8f9;
}
#newnews .left > div .remove{
  position: absolute;
  width: 100%;
  line-height: 40px;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,0.6);
  display: none;
  font-size: 18px;
  color: #ffffff;
  text-indent:1em;
}
#newnews .left > div .remove .icon-xitonghoutai-shanchuicon{
  float: right;
  margin-right: 15px;
}
#newnews .left > div:hover > .remove{
  display: block;
}
#newnews .left > div:first-child .title{
  /*text-align: center;*/
  position: absolute;
  width:-webkit-calc(100% - 20px);
  width:-moz-calc(100% - 20px);
  width:calc(100% - 20px);
  font-size: 16px;
  line-height: 24px;
  font-weight: normal;
  top: 60px;
  z-index: 15;
  padding:0 10px;
  color: #ffffff;
  margin: 0;
  left: 0;
}
#newnews .left > div .title{
  position: absolute;
  top: 50%;
  margin-top: -25px;
  line-height: 50px;
  left: 10px;
  width:70%;
  font-size: 16px;
  font-weight: normal;
}
/*#newnews .left > div.active{*/
  /*!*background-color: rgba(0,0,0,0.3);*!*/
  /*background-color: #c2c2c2;*/
  /*}*/
  #newnews .left p{
    font-size: 56px;
    text-align: center;
    font-weight: normal;
    padding:20px 0;
    width:208px;
  border:1px dashed #e7e7eb;
  border-top: none;
  margin: 0 auto;
}
#newnews .right{
  flex:1;
  position: relative;
  padding-bottom:120px;
}
#newnews .right .el-input{
  width:80%;
  margin:0 auto;
  margin-top: 20px;
}
#newnews .right .bigTitle{
  height:46px;
  line-height: 46px;
  font-size: 22px;
  color: #333333;
}
#newnews .right .smallTitle{
  height: 22px;
  line-height: 22px;
  font-size: 14px;
}
#newnews .right label{
  display: inline-block;
  width:120px;
  font-size: 16px;
  font-weight: normal;
  line-height: 28px;
}
#newnews .right .labeil{
  margin-top: 15px;
}
#newnews .right .zhen{
  font-size: 18px;
  line-height: 32px;
  color: #c0c4cc;
  margin: 10px 0;
}
#newnews .right .btn{
  position: fixed;
  width: 100%;
  bottom: 0;
  left:0;
  padding:30px;
  text-align: center;
  background-color: #ffffff;
  border-top: 1px solid #e7e7eb;
  z-index: 1999;
}
#newnews .right .btn .el-button{
  margin-right: 50px;
  width:120px;
}

#newnews .ql-toolbar.ql-snow{
  position: absolute;
  z-index:1000;
  background: #ffffff;
  top:175px;
}
#newnews .ql-toolbar.ql-snow + .ql-container.ql-snow{
  margin-top:100px;
  overflow: auto;
  min-height:150px;
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
#newnews .demo{
  width:800px;
  background: #F0FAFF;
  margin-left: -350px;
  margin-top: -240px;
  border-radius: 5px;
  border: 1px solid #90CCE8;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  overflow: hidden;
  color: #333333;
}
#newnews .popover-head{
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #F0FAFF;
  font-size: 14px;
  border-bottom: 1px solid #C5E2F0;
}
#newnews .popover-head i{
  float: right;
  color: #A1C1E2;
  font-size: 12px;
  margin-top: 13px;
  margin-right: 12px;
  cursor: pointer;
}
#newnews .popover-head .title{
  margin-left: 15px;
  font-weight: bold;
}
#newnews .popover-main{
  padding: 15px 12.5px;
  width: calc(100% - 25px);
  flex-wrap: wrap;
  max-height: 500px;
  overflow-y: auto;
  img {
    width:150px;
    height: 100px;
    margin-right: 35px;
    margin-bottom: 15px;
  }
}
.alertshow{
  position: fixed;
  left:50%;
  top:50%;
  z-index:1000;
}
.block{
  text-align: right;
  padding-right: 100px;
  margin-top: 15px;
}
</style>
