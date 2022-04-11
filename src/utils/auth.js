import { setStorage, getStorage, clearStorage } from './storage'

const ACCESS_TOKEN = 'Access_Token'
const USER_INFO = 'User_Info'
const SYSTEM_INFO = 'System_Info'

// 设置Access_Token
export const setToken = data => setStorage(ACCESS_TOKEN, data)
export const getToken = () => getStorage(ACCESS_TOKEN)

// 设置用户信息
export const setUserInfo = data => setStorage(USER_INFO, data)
export const getUserInfo = () => getStorage(USER_INFO)

// 设置设备信息
export const setSystemInfo = data => setStorage(SYSTEM_INFO, data)
export const getSystemInfo = () => getStorage(SYSTEM_INFO)

export { clearStorage }
