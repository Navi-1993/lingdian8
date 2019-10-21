/*
 * @Description: 导出vuex实例
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 12:56:07
 * @LastEditTime: 2019-10-21 13:01:50
 * @LastEditors: Edmund
 */
import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules
})