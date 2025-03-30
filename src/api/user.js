import instance from '@/utils/request'
export const userRegisterServe = ({ username, password, repassword }) => {
  return instance.post('/api/reg', { username, password, repassword })
}

export const userLoginServe = ({ username, password }) => {
  return instance.post('/api/login', { username, password })
}

export const userGetInfoServe = () => instance.get('/my/userinfo')
