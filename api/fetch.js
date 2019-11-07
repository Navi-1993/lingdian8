'use strict'
/*
* @Description: http拦截器
* @Author: Edmund
* @Email: q1592193221@gmail.com
* @Date: 2019-11-07 14:09:54
 * @LastEditTime: 2019-11-07 14:56:09
 * @LastEditors: Edmund
* @FilePath: \lingdian8\api\fetch.js
*/
import axios from '../common/plugins/axios/index'

const service = axios()
console.log('123123')

/**
 * @Description: 全局 请求拦截器
 * @param {Object} config 发送请求的配置数据
 * @return: config 继续发送请求
 * @return: false 会停止发送请求，不会进入错误数据拦截，也不会进入请求对象中的catch函数中
 * @return: Promise.reject('xxxxx') 停止发送请求, 会错误数据拦截，也会进入catch函数中
 */
