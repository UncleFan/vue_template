import Vue from 'vue'
import App from './App.vue'
import storage from './public/storage'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.storage = storage

Vue.use(router)

new Vue({
  render: h => h(App),
}).$mount('#app')
