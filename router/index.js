/*
 * @Description: 路由阀
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-17 22:07:02
 * @LastEditTime: 2019-11-26 02:05:07
 * @LastEditors: Edmund
 */


import Vue from 'vue'
import Router from 'uni-simple-router'
import routes from './modules'

Vue.use(Router)

// 创建路由

const router = new Router({
    h5: {
        loading: true,
        resetStyle: () => {     //对样式进行追加
            return {
                style: `
				#router-loadding .loadding {
					background-color: #f00 !important;
					box-shadow: 0 0 15px #f00 !important;
				}
				`
            }
        }
    },
    routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
    console.log('从哪里来' + from.path)
    console.log('到哪里去:' + to.path)
    if (to.path === '/pages/user/center') {
        if (getApp().globalData.isLogin) {
            next()
        } else {
            next('/pages/user/login')
        }
    } else {
        next()
    }
})

export default router
