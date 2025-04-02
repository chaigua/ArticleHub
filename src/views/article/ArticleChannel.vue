<script setup>
import { artDelChannelService, artGetChannelsServe } from '@/api/article'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const channelList = ref([])
const dialog = ref()
const loading = ref(false)
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsServe()
  channelList.value = res.data.data
  loading.value = false
}
const onEidt = (row) => {
  dialog.value.open(row)
}
const onDel = async (row) => {
  await ElMessageBox.confirm('你确认删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  })
  await artDelChannelService(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}
const onAdd = () => {
  dialog.value.open({})
}
getChannelList()

const onSuccess = () => {
  getChannelList()
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAdd" type="primary"> 添加分类 </el-button>
    </template>

    <el-table :data="channelList" v-loading="loading" width="100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button @click="onEidt(row)" type="primary" :icon="Edit" plain circle></el-button>
          <el-button @click="onDel(row)" type="danger" :icon="Delete" plain circle></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="内容为空" />
      </template>
    </el-table>
  </page-container>

  <ChannelEdit @success="onSuccess" ref="dialog"></ChannelEdit>
</template>
