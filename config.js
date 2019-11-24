/*
 * @Description: 环境配置
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-12 15:21:49
 * @LastEditTime: 2019-11-24 11:31:38
 * @LastEditors: Edmund
 */

const dev = {
  // BASE_URL: 'http://192.168.199.245:8088/', // LEO
  // BASE_URL: 'http://192.168.199.237:8088/', //
  BASE_URL: 'http://47.112.131.52:8090/', // 外网
  MODE: 'dev'
}

// pre
const pre = {
  // BASE_URL: 'http://120.76.155.133:12010/',
  MODE: 'pre'

}

//prod
const prod = {
  // BASE_URL: 'http://192.168.9.138:8090/',
  MODE: 'prod'
}

module.exports = {
  dev,
  pre,
  prod
}