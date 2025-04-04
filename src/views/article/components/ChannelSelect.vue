<script setup>
import { artGetChannelsServe } from '@/api/article'
import { ref } from 'vue'
const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsServe()
  channelList.value = res.data.data
}
getChannelList()

const model = defineModel()

defineProps({
  width: {
    type: String,
  },
})
</script>
<template>
  <el-select v-model="model" :style="{ width }">
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
