/*
 * @Description: app入口文件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-18 10:44:20
 * @LastEditTime: 2019-11-19 16:33:25
 * @LastEditors: Edmund
 */


import Vue from 'vue'
import App from './App'
import store from './store'
// 引入配置好的路由模块
import router from './router'
import { RouterMount } from 'uni-simple-router'

// 引入封装好的可用于uni-app的axios插件
import axios from '@/common/plugins/axios/index'

// 引入underScore工具函数库
import underscore from 'underscore'

// 使用uni的api 自定义便捷性操作对象
const sysCall = {
  toast: (text, duration, success) => {
    uni.showToast({
      title: text,
      icon: success ? 'success' : 'none',
      duration: duration || 2000
    })
  }
}

Vue.prototype.$_ = underscore
Vue.prototype.$store = store
Vue.prototype.$axios = axios()
Vue.prototype.$sysCall = sysCall



Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  router
})
// #ifdef H5
RouterMount(app, '#app')
// #endif

// #ifndef H5
app.$mount() //为了兼容小程序及app端必须这样写才有效果
// #endif