import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore(
  'userStore',
  () => {
    const token = ref('')
    const getToken = (newVaule) => {
      token.value = newVaule
    }
    const removeToken = () => {
      token.value = ''
    }
    return {
      token,
      getToken,
      removeToken,
    }
  },
  {
    persist: true,
  },
)
