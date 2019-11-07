/*
 * @Description: 模块自动抽离文件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 12:56:35
 * @LastEditTime: 2019-11-07 15:46:09
 * @LastEditors: Edmund
 * @FilePath: \lingdian8\store\modules\index.js
 */

const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default modules
