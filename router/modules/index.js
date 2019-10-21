/*
 * @Description: 自动抽离模块
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 12:58:50
 * @LastEditTime: 2019-10-21 13:08:30
 * @LastEditors: Edmund
 */

const files = require.context('.', false, /\.js$/)

let modules = []

// 遍历导入当前文件夹下的模块
files.keys().forEach(key => {
    if (key === './index.js') return
    console.log(key)
    modules = [...modules, ...(files(key).default)]
})

export default modules