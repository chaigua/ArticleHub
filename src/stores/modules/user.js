import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoServe } from '@/api/user'
import { computed } from 'vue'
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
    const isAuthenticated = computed(() => !!token.value)

    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoServe()
      user.value = res.data.data
    }
    const setUser = (obj) => {
      user.value = obj
    }
    return {
      token,
      getToken,
      removeToken,
      user,
      getUser,
      setUser,
      isAuthenticated,
    }
  },
  {
    persist: true,
  },
)
