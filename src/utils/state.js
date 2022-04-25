// scope 列表
export const scope = {
  userInfo: 'scope.userInfo', // uni.getUserInfo	用户信息
  userLocation: 'scope.userLocation', //	uni.getLocation, uni.chooseLocation	地理位置
  userLocationBackground: 'scope.userLocationBackground', //	wx.userLocationBackground	后台定位	微信小程序
  address: 'scope.address', //	uni.chooseAddress	通信地址
  record: 'scope.record', //	uni.getRecorderManager	录音功能
  writePhotosAlbum: 'scope.writePhotosAlbum', //	uni.saveImageToPhotosAlbum, uni.saveVideoToPhotosAlbum保存到相册头条小程序的返回值是scope.album
  camera: 'scope.camera', //	<camera /> 组件，头条下的扫码、拍照、选择相册	摄像头
  invoice: 'scope.invoice', //	wx.chooseInvoice	获取发票	微信小程序、QQ小程序
  invoiceTitle: 'scope.invoiceTitle', //	uni.chooseInvoiceTitle	发票抬头	微信小程序、百度小程序、QQ小程序
  werun: 'scope.werun' //	wx.getWeRunData 微信运动步数
}

// 登陆状态
export const loginState = {
  login: '1', // 已登录
  logout: '0' // 已退出登陆
}
