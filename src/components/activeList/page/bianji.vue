<template>
  <div>
  <div id="bianji">
    <div class="left">
      <p>
        <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="popoverAlert('vAddSubass')">添加活动组件</el-button>
        <el-button type="primary" plain size="mini" @click="popoverAlert('VaddBackground')">添加背景</el-button>
        <el-button type="success" plain size="mini" @click="watch()">预览<i class="el-icon-d-arrow-right"></i></el-button>
      </p>
      <div class="left-btn">
        <div class="divP">
        <div v-for="(item,index) in addCommodityResult"  :class="{redborder : key===index}"  @click="otherSub(item,index)" class="cu" style="min-height: 40px;position: relative;">
          <!--轮播-->
          <el-carousel indicator-position="none"  :interval="1000"  height="150px" v-if="item.modelSampleCode=='advertisingFigure' && item.contents.length>0">
            <el-carousel-item v-for="(items,index) in item.contents" :key="index">
              <img :src="items.image | ToUrl" alt=""  style="width: 100%;height: 160px;">
            </el-carousel-item>
          </el-carousel>
          <!--能滑动的-->
          <ul class="touchImg" v-if="item.modelSampleCode=='titleproducttouch'">
            <li v-for="itemSons in item.contents" style="height: 72px;width: 72px;"><img :src="itemSons.image | ToUrl" style="height: 100%;width: 100%;"/></li>
          </ul>
          <!--等分-->
          <div style="width:100%;display: flex;flex-wrap: nowrap;" v-if="item.modelSampleCode === 'f5'"><!--{{item.name}}-->
            <div  v-if="item.contents.length===1" v-for="(itenSon,key) in item.contents" style="width: 100%;">
              <img :src="itenSon.image | ToUrl" alt="">
            </div>
            <div  v-if="item.contents.length===2" v-for="(itenSon,key) in item.contents" style="width: 50%;">
              <img :src="itenSon.image | ToUrl" alt="">
            </div>
            <div  v-if="item.contents.length===3" v-for="(itenSon,key) in item.contents" style="width: 33.3%;">
              <img :src="itenSon.image | ToUrl" alt="">
            </div>
            <div  v-if="item.contents.length===4" v-for="(itenSon,key) in item.contents" style="width: 25%;">
              <img :src="itenSon.image | ToUrl" alt="">
            </div>
            <div  v-if="item.contents.length===5" v-for="(itenSon,key) in item.contents" style="width: 20%;">
              <img :src="itenSon.image | ToUrl" alt="">
            </div>
          </div>
          <!--<div class="list-top" v-show="addCommodityResult[addCommodityResult.length-1].contents.length>0 && addCommodityResult[addCommodityResult.length-1].modelSampleCode ==='catlist1'">
            <ul>
              &lt;!&ndash;<li v-for="(itemsSon,index) in addCommodityResult[addCommodityResult.length-1].contents" style="width: auto;line-height: 40px;background: #409EFF;margin-right: 10px;border: 1px solid #333;">{{itemsSon.title}}</li>&ndash;&gt;
              <li
                class="cu"
                v-for="(itemsSon,key) in addCommodityResult[addCommodityResult.length-1].contents"
                type="primary"
                plain
                :key="key"
                size="mini"
                style="margin: 0;padding: 6px;font-weight: 600;color: #999999;"
                :class="{background : keyNum===key}"
                @click="changeKey(key)"
              >{{itemsSon.title}}</li>
            </ul>
          </div>-->
          <div v-if="item.contents.length===0 || item.modelSampleCode=='catlist1'">
            {{item.name}}
          </div>
          <i class="el-icon-close" style="position:absolute;top:0;right: 0;color: #097CF4;font-size: 18px;z-index:999;" @click="remove(index)"></i>
        </div>
        </div>
        <p class="Plast"><i class="iconfont icon-gupiaojiangicon cu" @click="up()"></i><br>
          <i class="iconfont icon-gupiaojiangicon1 cu" @click="down()"></i>
        </p>
      </div>
      <p style="display: flex;margin-top: 10px;">
        <label class="over" style="width: 120px;margin-right: 10px;line-height: 32px;">组件名：{{title}}</label><el-input v-model="input" placeholder="请输入位置" size="small" style="width: 70px;margin-right: 10px;"></el-input>
        <el-button type="success" plain size="mini" @click="UpGoTo()">确认位置</el-button>
      </p>
      <p style="color:#666666;">(组件调到某个位置：先选择组件，在输入位置确认即可)</p>
    </div>
    <div class="right">
      <p class="btnOver">
        <label style="margin-right: 230px">组件数据：</label>
      </p>
      <div class="right-btn">
        <v-zujiandata/>
      </div>
      <p style="text-align: right;padding-right: 100px;margin-top: 20px">
        <el-button type="primary" size="small" plain style="width: 100px;" @click="upOk()">提交</el-button></p>
    </div>
  </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import vZujiandata from './zujiandata.vue'
