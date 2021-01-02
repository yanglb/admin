import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import '@/plugins/http'
import '@/assets/index.css'

import '@/components/install'

// moment.js
import moment from 'moment'
moment.locale('zh-cn')

import vueMoment from 'vue-moment'
Vue.use(vueMoment, {
  moment
})

// Chartjs
import 'chartjs-adapter-moment'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
