import { defineStore } from 'pinia'
import {
  getToken,
  getUserInfo,
  setToken,
  setUserInfo,
  clearStorage
} from '@/utils/auth'

const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: getUserInfo() || {},
    accessToken: getToken()
  }),
  getters: {
    hasLogin: state => !!state.accessToken
  },
  actions: {
    // 登陆
    async login(data) {
      try {
        // const { data } = await login(loginForm)
        setToken(data.access_token)
        setUserInfo(data.userInfo)
        this.$patch({
          userInfo: data.userInfo,
          accessToken: data.access_token
        })
        return { ...data }
      } catch (error) {
        console.log(error)
        throw new Error(error)
      }
    },
    // 退出登陆
    async logout() {
      try {
        this.$patch({ userInfo: {}, accessToken: '' })
        clearStorage()
        uni.reLaunch({ url: '/pages/login/index' })
        return
      } catch (error) {
        throw new Error(error)
      }
    }
  }
})

export { useUserStore }
