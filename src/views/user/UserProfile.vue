<script setup>
import { ref, reactive } from 'vue'
import { userUpdateService } from '@/api/user'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const userFormRef = ref(null)
const {
  user: { username, nickname, id, email },
  getUser,
} = userStore
const userForm = ref({
  username: username,
  nickname: nickname,
  id: id,
  email: email,
})

// 表单校验规则
const rules = reactive({
  // 昵称校验规则
  nickname: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    { min: 2, max: 10, message: '昵称长度必须在 2 到 10 个字符之间', trigger: 'blur' },
  ],
  // 邮箱校验规则
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change'],
    },
  ],
})

// 提交表单
const submitForm = async () => {
  await userFormRef.value.validate()
  //发送请求
  await userUpdateService(userForm.value)
  await getUser()
  // 提交成功后，提示用户
  ElMessage.success('修改成功')
}
</script>

<template>
  <page-container title="基本资料"
    ><div class="user-form-container">
      <el-form ref="userFormRef" :model="userForm" :rules="rules" label-width="100px" status-icon>
        <!-- 第一行：登录名称，禁用状态 -->
        <el-form-item label="登录名称" prop="username">
          <el-input v-model="userForm.username" :disabled="true" placeholder="登录名称"></el-input>
        </el-form-item>

        <!-- 第二行：用户昵称，可输入 -->
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="userForm.nickname" placeholder="请输入用户昵称"></el-input>
        </el-form-item>

        <!-- 第三行：用户邮箱，可输入 -->
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="userForm.email" placeholder="请输入用户邮箱"></el-input>
        </el-form-item>

        <!-- 第四行：按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交修改</el-button>
        </el-form-item>
      </el-form>
    </div></page-container
  >
</template>

<style scoped>
.user-form-container {
  max-width: 500px;
  margin: 20px auto;
}
</style>
