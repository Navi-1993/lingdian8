/*
 * @Description: app入口文件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-18 10:44:20
 * @LastEditTime: 2019-11-23 22:38:34
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

// H5版客户端配置
// #ifdef H5
RouterMount(app, '#app')
// #endif


//兼容小程序及app端
// #ifdef APP-PLUS || MP
app.$mount()
// #endif