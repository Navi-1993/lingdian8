<!--
 * @Description: 页面模板
 * @Author: Edmund(q1592193221@gmail.com)
 * @LastEditors: Edmund
 * @Date: 2019-11-06 17:16:48
 * @LastEditTime: 2019-11-07 00:08:20
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
    // console.time('LifeCycle') // 创建到渲染所耗时间，大于3秒则加入优化计划
  },
  created() {
    that = this
  },
  onLoad() {},
  onShow() {},
  onReady() {
    // console.timeEnd('LifeCycle')
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