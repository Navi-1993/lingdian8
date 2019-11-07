<!--
 * @Description: 页面模板
 * @Author: Edmund(q1592193221@gmail.com)
 * @LastEditors: Edmund
 * @Date: 2019-11-06 17:16:48
 * @LastEditTime: 2019-11-07 15:22:48
 * @FilePath: \lingdian8\components\template-pages.vue
 -->
<template>
    <view class="container">

    </view>
</template>

<script>
let that
export default {
  name: '',
  components: {},
  props: {},
  beforeCreate() {
    console.time('renderTime')
  },
  created() {
    that = this
  },
  onLoad() {},
  onShow() {},
  onReady() {
    console.log(
      '%c如果渲染用时超过3秒，则列入待优化项目',
      'color: yellow; background-color: black;padding: 2px'
    )
    console.timeEnd('renderTime')
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

<style lang="scss" scoped>
</style>