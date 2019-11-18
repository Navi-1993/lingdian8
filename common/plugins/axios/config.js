/*
 * @Description: DIY http request config
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-07 14:44:56
 * @LastEditTime: 2019-11-18 14:54:31
 * @LastEditors: Edmund
 */

import Interceptor from "./core/interceptor"
import envConfig from '@/config.js'
import axios from "./index"
// 拿取token
const token = uni.getStorageSync('user').token
// 拿取系统信息
const systemInfo = uni.getSystemInfoSync()
export const globalInterceptor = {
  request: new Interceptor(),
  response: new Interceptor()
}

/**
 * @Description: 全局配置 (只能配置 静态数据)
 * @param {String} `baseURL` 请求的基准url
 * @param {String} `content-type` 默认为 application/json
 * @param {String}  `content-type`设置特殊参数 或 配置其他会导致触发 跨域 问题,出现跨域会直接进入响应拦截器的catch函数中
 */
export const config = {
  // baseURL: envConfig.dev.BASE_URL,
  baseURL: '',
  header: { // 设置请求头
    // 'X-Auth-Token': 'xxxx',
    // contentType: "application/x-www-form-urlencoded",
    'Content-Type': 'application/json',
    timeStamp: new Date() * 1,
    token: 1
  },
}

/**
 * @Description: 全局 请求拦截器
 * @param {Object} config 发送请求的配置数据
 * @return: config 继续发送请求
 * @return: false 停止发送请求，不进行错误数据拦截，不进入请求对象的catch函数
 * @return: Promise.reject('xxxxx') 停止发送请求, 进行错误数据拦截，进入catch函数中
 */
globalInterceptor.request.use(
  config => {
    // console.log('is global request interceptorA')
    return config
    // return false
    // return Promise.reject('is error')
  },
  err => {
    console.error("is global fail request interceptor: ", err)
    return false
  }
)

// 支持添加多个请求、响应拦截器
// globalInterceptor.request.use(config => {
//   console.log('is global request interceptor 2')
//   return config
// }, err => {
//   console.error('global request: ', err)
//   return false
// })

/**
 * @Description: 全局响应拦截器支持添加多个
 * @Description: 例如: 根据状态码选择性拦截、过滤转换数据
 * @param {Object} config 发送请求的配置数据
 * @param {Object} res 请求返回的数据
 * @param {Object} err 错误对象
 * @param {Boolean} false 停止返回数据，不拦截错误数据，不进入catch函数中
 * @return {Object|Boolean|Promise<reject>} 返回错误信息, 拦截错误数据，执行catch
 */
globalInterceptor.response.use(
  (res, config) => {
    // 回传数据中没有携带 code
    if (!(res.data && res.data.code)) {
      return res
    }

    // 用code模拟http状态码
    const code = parseInt(res.data.code)

    // 20x ~ 30x
    if (200 <= code && code < 400) {
      return res
    } else {
      return Promise.reject(res, config)
    }
    // return false
    // return Promise.reject('is error')
  },
  (err, config) => {
    console.error("is global response fail interceptor")
    console.error("err: ", err)
    console.error("config: ", config)

    return Promise.reject(err)
  }
)
