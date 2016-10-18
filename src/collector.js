export function createTask(ne_id, index_id) {
  const task_id = new Date().valueOf()
  tasks.push({ task_id, ne_id, index_id })
  return Promise.resolve({ task_id, ne_id, index_id })
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

export function getTask(task_id) {
  const result = tasks.filter(task => task.task_id == task_id)
  if (result.length == 1) {
    return Promise.resolve(result[0])
  } else {
    return Promise.reject(new Error('no such task'))
  }
}

const tasks = [{
  task_id: '1',
  ne_id: '1',
  index_id: '1'
}, {
  task_id: '2',
  ne_id: '1',
  index_id: '2'
}, {
  task_id: '3',
  ne_id: '2',
  index_id: '2'
}, {
  task_id: '4',
  ne_id: '2',
  index_id: '3'
}]
