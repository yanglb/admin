const routers = (name => [{
  path: 'device',
  name: `${name}/device`,
  component: () => import('@/views/statistics/device'),
  meta: {
    title: '按设备'
  }
}, {
  path: 'system',
  name: `${name}/system`,
  component: () => import('@/views/statistics/system'),
  meta: {
    title: '运行统计'
  }
}])('/statistics')

export default {
  path: '/statistics',
  name: '/statistics',
  component: () => import('@/views/empty'),
  meta: {
    title: '统计分析',
    icon: 'nav-icon fas fa-chart-pie'
  },
  children: routers
}
