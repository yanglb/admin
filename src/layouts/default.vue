<template>
  <div class="wrapper">
    <!-- 导航栏 -->
    <nav class="main-header navbar navbar-expand navbar-dark navbar-purple">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a href="#" class="nav-link" role="button" data-widget="pushmenu">
            <i class="fas fa-bars" />
          </a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <router-link to="/" class="nav-link">首页</router-link>
        </li>
        <li class="nav-item">
          <span class="nav-link" href="#">yanglb.com - 管理平台</span>
        </li>
      </ul>
      
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <!-- Notifications -->
        <li class="nav-item">
          <a class="nav-link" href="#">
            <i class="far fa-bell"></i>
            <span class="badge badge-warning navbar-badge">15</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-widget="fullscreen" href="#" role="button">
            <i class="fas fa-expand-arrows-alt"></i>
          </a>
        </li>
      </ul>
    </nav>

    <!-- 侧边栏 -->
    <aside-menu />

    <!-- 内容 -->
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">{{$route.meta.title}}</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><router-link to="/">首页</router-link></li>
                <li class="breadcrumb-item active">{{$route.meta.title}}</li>
              </ol>
            </div><!-- /.col -->
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>

      <section class="content">
        <router-view/>
      </section>
    </div>

    <footer class="main-footer">
      <strong>Copyright &copy; 2020 <a href="https://yanglb.com">yanglb.com</a>.</strong>
      All rights reserved.
      <div class="float-right d-none d-sm-inline-block">
        <b>Version</b> {{ version }}
      </div>
    </footer>

    <aside class="control-sidebar control-sidebar-dark">
      <!-- Control sidebar content goes here -->
    </aside>
  </div>
</template>

<script>
import { Loading } from 'element-ui';
import { info } from '@/api/auth'
import { store } from '@/store/user'
import { version } from '../../package.json'

export default {
  data() {
    return {
      display: 'none',
      version
    }
  },
  async mounted() {
    console.log('mounted')
    const loading = Loading.service({
      lock: true,
      text: '正在处理~',
      fullscreen: true
    })

    try {
      const user = await info()
      console.log(user);
      await store.setUser(user)
      loading.close()
      this.display = 'block'

      // 如果是首页则跳转到 home 
      if (this.$route.path === '/') {
        this.$router.replace({name: '/home'})
      }
    } catch (e) {
      this.display = 'block'
      console.error(e)
      // this.$router.replace({name: '/signin'})
      loading.close()
    }
  }
}
</script>
