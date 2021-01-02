<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">
        <i class="fas fa-chart-pie mr-1"></i>
        {{number || '所有设备'}} 今日消杀
      </h3>
      <div class="card-tools">
        <el-tooltip class="item" effect="dark" :content="syncDateStr">
          <button type="button" class="btn btn-tool" @click="loadData" @mouseover="updateSyncDate">
            <i class="fas fa-sync"></i>
          </button>
        </el-tooltip>
      </div>
    </div>
    <div class="card-body">
      <div class="tab-content p-0">
        <div class="chart tab-pane active" style="position: relative; height: 300px;">
          <canvas class="chart" ref="chart" height="300"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'

import { dayReport } from "@/api/statistics"
import { prettyDateFormat } from "@/const/render"

export default {
  name: 'wg-today',
  props: {
    number: {
      default: '',
      type: String
    }
  },

  data() {
    return {
      chart: null,
      timer: null,
      syncDate: null,
      syncDateStr: ''
    }
  },

  methods: {
    updateSyncDate() {
      if (!this.syncDate) this.syncDateStr = '刷新时间: 未知'
      else this.syncDateStr = '刷新时间: ' + prettyDateFormat(this.syncDate)
    },
    initChart() {
      // 数据
      this.chart = new Chart(this.$refs.chart.getContext('2d'), {
        // type: 'bar',
        type: 'line',
        data: {
          labels: [...new Array(24).keys()].map(r => r + '点'),
          datasets: [{
            label: '循环杀',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            fill: false,
            lineTension: 0,
            data: []
          }, {
            label: '照射杀',
            backgroundColor: 'rgba(210, 214, 222, 1)',
            borderColor: 'rgba(210, 214, 222, 1)',
            pointRadius: false,
            pointColor: 'rgba(210, 214, 222, 1)',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            lineTension: 0,
            data: []
          }]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              }
            }],
            yAxes: [{
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: '运行时间（分钟）'
              },
              ticks: {
                min: 0
              }
            }]
          }
        }
      })
    },

    async loadData() {
      const data = await dayReport(new Date(), this.number)
      this.syncDate = new Date()
      const fun = []
      const uv = []

      data.forEach(d => {
        fun.push(d.fanWorkingMinutes)
        uv.push(d.UVWorkingMinutes)
      });

      this.chart.data.datasets[0].data = fun
      this.chart.data.datasets[1].data = uv
      this.chart.update()
    }
  },

  mounted() {
    // 创建图表
    this.initChart()
    
    // 加载数据
    // this.timer = setInterval(this.loadData.bind(this), process.env.VUE_APP_REFRESH_INTERVAL * 1000)
    this.loadData()
  },

  destroyed() {
    // clearInterval(this.timer)
  }
}
</script>
