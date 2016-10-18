import 'bootstrap/dist/css/bootstrap.min.css'
import '../static/styles/dashboard.css'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import router from './router'

const app = new Vue({
  router
}).$mount('#app')
