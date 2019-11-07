/*
 * @Description: 路由阀
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 12:57:53
 * @LastEditTime: 2019-11-07 15:45:03
 * @LastEditors: Edmund
 * @FilePath: \lingdian8\router\index.js
 */


import Vue from 'vue'
import Router from 'uni-simple-router'
import routes from './modules'

Vue.use(Router)

// 创建路由

const router = new Router({
    routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
    console.log('从哪里来' + from.name)
    console.log('到哪里去:' + to.name)
    next()
})

export default router
