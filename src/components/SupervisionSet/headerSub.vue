<template>
  <div>
   <header>
  	<!--<i class="ion-ios-arrow-back" @click="goBack()" v-show="msg !== 'WeChat'"></i>-->
  	{{msg}}
   </header>
  </div>
</template>

<script>
export default {
	props:["msg"],
  name: 'header',
  methods:{
  	goBack(){
  		this.$router.go(-1)
  	}
  }
}
</script>

<style lang="less" scoped>
 div header {
	line-height: 0.75rem;
	font-size: 0.18rem;
	color:#666666;
	text-align: center;
	i{
		font-size: 0.18rem;
		float:left;
		margin-left: 0.18rem;
	}
}


</style>
