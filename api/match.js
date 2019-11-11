'use strict'
/*
 * @Description: 赛事 api
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-07 14:09:54
 * @LastEditTime: 2019-11-11 10:03:06
 * @LastEditors: Edmund
 */

import axios from '@/common/plugins/axios/index'
const fetch = axios()

/**
 * @Description: 常用api封装导出方式
 * @param {type}
 * @return:
 */
// export function test () {
//   return fetch.request({
//     url: '/sport/matchSourceName/queryByAddMatch',
//     method: 'get', // 或者post
//     // data: {}
//     param: {
//       sourceType: 0
//     },
//     header: { 'uid': 'ux' },
//     count: 0
//   })
// }

/**
 * @Description: 查询所有赛事类型专题项目
 * @param {number} limit
 * @param {number} offset
 * @return: res
 */
export function queryAllEvent (params) {
  return fetch.request({
    url: '/sport/matchSourceName/queryByAddMatch',
    method: 'post', // 或者post
    data: {
      limit: params.limit,
      offset: params.offset
    }
  })
}