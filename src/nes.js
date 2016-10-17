export function getNes() {
  return Promise.resolve(Object.keys(nes).map(ne_id => nes[ne_id]))
}

export function getNe(ne_id) {
  return Promise.resolve(nes[ne_id])
}

const nes = {
  '1': {
    ne_id: '1',
    name: 'router',
    description: '一楼的路由器'
  }, 
  '2': {
    ne_id: '2',
    name: 'switch',
    description: '二楼的交换机'
  }
}
