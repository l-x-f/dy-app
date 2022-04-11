// 设置本地存储
export const setStorage = (key, value) => {
  uni.setStorageSync(key, value)
  return value
}

// 获取本地存储
export const getStorage = key => {
  return uni.getStorageSync(key)
}
// 删除本地存储
export const removeStorage = key => {
  uni.removeStorageSync(key)
}

// 清除所有本地存储
export const clearStorage = () => uni.clearStorage()

const SceneKey = 'scene-key'

export const setScene = data => setStorage(SceneKey, data)
export const getScene = () => getStorage(SceneKey)
export const removeScene = () => removeStorage(SceneKey)
