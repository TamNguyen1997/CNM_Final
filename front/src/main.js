import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import auth_header from './helpers/auth_header'
import store from './store/store'

Vue.config.productionTip = false

new Vue({
  auth_header,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
