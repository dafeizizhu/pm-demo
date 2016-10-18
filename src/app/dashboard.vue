<template>
  <div>
    <h1 class="page-header">Dashboard</h1>
    <div class="row placeholders">
      <div class="col-xs-6 col-sm-3 placeholder">
        <div class="indicator"><span>{{ ne_length }}</span></div>
        <h4>接入网元（个）</h4>
      </div>
      <div class="col-xs-6 col-sm-3 placeholder">
        <div class="indicator"><span>{{ avg_cpu }}</span></div>
        <h4>平均CPU占用率</h4>
      </div>
      <div class="col-xs-6 col-sm-3 placeholder">
        <div class="indicator"><span>{{ avg_mem }}</span></div>
        <h4>平均内存占用率</h4>
      </div>
      <div class="col-xs-6 col-sm-3 placeholder">
        <div class="indicator"><span>{{ avg_disk }}</span></div>
        <h4>平均磁盘占用率</h4>
      </div>
    </div>
    <h2 class="sub-header">性能任务</h2>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>网元</th>
            <th>指标</th>
            <th>值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='task in tasks'>
            <td>{{ task.ne.name }}</td>
            <td>{{ task.index.name }}</td>
            <td>{{ task.value }}</td>
          </tr>
          <tr v-if='tasks.length == 0'>
            <td colspan='3'>没有性能任务，单击<router-link to='/tasks/new'>这里</router-link>创建一个？</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getTasks, getPerformanceData } from '../collector'
import { getNe } from '../nes'
import { getIndex } from '../indexes'

function getNes(tasks) {
  var map = {}
  tasks.forEach(task => map[task.ne_id] = true)
  return Promise.all(Object.keys(map).map(getNe)).then(nes => Promise.resolve({ nes, tasks }))
}

function getData(tasks) {
  return Promise.all(tasks.map(({ ne_id, index_id }) => {
    return getPerformanceData(ne_id, index_id)
  }))
}

export default {
  data: function () {
    return {
      ne_length: '...',
      avg_cpu: '...',
      avg_mem: '...',
      avg_disk: '...',
      tasks: []
    }
  },
  created: function () {
    this.updateDataTId = setInterval(this.updateData, 5000)
    this.updateData()
  },
  destroyed: function () {
    clearInterval(this.updateDataTId)
  },
  methods: {
    updateData: function () {
      getTasks().then(tasks => getNes(tasks)).then(({ nes, tasks }) => {
        this.ne_length = nes.length
        return Promise.resolve(tasks)
      }).then(tasks => {
        return getData(tasks).then(data => {
          const cpuData = data.filter(d => d.index_id == '1')
          this.avg_cpu = Math.floor(cpuData.reduce((prev, cur) => prev + cur.value, 0) / cpuData.length)
          const memData = data.filter(d => d.index_id == '2')
          this.avg_mem = Math.floor(memData.reduce((prev, cur) => prev + cur.value, 0) / memData.length)
          const diskData = data.filter(d => d.index_id == '3')
          this.avg_disk = Math.floor(diskData.reduce((prev, cur) => prev + cur.value, 0) / diskData.length)

          return Promise.all(tasks.map(task => {
            return Promise.all([getNe(task.ne_id), getIndex(task.index_id)])
          })).then(values => {
            return Promise.resolve(tasks.map((task, i) => {
              return {
                ne: values[i][0],
                index: values[i][1]
              }
            }))
          }).then(tasks => {
            this.tasks = tasks.map((task, i) => {
              return {
                ne: task.ne,
                index: task.index,
                value: data[i].value
              }
            })
          })
        })
      })
    }
  }
}
</script>

<style>
.indicator {
  position: relative;
  background-image: url('../../static/images/dot.png');
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
}

.indicator span {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 80px;
  line-height: 200px;
}
</style>
