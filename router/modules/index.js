/*
 * @Description: 模块自动抽离文件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 12:58:50
 * @LastEditTime: 2019-11-07 15:46:38
 * @LastEditors: Edmund
 * @FilePath: \lingdian8\router\modules\index.js
 */


const files = require.context('.', false, /\.js$/)

let modules = []

// 遍历导入当前文件夹下的模块
files.keys().forEach(key => {
    if (key === './index.js') return
    modules = [...modules, ...(files(key).default)]
})

export default modules