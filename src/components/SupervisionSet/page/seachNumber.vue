<template>
  <div class="seach-list" id="SaleNewone">
    <el-table
      v-loading="loading"
      :data="findMsgResult.result.rows"
      style="width: 100%"
      ref="multipleTable"
      tooltip-effect="light"
      :cell-style="{'height': '50px','padding': '6px 0'}"
      :header-cell-style="{'color':'#000000','fontWeight':'600'}">
      <!-- <el-table-column
         type="selection"
         width="30">
       </el-table-column>-->
      <el-table-column
        v-for="(item,index) in dataList"
        :label="item.title"
        :key="index"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="item.which==='isHeader'">
            <img :src="scope.row[item.which]" alt="" style="height: 78px;width: 78px;">
          </span>
          <span v-else-if="item.which==='status'">
            {{scope.row[item.which] === 0 ? '未禁用' : '已禁用'}}
          </span>
          <span v-else-if="item.which==='logo'">
           <img :src="scope.row[item.which]" alt="" style="display: block;width: 75px;height: 75px;">
          </span>
          <span v-else>{{scope.row[item.which]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" :min-width="550">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="updata(scope.row)" plain>编辑
          </el-button>
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-sort"
            @click="changeStatus(scope.row)" plain>更改禁用状态
          </el-button>
          <el-button
            size="mini"
            type="success"
            icon="el-icon-upload2"
            @click="putMsg(scope.row)" plain>发布发现
          </el-button>
          <el-button
            size="mini"
            type="info"
            icon="el-icon-zoom-in"
            @click="toList(scope.row)" plain>查看文章列表
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="msg.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="msg.rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="findMsgResult.result.total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    props: ['msg','msgData'],
    name: 'seachNumber',
    data () {
      return {
        currentPage5:1,
        rows:10,
        dataList: [
          {title: '账号昵称', width: '120', which: 'name'},
          {title: '头像', width: '120', which: 'logo'},
          {title: '帐号说明', width: '230', which: 'desc'},
          {title: '发现数量', width: '90', which: 'totalFindCount'},
          {title: '是否禁用', width: '100', which: 'status'},
//          {title:'账号昵称',width:'100',which:'isN'},
        ],
      }
    },
    computed: {
      ...mapGetters([
        'loading','findMsgResult'
      ]),

    },
    watch: {
//      PproductgetByIdResult: {
//        handler (newVal, oldVal) {
//          let that = this
//          console.log(newVal.title + ',' + oldVal.title)
//          if (newVal.title == oldVal.title) {
//            that.priceListUpdata = []
//            that.activeUpdata = []
//            newVal.item.forEach((val, index) => {
//              that.priceListUpdata.push(val.commission)
//              that.activeUpdata.push(val.salePriceView)
//            })
//            //console.log(this.priceListUpdata)
//          }
//        },
//        deep: true
      //     },
    },
    activated () {

    },
    mounted () {
      this.getSeachList()
    },
    methods: {
      ...mapActions([
        'popoverAlert','findAccountActions','findAccountSaveActions'
      ]),
      handleSizeChange (val) {
//        console.log(`每页 ${val} 条`)
        this.msg.rows=val
        this.msg.filter_I_type=1
        this.findAccountActions(this.msg)
      },
      handleCurrentChange (val) {
//        console.log(`当前页: ${val}`)
        this.msg.page=val
        this.msg.filter_I_type=1
        this.findAccountActions(this.msg)

      },
      updata(item){
        let data={
          type:'updata',
          title:'vNew',
          data:item,
          which:1,
          numnew:'first'
        }
        this.$emit('to-change',data)
      },
      changeStatus(item){
          let data={
            id:item.id,
            status:item.status===0 ? 1 : 0
          }
        this.findAccountSaveActions(data)
      },
      putMsg(item){
        let data={
          title:'vNewmsg',
          data:item,
          type:'add',
          which:1,
          id:item.id
        }
        this.$emit('to-change',data)
      },
      toList(item){
        let data={
          title:'vListmsg',
          data:item,
          id:item.id,
          which:1
        }
        this.$emit('to-change',data)
      },
      getSeachList(){
        let data={
          page:this.currentPage5,
          rows:this.rows,
          filter_I_type:1
        }
        this.findAccountActions(data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #SaleNewone.seach-list {
    margin-top: 16px;
    padding-left: 30px;
   .listbtn .el-button--mini, .el-button--mini.is-round {
      padding: 4px 5px;
    }
  }
  .block{
    padding:30px;
    text-align: center;
    /*margin-left: 500px;*/
  }
</style>
