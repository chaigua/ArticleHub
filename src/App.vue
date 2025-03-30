<script setup>
import { useUserStore } from '@/stores'
const userStore = useUserStore()
</script>

<template>
  <div>{{ userStore.token }}</div>
  <el-button @click="userStore.getToken('bgc yyytoking')">登录</el-button>
  <el-button @click="userStore.removeToken">退出</el-button>
</template>

<style scoped></style>
