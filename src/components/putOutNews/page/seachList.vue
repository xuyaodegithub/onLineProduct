<template>
    <div class="content">
      <el-table
        v-loading="loading"
        :data="newsList"
        style="width: 100%"
        ref="multipleTable"
        tooltip-effect="light"
        :cell-style="{height:'50px',padding:'6px 0'}"
        :header-cell-style="{'color':'#000000','fontWeight':'600'}">
        <!--<el-table-column-->
        <!--type="selection"-->
        <!--width="30">-->
        <!--</el-table-column>-->
        <el-table-column
          v-for="(item,index) in dataList"
          :label="item.title"
          :key="index"
          :width="item.width">
          <template slot-scope="scope">
          <span style="margin-left: 10px;display: flex;" v-if="item.which==='image'">
            <img :src="scope.row.content.news_item[0]['thumb_url']" alt="" style="width: 78px;height: 78px;display: inline-block;margin-right: 30px;">
           <span>
              <span v-for="(itemson,indexson) in scope.row.content.news_item" :key="indexson" style="display: block;">{{itemson.title}}</span>
           </span>
          </span>
            <!--<span style="margin-left: 10px" v-else-if="item.which==='isRecommend'">{{scope.row[item.which] === 0 ? '否' : '是' }}</span>-->
            <!--<span style="margin-left: 10px" v-else-if="item.which==='index'">{{scope.$index+1}}</span>-->
            <span style="margin-left: 10px" v-else>{{scope.row[item.which] | changeTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" :width="200">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="upDataThis(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteThis(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import qs from 'qs'
  export default {
  name: 'list',
  data () {
    return {
      isSeach:'',
      dataList:[
        {title:'内容',width:'',which:'image'},
        {title:'更新时间',width:'250',which:'update_time'},
      ]
    }
  },
    props:['newsList'],
    filters:{
        changeTime(val){
          let data=new Date(val)
          let year=data.getFullYear()
          let month=data.getMonth()+1
          let day= data.getDate()
          let hour= data.getHours()
          let min=data.getMinutes()
          let sec=data.getSeconds()
          if(month.length<2){
            month='0'+month
          }
          //console.log(year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec)
          // return year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec
          if(month<10){
            month='0'+month
          }
          if(day<10){
            day='0'+day
          }
          if(hour<10){
            hour='0'+hour
          }
          return year+'-'+month+'-'+day +' '+hour+':'+min+':'+sec
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

  },
    mounted(){

    },
  methods: {
    ...mapActions([
'popoverAlert'
    ]),
    upDataThis(val){
//      console.log(val)
      let data={
        title:'newNews',
        type:'updata',
        item:val
      }
      this.$emit('toParese',data)
    },
    deleteThis(val){
    let data={
      mediaid:val.media_id
    }
      this.$confirm('确定要删除该素材么？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(this.$store.state.editor.axiosUrl+'/admin/weixin/messageSend/delMaterial',qs.stringify(data)).then(res=>{
          if(res.data.code===0){
            this.$message({
              message:'删除成功',
              type:'success'
            })
          }else{
            this.$message({
              message:'删除失败',
              type:'warning'
            })
          }
          this.$emit('toParese',{type:'add',item:{},title:'seachList',tobush:true})
        }).catch(err=>{
          console.log(err)
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
.title{
  font-size: 24px;
  line-height: 90px;
  color: #000;
  font-weight: 600;
}
.el-input{
  width:300px;
}
.flex{
  justify-content: space-between;
  font-size: 22px;
  padding:0 100px;
  line-height: 40px;
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
