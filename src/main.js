import Vue from 'vue'
import App from './App.vue'
import router from './router'
//导入vant.js文件
import './plugins/vant'
//导入css
import './assets/css/base.css'
//导入api
import api from './api'
//挂载到Vue原型上 所有的vue实例都可以访问
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
