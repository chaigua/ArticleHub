import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'
const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 100000,
})

//请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userStore = useUserStore()

    // if (!userStore.isAuthenticated) {
    //   return Promise.reject(new Error('未认证'))
    // }
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err),
)

//响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 3.摘取核心响应数据
    if (res.data.code === 0) {
      return res
    }
    // TODO 4. 处理业务失败
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // TODO 5. 处理401错误

    if (err.response.data.status === 401) {
      router.push('/login')
    }
    ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  },
)

export default instance
export { baseURL }
