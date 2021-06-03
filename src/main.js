import Vue from 'vue'
import App from './App.vue'
import storage from './public/storage'

Vue.config.productionTip = false

Vue.prototype.storage = storage

new Vue({
  render: h => h(App),
}).$mount('#app')
