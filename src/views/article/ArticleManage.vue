<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetListService, artDelService } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleDrawer from './components/ArticleDrawer.vue'
const loading = ref(false)
const articleList = ref([])
const total = ref(0)
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: '',
})

const getartList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getartList()

const handleCurrentChange = (n) => {
  params.value.pagenum = n
  getartList()
}
const handleSizeChange = (n) => {
  params.value.pagenum = 1
  params.value.pageSize = n
  getartList()
}
const onSearch = () => {
  params.value.pagenum = 1
  getartList()
}
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getartList()
}

const articleDrawerRef = ref()
const onAddart = () => {
  articleDrawerRef.value.open({})
}

const onEidt = (row) => {
  articleDrawerRef.value.open(row)
}
const onDelete = async (row) => {
  await ElMessageBox.confirm('你确认删除该文章信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  })
  await artDelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getartList()
}
const onSuccess = (type) => {
  if (type === 'add') {
    params.value.pagenum = Math.ceil((total.value + 1) / params.value.pagesize)
  }
  getartList()
}
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button @click="onAddart" type="primary"> 发布文章 </el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分类:">
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">筛选</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="row">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="onEidt(row)" :icon="Edit" circle plain type="primary"></el-button>
          <el-button @click="onDelete(row)" :icon="Delete" circle plain type="danger"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 4, 5, 10]"
      :background="true"
      layout="jumper,total, sizes, prev, pager, next "
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; justify-self: flex-end"
    />

    <ArticleDrawer @success="onSuccess" ref="articleDrawerRef"></ArticleDrawer>
  </page-container>
</template>
<style lang="scss" scoped>
.el-select {
  width: 220px;
}
</style>
