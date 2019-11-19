/*
 * @Description: 对uni的api进行个性化封装
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-19 23:20:37
 * @LastEditTime: 2019-11-19 23:22:07
 * @LastEditors: Edmund
 */
'use strict'
const sysCall = {
  toast: (text, duration, success) => {
    uni.showToast({
      title: text,
      icon: success ? 'success' : 'none',
      duration: duration || 2000
    })
  }
}


export default sysCall