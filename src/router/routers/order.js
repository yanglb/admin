export default {
  path: '/order',
  name: '/order',
  component: () => import('@/views/order/index'),
  meta: {
    title: '订单退款处理',
    icon: 'nav-icon fas fa-tachometer-alt'
  }
}
