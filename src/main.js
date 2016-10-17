import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from './app'
import Dashboard from './app/dashboard'
import Tasks from './app/tasks'
import Task from './app/task'
import History from './app/history'
import Realtime from './app/realtime'

const routes = [
  { 
    path: '/', 
    component: App,
    children: [{
      path: '', 
      component: Dashboard
    }, {
      path: 'tasks',
      component: Tasks
    }, {
      path: 'task',
      component: Task
    }, {
      path: 'history',
      component: History
    }, {
      path: 'realtime',
      component: Realtime
    }]
  }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')