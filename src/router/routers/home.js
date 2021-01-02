export default {
  path: '/home',
  name: '/home',
  component: () => import('@/views/home/dashboard'),
  meta: {
    title: '设备信息状态',
    icon: 'nav-icon fas fa-tachometer-alt',
    badge: '新'
  }
}
