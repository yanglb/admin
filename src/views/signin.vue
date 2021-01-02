<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-logo">
        <img src="@/assets/logo.png" height="80px">
      </div>
      <!-- /.login-logo -->
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">请登录</p>

          <form action="/" method="post" @submit="signin">
            <div class="input-group mb-3">
              <input type="text" class="form-control" name="username" placeholder="账号" v-model="username">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-user"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="password" class="form-control" name="password" placeholder="密码" v-model="password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <div class="icheck-primary">
                  <input type="checkbox" id="remember" v-model="remember">
                  <label for="remember">
                    记住我
                  </label>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-4">
                <p class="mb-1">
                  <a href="#">忘记密码？</a>
                </p>
              </div>
              <!-- /.col -->
            </div>

            <div class="social-auth-links text-center mb-3">
              <button type="submit" class="btn btn-primary btn-block" :disabled="!username || !password" >登录</button>
            </div>
          </form>
        </div>
        <!-- /.login-card-body -->
      </div>
    </div>
  </div>
</template>

<script>
import { signin } from '@/api/auth'
import { store } from '@/store/user'

export default {
  data() {
    return {
      username: localStorage.getItem('user.username'),
      password: localStorage.getItem('user.password'),
      remember: localStorage.getItem('user.remember') ? true : false
    }
  },
  methods: {
    async signin(e) {
      e.preventDefault();

      if (this.remember) {
        localStorage.setItem('user.username', this.username)
        localStorage.setItem('user.password', this.password)
        localStorage.setItem('user.remember', true)
      } else {
        localStorage.clear('user.username')
        localStorage.clear('user.password')
        localStorage.clear('user.remember')
      }

      const res = await signin(this.username, this.password)
      this.password = ''
      this.$message({
          message: `登录成功，欢迎回来 ${res.user.name}~`,
          type: 'success'
        });

        await store.setAuth(res)
        window.setTimeout(() => {
          this.$router.push('/home')
        }, 500)
    }
  }
}
</script>
