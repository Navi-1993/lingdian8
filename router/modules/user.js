/*
 * @Description: user路由
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-12 19:54:12
 * @LastEditTime: 2019-11-26 10:04:05
 * @LastEditors: Edmund
 */

const user = [
    {
        path: '/pages/user/login',
        name: 'user-login',
        meta: {
            title: '登陆'
        }
    },
    {
        path: '/pages/user/register',
        name: 'user-register',
        meta: {
            title: '注册'
        }
    },
    {
        path: '/pages/user/reset-psw',
        name: 'user-reset-psw',
        meta: {
            title: '重置密码'
        }
    },
    {
        path: '/pages/user/center',
        name: 'user-center',
        meta: {
            title: '个人中心'
        }
    },
    {
        path: '/pages/user/information',
        name: 'user-information',
        meta: {
            title: '修改个人信息'
        }
    },
    {
        path: '/pages/user/options',
        name: 'user-options',
        meta: {
            title: '设置'
        }
    },

]

export default user