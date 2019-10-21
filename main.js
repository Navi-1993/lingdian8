/*
 * @Description: app入口文件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 12:54:42
 * @LastEditTime: 2019-10-21 13:51:16
 * @LastEditors: Edmund
 */
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

// 引入underScore工具函数库
import underscore from 'underscore'

Vue.prototype._ = underscore
Vue.prototype.$store = store


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  router
})
app.$mount()