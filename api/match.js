'use strict'
/*
 * @Description: 赛事 api
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-07 14:09:54
 * @LastEditTime: 2019-11-11 11:30:49
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
 * @param {number} limit 每页请求多少条数据，不填则全部获取
 * @param {number} offset 从第几页请求
 * @return: res
 */
export function queryAllEvent ({
  limit,
  offset
}) {
  return fetch.request({
    url: '/app/match/queryAllEventList',
    method: 'post', // 或者post
    data: {
      limit: limit,
      offset: offset
    }
  })
}

/**
 * @Description: 请求赛事数据
 * @param {String} id 项目ID
 * @param {Number} limit 每页请求多少条数据，不填则全部获取
 * @param {Number} offset 从第几页请求
 * @param {Number} type 赛事类型
 * @return: 
 */
export function queryAllMatchList ({
  id,
  limit,
  offset,
  type
}) {
  return fetch.request({
    url: '/app/match/queryAllMatchList',
    method: 'post',
    data: {
      id: id,
      limit: limit,
      offset: offset,
      type: type
    }
  })
}