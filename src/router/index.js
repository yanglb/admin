import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/**
 * 菜单列表
 */
export const menus = [
  require('./routers/home').default,
  require('./routers/order').default,
  require('./routers/article').default,
  require('./routers/statistics').default,
  require('./routers/test').default,
]

/**
 * 其它非菜单页面
 */
const publics = [
  require('./routers/signin').default,
]

const routes = [{
  path: '/',
  redirect: '/home',
  component: () => import('@/layouts/default'),
  children: menus
}, {
  path: '/',
  component: () => import('@/layouts/public'),
  children: publics
}]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

router.afterEach(to => {
  Vue.nextTick(() => {
    document.title = to.meta.title + ' - 优税财税'
  });
});

export default router
