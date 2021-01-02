<template>
  <div class="row">
    <div class="col-lg-3 col-6">
      <!-- small box -->
      <div class="small-box bg-info">
        <div class="inner">
          <h3>{{count.total}}</h3>

          <p>总设备数</p>
        </div>
        <div class="icon">
          <i class="fa fa-grip-horizontal"></i>
        </div>
        <router-link v-if="withLink" to="/devices/list" class="small-box-footer">
          详情 <i class="fas fa-arrow-circle-right"></i>
        </router-link>
      </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-6">
      <!-- small box -->
      <div class="small-box bg-success">
        <div class="inner">
          <h3>{{count.online}}</h3>

          <p>当前在线数量</p>
        </div>
        <div class="icon">
          <i class="fa fa-life-ring"></i>
        </div>
        <router-link v-if="withLink" to="/devices/list?online" class="small-box-footer">
          详情 <i class="fas fa-arrow-circle-right"></i>
        </router-link>
      </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-6">
      <!-- small box -->
      <div class="small-box bg-warning">
        <div class="inner">
          <h3>{{count.running}}</h3>

          <p>当前运行数</p>
        </div>
        <div class="icon">
          <i class="fa fa-fan"></i>
        </div>
        <router-link v-if="withLink" to="/devices/list" class="small-box-footer">
          详情 <i class="fas fa-arrow-circle-right"></i>
        </router-link>
      </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-6">
      <!-- small box -->
      <div class="small-box bg-danger">
        <div class="inner">
          <h3>{{count.malfunction}}</h3>

          <p>当前故障数</p>
        </div>
        <div class="icon">
          <i class="fa fa-hammer"></i>
        </div>
        <router-link v-if="withLink" to="/devices/list?malfunction" class="small-box-footer">
          详情 <i class="fas fa-arrow-circle-right"></i>
        </router-link>
      </div>
    </div>
    <!-- ./col -->
  </div>
</template>

<script>
import { count } from "@/api/statistics";

export default {
  name: 'wg-dev-count',
  data() {
    return {
      count: {
        total: '-',
        inuse: '-',
        online: '-',
        malfunction: '-'
      },
      timer: null
    }
  },

  computed: {
    withLink() {
      return this.$router.currentRoute.name !== '/devices/list'
    }
  },

  methods: {
    async loadData() {
      this.count = await count()
    }
  },

  mounted() {
    // 加载数据
    this.timer = setInterval(this.loadData.bind(this), process.env.VUE_APP_REFRESH_INTERVAL * 1000)
    this.loadData()
  },

  destroyed() {
    clearInterval(this.timer)
  }
}
</script>
