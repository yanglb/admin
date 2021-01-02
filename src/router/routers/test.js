export default {
  path: '/test',
  name: '/test',
  component: () => import('@/views/test'),
  meta: {
    title: '测试',
    icon: 'nav-icon fas fa-tree'
  }
}
