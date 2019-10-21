/*
 * @Description: webpack配置文件
 * @Author: Edmund(q1592193221@gmail.com)
 * @LastEditors: Edmund
 * @Date: 2019-09-18 11:16:58
 * @LastEditTime: 2019-10-21 13:50:48
 */

const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('/')) // 当引用路径中包含@这个符号时,表示从根目录访问至src路径
      .set('components', resolve('components'))
      .set('pages', resolve('pages'))
      .set('api', resolve('api'))
    // .set('layout',resolve('src/layout'))
    // .set('static',resolve('src/static'))
  }
}
