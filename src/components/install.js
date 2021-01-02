import Vue from 'vue'

// 加载 components 目录下全部组件
const files = require.context('./', true, /\.vue$/)
files.keys().map(item => {
  const c = files(item).default
  Vue.component(c.name, c)
})
