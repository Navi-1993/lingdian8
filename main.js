/*
 * @Description: app入口文件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 12:54:42
 * @LastEditTime: 2019-11-16 18:31:51
 * @LastEditors: Edmund
 * @FilePath: \lingdian8\main.js
 */

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

// 引入封装好的可用于uni-app的axios插件
import axios from '@/common/plugins/axios/index'

// 引入underScore工具函数库
import underscore from 'underscore'


Vue.prototype.$_ = underscore
Vue.prototype.$store = store
Vue.prototype.$axios = axios()


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  router
})
app.$mount()