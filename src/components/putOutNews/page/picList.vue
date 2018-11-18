<template>
    <div class="content flex">
      <img :src="item.url" alt="" v-for="(item,index) in picDataList.item">
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  export default {
  name: 'list',
  data () {
    return {

    }
  },
    props:['picDataList'],
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

  }
}
</script>

<style scoped lang="scss">
.content{
  flex-wrap: wrap;
  justify-content: flex-start;
  img{
    width:200px;
    height:120px;
    margin-right: 20px;
    margin-bottom: 15px;
  }
}
</style>
