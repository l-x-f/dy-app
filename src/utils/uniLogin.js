import { useUserStore } from '@/store'
import { getProvider, promiseUnilogin, wxGetUserProfile } from './uniUtils'

/**
 * 登录
 * @returns {Promise<any>}
 */
export default async function uniLogin() {
  const store = useUserStore()
  if (store.hasLogin) {
    const data = { status: 1, data: '已登录' }
    return data
  }
  try {
    const provider = await getProvider()
    const [{ code }, userProfile] = await Promise.all([
      promiseUnilogin(provider),
      wxGetUserProfile()
    ])
    const { rawData, signature, encryptedData, iv, userInfo } = userProfile
    const data = {
      iv,
      signature,
      encryptedData,
      rawData,
      code,
      userInfo
    }
    uni.showLoading({ title: '登陆中' })
    const res = await store.login(data)
    uni.hideLoading()
    uni.showToast({ title: '登陆成功', duration: 2000, icon: 'success' })
    return res
  } catch (error) {
    console.log('catch', error)
    return Promise.reject(error)
  }
}
