/*
 * @Description: DIY axios 入口文件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-07 14:44:56
 * @LastEditTime: 2019-11-08 14:40:46
 * @LastEditors: Edmund
 */
import MyRequest from './core/index'
import Tools from './tools'

function createInstance () {
  const ctx = new MyRequest()
  let instance
  instance = MyRequest.prototype.request.bind(ctx)
  instance = Tools.extend(instance, MyRequest.prototype, ctx)
  instance = Tools.extend(instance, ctx)
  return instance
}
function create () {
  return createInstance()
}

export default create
