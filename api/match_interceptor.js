/*
 * @Description: match API 模块 私有拦截器
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-13 11:11:54
 * @LastEditTime: 2019-11-13 12:01:31
 * @LastEditors: Edmund
 */
'user strict'
import axios from '../plugins/request/js/index'
import fetchConfig from 'api/fetch.config.json'

const fetch = axios.request()

let reqId = fetch.interceptors.scoped.request.use(config => {
    console.log('is scoped request')

    return config;
    // return false;
    // return Promise.reject('xxx')
}, err => {
    console.error('scoped request: ', err)

    // return Promise.reject(err)
    return false;
});

let repId = fetch.interceptors.scoped.response.use((res, config) => {
    console.log('is scoped response')

    return res;
    // return false;
    // return Promise.reject('xxx')
}, err => {
    console.error('scoped response: ', err)

    return Promise.reject(err)
}
}


