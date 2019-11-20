/*
 * @Description: 首页模块路由
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-18 22:07:02
 * @LastEditTime: 2019-11-21 00:43:23
 * @LastEditors: Edmund
 */

let home = [
    {
        path: '/pages/home/index',
        name: 'home-index'
    },
    {
        path: '/pages/home/drag',
        name: 'home-drag',
        meta: {
            title: '拖拽测试'
        }
    },
    {
        path: '/pages/home/chatroom',
        name: 'home-chatroom',
        meta: {
            title: '聊天室'
        }
    },
]

export default home