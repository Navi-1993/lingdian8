/*
 * @Description: 路由阀
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-17 22:07:02
 * @LastEditTime: 2019-11-21 00:41:40
 * @LastEditors: Edmund
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
