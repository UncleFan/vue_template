/*
 * @Description: 组件库及公用功能封装
 * @Date: 2021-06-04 09:42:10
 * @app: vue-template 
 */
import Vue from 'vue'
import App from './App.vue'
import storage from './utils/storage'
import router from './router'
import times from './utils/formatDate'

let dates = times.formatDateStamp("2021-01-02 10:11:12")
console.log(dates)

Vue.config.productionTip = false

Vue.prototype.storage = storage

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
