/*
 * @Description: 视频接口模块
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-22 14:09:09
 * @LastEditTime: 2019-11-22 16:08:35
 * @LastEditors: Edmund
 */

'use strict'
import axios from '@/common/plugins/axios/index'
const fetch = axios()


/**
 * @Description: 查询视频标题列表
 * @param {String} id 对应的专题/赛事类型/项目id
 * @param {Number} limit 条数
 * @param {Number} offset 页码
 * @param {Number} type 查询所属类型 0项目 1专题 2赛事类型 3热门 4完结 5全部
 */
export const queryVideoTitle = function (data) {
  return fetch.request({
    url: '/app/match/Live/queryLiveTitle',
    method: 'post',
    data: data
  })
}

/**
 * @Description: 更新视频点赞
 * @param {Number} liveCommentType
 * @param {Number} liveId
 * @return: 
 */

export const updateLivelike = function (data) {
  return fetch.request({
    url: '/app/match/Live/updateLivelike',
    method: 'post',
    data: data
  })
}


/**
 * @Description: 查询视频内容
 * @param {String} liveId 视频id
 */
export const queryLiveContent = function (params) {
  return fetch.request({
    url: '/app/match/Live/updateLivelike',
    method: 'get',
    params: params
  })
}