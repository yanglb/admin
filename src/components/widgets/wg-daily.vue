<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">
        <i class="fas fa-chart-pie mr-1"></i>
        {{number || '所有设备'}} 近{{days}}天消杀
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
import moment from 'moment'
import Chart from 'chart.js'

import { dailyReport } from "@/api/statistics";
import { shortDateFormat } from '@/const/format'
import { prettyDateFormat } from "@/const/render";

export default {
  name: 'wg-daily',
  props: {
    days: {
      default: 15,
      type: [Number, String]
    },
    number: {
      default: '',
      type: String
    }
  },

  data() {
    return {
      chart: null,
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
      // 标签
      const labels = []
      for(let i=0; i< this.days; i++) {
        labels.push(
          window.moment().add(-(i+1), 'd').toDate()
        )
      }
      labels.reverse()

      // 数据
      this.chart = new Chart(this.$refs.chart.getContext('2d'), {
        type: 'line',
        data: {
          labels: labels,
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
              type: 'time',
              time: {
                displayFormats: {
                  day: 'M/D'
                },
                tooltipFormat: shortDateFormat
              },
              gridLines: {
                display: false
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: '运行时间（分钟）'
              },
              gridLines: {
                display: false
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
      const end = new Date()
      const start = moment(end).add(- this.days, 'd').toDate()
      const data = await dailyReport(start, end, this.number)
      this.syncDate = new Date()

      const fun = []
      const uv = []
      data.forEach(itm => {
        fun.push({
          x: new Date(itm.date),
          y: itm.fanWorkingMinutes
        })

        uv.push({
          x: new Date(itm.date),
          y: itm.UVWorkingMinutes
        })
      })

      this.chart.data.datasets[0].data = fun
      this.chart.data.datasets[1].data = uv
      this.chart.update()
    }
  },

  mounted() {
    // 创建图表
    this.initChart()
    
    // 加载数据
    this.loadData()
  }
}
</script>
