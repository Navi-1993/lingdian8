/*
 * @Description: 对uni的api进行个性化封装
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-19 23:20:37
 * @LastEditTime: 2019-11-20 11:21:06
 * @LastEditors: Edmund
 */
'use strict'
import moment from 'moment'
const sysCall = {
  context: function () {
    console.log('this as sysCall itSelf', this)
  },
  // toast提示
  toast: function (text, duration, success) {
    uni.showToast({
      title: text,
      icon: success ? 'success' : 'none',
      duration: duration || 2000
    })
    setTimeout(function () {
      uni.hideToast()
    }, duration || 2000)
  },
  constNum: function () {
    const res = uni.getSystemInfoSync();
    return res.platform.toLocaleLowerCase() === "android" ? 300 : 0;
  },
  // 设备可用窗口高度
  // 屏幕高度=状态栏高度+原生导航栏高度+可使用窗口高度+原生tabbar高度
  windowHeight () {
    const res = uni.getSystemInfoSync()
    return res.windowHeight
  },
  // 设备可用窗口宽度
  windowWidth () {
    const res = uni.getSystemInfoSync()
    return res.windowWidth
  },
  // 获取系统版本
  getSystem () {
    const res = uni.getSystemInfoSync()
    return res.system
  },
  // sert
  setToken (token) {
    uni.setStorageSync("token", token)
  },
  getToken () {
    return uni.getStorageSync("token")
  },
  isLogin () {
    return uni.getStorageSync("token") ? true : false
  },
  /**
   * @Description: 滚动屏幕到某个位置
   */
  pageScroll (scrollTop = 0, duration = 300) {
    uni.pageScrollTo({
      scrollTop: scrollTop,
      duration: duration
    })
  },

  /**
   * @Description: 基础请求封装
   */
  request: function (url, postData, method, type, hideLoading) {
    //接口请求
    if (!hideLoading) {
      uni.showLoading({
        mask: true,
        title: '请稍候...'
      })
    }
    return new Promise((resolve, reject) => {
      uni.request({
        url: this.interfaceUrl() + url,
        data: postData,
        header: {
          'content-type': type ? 'application/x-www-form-urlencoded' : 'application/json',
          'authorization': this.getToken(),
          'security': 1
        },
        method: method.toLocaleUpperCase, //'GET','POST'
        dataType: 'json',
        success: (res) => {
          !hideLoading && uni.hideLoading()
          resolve(res.data)
        },
        fail: (res) => {
          if (!hideLoading) {
            this.toast("网络不给力，请稍后再试~")
          }
          reject(res)
        }
      })
    })
  },
  naviBack (step, duration) {
    return uni.navigateBack({
      delta: step,
      animationType: 'slide-out-left',
      animationDuration: duration || 300
    })
  },
  /**
   * 从这里开始为moment.js的封装----------------------------------------------------------------------------------------------------------------------------------------------------------
   */

  /**
 * @Description: 返回当前时分秒
 */
  getHMS () {
    return moment().format('H:mm:ss')
  },
}


export default sysCall