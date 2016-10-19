<template>
  <div>
    <h1 class='page-header'>性能任务</h1>
    <div class='btn-toolbar'>
      <button class='btn btn-default' v-on:click='clickNew'>新建</button>
      <button v-bind:disabled='editDisabled' class='btn btn-default' v-on:click='clickEdit'>修改</button>
      <button v-bind:disabled='removeDisabled' class='btn btn-danger'>删除</button>
    </div>
    <div class='table-responsive'>
      <table class='table table-striped'>
        <thead>
          <tr>
            <th>选择</th>
            <th>网元</th>
            <th>指标</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='task in tasks'>
            <td><input type='checkbox' v-model='task.selected' /></td>
            <td>{{ task.ne.name }}</td>
            <td>{{ task.index.name }}</td>
          </tr>
          <tr v-if='tasks.length == 0'>
            <td colspan='3'>没有性能任务，单击<router-link to='/tasks/new'>这里</router-link>创建一个？</td>
          </tr>
        </tbody>
      <table>
  </div>
</template>

<script>
import { getTasks } from '../collector'
import { getNe } from '../nes'
import { getIndex } from '../indexes'
import router from '../router'

export default {
  data: function () {
    return {
      tasks: []
    }
  },
  computed: {
    editDisabled: function () {
      return this.tasks.filter(task => task.selected).length != 1
    },
    removeDisabled: function () {
      return this.tasks.filter(task => task.selected).length == 0
    }
  },  
  created: function () {
    getTasks().then(tasks => {
      return Promise.all(tasks.map(task => {
        return Promise.all([getNe(task.ne_id), getIndex(task.index_id)])
      })).then(values => {
        this.tasks = tasks.map((task, i) => {
          return {
            task_id: task.task_id,
            ne: values[i][0],
            index: values[i][1],
            selected: false 
          }
        })
      })
    })
  },
  methods: {
    clickNew: function () {
      router.push('/tasks/new')
    },
    clickEdit: function () {
      var selectedTask = this.tasks.filter(task => task.selected)[0]
      router.push('/tasks/' + selectedTask.task_id)
    }
  }
}
</script>
