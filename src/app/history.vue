<template>
  <div>
    <h1 class='page-header'>历史性能</h1>
    <form class='form-horizontal' v-on:submit.prevent='submit'>
      <div class='form-group'>
        <label class='col-sm-2 control-label'>选择网元</label>
        <div class='col-sm-10'>
          <input class='form-control' type='text' readonly='readonly' v-model='tasks_name' />
          <button class='btn btn-default btn-inline' v-on:click.prevent='pickTask'>选择</button>
        </div>
      </div>
      <div class='form-group'>
        <label class='col-sm-2 control-label'>选择时间</label>
        <div class='col-sm-10'>
          <label class="radio-inline">
            <input type="radio" name="inlineRadioOptions" value="hour" v-model='range'> 最近一个小时
          </label>
          <label class="radio-inline">
            <input type="radio" name="inlineRadioOptions" value="day" v-model='range'> 最近一天
          </label>
          <label class="radio-inline">
            <input type="radio" name="inlineRadioOptions" value="month" v-model='range'> 最近一个月
          </label>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-default">确定</button>
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
import Highcharts from 'highcharts'

import { getNe } from '../nes'
import { getIndex } from '../indexes'
import { getTask } from '../collector'

export default {
  data: function () {
    return {
      tasks: [],
      range: 'hour',
      taskSelectorShow: false
    }
  },
  computed: {
    tasks_name: function () {
      return this.tasks.map(task => task.ne.name + task.index.name).join(', ')
    }
  },
  mounted: function () {
    // DEMO
    Highcharts.chart('container', {
      title: {
        text: 'Monthly Average Temperature',
        x: -20 //center
      },
      subtitle: {
        text: 'Source: WorldClimate.com',
        x: -20
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        title: {
          text: 'Temperature'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        valueSuffix: '°C'
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
      series: [{
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }, {
        name: 'New York',
        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
      }, {
        name: 'Berlin',
        data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
      }, {
        name: 'London',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }]
    })
  },
  methods: {
    submit: function () {
      console.log(this.tasks)
      console.log(this.range)
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
