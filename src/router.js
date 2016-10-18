import VueRouter from 'vue-router'

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
      path: 'tasks/:task_id',
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

export default new VueRouter({
  routes
})
