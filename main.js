/*
 * @Description: app入口文件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-18 10:44:20
 * @LastEditTime: 2019-11-19 23:29:34
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

// 引入自定义的系统命令函数库（基于uni-app封装）

import sysCall from 'common/utils/sysCall.js'

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