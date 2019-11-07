<!--
 * @Description: 注册页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-07 11:10:23
 * @LastEditTime: 2019-11-07 15:44:32
 * @LastEditors: Edmund
 * @FilePath: \lingdian8\pages\user\login.vue
 -->

<template>
    <view class="container">
      <swiper style="height:500px;">
        <swiper-item v-for="item in 10" :key="item">
          <scroll-view>
          <calendar v-for="item in 50" :key="item">
              <text slot="date">11月6日  星期六</text>
          </calendar>
          </scroll-view>
          </swiper-item>
      </swiper>
	</view>
</template>

<script>
let that
import calendar from 'components/time_module/calendar.vue'
export default {
  name: '',
  components: {
    calendar
  },
  props: {},
  data() {
    return {
      windowHeight: 0
    }
  },
  beforeCreate() {
    console.time('renderTime') // 创建到渲染所耗时间，大于3秒则加入优化计划
  },
  created() {
    that = this
    // 测试时使用
    uni.getSystemInfo({
      success: res => {
        console.log('手机品牌', res.brand) // 手机品牌
        console.log('手机型号', res.model) // 手机型号
        console.log('可使用窗口的顶部位置', res.windowTop)
        this.windowHeight = res.windowHeight
        console.log('状态栏的高度', res.statusBarHeight)
        console.log('可使用的窗口高度 = 100vh', res.windowHeight)
        console.log('可使用窗口的底部位置', res.windowBottom)
        console.log('导航栏的高度	', res.navigationBarHeight)
      }
    })
  },
  beforeMount() {},
  mounted() {},
  onLoad() {},
  onShow() {},
  onReady() {
    console.timeEnd('renderTime')
  },
  onHide() {},
  onUnload() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background: red;
  overflow: auto;
}
</style>