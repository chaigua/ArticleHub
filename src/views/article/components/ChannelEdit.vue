<script setup>
import { artEditChannelService, artAddChannelService } from '@/api/article'
import { ref } from 'vue'
const centerDialogVisible = ref(false)
const formRef = ref()
const open = (row) => {
  centerDialogVisible.value = true
  formModel.value = { ...row }
}
defineExpose({
  open,
})
const emit = defineEmits(['success'])

const formModel = ref({
  cate_name: '',
  cate_alias: '',
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur',
    },
  ],
  cate_alias: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类名必须是1-15位的字母字符', trigger: 'blur' },
  ],
}

const onSubmit = async () => {
  await formRef.value.validate()
  formModel.value.id
    ? await artEditChannelService(formModel.value)
    : await artAddChannelService(formModel.value)
  ElMessage({
    type: 'success',
    message: formModel.value.id ? '编辑成功' : '添加成功',
  })
  centerDialogVisible.value = false
  emit('success')
}
</script>

<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="formModel.id ? `编辑` : `添加`"
    width="500"
    align-center
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 50px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name"> </el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias"> </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
