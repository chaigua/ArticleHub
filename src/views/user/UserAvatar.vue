<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { userChangeAvatarServe } from '@/api/user'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
// 头像 URL
const avatarUrl = ref(userStore.user.user_pic)

// 选中的文件
const selectedFile = ref(null)

// 文件输入框的引用
const fileInput = ref(null)

// 点击选择图片
const handleSelectImage = () => {
  fileInput.value.click()
}

// 文件选择变化事件
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    // 预览图片
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarUrl.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// 上传头像
const handleUploadAvatar = async () => {
  if (!selectedFile.value) {
    ElMessage.error('请先选择图片')
    return
  }

  await userChangeAvatarServe(avatarUrl.value)
  await userStore.getUser()
  ElMessage.success('头像上传成功')
  // 清空选择的文件
  selectedFile.value = null
  avatarUrl.value = ''
}
</script>

<template>
  <page-container title="修改头像">
    <div class="avatar-uploader-container">
      <!-- 头像显示区域 -->
      <div class="avatar-box" @click="handleSelectImage">
        <div v-if="!avatarUrl" class="avatar-placeholder">
          <el-icon size="40"><Plus /></el-icon>
          <p>点击选择头像</p>
        </div>
        <img v-else :src="avatarUrl" alt="头像" class="avatar-image" />
      </div>

      <!-- 按钮区域 -->
      <div class="button-group">
        <el-button type="primary" @click="handleSelectImage">选择图片</el-button>
        <el-button type="success" @click="handleUploadAvatar">上传头像</el-button>
      </div>

      <!-- 隐藏的文件输入框 -->
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden-input"
        @change="handleFileChange"
      />
    </div>
  </page-container>
</template>

<style scoped>
.avatar-uploader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 20px;
}

.avatar-box {
  width: 150px;
  height: 150px;
  border: 2px dashed #d9d9d9;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
}

.avatar-placeholder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #8c939d;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.button-group {
  display: flex;
  gap: 10px;
}

.hidden-input {
  display: none;
}
</style>
