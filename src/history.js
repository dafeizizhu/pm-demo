import { getTask } from './collector'
import { getNe } from './nes'
import { getIndex } from './indexes'
import { toUTCValue } from './util'

export function getData(task_id, range) {
  return getTask(task_id).then(task => {
    return Promise.all([getNe(task.ne_id), getIndex(task.index_id)])
  }).then(values => {
    let interval
    switch(range) {
      case 'hour':
        interval = 60 * 60 * 100
        break
      case 'day':
        interval = 24 * 60 * 60 * 100
        break
      case 'month':
        interval = 30 * 24 * 60 * 60 * 100
        break
    }
        
    const data = []
    const current = new Date().valueOf()
    for (let i = 0; i < 10; i++) {
      data.push([toUTCValue(current - interval * (10 - i)), Math.round(Math.random() * 100)])
    }
    return Promise.resolve({
      title: values[0].name + '的' + values[1].name,
      data
    })
  })
}
