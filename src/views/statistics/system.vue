<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <!-- interactive chart -->
        <div class="card card-primary card-outline">
          <div class="card-header">
            <h3 class="card-title">
              <i class="far fa-chart-bar"></i>
               设备活动监控
            </h3>

            <div class="card-tools">
              实时
              <div class="btn-group" id="realtime" data-toggle="btn-toggle">
                <button type="button" class="btn btn-default btn-sm active" data-toggle="on">开</button>
                <button type="button" class="btn btn-default btn-sm" data-toggle="off">关</button>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div ref="interactive" style="height: 300px;"></div>
          </div>
          <!-- /.card-body-->
        </div>
        <!-- /.card -->
      </div>

      <div class="col-6">
        <!-- Line chart -->
        <div class="card card-primary card-outline">
          <div class="card-header">
            <h3 class="card-title">
              <i class="far fa-chart-bar"></i>
              今日在线设备
            </h3>

            <div class="card-tools">
              <button type="button" class="btn btn-tool" data-card-widget="collapse">
                <i class="fas fa-minus"></i>
              </button>
              <button type="button" class="btn btn-tool" data-card-widget="remove">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <div ref="lineChart" style="height: 300px;"></div>
          </div>
          <!-- /.card-body-->
        </div>
        <!-- /.card -->
      </div>

      <div class="col-6">
        <!-- Area chart -->
        <div class="card card-primary card-outline">
          <div class="card-header">
            <h3 class="card-title">
              <i class="far fa-chart-bar"></i>
              资源占用情况
            </h3>

            <div class="card-tools">
              <button type="button" class="btn btn-tool" data-card-widget="collapse">
                <i class="fas fa-minus"></i>
              </button>
              <button type="button" class="btn btn-tool" data-card-widget="remove">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <div ref="areaChart" style="height: 338px;" class="full-width-chart"></div>
          </div>
          <!-- /.card-body-->
        </div>
        <!-- /.card -->
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->
  </div><!-- /.container-fluid -->
</template>

<script>
export default {
  data() {
    return {
      data: [],
      totalPoints: 100,
      plot: null,
      realtime: true
    }
  },

  mounted() {
    this.plot = window.$.plot(this.$refs.interactive, [
        {
          data: this.getRandomData(),
        }
      ],
      {
        grid: {
          borderColor: '#f3f3f3',
          borderWidth: 1,
          tickColor: '#f3f3f3'
        },
        series: {
          color: '#3c8dbc',
          lines: {
            lineWidth: 2,
            show: true,
            fill: true,
          },
        },
        yaxis: {
          min: 0,
          max: 100,
          show: true
        },
        xaxis: {
          show: true
        }
      }
    )

    this.update()

    var sin = [];
    for (var i = 0; i < 14; i += 0.5) {
      sin.push([i, Math.sin(i)])
    }
    var line_data = {
      data : sin,
      color: '#3c8dbc'
    }
    window.$.plot(this.$refs.lineChart, [line_data], {
      grid  : {
        hoverable  : true,
        borderColor: '#f3f3f3',
        borderWidth: 1,
        tickColor  : '#f3f3f3'
      },
      series: {
        shadowSize: 0,
        lines     : {
          show: true
        },
        points    : {
          show: true
        }
      },
      lines : {
        fill : false,
        color: ['#3c8dbc', '#f56954']
      },
      yaxis : {
        show: true
      },
      xaxis : {
        show: true
      }
    })

    // area
    var areaData = [[2, 88.0], [3, 93.3], [4, 102.0], [5, 108.5], [6, 115.7], [7, 115.6],
      [8, 124.6], [9, 130.3], [10, 134.3], [11, 141.4], [12, 146.5], [13, 151.7], [14, 159.9],
      [15, 165.4], [16, 167.8], [17, 168.7], [18, 169.5], [19, 168.0]]
    window.$.plot(this.$refs.areaChart, [areaData], {
      grid  : {
        borderWidth: 0
      },
      series: {
        shadowSize: 0, // Drawing is faster without shadows
        color     : '#00c0ef',
        lines : {
          fill: true //Converts the line chart to area chart
        },
      },
      yaxis : {
        show: false
      },
      xaxis : {
        show: false
      }
    })

  },
  methods: {
    getRandomData() {

      if (this.data.length > 0) {
        this.data = this.data.slice(1)
      }

      // Do a random walk
      while (this.data.length < this.totalPoints) {

        var prev = this.data.length > 0 ? this.data[this.data.length - 1] : 50,
            y    = prev + Math.random() * 10 - 5

        if (y < 0) {
          y = 0
        } else if (y > 100) {
          y = 100
        }

        this.data.push(y)
      }

      // Zip the generated y values with the x values
      var res = []
      for (var i = 0; i < this.data.length; ++i) {
        res.push([i, this.data[i]])
      }

      return res
    },
    update() {

      this.plot.setData([this.getRandomData()])

      // Since the axes don't change, we don't need to call plot.setupGrid()
      this.plot.draw()
      if (this.realtime) {
        setTimeout(this.update, 500)
      }
    }
  }
}
</script>
