'use strict'
/*
 * @Description: home api
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-07 14:09:54
 * @LastEditTime: 2019-11-08 15:15:09
 * @LastEditors: Edmund
 */

import axios from '@/common/plugins/axios/index'
const fetch = axios()


/**
 * @Description: 测试用API eg1
 * @param {type} 
 * @return: 
 */

// export function test () {
//   return fetch.post('https://www.baidu.com', {
//     data: {
//     }
//   })
// }

/**
 * @Description: 常用api封装导出方式
 * @param {type} 
 * @return: 
 */
// http://192.168.199.238:8088/sport/matchSourceName/queryByAddMatch?sourceType=0
export function test () {
  return fetch.request({
    url: '/sport/matchSourceName/queryByAddMatch',
    method: 'get', // 或者get
    // data: {}
    param: {
      sourceType: 0
    },
    header: { 'uid': 'ux' },
    count: 0
  })
}