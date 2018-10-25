<template>
  <div>
    <div class="content">
      <el-table
        v-loading="loading"
        :data="dataList"
        style="width: 100%;"
        ref="multipleTable"
        tooltip-effect="light"
        :cell-style="{height:'50px',padding:'6px 0'}"
        :header-cell-style="{'color':'#000000','fontWeight':'600'}">
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="30">-->
        <!--</el-table-column>-->
        <el-table-column
          v-for="(item,index) in titleList"
          :label="item.title"
          :key="index"
          :width="item.width"
          :show-overflow-tooltip ="item.which!='sort' && item.which!='isRecommend' && item.which!='image'">
          <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="item.which==='logo'">
            <img :src="scope.row[item.which]" alt="" style="height: 78px;display: inline-block;">
          </span>
          <span style="margin-left: 10px" v-else-if="item.which==='index'">{{scope.$index+1}}</span>
          <span style="margin-left: 10px" v-else>{{scope.row[item.which]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="upData(scope.row)" plain>查看分类下的banner图</el-button>
            <!--<el-button-->
              <!--size="mini"-->
              <!--type="danger"-->
              <!--icon="el-icon-delete"-->
              <!--@click="deleteProduct(scope.row)" plain>删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import vPopover from '../../popover/popover.vue'
  export default {
  name: 'indexchangeseach',
    props:['dataList'],
  data () {
    return {
      currentPage5:1,
      rows:10,
      titleList:[
        {title:'序号',width:'60',which:'index'},
        {title:'分类名称',width:'',which:'name'},
//        {title:'分类图标',width:'',which:'logo'}
      ],
      value: '',
      value2: ''
    }
  },
    filters:{

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
     'popoverAlive','loading'
    ])
  },
  components:{
    vPopover
  },
    mounted(){

    },
  methods: {
    ...mapActions([
'popoverAlert'
    ]),
    upData(val){
      this.$http.get(this.$store.state.editor.axiosUrl+'/admin/product/category/advers/getByCatId',{
        params:{catId:val.id}
      }).then((res)=>{
          if(res.data.code===0){
              this.$emit('toParese',{title:true,item:res.data.result,parseVal:val})
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
    deleteProduct(val){
      this.$confirm('确定要删除该产品么？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data={
          id:val.id
        }
        this.deleteindexLunActions(data)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  }
}
</script>

<style scoped lang="scss">
#toindex{
font-size: 18px;
  font-weight: 600;
}
  .header {
    margin-top: 20px;
    margin-bottom: 20px;
    .el-select{
      width:150px;
    }
    label{
      margin:0 5px 0 30px;
      color: orange;
    }
  }
  .block{
    text-align: right;
    padding-right: 100px;
    margin-top: 15px;
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
