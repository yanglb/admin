<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">
          <i class="fas fa-search"></i>
          查询条件
        </h3>
      </div>
      <div class="card-body search-form">
        <el-form :inline="true" :model="query">
          <el-form-item>
            <el-input v-model="query.number" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.nickName" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="loadData">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h3 class="card-title">
          <i class="fas fa-th"></i>
          售后订单列表
        </h3>
      </div>
      <div class="card-body">
        <el-table
          :data="tableData"
          v-loading="loading"
          stripe
          style="width: 100%">
          <el-table-column
            prop="number"
            label="编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="user.nickName"
            label="用户"
            width="120">
          </el-table-column>
          <el-table-column
            prop="itemTitle"
            label="商品"
            width="240">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="80">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="下单时间"
            width="120">
            <template slot-scope="scope">
              {{ dateTimeFormat(scope.row.createDate) }}
            </template>
          </el-table-column>
          <el-table-column
            label="售后状态">
            <template slot-scope="scope">
              {{afterSaleStatus(scope.row.afterSaleStatus)}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" v-if="scope.row.afterSaleStatus == OrderAfterSaleEnum.Applied" type="text" size="small">处理</el-button>
              <p v-else>{{scope.row.afterSaleReview}}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog title="退款处理" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm">
        <el-form-item label="处理意见" label-width="120px">
          <el-input v-model="dialogForm.review" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirmOrder(false)">拒 绝</el-button>
        <el-button type="primary" @click="confirmOrder(true)">退 款</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { afterSaleConfirm, orderList } from '@/api/order'
import { dateTimeFormat, afterSaleStatus } from '@/const/render'
import { OrderAfterSaleEnum } from '@/const/order'

export default {
  data() {
    return {
      tableData: null,
      loading: false,
      query: {
        number: '',
        nickName: ''
      },
      dialogForm: {
        review: '',
        order: null
      },
      dialogFormVisible: false,
      OrderAfterSaleEnum
    }
  },

  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'loadData'
  },

  methods: {
    async loadData() {
      this.loading = true
      this.tableData = null
      try {
        const data = await orderList(this.query)
        this.tableData = data
      } finally {
        this.loading = false;
      }
    },
    handleClick(order) {
      console.log(order)
      this.dialogForm.order = order
      this.dialogForm.review = ''

      this.dialogFormVisible = true
    },
    async confirmOrder(accept) {
      this.dialogFormVisible = false
      await afterSaleConfirm(this.dialogForm.order.number, { accept, review: this.dialogForm.review})
      this.$message.success('保存成功')
    },
    ...{ dateTimeFormat, afterSaleStatus }
  },

  mounted () {
    this.loadData()
  }
}
</script>
