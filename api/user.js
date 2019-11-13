/*
 * @Description: 用户相关api
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-12 15:32:09
 * @LastEditTime: 2019-11-13 10:30:16
 * @LastEditors: Edmund
 */
'use strict'


import axios from '@/common/plugins/axios/index'
const fetch = axios()


/**
 * @Description: 发送短信
 * @param {string} 手机号码
 * @param {number} 短信类型 1=注册，2=重置密码
 * @return: void
 */
export function sendSMS ({
  phone,
  smsType
}) {
  return fetch.request({
    url: '/app/login/userAccount/sendSms',
    method: 'post',
    data: {
      phone: phone,
      smsType: smsType
    }
  })
}

/**
 * @Description: 注册
 * @param {string} code 短信验证码
 * @param {string} password 密码
 * @param {string} phone 手机
 * @param {number} smsType 短信类型 1=注册，2=重置密码
 * @return: void
 */
export function register ({
  code,
  password,
  phone,
  smsType
}) {
  return fetch.request({
    url: '/app/login/userAccount/regist',
    method: 'post',
    data: {
      code: code,
      password: password,
      phone: phone,
      smsType: smsType
    }
  })
}

/**
 * @Description: 登录
 * @param {string} clientId 客户端版本
 * @param {string} deviceType 系统类型
 * @param {string} password 密码
 * @param {string} phone 手机
 * @param {string} registeIp 注册ip
 * @return: void
 */
export function login ({
  clientId,
  deviceType,
  password,
  phone,
  registeIp
}) {
  return fetch.request({
    url: '/app/login/userAccount/login',
    method: 'post',
    data: {
      clientId: clientId,
      deviceType: deviceType,
      password: password,
      phone: phone,
      registeIp: registeIp
    }
  })
}


/**
 * @Description: 重置密码
 * @param {string} code 客户端版本
 * @param {string} confirmPwd 系统类型
 * @param {string} password 密码
 * @param {string} phone 手机
 * @param {string} smsType 注册ip
 * @return: void
 */
export function resetPsw ({
  code,
  confirmPwd,
  password,
  phone,
  smsType
}) {
  return fetch.request({
    url: '/app/login/userAccount/retrieve',
    method: 'post',
    data: {
      code: code,
      confirmPwd: confirmPwd,
      password: password,
      phone: phone,
      smsType: smsType
    }
  })
}