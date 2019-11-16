/*
 * @Description: user路由
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-12 19:54:12
 * @LastEditTime: 2019-11-16 20:04:59
 * @LastEditors: Edmund
 */

const user = [
    {
        path: '/pages/user/login',
        name: 'user',
        meta: {
            title: '登陆'
        }
    },
    {
        path: '/pages/user/drag',
        name: 'drag',
        meta: {
            title: '拖拽测试'
        }
    },
    {
        path: '/pages/user/register',
        name: 'register',
        meta: {
            title: '注册'
        }
    },
    {
        path: '/pages/user/reset-psw',
        name: 'reset-psw',
        meta: {
            title: '重置密码'
        }
    },

]

export default user