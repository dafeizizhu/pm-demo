import VueRouter from 'vue-router'

import App from './app'

const Dashboard = resolve => {
  require.ensure(['./app/dashboard'], () => {
    resolve(require('./app/dashboard'))
  })
}

const Tasks = resolve => {
  require.ensure(['./app/tasks'], () => {
    resolve(require('./app/tasks'))
  })
}

const Task = resolve => {
  require.ensure(['./app/task'], () => {
    resolve(require('./app/task'))
  })
}

const History = resolve => {
  require.ensure(['./app/history'], () => {
    resolve(require('./app/history'))
  })
}

const Realtime = resolve => {
  require.ensure(['./app/realtime'], () => {
    resolve(require('./app/realtime'))
  })
}

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
