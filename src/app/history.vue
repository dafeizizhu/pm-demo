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
  </div>
</template>

<script>
import TaskSelector from '../components/task-selector'

import { getNe } from '../nes'
import { getIndex } from '../indexes'
import { getTask } from '../collector'

export default {
  data: function () {
    return {
      tasks: [],
      taskSelectorShow: false
    }
  },
  computed: {
    tasks_name: function () {
      return this.tasks.map(task => task.ne.name + task.index.name).join(', ')
    }
  },
  methods: {
    submit: function () {
      console.log(this.tasks)
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
