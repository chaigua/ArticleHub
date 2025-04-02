<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { userUpdatePasswordServe } from '@/api/user'
const pwdFormRef = ref(null)

// 表单数据
const pwdForm = reactive({
  old_pwd: '',
  new_pwd: '',
  re_pwd: '',
})

// 校验规则
const rules = reactive({
  // 原密码校验规则
  old_pwd: [
    { required: true, message: '原密码不能为空', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度必须在 6 到 15 个字符之间', trigger: 'blur' },
  ],
  // 新密码校验规则
  new_pwd: [
    { required: true, message: '新密码不能为空', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度必须在 6 到 15 个字符之间', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === pwdForm.old_pwd) {
          callback(new Error('新密码不能与原密码相同'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  // 确认密码校验规则
  re_pwd: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度必须在 6 到 15 个字符之间', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== pwdForm.new_pwd) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
})

const userStore = useUserStore()
const router = useRouter()
// 提交表单
const submitForm = async () => {
  try {
    // 等待表单验证完成
    await pwdFormRef.value.validate()
    // 等待密码修改完成
    await userUpdatePasswordServe(pwdForm)
    // 提示密码修改成功
    ElMessage.success('密码修改成功')
    // 清除用户认证信息
    userStore.getToken('')
    userStore.getUser({})
    // 跳转到登录页面
    router.push('/login')
  } catch (error) {
    console.error('Password update error:', error)
    ElMessage.error('密码修改失败，请重试')
  }
}
// 重置表单
const resetForm = () => {
  pwdFormRef.value.resetFields()
}
</script>
<template>
  <page-container title="修改密码">
    <div class="password-form-container">
      <el-form ref="pwdFormRef" :model="pwdForm" :rules="rules" label-width="100px" status-icon>
        <!-- 第一行：原密码 -->
        <el-form-item label="原密码" prop="old_pwd">
          <el-input
            v-model="pwdForm.old_pwd"
            type="password"
            placeholder="请输入原密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- 第二行：新密码 -->
        <el-form-item label="新密码" prop="new_pwd">
          <el-input
            v-model="pwdForm.new_pwd"
            type="password"
            placeholder="请输入新密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- 第三行：确认密码 -->
        <el-form-item label="确认密码" prop="re_pwd">
          <el-input
            v-model="pwdForm.re_pwd"
            type="password"
            placeholder="请再次输入新密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- 第四行：按钮 -->
        <el-form-item>
          <div class="button-group">
            <el-button type="primary" @click="submitForm">修改密码</el-button>
            <el-button @click="resetForm">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </page-container>
</template>

<style scoped>
.password-form-container {
  max-width: 500px;
  margin: 20px auto;
}

.button-group {
  display: flex;
  gap: 10px;
}
</style>
