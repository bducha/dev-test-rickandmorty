import Vue from 'vue'
import App from './App.vue'
import Router from "vue-router"
import router from "./router"
import BootstrapVue from "bootstrap-vue"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(Router)
Vue.config.productionTip = false

//Initializing our Vue app
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
