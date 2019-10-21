/*
 * @Description: 测试用状态机store
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 12:57:08
 * @LastEditTime: 2019-10-21 13:00:51
 * @LastEditors: Edmund
 */
const app = {
  state: {
    collection: [] // 文章收藏
  },
  mutations: {
    // 命名规范为全大写_
    // 设置登录状态

    /**
     *
     * @param {*} state 数据对象
     * @param {*} val 新值
     */
    SET_DOC_COLLECTION (state, val) {
      let idx = state.collection.findIndex((item) => {
        return item.id === val.id
      })
      // 无则添加,有则删除
      if (idx === -1) {
        state.collection.push(val)
      } else {
        state.collection.splice(idx, 1)
      }
    }
  },
  actions: {
    // 命名规范为大驼峰
  }
}

export default app
