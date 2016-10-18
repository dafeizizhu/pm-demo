<template>
  <table class='table tabel-striped'>
    <thead>
      <tr>
        <th></td>
        <th>网元</th>
        <th>指标</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='task in tasks'>
        <td><input type='checkbox' v-model='selecteds' v-bind:value='task.task_id' v-on:change='selectedChange' /></td>
        <td>{{ task.ne.name }}</td>
        <td>{{ task.index.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getTasks } from '../collector'
import { getNe } from '../nes'
import { getIndex } from '../indexes'

export default {
  data: function () {
    return {
      selecteds: [],
      tasks: []
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
    selectedChange: function () {
      this.$emit('change', this.selecteds)
    }
  }
}
</script>
