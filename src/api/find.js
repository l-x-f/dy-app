import request from '@/utils/request'

class FindServe {
  // 获取banner列表
  getBannerList() {
    return request({
      url: '/banner/list',
      method: 'get'
    })
  }
}

export default new FindServe()
