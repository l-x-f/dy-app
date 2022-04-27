const key = 'pageScroll'

/**
 * 监听页面滚动
 * @param {*} callback
 */
export function onPageScrollEvent(callback) {
  uni.$on(key, callback)
}

/**
 * 分发页面滚动
 * @param {*} data
 */
export function emitPageScrollEvent(data) {
  uni.$emit(key, data)
}
