import axios from 'axios';
import { Loading, Message } from 'element-ui'
import errorCode from '@/const/errorCode'
import router from '@/router/index'
import { store } from '@/store/user'

function successCodes(status) {
  return status >= 200 && status < 300
}

// 配置
let baseURL = process.env.VUE_APP_BASEURL
if (baseURL.endsWith('/')) baseURL = baseURL.substr(0, baseURL.length - 1)

axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 30000;
axios.defaults.validateStatus = status => status >= 200 && status <= 500
axios.defaults.withCredentials = true;

function needShowProgress(method) {
  if (!method) return false
  return ['POST', 'PUT', 'PATCH', 'DELETE'].indexOf(method.toUpperCase()) >= 0
}

let loadingInstance = null;
function showProgress(method) {
  if (needShowProgress(method)) {
    loadingInstance = Loading.service({
      lock: true,
      fullscreen: true
    });
  } else {
    // $f7.progressbar.show();
  }
}
function hideProgress(method) {
  if (!needShowProgress(method)) return;
  if (loadingInstance) {
    loadingInstance.close()
  }
}

// HTTP Request
axios.interceptors.request.use(config => {
  showProgress(config.method);

  if (!config.headers['Authorization']) {
    let token = store.state.token;
    if (token) config.headers['Authorization'] = `${store.state.type} ${store.state.token}`
  }
  
  return config
}, error => {
  hideProgress(error.config.method)
  return Promise.reject(error)
})

// HTTP Response
axios.interceptors.response.use(res => {
  hideProgress(res.config.method);
  
  const status = Number(res.status) || 200
  let message = errorCode[status] || errorCode['default']

  if (status === 401) {
    store.clean()
    router.replace({ name: '/signin' })
    console.log('====== 登录 ======');
    return Promise.reject(new Error('用户未登录'))
  }

  if (res.data && res.data.message) {
    message = res.data.message
  }

  if (!successCodes(status)) {
    Message.error(message)
    return Promise.reject(new Error(message))
  }

  return res.data
}, error => {
    hideProgress(error.config.method);
    Message.error(error.message || '网络错误', '错误')
    return Promise.reject(new Error(error))
})


export default axios;
