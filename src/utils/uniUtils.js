/* eslint-disable no-async-promise-executor */
import { pages, globalStyle } from '../pages.json'
import { scope } from './state'
import permision from './permission'
import download from './download'

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
export const getProvider = (service = 'oauth') => {
  return new Promise((resolve, reject) => {
    uni.getProvider({
      service,
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
        const { authResult, code } = res
        resolve({ authResult, code })
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
export const getUserInfo = (provider = 'weixin') => {
  return new Promise((resolve, reject) => {
    uni.getUserInfo({
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
export function saveImage(filePath) {
  return new Promise((resolve, reject) => {
    // #ifndef H5
    uni.saveImageToPhotosAlbum({
      filePath, //
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
    // #endif

    // #ifdef H5
    download(filePath, 'post.png')
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    // #endif
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
 * 扫码接口Promise化
 * @returns
 */
const scanPromise = () => {
  return new Promise((resolve, reject) => {
    uni.scanCode({
      success: res => {
        resolve(res.result)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

/**
 * 检查权限
 *
 */
// #ifdef APP-PLUS
const checkPermission = async () => {
  let status = permision.isIOS
    ? await permision.requestIOS('camera')
    : await permision.requestAndroid('android.permission.CAMERA')
  if (status === null || status === 1) {
    status = 1
  } else {
    uni.showModal({
      content: '需要相机权限',
      confirmText: '设置',
      success: function (res) {
        if (res.confirm) {
          permision.gotoAppSetting()
        }
      }
    })
  }
  return status
}
// #endif

/**
 * 扫码
 */
export const scanCode = async () => {
  // #ifdef APP-PLUS
  const status = await checkPermission()
  if (status !== 1) {
    return
  }
  // #endif
  const res = await scanPromise()
  return res
}

function getCurrPage() {
  try {
    let pages = getCurrentPages()
    if (pages.length) {
      return pages[pages.length - 1]
    }
  } catch (e) {}
  return undefined
}

/**
 * 获取当前页面标题
 * @returns
 */
export function getNavigationBarTitle() {
  var page = getCurrPage()
  if (page) {
    const data = pages.find(item => item.path === page.route)
    return (
      data.style?.navigationBarTitleText || globalStyle.navigationBarTitleText
    )
  }
}

/**
 * 选择图片
 * @param {*} options
 * @returns
 */
export const chooseImage = async (
  options = {
    count: 9
  }
) => {
  const params = {
    count: options?.count || 9,
    sizeType: options?.sizeType || ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: options?.sourceType || ['album', 'camera '] // 从相册选择
  }
  const data = await uni.chooseImage({ ...params })
  return data
}

/**
 * 选择视频
 * @param {*} options
 * @returns
 */
export const chooseVideo = async (options = {}) => {
  const params = {
    compressed: true, // 压缩
    sourceType: options?.sourceType || ['album', 'camera '] // 从相册选择
  }
  const data = await uni.chooseVideo({ ...params })
  return data
}
/**
 * 获取元素节点位置大小信息
 * @param {*} options
 * @returns
 */
export const getBoundingClientRect = select => {
  return new Promise(resolve => {
    const query = uni.createSelectorQuery()
    query
      .select(select)
      .boundingClientRect(position => {
        resolve(position)
      })
      .exec()
  })
}
