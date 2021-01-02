<template>
  <aside class="main-sidebar elevation-4 sidebar-dark-purple">
    <a href="#" class="brand-link navbar-purple">
      <img src="@/assets/logo.png" alt="财税专家" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">财税专家</span>
    </a>

    <div class="sidebar">
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="@/assets/user2-160x160.jpg" class="img-circle elevation-2" alt="用户头像">
        </div>
        <div class="info">
          <a href="#" class="d-block">管理员</a>
        </div>
      </div>

      <!-- SidebarSearch Form -->
      <div class="form-inline search-form">
        <div class="input-group" data-widget="sidebar-search">
          <input class="form-control form-control-sidebar" type="search" placeholder="快速搜索" aria-label="Search" v-model="search">
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>

      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column nav-child-indent side-menu"
          data-widget="treeview"
          role="menu" data-accordion="false"
        >
          <li class="nav-item" 
            :class="{'has-treeview': item.children.length > 0, 'menu-open': search}"
            v-for="item in routes" :key="item.path"
          >
            <!-- 节点 -->
            <router-link v-if="item.children.length <= 0" :to="{name: item.name}" class="nav-link" >
              <i v-if="item.meta.icon" :class="item.meta.icon"></i>
              <p>
                {{item.meta.title}}
                <span v-if="item.meta.badge" class="right badge badge-danger" >{{item.meta.badge}}</span>
              </p>
            </router-link>
            <a v-else href="#" class="nav-link" :class="{ 'active': isActiveParent(item) }">
              <i v-if="item.meta.icon" :class="item.meta.icon"></i>
              <p>
                {{item.meta.title}}
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            
            <ul class="nav nav-treeview">
              <li class="nav-item"
                v-for="child in item.children" :key="child.name"
              >
                <router-link :to="{name: child.name}" class="nav-link" :class="{ 'active': isActiveParent(child) }">
                  <i v-if="child.meta.icon" :class="child.meta.icon"></i>
                  <i v-else class="far fa-circle nav-icon" />
                  <p>{{child.meta.title}}</p>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>

        <!-- 外部连接 -->
        <hr />
        <ul class="nav nav-pills nav-sidebar flex-column nav-child-indent"
          data-accordion
          data-widget="treeview"
          role="menu" 
        >
          <li class="nav-item">
            <a href="http://112.17.126.252:8092/" class="nav-link" target="_blank">
              <i class="nav-icon fas fa-heartbeat text-danger"></i>
              <p class="text">
                大屏监控<i class="right fas fa-external-link-alt"></i>
              </p>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
import pinyin from 'js-pinyin'
import { menus } from '@/router/index'
pinyin.setOptions({checkPolyphone: false, charCase: 1})

export default {
  name: 'aside-menu',
  data () {
    return {
      search: ''
    }
  },
  methods: {
    isActiveParent: function (item) {
      return this.$route.matched.filter(r => r.name === item.name).length > 0
    }
  },
  mounted() {
    window.$('.side-menu[data-widget="treeview"]').Treeview('init')
  },
  computed: {
    allRoutes() {
      console.log('获取全部菜单')

      // 过虑子菜单
      const routes = menus.map(item => {
        if (item?.children) return { ...item, children: item.children.filter(element => element.meta.menu !== false) }
        else return { ...item, children: []}
      })

      // 添加拼音
      routes.forEach(item => {
        const title = item.meta.title
        Object.assign(item.meta, {
          py: pinyin.getCamelChars(title),
          pinyin: pinyin.getFullChars(title)
        })

        item.children.forEach( item => {
          const title = item.meta.title
          Object.assign(item.meta, {
            py: pinyin.getCamelChars(title),
            pinyin: pinyin.getFullChars(title)
          })
        })
      })
      return routes
    },
    routes() {
      // 过虑子菜单
      console.log(`搜索 ${this.search}`)

      let routes = this.allRoutes
      if (!this.search) return routes

      const fn = item => item.meta.py.indexOf(this.search) >= 0 || item.meta.pinyin.indexOf(this.search) >= 0 || item.meta.title.indexOf(this.search) >= 0

      routes = JSON.parse(JSON.stringify(routes))
      const res = routes.filter(item => {
        let match = fn(item)

        // 无子菜单时
        if (item.children.length <= 0) return match

        // 搜索子菜单（只要子菜单满足条件即可）
        const chs = item.children.filter(fn)
        item.children = chs || []
        return match || chs.length > 0
      })
      return res
    }
  }
}
</script>

<style scoped>
.sidebar-collapse .main-sidebar .search-form {
  display: none;
}
</style>