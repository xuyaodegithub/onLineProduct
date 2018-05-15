// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font/iconfont.css'
import './assets/public/public.css'
import axios from 'axios'
import vueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.prototype.$http = axios
Vue.use(vueQuillEditor)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  store,
  $,
  template: '<App/>',
  components: { App }
})

//图片地址处理
Vue.filter('ToUrl', function (val) {
  if(val){
    return val
  }else{
    return 'http://ol-quan2017.oss-cn-shanghai.aliyuncs.com/23c31d63de867f568af9d1b8a3d193573b456a41'
  }
});
//时间过滤器
Vue.filter('changeTime',function(val){
  if(val){
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
    return year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec
  }else{
    return ''
  }
});
//拖拽
Vue.directive('drag',function(event){
  var oDiv = event;
  oDiv.onmousedown = function(ev){
    if(ev.target.className=='popover-head'){
      var disX = ev.clientX -oDiv.offsetLeft;
      var disY = ev.clientY - oDiv.offsetTop;
      document.onmousemove = function(ev){
        var l = ev.clientX-disX;
        var t = ev.clientY-disY;
        oDiv.style.left =  l+'px';
        oDiv.style.top = t+'px';
      };
      document.onmouseup = function(){
        document.onmousemove=null;
        document.onmouseup=null;
      };
    }
  };
});
export default vm;
