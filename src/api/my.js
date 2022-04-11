import request from '@/utils/request'

class MyServe {
  // 获取列表
  getList(data) {
    return request({
      url: '/',
      method: 'get',
      data
    })
  }
}

export default new MyServe()
