/*
*created by Yan on 17/12/13
*/
/*分模块开发，避免项目过大，导致单独store过去臃肿，状态都放在一个state对象里了，（当应用变得非常复杂时，store 对象就有可能变得相当臃肿。）
* 项目的某一个模块的状态都放在这里，便于管理，结构清晰，
* 此模块也是一个单独的store，只有actions有区别，里面的方法参数{dispatch, state, commit, rootState}；前三个只能访问本模块里的state和mutations
* rootState参数表示外面store内的state对象，意思是间接可以访问外部状态资源，（对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。）
* 同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState（外部state）：
* !!!对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：
*  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
  同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState：
* */
import qs from 'qs';
import api from './api'
import axios from 'axios'
import { Message } from 'element-ui';
const servers={
  state:{
    editor:{
      //根据产品id获取规格信息
      getProductNormalsMM:{
        productId:''
      },
      //删除特卖
      deleteProductNormalsMM:{
        id:'',
        ids:'',
        status:''
      },
      //新增、修改特卖产品
      productNewMM:{
        id:'',//特卖id
        appPrices:'',//app售价集合，有规格要传
        commission:'',//佣金无规格要传
        commissiones:'',//佣金集合
        costPrices:'',//成本价集合
        desc:'',//描述
        image:'',//产品主图链接
        indexImage:'',//大图
        isRecommend:'',//是否推荐
        marketPrice:'',//原价
        marketePrices:'',//原价
        normalIds:'',//产品库产品上的规格id集合
        plusProductNormalIds:'',//特卖产品的规格id集合
        price:'',//售价、、无规格传
        salePrices:'',//售价集合,有规格传
        productId:'',//产品库产品id
        productName:'',//产品名称
        sort:'',//排序
        startDate:'',//如:2018-04-12
        trip:'', //产品标签
        normalStrs:'',//规格集合
        status:'',
        isStick:'',
        plusDate:''
      },
      //根据特卖id获取特卖信息
      PproductgetByIdMM:{
        plusId:''
      },


      //督导设置// //获取收益配置信息
      upInfoListMM:{
        type:''
      },
      //新增修改
      upInfoSaveMM:{
        content:'',
        id:'',
        inviteContent:'',
        shareDesc:'',
        shareLogo:'',
        shareTitle:'',
        type:''
      },
      //礼包列表
      storeGiftBagListMM:{
        page:'',
        rows:'',
        filter_I_type:''
      },
      //新增修改礼包
      storeGiftBagSave1MM:{
        id:'',
        image:'',
        name:'',
        productId:'',
        productImage:'',
        productName:'',
        type:''
      },
      //设置收益配置
      setCommissionMM:{
        highSupervisorCommission:'',
        highSupervisorMoreCommission:'',
        price:'',
        supervisorCommission:'',
        type:'',
        starCommission:'',
        starMoreCommission:'',
        cityCommission:'',
        selfCommission:'',
        selfCommissionType:'',
        storeCommission:'',
        storeCommissionType:'',
      },
      //审核明星督导
      setMemberLevelMM:{
        id:'',levelCode:''
      },
      //设置产品收益配置信息
      setProductCommissionInfoMM:{
        brandPartnerCommission:'',cityPartnerCommission:'',highSupervisorMoreScore:'',highSupervisorPlusCommissionRate:'',
        highSupervisorPlusMoreCommissionRate:'',highSupervisorScore:'',isPhysicalStoreGetCommission:'',oneGoldenScore:'',
        oneStoreScore:'',oneWhiteScore:'',plusCommissionRate:'',productCommissionScale:'',productDreamPartnerCommission:'',
        productWealthPartnerCommission:'',selfGoldenScore:'',selfStoreScore:'',selfWhiteScore:'',starSupervisorMoreScore:'',
        starSupervisorPlusCommissionRate:'',starSupervisorPlusMoreCommissionRate:'',starSupervisorScore:'',storePlusCommissionRate:'',
        supervisorPlusCommissionRate:'',supervisorScore:''
      }

    },
    page:{
      //产品规格
      getProductNormalsResult:[],
      //特卖规格id
      PproductgetByIdResult:{title:true,item:[]},
      //修改特卖
      upDataSaleGoodsResult:{},
      //特卖产品管理弹框
      watchPriceResult:{

      },


      //督导列表返回
      upInfoListResult:'',
      //粉领返回
      pinkListResult:'',
      //礼包列表
      storeGiftBagListResult:[],
      //获取收益配置信息
      commissionInfoResult:{},
      //明星督导统计
      canUpToStarResult:[],
      //获取产品佣金配置信息
      productCommissionInfoResult:'',
      plusCommissionInfoResult:''
    }
  },
  mutations:{
    //清除数据
    clearGoodsData(state){
      state.page.getProductNormalsResult=[]
    },
    //删除特卖、批量删除
    DELETE_PRODUCT(state,data){
      state.editor.deleteProductNormalsMM.id=data.id
      state.editor.deleteProductNormalsMM.ids=data.ids
      state.editor.deleteProductNormalsMM.status=data.status
    },
    //根据产品id获取规格信息
    SETPRODUCTNORMALS(state,id){
      state.editor.getProductNormalsMM.productId=id
    },
    GETPRODUCTNORMALS(state,res){
      state.page.getProductNormalsResult=res.data
    },
    //特卖规格
    PPRODUCT_SET_ID(state,id){
      state.editor.PproductgetByIdMM.plusId=id
    },
    PPRODUCT_GET_ID(state,res){
      //console.log(state.page.PproductgetByIdResult.title )
      state.page.PproductgetByIdResult.item = res.data
      state.page.PproductgetByIdResult.title = !state.page.PproductgetByIdResult.title
      //console.log(state.page.PproductgetByIdResult.title )
    },
    //特卖新增
    PLUS_PRODUCT_PUSH(state,data){
      state.editor.productNewMM.price=data.price
      state.editor.productNewMM.id=data.id
      state.editor.productNewMM.image=data.image
      state.editor.productNewMM.appPrices=data.appPrices
      state.editor.productNewMM.commission=data.commission
      state.editor.productNewMM.commissiones=data.commissiones
      state.editor.productNewMM.costPrices=data.costPrices
      state.editor.productNewMM.desc=data.desc
      state.editor.productNewMM.indexImage=data.indexImage
      state.editor.productNewMM.isRecommend=data.isRecommend
      state.editor.productNewMM.marketPrice=data.marketPrice
      state.editor.productNewMM.marketePrices=data.marketePrices
      state.editor.productNewMM.normalIds=data.normalIds
      state.editor.productNewMM.plusProductNormalIds=data.plusProductNormalIds
      state.editor.productNewMM.productId=data.productId
      state.editor.productNewMM.productName=data.productName
      state.editor.productNewMM.salePrices=data.salePrices
      state.editor.productNewMM.sort=data.sort
      state.editor.productNewMM.startDate=data.startDate
      state.editor.productNewMM.trip=data.trip
      state.editor.productNewMM.normalStrs=data.normalStrs
      state.editor.productNewMM.plusProductNormalIds=data.plusProductNormalIds
      state.editor.productNewMM.status=data.status
      state.editor.productNewMM.plusDate=data.plusDate
      state.editor.productNewMM.isStick=data.isStick
    },
    //修改
    UPDATA_SALEGOODS(state,data){
      state.page.upDataSaleGoodsResult=data
    },


    //督导set
    SET_UPINFO_LIST(state,data){
      state.editor.upInfoListMM.type=data.type
    },
    GET_UPINFO_LIST(state,res){
      state.page.upInfoListResult=res.data
    },
    //粉领set
    GET_PINK_UPINFO_LIST(state,res){
      state.page.pinkListResult=res.data
    },
    //新增/修改
    SET_UPINFO_SAVE(state,data){
      state.editor.upInfoSaveMM.type=data.type
      state.editor.upInfoSaveMM.id=data.id
      state.editor.upInfoSaveMM.shareTitle=data.shareTitle
      state.editor.upInfoSaveMM.content=data.content
      state.editor.upInfoSaveMM.inviteContent=data.inviteContent
      state.editor.upInfoSaveMM.shareDesc=data.shareDesc
      state.editor.upInfoSaveMM.shareLogo=data.shareLogo
    },
    //礼包列表
    SET_STORE_GIFTBAG_LIST(state,data){
      state.editor.storeGiftBagListMM.page=data.page
      state.editor.storeGiftBagListMM.rows=data.rows
      state.editor.storeGiftBagListMM.filter_I_type=data.filter_I_type
    },
    GET_STORE_GIFTBAG_LIST(state,res){
      state.page.storeGiftBagListResult=res.data
    },
    //新增修改礼包
    SET_STORE_GIFTBAG_SAVE1(state,data){
      state.editor.storeGiftBagSave1MM.id=data.id
      state.editor.storeGiftBagSave1MM.image=data.image
      state.editor.storeGiftBagSave1MM.productId=data.productId
      state.editor.storeGiftBagSave1MM.productName=data.productName
      state.editor.storeGiftBagSave1MM.name=data.name
      state.editor.storeGiftBagSave1MM.productImage=data.productImage
      state.editor.storeGiftBagSave1MM.type=data.type
    },
    //获取收益配置
    GET_COMMISSION_INFO(state,res){
      state.page.commissionInfoResult=res.data.result
    },
    //set收益配置
    SET_SET_COMMISSION(state,data){
      state.editor.setCommissionMM.type=data.type
      state.editor.setCommissionMM.supervisorCommission=data.supervisorCommission
      state.editor.setCommissionMM.highSupervisorMoreCommission=data.highSupervisorMoreCommission
      state.editor.setCommissionMM.highSupervisorCommission=data.highSupervisorCommission
      state.editor.setCommissionMM.cityCommission=data.cityCommission
      state.editor.setCommissionMM.selfCommission=data.selfCommission
      state.editor.setCommissionMM.selfCommissionType=data.selfCommissionType
      state.editor.setCommissionMM.starCommission=data.starCommission
      state.editor.setCommissionMM.starMoreCommission=data.starMoreCommission
      state.editor.setCommissionMM.storeCommission=data.storeCommission
      state.editor.setCommissionMM.storeCommissionType=data.storeCommissionType
      state.editor.setCommissionMM.price=data.price
    },
    //明星督导统计
    GET_CANUPTOSTAR_RESULT(state,res){
      state.page.canUpToStarResult=res.data.result
    },
    //统计审核
    SET_MEMBER_LEVEL(state,data){
      state.editor.setMemberLevelMM.id=data.id
      state.editor.setMemberLevelMM.levelCode=data.levelCode
    },
    //获取产品佣金配置信息
    GET_PRODUCT_COMMISSION_INFO(state,res){
      state.page.productCommissionInfoResult=res.data.result
    },
    GET_PLUS_COMMISSION_INFO(state,res){
          state.page.plusCommissionInfoResult=res.data.result
    },
    //设置产品收益配置信息
    SET_PRODUCT_COMMISSION_INFO(state,data){
      state.editor.setProductCommissionInfoMM.brandPartnerCommission=data.brandPartnerCommission
      state.editor.setProductCommissionInfoMM.cityPartnerCommission=data.cityPartnerCommission
      state.editor.setProductCommissionInfoMM.highSupervisorMoreScore=data.highSupervisorMoreScore
      state.editor.setProductCommissionInfoMM.highSupervisorPlusCommissionRate=data.highSupervisorPlusCommissionRate
      state.editor.setProductCommissionInfoMM.highSupervisorPlusMoreCommissionRate=data.highSupervisorPlusMoreCommissionRate
      state.editor.setProductCommissionInfoMM.highSupervisorScore=data.highSupervisorScore
      state.editor.setProductCommissionInfoMM.isPhysicalStoreGetCommission=data.isPhysicalStoreGetCommission
      state.editor.setProductCommissionInfoMM.oneGolenScore=data.oneGolenScore
      state.editor.setProductCommissionInfoMM.oneStoreScore=data.oneStoreScore
      state.editor.setProductCommissionInfoMM.oneWhiteScore=data.oneWhiteScore
      state.editor.setProductCommissionInfoMM.plusCommissionRate=data.plusCommissionRate
      state.editor.setProductCommissionInfoMM.productCommissionScale=data.productCommissionScale
      state.editor.setProductCommissionInfoMM.productDreamPartnerCommission=data.productDreamPartnerCommission
      state.editor.setProductCommissionInfoMM.productWealthPartnerCommission=data.productWealthPartnerCommission
      state.editor.setProductCommissionInfoMM.selfGolenScore=data.selfGolenScore
      state.editor.setProductCommissionInfoMM.selfStoreScore=data.selfStoreScore
      state.editor.setProductCommissionInfoMM.selfWhiteScore=data.selfWhiteScore
      state.editor.setProductCommissionInfoMM.starSupervisorMoreScore=data.starSupervisorMoreScore
      state.editor.setProductCommissionInfoMM.starSupervisorPlusCommissionRate=data.starSupervisorPlusCommissionRate
      state.editor.setProductCommissionInfoMM.starSupervisorPlusMoreCommissionRate=data.starSupervisorPlusMoreCommissionRate
      state.editor.setProductCommissionInfoMM.starSupervisorScore=data.starSupervisorScore
      state.editor.setProductCommissionInfoMM.storePlusCommissionRate=data.storePlusCommissionRate
      state.editor.setProductCommissionInfoMM.supervisorPlusCommissionRate=data.supervisorPlusCommissionRate
      state.editor.setProductCommissionInfoMM.supervisorScore=data.supervisorScore

    }

  },
  getters:{
    //产品库产品规格
    getProductNormalsResult (state) {
      return state.page.getProductNormalsResult
    },
    //特卖的规格
    PproductgetByIdResult(state){
      return state.page.PproductgetByIdResult
    },
    //修改跳转接受
    upDataSaleGoodsResult(state){
      return state.page.upDataSaleGoodsResult
    },


    //督导设置
    upInfoListResult(state){
      return state.page.upInfoListResult
    },
    //粉领set
    pinkListResult(state){
      return state.page.pinkListResult
    },
    //礼包，列表
    storeGiftBagListResult(state){
      return state.page.storeGiftBagListResult
    },
    //获取收益配置
    commissionInfoResult(state){
      return state.page.commissionInfoResult
    },
    //明星督导统计
    canUpToStarResult(state){
      return state.page.canUpToStarResult
    },
    //获取产品佣金配置信息
    productCommissionInfoResult(state){
      return state.page.productCommissionInfoResult
    },
    plusCommissionInfoResult(state){
      return state.page.plusCommissionInfoResult
    },
  },
  actions:{
    //get获取封装
    GoodsMsgGet ({dispatch, state, commit, rootState},funUrl) {
      axios.defaults.baseURL =rootState.editor.axiosUrl;
      axios({
        method: 'get',
        url:funUrl[0],
        dataType: 'JSON',
        params: state.editor[funUrl[2]]
      }).then(function(res){
        //console.log(res)
        // context.commit('changeloading')
        if(res.data.length>0){
          commit(funUrl[1],res)
        }else{
          commit(funUrl[1],res)
        }
      })
        .catch(function(err){
          // context.commit('changeloading')
          //console.log(err)
        })
    },
    //post获取封装
    GoodsMsgPost ({dispatch, state, commit, rootState},funUrl) {
      axios.defaults.baseURL =rootState.editor.axiosUrl;
      axios({
        method: 'post',
        url:funUrl[0],
        dataType: 'JSON',
        data: qs.stringify(state.editor[funUrl[2]])
      }).then(function(res){
        // console.log(res)
        dispatch('plusProductListActions',{  page:1, rows:10, sortField:'sort',sortOrder:'asc'})
        if(res.data=='success' || res.data.code==0){
          Message({
            showClose: true,
            message:'操作成功',
            type: 'success'
          })
        }else{
          Message({
            showClose: true,
            message:res.data.message,
            type: 'warning'
          });
        }
      }).catch(function(err){
        Message({
          showClose: true,
          message:"操作失败",
          type: 'warning'
        });
      })
    },
    //特卖置顶
    ProductDoStickActions({dispatch, state, commit, rootState},data){
      commit('PLUS_PRODUCT_PUSH',data)
      dispatch('GoodsMsgPost',['/admin/plus/product/doStick','','productNewMM'])
    },
    //批量上下架
    plusDoAuditActions({dispatch, state, commit, rootState},data){
      commit('DELETE_PRODUCT',data)
      dispatch('GoodsMsgPost',['/admin/plus/product/doAudit','','deleteProductNormalsMM'])
    },
    //获取产品库商品规格
    getProductNormalsActions({dispatch, state, commit, rootState},id){
      commit('SETPRODUCTNORMALS',id)
      dispatch('GoodsMsgGet',['/admin/together/product/getProductNormals','GETPRODUCTNORMALS','getProductNormalsMM'])
    },
    //获取特卖商品规格
    PproductgetByIdActions({dispatch, state, commit, rootState},id){
      commit('PPRODUCT_SET_ID',id)
      dispatch('GoodsMsgGet',['/admin/plus/product/getPlusProductNormals','PPRODUCT_GET_ID','PproductgetByIdMM'])
    },
    //新增特卖、修改
    plusProductSaveActions({dispatch,state,commit,rootState},data){
      commit('PLUS_PRODUCT_PUSH',data)
      dispatch('GoodsMsgPost',['/admin/plus/product/save','','productNewMM'])
    },
    //删除特卖
    deleteProductSave({dispatch,state,commit,rootState},id){
      commit('DELETE_PRODUCT',id)
      api.deletePpApi(rootState.editor.axiosUrl+'/admin/plus/product/delete',qs.stringify(state.editor.deleteProductNormalsMM)).then(res=>{
        console.log(res)
        if(res=='success'){
          Message({
            showClose: true,
            message:'操作成功',
            type: 'success'
          });
          dispatch('plusProductListActions',{  page:1, rows:10, sortField:'sort',sortOrder:'asc'})
        }
      }).catch(
        (error) => {
          Message({
            showClose: true,
            message:'操作失败',
            type: 'warning'
          });
        }
      )
    },
    //批量删除
    batchdeleteProductSave({dispatch,state,commit,rootState},id){
      commit('DELETE_PRODUCT',id)
      api.deletePpApi(rootState.editor.axiosUrl+'/admin/plus/product/batchDelete',qs.stringify(state.editor.deleteProductNormalsMM)).then(res=>{
        console.log(res)
        if(res=='success'){
          Message({
            showClose: true,
            message:'操作成功',
            type: 'success'
          });
          dispatch('plusProductListActions',{  page:1, rows:10, sortField:'sort',sortOrder:'asc'})
        }
      }).catch(
        (error) => {
          Message({
            showClose: true,
            message:'操作失败',
            type: 'warning'
          });
        }
      )
    },


    //督导设置//粉领
    upInfoListActions({commit, dispatch, state, rootState},data){
      commit('SET_UPINFO_LIST',data)
      if(data.type===1){
        dispatch('GoodsMsgGet',['/admin/upInfo/getByType','GET_PINK_UPINFO_LIST','upInfoListMM'])
      }else{
        dispatch('GoodsMsgGet',['/admin/upInfo/getByType','GET_UPINFO_LIST','upInfoListMM'])
      }
    },
    //新增修改
    upinfoSaveActions({commit, dispatch, state, rootState},data){
      commit('SET_UPINFO_SAVE',data)
      // dispatch('GoodsMsgGet',['/admin/upInfo/save','','upInfoSaveMM'])
      api.deletePpApi(rootState.editor.axiosUrl+'/admin/upInfo/save',qs.stringify(state.editor.upInfoSaveMM)).then(res=>{
        // console.log(res)
        if(res=='success'){
          Message({
            showClose: true,
            message:'操作成功',
            type: 'success'
          });
          if(state.editor.upInfoSaveMM.type===1){
            dispatch('upInfoListActions',{  type:1 })
          }else{
            dispatch('upInfoListActions',{  type:2 })
          }
        }
      }).catch(
        (error) => {
          Message({
            showClose: true,
            message:'操作失败',
            type: 'warning'
          });
        }
      )
    },
    //礼包列表
    storeGiftBagListActions({commit, dispatch, state, rootState},data){
      commit('SET_STORE_GIFTBAG_LIST',data)
      dispatch('GoodsMsgGet',['/admin/storeGiftBag/list','GET_STORE_GIFTBAG_LIST','storeGiftBagListMM'])
    },
    //新增修改礼包
    storeGiftBagSave1Actions({commit,dispatch,state,rootState},data){
      commit('SET_STORE_GIFTBAG_SAVE1',data)
      api.deletePpApi(rootState.editor.axiosUrl+'/admin/storeGiftBag/save1',qs.stringify(state.editor.storeGiftBagSave1MM)).then(res=>{
        // console.log(res)
        if(res=='success'){
          Message({
            showClose: true,
            message:'操作成功',
            type: 'success'
          });
          if(data.type===1){
            dispatch('storeGiftBagListActions',{  page:1,rows:10 ,filter_I_type:1})
          }else{
            dispatch('storeGiftBagListActions',{  page:1,rows:10 ,filter_I_type:2})
          }
        }
      }).catch(
        (error) => {
          Message({
            showClose: true,
            message:'操作失败',
            type: 'warning'
          });
        }
      )
    },
    //删除礼包
    storeGiftBagDeleteActions({commit,dispatch,state,rootState},data){
      let obj={
        id:data.id
      }
      api.deletePpApi(rootState.editor.axiosUrl+'/admin/storeGiftBag/delete',qs.stringify(obj)).then(res=>{
        // console.log(res)
        if(res=='success'){
          Message({
            showClose: true,
            message:'操作成功',
            type: 'success'
          });
          if(data.type==='pink'){
            dispatch('storeGiftBagListActions',{  page:1,rows:10,filter_I_type:1 })
          }else{
            dispatch('storeGiftBagListActions',{  page:1,rows:10,filter_I_type:2 })
          }
        }
      }).catch(
        (error) => {
          Message({
            showClose: true,
            message:'操作失败',
            type: 'warning'
          });
        }
      )
    },
    //获取收益配置
    commissionInfoActions({commit, dispatch, state},data){
      commit('SET_UPINFO_LIST',data)
      dispatch('GoodsMsgGet',['/admin/upInfo/commissionInfo','GET_COMMISSION_INFO','upInfoListMM'])
    },
    //设置收益配置
    setCommissionActions({commit, dispatch, state, rootState},data){
      commit('SET_SET_COMMISSION',data)
      api.deletePpApi(rootState.editor.axiosUrl+'/admin/upInfo/setCommission',qs.stringify(state.editor.setCommissionMM)).then(res=>{
        console.log(res)
        if(res.code===0){
          Message({
            showClose: true,
            message:'操作成功',
            type: 'success'
          });
          // dispatch('commissionInfoActions',{  type:2 })
        }
      }).catch(
        (error) => {
          Message({
            showClose: true,
            message:'操作失败',
            type: 'warning'
          });
        }
      )
    },
    //明星督导统计
    canUpToStarMemberActions({commit, dispatch, state, rootState},data){
      commit('SET_STORE_GIFTBAG_LIST',data)
      dispatch('GoodsMsgGet',['/admin/member/canUpToStarMember','GET_CANUPTOSTAR_RESULT','storeGiftBagListMM'])
    },
    //审核
    setMemberLevelActions({commit, dispatch, state, rootState},data){
      commit('SET_MEMBER_LEVEL',data)
      api.deletePpApi(rootState.editor.axiosUrl+'/admin/member/setMemberLevel',qs.stringify(state.editor.setMemberLevelMM)).then(res=>{
        //console.log(res)
        if(res.code===0 || res==='success'){
          Message({
            showClose: true,
            message:'操作成功',
            type: 'success'
          });
          dispatch('canUpToStarMemberActions',{  page:1,rows:10 })
        }
      }).catch(
        (error) => {
          Message({
            showClose: true,
            message:'操作失败',
            type: 'warning'
          });
        }
      )
    },
    //获取产品佣金配置信息
    productCommissionInfoActions({commit, dispatch, state, rootState},data){
      commit('SET_UPINFO_LIST',data)
      if(data.type===1){
        dispatch('GoodsMsgGet',['/admin/upInfo/productCommissionInfo','GET_PRODUCT_COMMISSION_INFO','upInfoListMM'])
      }else{
        dispatch('GoodsMsgGet',['/admin/upInfo/productCommissionInfo','GET_PLUS_COMMISSION_INFO','upInfoListMM'])
      }
    },
    //设置产品收益配置信息
    setProductCommissionInfoActions({commit, dispatch, state, rootState},data){
      commit('SET_PRODUCT_COMMISSION_INFO',data)
      api.deletePpApi(rootState.editor.axiosUrl+'/admin/upInfo/setProductCommissionInfo',qs.stringify(state.editor.setProductCommissionInfoMM)).then(res=>{
        console.log(res)
        if(res.code===0){
          Message({
            showClose: true,
            message:'操作成功',
            type: 'success'
          });
          if(Object.keys(data).indexOf('productCommissionScale')!==-1){
            dispatch('productCommissionInfoActions',{  type:1 })
          }else{
            dispatch('productCommissionInfoActions',{  type:2 })
          }
        }
      }).catch(
        (error) => {
          Message({
            showClose: true,
            message:'操作失败',
            type: 'warning'
          });
        }
      )
    }

  }
}

export default servers
