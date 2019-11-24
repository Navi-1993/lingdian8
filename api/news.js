'use strict'
/*
 * @Description: 新闻模块接口
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-24 12:43:17
 * @LastEditTime: 2019-11-24 14:54:19
 * @LastEditors: Edmund
 */
import axios from '@/common/plugins/axios/index'
const fetch = axios()

/**
 * @Description: 查询新闻标题列表
 * @param {String} id 对应的专题/赛事类型/项目id
 * @param {Number} limit 条数
 * @param {Number} offset 页码
 * @param {Number} type 查询所属类型 0项目 1专题 2赛事类型 3热门 4完结 5全部
 */

export const queryNewsTitle = function (data) {
  return fetch.request({
    url: '/app/match/news/queryNewsTitle',
    method: 'post',
    data: data
  })
}

/**
 * @Description: 更新新闻点赞
 * @param {Number} newsCommentType 操作类型 0 点赞 1 取消
 * @param {Number} newsId 新闻id
 */

export const updateNewslike = function (data) {
  return fetch.request({
    url: '/app/match/news/updateNewslike',
    method: 'post',
    data: data
  })
}

/**
 * @Description: 查询新闻内容
 */

export const queryNewsContent = function (params) {
  return fetch.request({
    url: '/app/match/news/queryNewsContent',
    method: 'get',
    params: {
      newsId: params
    }
  })
}