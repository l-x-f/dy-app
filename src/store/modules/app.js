import { defineStore } from 'pinia'
import {
  setSystemInfo as setSystemInfoStore,
  getSystemInfo
} from '@/utils/auth'

const useAppStore = defineStore('app', {
  state: () => ({
    systemInfo: getSystemInfo() || {}
  }),
  actions: {
    // 设置系统信息
    setSystemInfo(systemInfo) {
      setSystemInfoStore(systemInfo)
      this.$patch({ systemInfo })
    }
  }
})

export { useAppStore }
