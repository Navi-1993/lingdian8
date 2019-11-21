'use strict'
/*
 * @Description: 赛事 api
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-07 14:09:54
 * @LastEditTime: 2019-11-21 17:14:09
 * @LastEditors: Edmund
 */

import axios from '@/common/plugins/axios/index'
// import { fetch } from './test'
const fetch = axios()

/**
 * @Description: 查询所有赛事类型专题项目
 * @param {number} limit 每页请求多少条数据，不填则全部获取
 * @param {number} offset 从第几页请求
 * @return: res
 */
export function queryAllEvent (data) {
  return fetch.request({
    url: '/app/match/queryAllEventList',
    method: 'post',
    data: data
  })
}

/**
 * @Description: 查询所有赛事
 * @param {String} id 项目ID
 * @param {Number} limit 每页请求多少条数据，不填则全部获取
 * @param {Number} offset 从第几页请求
 * @param {Number} type 赛事类型
 * @return: 
 */
export function queryAllMatchList (data) {
  return fetch.request({
    url: '/app/match/queryAllMatchList',
    method: 'post',
    data: data
  })
}

/**
 * @Description: 新增删除用户关注栏目
 * @param {Number} attentedId 关注id 在删除时提交
 * @param {Number} attentedType 关注类型 0项目 1专题 2赛事类型 3热门 4完结 5全部
 * @param {Number} controlType 操作类型 0新增 1删除
 * @param {Number} id 数据id
 * @return: 
 */
export function updateUserAttend (data) {
  return fetch.request({
    url: '/app/match/updateUserAttend',
    method: 'post',
    data: data
  })
}
