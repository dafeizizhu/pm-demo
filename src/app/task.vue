<template>
  <div>
    <h1 class='page-header'>性能任务</h1>
    <form v-on:submit.prevent='submit'>
      <div class='form-group'>
        <label>选择网元</label>
        <ne-selector v-on:change='changeNe'></ne-selector>
      </div>
      <div class='form-group'>
        <label>选择指标</label>
        <index-selector v-on:change='changeIndex'></index-selector>
      </div>
      <button type='submit' class='btn btn-default'>确定</button>
    </form>
  </div>
</template>

<script>
import NeSelector from '../components/ne-selector'
import IndexSelector from '../components/index-selector'

import { createTask } from '../collector' 
import router from '../router'

export default {
  data: function () {
    return {
      task_id: null,
      ne_id: null,
      index_id: null
    }
  },
  created: function () {
    this.task_id = this.$route.params.task_id
  },
  methods: {
    changeNe: function (ne_id) {
      this.ne_id = ne_id
    },
    changeIndex: function (index_id) {
      this.index_id = index_id
    },
    submit: function () {
      if (!this.ne_id) return
      if (!this.index_id) return

      if (this.task_id && this.task_id != 'new') {
        // Edit
      } else {
        // New
        createTask(this.ne_id, this.index_id).then(task => {
          alert('新建性能任务成功')
          router.replace('/tasks')
        })
      }
    }
  },
  components: {
    'ne-selector': NeSelector,
    'index-selector': IndexSelector
  }
}
</script>
