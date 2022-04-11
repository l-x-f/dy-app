import request from '@/utils/request'

class HomeServe {
  // 获取banner列表
  getBannerList() {
    return request({
      url: '/banner/list',
      method: 'get'
    })
  }
}

export default new HomeServe()
