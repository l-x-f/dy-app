/* eslint-disable no-async-promise-executor */
import { scope } from './state'
// 请求
export const uniRequest = options => {
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

// 获取服务供应商
export const getProvider = () => {
  return new Promise((resolve, reject) => {
    uni.getProvider({
      service: 'oauth',
      success({ provider }) {
        const data = provider.toString()
        resolve(data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

// 登陆 promise
export const promiseUnilogin = (provider = 'weixin') => {
  return new Promise((resolve, reject) => {
    uni.login({
      provider,
      success(res) {
        resolve(res.code)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export function wxGetUserProfile() {
  return new Promise((resolve, reject) => {
    uni.getUserProfile({
      lang: 'zh_CN',
      desc: '用户登录',
      success: res => {
        resolve(res)
      },
      // 失败回调
      fail: err => {
        reject(err)
      }
    })
  })
}

// 获取用户信息
export const getUserInfo = provider => {
  return new Promise((resolve, reject) => {
    uni.getUserProfile({
      provider,
      lang: 'zh_CN',
      desc: '用于支付和订单',
      success(res) {
        resolve(res)
      },
      fail(err) {
        uni.showModal({
          title: '重新授权',
          content:
            '需要获取您的公开信息（昵称、头像等）\r\n请允许使用"用户信息"权限',
          success(res) {
            if (res.confirm) {
              uni.openSetting({
                success(res) {
                  if (res.authSetting[scope.userInfo]) {
                    uni.showToast({
                      title: '请重新登陆',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                }
              })
            }
          }
        })
        reject(err)
      }
    })
  })
}

// 检查登录状态是否过期
export const uniCheckSession = () => {
  return new Promise((resolve, reject) => {
    uni.checkSession({
      // 未过期
      success(res) {
        reject(res)
      },
      // 已过期，需要重新登录`
      fail(err) {
        resolve(err)
      }
    })
  })
}

// 获取用户的当前设置。
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

// 获取系统信息。
export const getSystemInfo = () => {
  return uni.getSystemInfoSync()
}

// 获取网络类型。
export const getNetworkType = () => {
  return new Promise((resolve, reject) => {
    uni.getNetworkType({
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

// 小程序更新
export const updateManager = () => {
  const updateManager = uni.getUpdateManager()
  updateManager.onCheckForUpdate(res => {
    if (res.hasUpdate) {
      // 下载完成，会进行回调
      updateManager.onUpdateReady(() => {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              updateManager.applyUpdate()
            }
          }
        })
      })
      // 新的版本下载失败
      updateManager.onUpdateFailed(() => {
        uni.showModal({
          title: '已经有新版本了',
          content: '新版本已经上线，请您删除当前小程序，重新搜索打开'
        })
      })
    }
  })
}

/**
 * 下载临时图片
 * @param filePath
 * @returns {Promise<any>}
 */
export function wechatSaveImage(filePath) {
  return new Promise((resolve, reject) => {
    uni.saveImageToPhotosAlbum({
      filePath, //
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

/**
 * 支付
 * @param data
 * @returns {Promise<any>}
 */
export function wechatPay(data) {
  const { timeStamp, nonceStr, signType, paySign } = data
  return new Promise((resolve, reject) => {
    console.log(data, 'wechatPay-data')
    uni.requestPayment({
      provider: 'wxpay',
      timeStamp: timeStamp || data.timestamp,
      nonceStr: nonceStr,
      package: data.package || data.tPackage,
      signType: signType,
      paySign: paySign,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

/**
 * 图片上传
 * @param data
 * @returns {Promise<any>}
 */
export function wechatUploadFile(data) {
  const { url, filePath, fileName, header } = data
  console.log(data, 'wechatUploadFile')
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: url,
      filePath: filePath,
      name: fileName,
      header: {
        'Content-Type': 'multipart/form-data',
        ...header
      },
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

/**
 * 订阅消息
 * @returns
 */
export function subscribeMessage() {
  return new Promise((resolve, reject) => {
    uni.requestSubscribeMessage({
      tmplIds: [
        'Plc91ieEGSABFRcIfOjGZHzWvUke2NRpQDnZ9kZhVUg',
        '0m0DH0UbTghZHtyOcdlXFU9UGg0h_AbA_Xu9LPdYZX4'
      ],
      success: res => {
        resolve(res)
      },
      fail: err => {
        console.log(err)
        reject('err')
      }
    })
  })
}
