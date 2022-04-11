import qs from 'qs'
import store from '@/store'
import { uniRequest } from './uniUtils'

export const baseURL = 'https://mk.cakemao.cn/api/v1'

async function request(options) {
  const { url, data, method, header, params } = options
  const query = qs.stringify({ ...params }, { addQueryPrefix: true })
  try {
    const headers = {}
    const { accessToken } = store.getters
    if (accessToken) {
      headers['X-Api-Key'] = accessToken
    }

    const option = {
      url: baseURL + url + query,
      data,
      method: method.toUpperCase(),
      header: { ...header, ...headers }
    }
    const response = await uniRequest(option)
    const res = response.data
    if (response.statusCode === 200 && res.code === 200) {
      return res
    } else {
      uni.showToast({
        title: res.message,
        duration: 2000,
        icon: 'none'
      })
      if (res.code === 401) {
        store.dispatch('logout')
      }
      return Promise.reject(res)
    }
  } catch (error) {
    uni.showToast({
      title: error.message,
      duration: 2000,
      icon: 'none'
    })
    return Promise.reject(error)
  }
}

export default request
