import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 发送验证码
export function sendCode(mobile) {
  return request({
    url: '/send/code',
    method: 'post',
    data: { mobile }
  })
}
