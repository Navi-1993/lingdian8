/*
 * @Description: 局部拦截器
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-13 21:31:26
 * @LastEditTime: 2019-11-13 21:48:53
 * @LastEditors: Edmund
 */

import axios from 'common/plugins/axios/index.js';

export default {
    // get 请求, 200 响应码
    fetch () {
        let r = axios()
        let reqId = r.interceptors.scoped.request.use(config => {
            console.log('is scoped request')
            return config
        }, err => {
            console.error('scoped request: ', err)
            return false
        })
        let repId = r.interceptors.scoped.response.use((res, config) => {
            return res
        }, err => {
            console.error('scoped response: ', err)
            return Promise.reject(err)
        })
        // 卸载 私有 请求 拦截器
        // instance.interceptors.scoped.request.eject(reqId)
        let instance = r.request({
            url: 'http://baidu.com/',
            method: 'post',
            header: {
                ContentType: "application/json"
            },
            params: {},
            data: {}
        })
        // 超时1500ms就中断请求
        setTimeout(() => {
            r.abort(instance)
        }, 1500)
        return instance
    }
}