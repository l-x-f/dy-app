import { onLoad, onPageScroll, onUnload } from '@dcloudio/uni-app'
import { emitPageScrollEvent, offPageScrollEvent } from '@/utils/emitEvent'

/**
 * 监听页面滚动hooks
 * @param {*} callback
 */
export function usePageScroll(callback) {
  onLoad(() => {
    onPageScroll(data => {
      emitPageScrollEvent(data)
      callback && callback(data)
    })
  })
  onUnload(() => {
    offPageScrollEvent()
  })
}
