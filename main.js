/*
 * @Description: app入口文件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 12:54:42
 * @LastEditTime: 2019-11-07 14:56:17
 * @LastEditors: Edmund
 */
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
// 引入可用于uni-app的axios插件
import axios from './common/plugins/request/index'

// 引入underScore工具函数库
import underscore from 'underscore'

Vue.prototype.$_ = underscore
Vue.prototype.$store = store
Vue.prototype.$http = axios()


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  router
})
app.$mount()