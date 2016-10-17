export function getIndex(index_id) {
  return Promise.resolve(indexes[index_id])
}

const indexes = {
  '1': {
    index_id: '1',
    name: 'CPU占用率'
  },
  '2': {
    index_id: '2',
    name: '内存占用率'
  },
  '3': {
    index_id: '3',
    name: '磁盘占用率'
  }
}
