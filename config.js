/*
 * @Description: 环境配置
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-12 15:21:49
 * @LastEditTime: 2019-11-13 14:11:33
 * @LastEditors: Edmund
 */

const dev = {
  BASE_URL: 'http://192.168.199.245:8088/',
  // EMB_URL: 'http://120.76.155.133:12010/', // 外网
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