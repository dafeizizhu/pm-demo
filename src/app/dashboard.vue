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
  </div>
</template>

<script>
import { getTasks, getPerformanceData } from '../collector'
import { getNe } from '../nes'

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
      avg_disk: '...'
    }
  },
  created: function () {
    setInterval(this.updateData, 5000)
    this.updateData()
  },
  methods: {
    updateData: function () {
      getTasks().then(tasks => getNes(tasks)).then(({ nes, tasks }) => {
        this.ne_length = nes.length
        return Promise.resolve(tasks)
      }).then(tasks => {
        getData(tasks).then(data => {
          const cpuData = data.filter(d => d.index_id == '1')
          this.avg_cpu = Math.floor(cpuData.reduce((prev, cur) => prev + cur.value, 0) / cpuData.length)
          const memData = data.filter(d => d.index_id == '2')
          this.avg_mem = Math.floor(memData.reduce((prev, cur) => prev + cur.value, 0) / memData.length)
          const diskData = data.filter(d => d.index_id == '3')
          this.avg_disk = Math.floor(diskData.reduce((prev, cur) => prev + cur.value, 0) / diskData.length)
        })
      })
    }
  }
}
</script>

<style>
.indicator {
  max-width: 100%;
  background: #ccc;
  border-radius: 50%;
  padding-top: 100%;
  position: relative;
}

.indicator span {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
}
</style>
