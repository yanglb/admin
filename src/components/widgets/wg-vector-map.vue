<template>
  <div class="card bg-gradient-primary">
    <div class="card-header border-0">
      <h3 class="card-title">
        <i class="fas fa-map-marker-alt mr-1"></i>
        疫情数据
      </h3>
      <!-- card tools -->
      <div class="card-tools">
        <button type="button" class="btn btn-primary btn-sm" data-card-widget="collapse" title="Collapse">
          <i class="fas fa-minus"></i>
        </button>
      </div>
      <!-- /.card-tools -->
    </div>
    <div class="card-body">
      <div ref="worldMap" style="height: 250px; width: 100%;"></div>
    </div>
    <!-- /.card-body-->
    <div class="card-footer bg-transparent">
      <div class="row">
        <div class="col-4 text-center">
          <!-- <div ref="sparkline1"></div> -->
          <div>{{domestic}}</div>
          <div class="text-white">国内确诊</div>
        </div>
        <!-- ./col -->
        <div class="col-4 text-center">
          <!-- <div ref="sparkline2"></div> -->
          <div>{{global}}</div>
          <div class="text-white">全球确诊</div>
        </div>
        <!-- ./col -->
        <div class="col-4 text-center">
          <!-- <div ref="sparkline3"></div> -->
          <div>{{dateTimeFormatShort(data.updateTime) || '-'}}</div>
          <div class="text-white">同步时间</div>
        </div>
        <!-- ./col -->
      </div>
      <!-- /.row -->
    </div>
  </div>
</template>

<script>
import { COVID19 } from '@/api/statistics'
import { dateTimeFormatShort } from '@/const/render'

export default {
  name: 'wg-vector-map',
  data() {
    return {
      data: {}
    }
  },
  computed: {
    domestic() {
      if (!this.data.domestic) return '-'
      return this.data.domestic.confirmedCount
    },

    global() {
      if (!this.data.global) return '-'
      return this.data.global.confirmedCount
    },

    total() {
      if (this.domestic === '-') return '-'
      return this.domestic + this.global
    }
  },
  methods: {
    async loadData() {
      this.data = await COVID19()

      const visitorsData = {}
      for (let key in this.data.data) {
        visitorsData[key] = this.data.data[key].confirmedCount
      }

      this.initChart(visitorsData)
    },
    // 疫情数据
    initChart(visitorsData) {
      console.log(visitorsData)
      window.$(this.$refs.worldMap).vectorMap({
        map: 'world_en',
        backgroundColor: 'transparent',
        values: visitorsData,
        hoverOpacity: 0.7,
        selectedColor: '#6f42c1',
        enableZoom: true,
        showTooltip: true,
        scaleColors: ['#ffffff', '#0154ad'],
        normalizeFunction: 'polynomial',
        onLabelShow: (function (e, el, code) {
          if (typeof visitorsData[code] !== 'undefined') {
            const d = this.data.data[code]
            el.html(`${d.countryName}: 确诊${d.confirmedCount}人`)
          }
        }).bind(this)
      })

      // Sparkline charts
      // let sparkline1 = new window.Sparkline(this.$refs.sparkline1, { width: 80, height: 50, lineColor: '#92c1dc', endColor: '#ebf4f9' })
      // let sparkline2 = new window.Sparkline(this.$refs.sparkline2, { width: 80, height: 50, lineColor: '#92c1dc', endColor: '#ebf4f9' })
      // let sparkline3 = new window.Sparkline(this.$refs.sparkline3, { width: 80, height: 50, lineColor: '#92c1dc', endColor: '#ebf4f9' })

      // sparkline1.draw([1000, 1200, 920, 927, 931, 1027, 819, 930, 1021])
      // sparkline2.draw([515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921])
      // sparkline3.draw([15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21])
    },
    ... { dateTimeFormatShort }
  },

  async mounted() {
    // this.initChart()
    await this.loadData()
  }
}
</script>
