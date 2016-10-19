<template>
  <div>
    <h1 class='page-header'>实时性能</h1>
    <form class='form-horizontal' v-on:submit.prevent='submit'>
      <div class='form-group'>
        <label class='col-sm-2 control-label'>选择任务</label>
        <div class='col-sm-10'>
          <input class='form-control' type='text' readonly='readonly' v-model='tasks_name' />
          <button class='btn btn-default btn-inline' v-on:click.prevent='pickTask'>选择</button>
        </div>
      </div>
      <div class='form-group'>
        <label class='col-sm-2 control-label'>选择周期</label>
        <div class='col-sm-10'>
          <label class='radio-inline'>
            <input type='radio' name='period' value='10' v-model='period'> 10秒
          </label>
          <label class='radio-inline'>
            <input type='radio' name='period' value='30' v-model='period'> 30秒
          </label>
          <label class='radio-inline'>
            <input type='radio' name='period' value='60' v-model='period'> 60秒
          </label>
        </div>
      </div>
      <div class='form-group'>
        <div class='col-sm-offset-2 col-sm-10'>
          <button type='submit' class='btn btn-default'>确定</button>
        </div>
      </div>
    </form>
    <div v-show='taskSelectorShow' class='modal' style='display: block; background-color: rgba(0,0,0,.5);'>
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click='closeTask'><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">选择性能任务</h4>
          </div>
          <div class="modal-body">
            <task-selector v-on:change='changeTasks'></task-selector>
          </div>
        </div>
      </div>
    </div>
    <div id='container'></div>
  </div>
</template>

<script>
import TaskSelector from '../components/task-selector'

import { getNe } from '../nes'
import { getIndex } from '../indexes'
import { getTask, getPerformanceData } from '../collector'
import { toUTCValue } from '../util'
import charts from '../charts'

export default {
  data: function () {
    return {
      tId: 0,
      tasks: [],
      period: '10',
      taskSelectorShow: false,
      charts: []
    }
  },
  computed: {
    tasks_name: function () {
      return this.tasks.map(task => task.ne.name + task.index.name).join(', ')
    }
  },
  methods: {
    submit: function () {
      this.charts.forEach(chart => chart.destroy())
      this.charts = []
      document.getElementById('container').innerHTML = ''

      this.tasks.forEach(task => {
        const container = document.createElement('div')
        document.getElementById('container').appendChild(container)
        const data = []
        const period = this.period * 1000
        const current = new Date().valueOf()
        for (let i = 0; i < 10; i++) {
          data.push([toUTCValue(current - period * (10 - i)), 0])
        }
        this.charts.push(charts(container, task.ne.name + '的' + task.index.name, [{
          name: task.ne.name + '的' + task.index.name,
          data
        }]))
      })
      
      clearInterval(this.tId)
      this.tId = setInterval(() => {
        Promise.all(this.tasks.map(task => {
          return getPerformanceData(task.ne.ne_id, task.index.index_id)
        })).then(values => {
          values.forEach((value, i) => {
            this.charts[i].series[0].addPoint([toUTCValue(new Date().valueOf()), value.value])
            this.charts[i].series[0].removePoint(0)
          })
        })
      }, this.period * 1000)
    },
    pickTask: function () {
      this.taskSelectorShow = true
    },
    closeTask: function () {
      this.taskSelectorShow = false
    },
    changeTasks: function (tasks) {
      Promise.all(tasks.map(getTask)).then(values => {
        return Promise.all(values.map(value => Promise.all([getNe(value.ne_id), getIndex(value.index_id)]))).then(values => {
          this.tasks = tasks.map((task, i) => {
            return {
              task_id: tasks[i],
              ne: values[i][0],
              index: values[i][1]
            }
          })
        })
      })
    },
  },
  components: {
    'task-selector': TaskSelector
  }
}
</script>

<style>
.btn-inline {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
