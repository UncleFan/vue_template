/*
 * @Description: 组件库及公用功能封装
 * @Date: 2021-06-04 09:42:10
 * @app: vue-template 
 */
import Vue from 'vue'
import App from './App.vue'
import storage from './utils/storage'
import router from './router'
// import times from './utils/formatDate'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// let dates = times.formatDateStamp("2021-01-02 10:11:12")
console.log(document.body.offsetHeight)
localStorage.setItem('offsetHeight', document.body.offsetHeight)

Vue.config.productionTip = false

Vue.prototype.storage = storage

Vue.use(Element)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
