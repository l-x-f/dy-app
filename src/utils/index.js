/* eslint-disable @typescript-eslint/no-this-alias */
import accounting from 'accounting'
import dayjs from 'dayjs'

/**
 * 格式化金钱 $12,345,678.00
 * @param {*} val
 * @returns
 */
export function parseMoney(val) {
  if (!val) return ''
  return accounting.formatMoney(val, '￥')
}

/**
 * 格式化时间  YYYY/MM/DD HH:mm:ss
 * @param {*} val
 * @param {*} format
 * @returns
 */
export function parseDate(val, format = 'YYYY-MM-DD HH:mm') {
  if (!val) return ''
  const now = new Date(val)
  return dayjs(now).format(format)
}

/**
 * 深克隆
 * @param {*} obj
 * @returns
 */
export const deepClone = obj => {
  if (obj === null) return null
  let clone = Object.assign({}, obj)
  Object.keys(clone).forEach(
    key =>
      (clone[key] =
        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  )
  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
    ? Array.from(obj)
    : clone
}

/**
 * 节流
 * @param {*} fn
 * @param {*} wait
 * @returns
 */
export const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime
  return function () {
    const context = this,
      args = arguments
    if (!inThrottle) {
      fn.apply(context, args)
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFn)
      lastFn = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args)
          lastTime = Date.now()
        }
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
  }
}

/**
 * 防抖
 * @param {*} fn
 * @param {*} ms
 * @returns
 */
export const debounce = (fn, ms = 0) => {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

/**
 * 格式秒为标准显示时间
 * @param {*} second
 * @returns
 */
export const transformTime = (second = 0) => {
  if (isNaN(parseInt(second))) return
  second = parseInt(second)
  let s, minute, hour, day
  if (second < 60) {
    // 秒
    s = second
  } else if (second < 3600) {
    // 分
    minute = parseInt(second / 60)
    s = second % 60
  } else if (second < 86400) {
    // 时
    hour = parseInt(second / 3600)
    minute = parseInt((second % 3600) / 60)
    s = second % 60
  } else if (second < 31536000) {
    // 天
    day = parseInt(second / 86400)
    hour = parseInt((second % 86400) / 3600)
    minute = parseInt(((second % 86400) % 3600) / 60)
    s = second % 60
  }
  const resDay = day ? `${day >= 10 ? day + '天 ' : '0' + day + '天 '}` : ''
  const resHour = hour ? `${hour >= 10 ? hour + ':' : '0' + hour + ':'}` : '00:'
  const resMinute = minute
    ? `${minute >= 10 ? minute + ':' : '0' + minute + ':'}`
    : '00:'
  const resS = s ? `${s >= 10 ? s : '0' + s}` : '00'

  const res = resDay + resHour + resMinute + resS

  return res
}

/**
 * 休眠
 * @param {*} ms
 * @returns
 */
export function sleep(ms = 1500) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 判断手机号
 * @param {*} phone
 * @returns
 */
export const isPhone = phone => {
  const reg =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  return reg.test(phone)
}

/**
 * 判断是否是web
 */
export const isWep = typeof globalThis && globalThis === window
