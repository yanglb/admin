<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">
          <i class="fas fa-search"></i>
          文章管理
        </h3>
      </div>
      <div class="card-body">
        <el-divider content-position="left">文章1</el-divider>
        <el-form :inline="true" :model="article1">
          <el-form-item>
            <el-input v-model="article1.title" placeholder="文章标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="article1.url" placeholder="文章地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="article1.image" placeholder="封面图片地址"></el-input>
          </el-form-item>
        </el-form>

        <el-divider content-position="left">文章2</el-divider>
        <el-form :inline="true" :model="article2">
          <el-form-item>
            <el-input v-model="article2.title" placeholder="文章标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="article2.url" placeholder="文章地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="article2.image" placeholder="封面图片地址"></el-input>
          </el-form-item>
        </el-form>

        <el-divider content-position="left">文章3</el-divider>
        <el-form :inline="true" :model="article3">
          <el-form-item>
            <el-input v-model="article3.title" placeholder="文章标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="article3.url" placeholder="文章地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="article3.image" placeholder="封面图片地址"></el-input>
          </el-form-item>
        </el-form>

        <el-row>
          <p>每篇文章要么全部填写三个信息要么全部为空。</p>
          <el-button @click="saveData()">保存</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { articles, save } from '@/api/article'

export default {
  data() {
    return {
      article1: {},
      article2: {},
      article3: {}
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const data = await articles()
      if (!data) return

      if (data.length > 0) this.article1 = data[0]
      if (data.length > 1) this.article2 = data[1]
      if (data.length > 2) this.article3 = data[2]
    },

    checkData(data) {
      if (data.title && data.url && data.image) return true
      if (!data.title && !data.url && !data.image) return false
      throw new Error('请填写文章全部信息')
    },
    async saveData() {
      try {
        const data = []
        if (this.checkData(this.article1)) data.push(this.article1)
        if (this.checkData(this.article2)) data.push(this.article2)
        if (this.checkData(this.article3)) data.push(this.article3)

        if (data.length <= 0) throw new Error('请填写文章内容')

        // 设置顺序
        const saveData=[]
        data.forEach((item, index) => {
          saveData.push({
            title: item.title,
            url: item.url,
            image: item.image,
            order: index
          })
        });
        await save(saveData)
        this.$message.success('保存成功')
      } catch (e) {
        this.$message.error(e.message || '未知错误');
      }
    }
  }
}
</script>
