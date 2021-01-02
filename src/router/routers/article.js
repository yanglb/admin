export default {
  path: '/article',
  name: '/article',
  component: () => import('@/views/article/index'),
  meta: {
    title: '文章管理',
    icon: 'nav-icon fas fa-tachometer-alt'
  }
}
