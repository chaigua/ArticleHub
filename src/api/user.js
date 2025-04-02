import instance from '@/utils/request'
export const userRegisterServe = ({ username, password, repassword }) => {
  return instance.post('/api/reg', { username, password, repassword })
}

export const userLoginServe = ({ username, password }) => {
  return instance.post('/api/login', { username, password })
}
export const userUpdateService = ({ id, nickname, email }) =>
  instance.put('/my/userinfo', { id, nickname, email })

export const userGetInfoServe = () => instance.get('/my/userinfo')

export const userChangeAvatarServe = (avatar) => instance.patch('/my/update/avatar', { avatar })

export const userUpdatePasswordServe = ({ old_pwd, new_pwd, re_pwd }) =>
  instance.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
