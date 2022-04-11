/* eslint-disable no-async-promise-executor */
import store from '@/store'
// import { getProvider, promiseUnilogin } from './uniUtils'
import { loginState } from './state'

/**
 * 登录
 * @returns {Promise<any>}
 */
export default async function uniLogin(UserInfo) {
  const { loginStatus } = store.getters
  if (loginStatus === loginState.login) {
    const data = { status: 1, data: '已登录' }
    return data
  }
  try {
    // const provider = await getProvider()
    // const { code } = await promiseUnilogin(provider)
    const { rawData, signature, encryptedData, iv, code } = UserInfo
    const data = {
      iv,
      signature,
      encryptedData,
      rawData,
      code
    }
    uni.showLoading({ title: '登陆中' })
    const res = await store.dispatch('login', data)
    uni.hideLoading()
    uni.showToast({ title: '登陆成功', duration: 2000, icon: 'success' })
    return res
  } catch (error) {
    console.log('catch', error)
    return Promise.reject(error)
  }
}