export default {
  name: 'huodong',
  data () {
    return {
    input:'',
      title:'',
      key:-1

    }
  },
  activated(){
    this.title=''
    this.key=-1
  },
  computed:{
    ...mapGetters([
      'addCommodityResult','backColorResult','activeChangeResult'
    ]),
    WidthImg:function(val){
      let obj={}
      if(this.addCommodityResult[val].contents.length===1){
        obj={
          width:'100%'
        }
      }else if(this.addCommodityResult[val].contents.length===2){
        obj={
          width:'50%'
        }
      }else if(this.addCommodityResult[val].contents.length===3){
        obj={
          width:'33.3%'
        }
      }else if(this.addCommodityResult[val].contents.length===4){
        obj={
          width:'25%'
        }
      }else if(this.addCommodityResult[val].contents.length===5){
        obj={
          width:'20%'
        }
      }
    }
  },
  components:{
    vZujiandata
  },
  methods: {
    ...mapActions([
      'activeActions','addCommodityActions','popoverAlert','commodityActions','uploadDataToOSSActions'
    ]),
    watch(){
      console.log(this.addCommodityResult)
      if(this.addCommodityResult.length>0){
      if(this.addCommodityResult[0].contents.length>0){
        this.popoverAlert('Vdetail')
      }else{
        this.$message({
          message:"请先添加组件内容",
          type:"warning"
        })
      }
      }else{
        this.$message({
          message:"请先添加组件",
          type:"warning"
        })
      }

    },
    up(){
      if(this.key>=0){
      let item=this.addCommodityResult[this.key]
      if(this.key != 0){
        this.addCommodityResult.splice(this.key,1)
        this.addCommodityResult.splice(this.key-1,0,item)
        this.key--
      }else{
        this.addCommodityResult.splice(this.key,1)
        this.addCommodityResult.push(item)
        this.key=this.addCommodityResult.length-1
      }
      }else{
        this.$message({
          message:'请先选择组件',
          type:'warning'
        })
      }
    },
    down(){
      if(this.key>=0){
      let item=this.addCommodityResult[this.key]
      if(this.key == this.addCommodityResult.length-1){
        this.addCommodityResult.splice(this.key,1)
        this.addCommodityResult.unshift(item)
        this.key=0
      }else{
        this.addCommodityResult.splice(this.key,1)
        this.addCommodityResult.splice(this.key+1,0,item)
        this.key++
      }
      }else{
        this.$message({
          message:'请先选择组件',
          type:'warning'
        })
      }

    },
    Updata(){

    },
    remove(index,event){
      if ( event && event.stopPropagation ) {
        event.stopPropagation();
      } else {
        window.event.cancelBubble = true;
      }
      this.$confirm('此操作将删除该组件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.addCommodityResult.splice(index,1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    upOk(){
      let obj={
        subassembly: this.addCommodityResult,
        background: this.backColorResult
      }
//        {"subassembly":[{"name":"等分（最多5等分）","modelSampleCode":"f5","marginData":"","contents":[{"width":750,"height":729,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/782be376717e4bced12ae53752a1a3a12e9bd916","isTrue":false}]},{"name":"BANNER","modelSampleCode":"f5","marginData":"","contents":[{"type":2,"productType":1,"productId":12501,"indexId":20,"url":"https://ol-site.olquan.cn/weixin/product/newProductDetail?productId=12501","image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/f90580216b2c392d2a711cba94d30aa4bab5fafe","width":750,"height":369,"isTrue":false}]},{"name":"BANNER","modelSampleCode":"f5","marginData":"","contents":[{"type":2,"productType":1,"productId":13165,"indexId":20,"url":"https://ol-site.olquan.cn/weixin/product/newProductDetail?productId=13165","image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/2fcecfc364aae8ebda4bfeb8d85bafaa4b352257","width":750,"height":369,"isTrue":false}]},{"name":"BANNER","modelSampleCode":"f5","marginData":"","contents":[{"type":2,"productType":1,"productId":11587,"indexId":20,"url":"https://ol-site.olquan.cn/weixin/product/newProductDetail?productId=11587","image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/1dd1f0ab4e9638fd7b842b74bbc987405651ac1e","width":750,"height":369,"isTrue":false}]},{"name":"BANNER","modelSampleCode":"f5","marginData":"","contents":[{"type":2,"productType":1,"productId":13166,"indexId":20,"url":"https://ol-site.olquan.cn/weixin/product/newProductDetail?productId=13166","image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/f95b9d64945ed15efa768f148f1208560dde196f","width":750,"height":369,"isTrue":false}]},{"name":"等分（最多5等分）","modelSampleCode":"f5","marginData":"","contents":[{"type":2,"productType":1,"productId":13161,"indexId":20,"url":"https://ol-site.olquan.cn/weixin/product/newProductDetail?productId=13161","image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/0f9965efdb65e5c8fb39cd5de210dbd6b313db02","width":375,"height":440,"isTrue":false},{"type":2,"productType":1,"productId":13076,"indexId":20,"url":"https://ol-site.olquan.cn/weixin/product/newProductDetail?productId=13076","image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/a59267b9cd598cf041dc0727a03e4877eebfbefc","width":375,"height":440,"isTrue":false}]},{"name":"等分（最多5等分）","modelSampleCode":"f5","marginData":"","contents":[{"type":2,"productType":1,"productId":12801,"indexId":20,"url":"https://ol-site.olquan.cn/weixin/product/newProductDetail?productId=12801","image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/69682bddc22246a5091f788c7a27c0622d5a660f","width":375,"height":420,"isTrue":false},{"type":2,"productType":1,"productId":13151,"indexId":20,"url":"https://ol-site.olquan.cn/weixin/product/newProductDetail?productId=13151","image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/4437a5f41c138cb5f069d1d80c13d9cea87c564d","width":375,"height":420,"isTrue":false}]},{"name":"产品列表","modelSampleCode":"catlist1","marginData":"","contents":[{"title":"美妆护肤","contentId":"3","trOrFa":false,"dataList":[{"productName":"美克斯/MKS 太阳能3D塑形仪NV8512  LS001","goldenBean":25900,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/a355ef340839455fb1f823f4c5cf558eea3c3164","type":2,"productType":1,"productId":12664,"marketPriceView":"2590.00","salePriceView":"2590.00"},{"productName":"香港进口中药宫廷秘方面霜  九草圣槲玉斛润肤膏   LS006","goldenBean":10800,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/c6c613868d616699322452b258c463a7f0619032","type":2,"productType":1,"productId":12869,"marketPriceView":"1080.00","salePriceView":"1080.00"},{"productName":"金稻 洁面仪 KD308  LS002","goldenBean":11500,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/2791170a97551cdf52b7e72a1b07b3d9f8bbd5a8","type":2,"productType":1,"productId":12639,"marketPriceView":"1150.00","salePriceView":"1150.00"},{"productName":"兰蔻新美肤修护面霜15ml小样 细致毛孔改善暗沉  LS004","goldenBean":7800,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/0a7412c752f0867b7963fa2cff84cfea6bbd45f1","type":2,"productType":1,"productId":12675,"marketPriceView":"780.00","salePriceView":"780.00"},{"productName":"兰蔻光泽润养日霜15ml 小样 根源面霜  LS003","goldenBean":5900,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/5a0fc04a236eedf4e9c332c7f5f240b3b0a147d9","type":2,"productType":1,"productId":12674,"marketPriceView":"590.00","salePriceView":"590.00"},{"productName":"whoo/后 清颜顺滑精华液15ml小样国内专柜货源 LS005","goldenBean":6900,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/8b7540a44d67da723d3f111b872ebaef9c082607","type":2,"productType":1,"productId":12778,"marketPriceView":"690.00","salePriceView":"690.00"},{"productName":"【眼部黄金克星】SISQUE西子泉奇迹黄金修护眼精华  LS083","goldenBean":1990,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/be7ddc4698eca8360e6912e249905de1aa6d6247","type":2,"productType":1,"productId":13166,"marketPriceView":"199.00","salePriceView":"199.00"},{"productName":"VIASPA玻尿酸修护原液 30ml   补水保湿助攻王   LS086","goldenBean":4980,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/aea3182ef3058ad14f9cc8f105bce0c831d641f2","type":2,"productType":1,"productId":11531,"marketPriceView":"498.00","salePriceView":"498.00"},{"productName":"植萃舒缓修护精华30ml  防敏修护瓶  安抚脆弱敏肌   LS085","goldenBean":3980,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/4b273c1432d31ed1e5bb729858654e8f090a960a","type":2,"productType":1,"productId":11586,"marketPriceView":"398.00","salePriceView":"398.00"},{"productName":"VIASPA死海之谜素颜霜 50g  嫩肤美容时光机  LS087","goldenBean":1880,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/da68e86dc2158861f8666f2d56de6c744a8ddca7","type":2,"productType":1,"productId":11587,"marketPriceView":"188.00","salePriceView":"188.00"},{"productName":"植萃多肽修护精华30ml  唤醒年轻魔力  LS088","goldenBean":4980,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/f824d30c20eb700184830a5f55dbe786c1271390","type":2,"productType":1,"productId":11564,"marketPriceView":"498.00","salePriceView":"498.00"},{"productName":"VIASPA植萃亮颜修护精华露 30ml  LS089","goldenBean":3980,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/c74939d38b3580e9a3325c57839e047b5b89ed87","type":2,"productType":1,"productId":11524,"marketPriceView":"398.00","salePriceView":"398.00"},{"productName":"零号花园Zéro Jardin香薰 衣橱挂香  LS057","goldenBean":3700,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/c8aa8958776a4387654411cfbecca47ee37b5e17","type":2,"productType":1,"productId":13160,"marketPriceView":"370.00","salePriceView":"370.00"},{"productName":"美克斯（MKS）蒸脸器冷热双喷果蔬精油蒸脸机 NV8388 玫瑰金  LS090","goldenBean":17500,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/e8638a06be117ec1eff5322b2841d94160b46194","type":2,"productType":1,"productId":12665,"marketPriceView":"1750.00","salePriceView":"1750.00"}],"classBannerImg":{"width":750,"height":120,"classMore":"classBanner","image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/aa66a25657b3b090921cb0bbdeaccc9d54bbc56f"}},{"title":"数码家电","contentId":"3","trOrFa":true,"dataList":[{"productName":"REMIN Z02 智能心率运动手环 LS043","goldenBean":21900,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/87f8b8236bf70b90bff9090f01c6929ea99bf7cf","type":2,"productType":1,"productId":12776,"marketPriceView":"2190.00","salePriceView":"2190.00"},{"productName":"海康威视萤石F3萤宝 智能机器人儿童玩具陪护摄像 LS047","goldenBean":38900,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/6ad7a87b66716bbceb698d336ac80964cf38b960","type":2,"productType":1,"productId":13071,"marketPriceView":"3890.00","salePriceView":"3890.00"},{"productName":"沙宣电吹风 VS53IBCN#LS049","goldenBean":13900,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/4c50379b4efe893493262f1b2d837eff40e9610c","type":2,"productType":1,"productId":12859,"marketPriceView":"1390.00","salePriceView":"1390.00"},{"productName":"领豪（Russell Hobbs）英伦印花电热水壶 1.8L容量 18512-56C#LS050","goldenBean":25100,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/3dcee09cbb0e21ca29d8fac5339c1a484dce77ab","type":2,"productType":1,"productId":12761,"marketPriceView":"2510.00","salePriceView":"2510.00"},{"productName":"Kolin私厨电煮锅 L-GL7600N#LS051","goldenBean":26990,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/322e1cc0cf292c0626f23e2f13eed870889478bd","type":2,"productType":1,"productId":12716,"marketPriceView":"2699.00","salePriceView":"2699.00"},{"productName":"长虹电压力锅CYL-40E01J#LS052","goldenBean":36800,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/8668d50884e7722259ffcb4a0c08491ac3a9aba3","type":2,"productType":1,"productId":12742,"marketPriceView":"3680.00","salePriceView":"3680.00"},{"productName":"双喜（Double Happiness）珍惠方煲 CF03003D 智能预约电饭锅家用3L LS045","goldenBean":16900,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/f8c64e602d3c6423edf381db056cf10e4c662d12","type":2,"productType":1,"productId":12687,"marketPriceView":"1690.00","salePriceView":"1690.00"},{"productName":"海康威视萤石DP1智能电子猫眼摄像头可视门铃防盗家用门镜 LS046","goldenBean":59000,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/7c56d3ea4c7047b5de86495220b94d1bab95bd40","type":2,"productType":1,"productId":12957,"marketPriceView":"5900.00","salePriceView":"5900.00"},{"productName":"Midea美的 R1-L061D吸尘器  LS048","goldenBean":36990,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/3cd0bf752c493252e9fad0b2f0d61dee815edc59","type":2,"productType":1,"productId":13072,"marketPriceView":"3699.00","salePriceView":"3699.00"}],"classBannerImg":{"width":750,"height":120,"classMore":"classBanner","image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/cd7740b085752cdcf7bb08a7733184bb2441f74b"}},{"title":"鞋靴箱包","contentId":"3","trOrFa":false,"dataList":[{"productName":"2018新款头层牛皮欧美时尚斜挎包单肩包真皮女包  LS025","goldenBean":16900,"image":"http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/06dfebb010484144e2cfa57383163a1f0d08acb0","type":2,"productType":1,"productId":11019,"marketPriceView":"1690.00","salePriceView":"1690.00"},{"productName":"JUMBOUGG简帛秋季小碎花休闲平底鞋2740 LS026","goldenBean":6980,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/6c7d964db70417fc3a878fd811d7f7412dde8657","type":2,"productType":1,"productId":12777,"marketPriceView":"698.00","salePriceView":"698.00"},{"productName":"Woo Poem/五言诗 切尔西靴女平底真皮复古英伦单靴 LS028","goldenBean":21990,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/74f864867d1964a4e69835446e8c3579f9f7a89c","type":2,"productType":1,"productId":12721,"marketPriceView":"2199.00","salePriceView":"2199.00"},{"productName":"侨家 双肩包格子纹新款牛津布时尚背包2046  LS029","goldenBean":16700,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/cc0b193fa15adfccef79d13a298dd00fddee8642","type":2,"productType":1,"productId":12698,"marketPriceView":"1670.00","salePriceView":"1670.00"},{"productName":"年度爆款透明拉杆箱时尚旅行箱 LS031","goldenBean":55000,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/e61ae62b0e226593bf8012bcb3408cc16889ddf4","type":2,"productType":1,"productId":12678,"marketPriceView":"5500.00","salePriceView":"5500.00"},{"productName":"时尚密码拉杆箱行李箱8603  LS032","goldenBean":40000,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/9cc921030c716b7033fc4965987e0725bcdf68b4","type":2,"productType":1,"productId":12147,"marketPriceView":"4000.00","salePriceView":"4000.00"},{"productName":"GUESS美国盖尔斯 女士欧美轻奢纯色行李箱  LS080","goldenBean":60500,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/3ff7d61f2119e24b926d2a15153f1d53b8a00379","type":2,"productType":1,"productId":12766,"marketPriceView":"6050.00","salePriceView":"6050.00"},{"productName":"时尚万向轮旅行箱8201  LS081","goldenBean":32000,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/6876bf36be61b071d8cba5dab3ca43dbbac2796c","type":2,"productType":1,"productId":12182,"marketPriceView":"3200.00","salePriceView":"3200.00"}],"classBannerImg":{"width":750,"height":120,"classMore":"classBanner","image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/05e3a6a7bccc6fb4f4af6422b772b29bff2b1ce0"}},{"title":"家居家纺","contentId":"3","trOrFa":false,"dataList":[{"productName":"侨家家纺 亲肤磨毛蚕丝春秋被 LS016","goldenBean":85000,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/2cd42cb15eb93f5f179215520fbc6eb22fae88b2","type":2,"productType":1,"productId":12693,"marketPriceView":"8500.00","salePriceView":"8500.00"},{"productName":"侨家家纺 水洗棉亲肤冬被 LS017","goldenBean":15000,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/bbaefcc56cee72d79e083e0b7f1767a73454e85b","type":2,"productType":1,"productId":12696,"marketPriceView":"1788.00","salePriceView":"1500.00"},{"productName":"侨家家纺 全棉时尚ins风高支高密四件套 LS018","goldenBean":26000,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/5a4f15a10002b4c9b436176ea9e05b4f77158de8","type":2,"productType":1,"productId":12699,"marketPriceView":"2999.00","salePriceView":"2600.00"},{"productName":"伊伊爱原创百分百重磅桑蚕丝床上用品四件套 LS019","goldenBean":185000,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/f53c63ac6d8c515f44e7fa31f9215e85a01ba548","type":2,"productType":1,"productId":12707,"marketPriceView":"18500.00","salePriceView":"18500.00"},{"productName":"舒绒棉波浪乳胶枕（一对） LS020","goldenBean":27800,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/ca0279e3c6beabd966ff9ac223c46cff47d356b6","type":2,"productType":1,"productId":12713,"marketPriceView":"2780.00","salePriceView":"2780.00"},{"productName":"儿童卡通乳胶枕（一对）LS021","goldenBean":14800,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/afaf69ee286a2c1b4fb7e0f16d851ed3cb0aec0a","type":2,"productType":1,"productId":12710,"marketPriceView":"1480.00","salePriceView":"1480.00"},{"productName":"纯棉双层纱布睡袋 LS022","goldenBean":16900,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/c8e4f1e369230f7753fc5ba757a94ff0f70cd724","type":2,"productType":1,"productId":12943,"marketPriceView":"1690.00","salePriceView":"1690.00"},{"productName":"舒绒棉女士护颈枕（一对）LS023","goldenBean":23900,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/098200bd548f64ca7d9d028233a3826bc0693872","type":2,"productType":1,"productId":13048,"marketPriceView":"2390.00","salePriceView":"2390.00"},{"productName":"舒绒棉青少年波浪乳胶枕（一对）LS024","goldenBean":14900,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/f969f6207db1f252a106497a9b4821ee61b18b88","type":2,"productType":1,"productId":13050,"marketPriceView":"1490.00","salePriceView":"1490.00"},{"productName":"ELLE 旅行颈枕  LS015","goldenBean":7990,"image":"http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/a126a765f822f97c3b1e6654f1640bfea32f9fa7","type":2,"productType":1,"productId":1679,"marketPriceView":"799.00","salePriceView":"799.00"}],"classBannerImg":{"width":750,"height":120,"classMore":"classBanner","image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/e5ffa608aea851901ff8bf67395fc2ea0d72237d"}},{"title":"养生保健","contentId":"3","trOrFa":false,"dataList":[{"productName":"胡庆余堂灵芝破壁孢子粉60袋礼盒装  LS033","goldenBean":45000,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/527041f50ddae7b3ecca7bffc0134c14d9a8e93b","type":2,"productType":1,"productId":12756,"marketPriceView":"4500.00","salePriceView":"4500.00"},{"productName":"香港斛哥西洋参片100克礼盒装  LS034","goldenBean":30000,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/dee42baa67dc03c9a2d009ed51d288db548ee62b","type":2,"productType":1,"productId":12758,"marketPriceView":"3000.00","salePriceView":"3000.00"},{"productName":"香港斛哥石斛枫斗200克礼盒装 LS035","goldenBean":35000,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/828a45e33555875ed5961d1d8a6961bc577962ee","type":2,"productType":1,"productId":12759,"marketPriceView":"3500.00","salePriceView":"3500.00"},{"productName":"青春宝珍珠超细粉160袋礼盒装 LS036","goldenBean":29990,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/771a5450ba64e753a43903bd01c65c365af35531","type":2,"productType":1,"productId":12926,"marketPriceView":"2999.00","salePriceView":"2999.00"},{"productName":"青春宝冰糖即食燕窝280克浓缩礼盒装  LS037","goldenBean":29990,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/3dd415ffb6d80d5e268a9c44ae0d9d2d11130934","type":2,"productType":1,"productId":12927,"marketPriceView":"2999.00","salePriceView":"2999.00"},{"productName":"冬虫夏草40#精选10克南宋御街子琦和堂礼盒装  LS038","goldenBean":199990,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/d63ca00f28034619e770a622fca1199513a9c442","type":2,"productType":1,"productId":12928,"marketPriceView":"19999.00","salePriceView":"19999.00"},{"productName":"天麻有机精选200克南宋御街子琦和堂礼盒装  LS039","goldenBean":27990,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/4705237e80267cbcc967cd83e44b2029a1e4ce8a","type":2,"productType":1,"productId":12929,"marketPriceView":"2799.00","salePriceView":"2799.00"},{"productName":"黑果枸杞有机精选250克南宋御街子琦和堂礼盒装 LS040","goldenBean":24990,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/6dae67b34803cd46039e2f00a9e575149c2a86e8","type":2,"productType":1,"productId":12930,"marketPriceView":"2499.00","salePriceView":"2499.00"},{"productName":"海参淡干精选100克南宋御街子琦和堂礼盒装 LS041","goldenBean":59990,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/a87a810e32ff264acbb51d957a81b06228cc2963","type":2,"productType":1,"productId":12931,"marketPriceView":"5999.00","salePriceView":"5999.00"},{"productName":"于物 智能健身按摩套装 LS042","goldenBean":39900,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/01abcbd9a4dc767dd89472a175d3a177425043ee","type":2,"productType":1,"productId":12736,"marketPriceView":"3990.00","salePriceView":"3990.00"}],"classBannerImg":{"width":750,"height":120,"classMore":"classBanner","image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/7556d762d29cc043ba5f317ba069ec5cc468c431"}},{"title":"服饰配饰","contentId":"3","trOrFa":false,"dataList":[{"productName":"阿尔皮纳袋鼠男士时尚内裤 3条装 21106  LS007","goldenBean":4000,"image":"http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/cbf8ecf0bbc832c80f65a2bfd90419f08006ca86","type":2,"productType":1,"productId":129,"marketPriceView":"400.00","salePriceView":"400.00"},{"productName":"三氏偏光女明星款太阳镜防紫外线时尚墨镜圆脸9001 LS008","goldenBean":2900,"image":"http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/fab9826f579714eaa37ac218c6e8101e6d16d473","type":2,"productType":1,"productId":356,"marketPriceView":"290.00","salePriceView":"290.00"},{"productName":"浪莎中腰纯棉女士裤四条装  LS009","goldenBean":4100,"image":"http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/8303b44803a301700bfc12ebf8ba54b5eefbecac","type":2,"productType":1,"productId":10723,"marketPriceView":"410.00","salePriceView":"410.00"},{"productName":"ZIPPO定制打火机  LS014","goldenBean":17990,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/b3fd29ab3849676fe47401bedebefecf1c8fa5be","type":2,"productType":1,"productId":12818,"marketPriceView":"1799.00","salePriceView":"1799.00"},{"productName":"啟龙堂3D和田玉镶金弥勒佛足金吊坠 LS059","goldenBean":13800,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/39ebf3be431d9238fc3f3447fdd32e067bc8f769","type":2,"productType":1,"productId":13120,"marketPriceView":"1380.00","salePriceView":"1380.00"},{"productName":"啟龙堂3D和田玉镶金大日如来菩萨足金吊坠 LS060","goldenBean":17800,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/0724cb74f16a630f96cc09f8f84f173fd025e28f","type":2,"productType":1,"productId":13112,"marketPriceView":"1780.00","salePriceView":"1780.00"},{"productName":"啟龙堂3D和田玉镶金大业有成金枝玉叶足金吊坠 LS061","goldenBean":17800,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/758266bfa26b714ab5eaf743811e919d877e7975","type":2,"productType":1,"productId":13136,"marketPriceView":"1780.00","salePriceView":"1780.00"},{"productName":"啟龙堂3D和田玉镶金葫芦福禄足金吊坠 LS062","goldenBean":17800,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/38e9caacb573cdb26c45e253e157534e2864863e","type":2,"productType":1,"productId":13145,"marketPriceView":"1780.00","salePriceView":"1780.00"},{"productName":"啟龙堂3D和田玉镶金平安四季豆足金吊坠 LS063","goldenBean":13800,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/4aefad3833727bd18d392517913bf95af3b361f3","type":2,"productType":1,"productId":13146,"marketPriceView":"1380.00","salePriceView":"1380.00"},{"productName":"啟龙堂3D和田玉镶金福袋足金吊坠  LS064","goldenBean":17800,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/abe32b5fe73a29f078b28a14575ad1596f44ccde","type":2,"productType":1,"productId":13147,"marketPriceView":"1780.00","salePriceView":"1780.00"},{"productName":"啟龙堂3D和田玉镶金钥匙足金吊坠  LS065","goldenBean":13800,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/d37c60dec7c496e1876b4e6737818c2d4dfab7a2","type":2,"productType":1,"productId":13150,"marketPriceView":"1380.00","salePriceView":"1380.00"},{"productName":"DEEKO/迪高 新款秋冬卫衣套装男女情侣款运动服 LS011","goldenBean":19990,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/e18da3a261dc1526fc680582153f20e96c336885","type":2,"productType":1,"productId":12808,"marketPriceView":"1999.00","salePriceView":"1999.00"}],"classBannerImg":{"width":750,"height":120,"classMore":"classBanner","image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/ca052b9bd8827412cb7acae1148abc3d19135fd1"}},{"title":"食品茶酒","contentId":"3","trOrFa":false,"dataList":[{"productName":"茅台天朝上品贵人酒 柔和酱香型白酒礼盒500ml*2瓶 53度  LS053","goldenBean":29800,"image":"http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/eddb70c21e14276e6a660d761c417042015dc978","type":2,"productType":1,"productId":6102,"marketPriceView":"2980.00","salePriceView":"2980.00"},{"productName":"西班牙原瓶进口 云顶酒庄卡帝罗干红葡萄酒6支整箱装 LS054","goldenBean":32000,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/4cce68f32038e08bb57c444e9a9d4d701b3eab7a","type":2,"productType":1,"productId":9521,"marketPriceView":"3200.00","salePriceView":"3200.00"},{"productName":"【预售款 9月23日开湖发货】星农联合阳澄湖大闸蟹礼券 公蟹4.0两母蟹3.0两 4对 LS055","goldenBean":25800,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/75480d39adc382cc4c406580e0f382ad3e51d4ba","type":2,"productType":1,"productId":12771,"marketPriceView":"2580.00","salePriceView":"2580.00"},{"productName":"广东老字号华梦源  台式桃山皮燕窝月饼50克*10个装中秋礼盒  LS056","goldenBean":17900,"image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/564f793f15d98cf13ce18fd39a1aba207d945389","type":2,"productType":1,"productId":12799,"marketPriceView":"1790.00","salePriceView":"1790.00"}],"classBannerImg":{"width":750,"height":120,"classMore":"classBanner","image":"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/d6bece17d5c4f5d9abd86ceccdabbaf96dccefbb"}}]}],"background":{}}
      obj.subassembly.forEach((val,index) =>{
        console.log(val.modelSampleCode)
        if(val.modelSampleCode ==='catlist1'){
          obj.subassembly.splice(index,1)
          obj.subassembly.push(val)
        }
      })
      let data={
        id:this.activeChangeResult.obj.id,
        data:JSON.stringify(obj)
      }
      console.log(data)
      this.uploadDataToOSSActions(data)
    },
    otherSub(item,key){
      //alert(key)
      this.title=item.name
      this.key=key
      this.commodityActions(item)
    },
    UpGoTo(){
      console.log(this.addCommodityResult)
      if(this.title!==''){
        if(this.input>0 && this.input<this.addCommodityResult.length){
          let obj=this.addCommodityResult[this.key]
          this.addCommodityResult.splice(this.key,1)
          this.addCommodityResult.splice(this.input-1,0,obj)
          this.key=this.input-1
        }else if(this.input>=this.addCommodityResult.length){
          let obj=this.addCommodityResult[this.key]
          this.addCommodityResult.splice(this.key,1)
          this.addCommodityResult.push(obj)
          this.key=this.addCommodityResult.length-1
        }else{
          this.$message({
            message:'请输入正确位置',
            type:'warning'
          })
        }
      }else{
        this.$message({
          message:'请选择组件',
          type:'warning'
        })
      }

    }

  }
}
</script>

<style scoped>
  #bianji {
    margin-top: 30px;
    display: flex;
    padding:0 40px;
    justify-content: space-between;
  }
    #bianji .left{
      width:300px;
    }
  #bianji .left > p:first-child{
    display: flex;
    justify-content:space-between;
  }
    .left .left-btn{
    border:1px solid #333333;
      position: relative;
    padding:10px;
    margin-top: 5px;
    height:461px;
    overflow: auto;
      display: flex;
      justify-content: space-between;
  }
  .left .left-btn .divP{
    /*height:461px;*/
    overflow: auto;
    width:85%;
  }
  .left .left-btn .divP > div{
    text-align: center;
   /*height: 100px;*/
    width:99%;
    border:1px solid #333333;
  }
  .left .left-btn .divP img{
    display: block;
    width:100%;
  }
  .left .left-btn .Plast{
width: 12%;
    margin:auto;
    padding-left: 10px;
  }
  .left .left-btn .Plast:last-child .iconfont{
    font-size:24px;
  }

  #bianji .right{
    /*margin-left: 100px;*/
    flex:0.9;
    height:100%;
    overflow-x: hidden;
    /*padding-right:40px;*/
  }
  #bianji .right > label{
    font:14px/28px "微软雅黑";
  }
  .right .right-btn{
    border:1px solid #333333;
    height:450px;
    padding:18px;
    overflow: auto;
    height:100%;
  }
  .btnOver{
    margin-bottom: 5px;
    padding-right: 50px;
  }
.btnOver .el-button{
  margin-left: 20px;
  width:100px;
}
  #bianji .left .left-btn .redborder{
   opacity: 0.5;
   /*border-color: red;*/
    background-color:skyblue;
    color: #ffffff;
  }
  .touchImg{
    width:100%;
    overflow-x: auto;
    overflow-y: hidden;
    white-space:nowrap;
  }
  .touchImg li{
    display: inline-block;
  }
  .touchImg li img{
    display: block;
    width: 100%;
    height:100%;
  }
</style>
