<!--
 * @Description: 首页index
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 12:54:43
 * @LastEditTime: 2019-10-21 16:16:04
 * @LastEditors: Edmund
 -->
<template>
	<view class="home_container">
    <!--  #ifdef APP-PLUS  -->
    <!-- 状态栏 -->
    <uni-nav-bar  title="零点吧"
                  :fixed="true"
                  :color = "navBarColor"
                  :background-color = "navBarBackColor"
                  status-bar="true"
                  :border="false">
      <view slot="right"
            style="font-size: 40rpx;"
            class="iconfont">
      </view>
    </uni-nav-bar>
    <!--  #endif -->
    <swiper-bar></swiper-bar>
	</view>
</template>

<script>
import uniNavBar from 'components/uni-nav-bar/uni-nav-bar.vue' // 头部导航组件
import swiperBar from 'components/swiper-bar.vue'
export default {
  components: {
    uniNavBar,
    swiperBar
  },
  data() {
    return {
      navBarBackColor: '#1B1B30',
      navBarColor: '#FFFFFF'
    }
  },
  onLoad() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
