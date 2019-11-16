<!--
 * @Description: 页面模板
 * @Author: Edmund(q1592193221@gmail.com)
 * @LastEditors: Edmund
 * @Date: 2019-11-06 17:16:48
 * @LastEditTime: 2019-11-16 23:11:02
 * @FilePath: \lingdian8\components\template-pages.vue
 -->
<template>
  <view class="container"> </view>
</template>

<script>
let that
export default {
  name: '',
  components: {},
  props: {},
  beforeCreate() {
    // #ifndef APP-PLUS
    console.time('renderTime')
    // #endif
  },
  created() {
    that = this
  },
  onLoad() {},
  onShow() {},
  onReady() {
    // #ifndef APP-PLUS
    console.log(
      '%c如果渲染用时超过3秒，则列入待优化项目',
      'color: yellow; background-color: black;padding: 2px'
    )
    console.timeEnd('renderTime')
    console.log(`%c${that.__route__}`, 'color:yellow;background-color:black')
    // #endif
  },
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
  onPageScroll() {},
  methods: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
