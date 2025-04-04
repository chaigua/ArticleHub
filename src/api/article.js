import instance from '@/utils/request'
export const artGetChannelsServe = () => instance.get('/my/cate/list')

//添加文章分类
export const artAddChannelService = (data) => instance.post('/my/cate/add', data)
//编辑文章分类
export const artEditChannelService = (data) => instance.put('/my/cate/info', data)
//删除文章分类
export const artDelChannelService = (id) => instance.delete('/my/cate/del', { params: { id } })

export const artGetListService = (params) => instance.get('/my/article/list', { params })

export const artPublishService = (data) => instance.post('/my/article/add', data)

export const artGetDetailService = (id) => instance.get('my/article/info', { params: { id } })

export const artEditService = (data) => instance.put('my/article/info', data)

export const artDelService = (id) => instance.delete('my/article/info', { params: { id } })



