export function createCollectTask(ne_id, index_id) {
  tasks.push({ ne_id, index_id })
  return Promise.resolve({ ne_id, index_id })
}

export function getPerformanceData(ne_id, index_id) {
  return Promise.resolve({
    ne_id,
    index_id,
    value: Math.floor(Math.random() * 100)
  })
}

export function getTasks() {
  return Promise.resolve(tasks)
}

const tasks = [{
  ne_id: '1',
  index_id: '1'
}, {
  ne_id: '1',
  index_id: '2'
}, {
  ne_id: '2',
  index_id: '2'
}, {
  ne_id: '2',
  index_id: '3'
}]
