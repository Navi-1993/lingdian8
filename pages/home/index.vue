<!--
 * @Description: 首页index
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-07 11:10:23
 * @LastEditTime: 2019-11-07 16:12:58
 * @LastEditors: Edmund
 * @FilePath: \lingdian8\pages\home\index.vue
 -->

<template>
	<view class="container">
    <!--  #ifndef MP-WEIXIN  -->
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
    <scroll-view  scroll-x 
                  scroll-with-animation 
                  class="tab-view" 
                  :scroll-left="scrollLeft">
			<view v-for="(item,index) in tabbar" 
            :key="index" 
            class="tab-bar-item" 
            :class="[currentTab == index ? 'active' : '']"
			      :data-current="index"
            @tap.stop="swichNav">
        <text class="tab-bar-title">
            {{item}}
        </text>
			</view>
		</scroll-view>
		<swiper class="tab-content" 
            :current="currentTab" 
            duration="300"
            :style="{height: windowHeight + 'px'}"
            @change="switchTab" >
			<swiper-item    v-for="(item,index) in tabbar" 
                      :key="index">
				<scroll-view  scroll-y
                      class="scoll-y">
          <calendar>
              <text slot="date">11月6日  星期六</text>
          </calendar>
          <event-card v-for="(item,idx) of 10"
                      :key="idx">
              <text slot="text">17:00   PCM大师赛-决赛</text>
          </event-card>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
let that
import uniNavBar from 'components/uni-nav-bar/uni-nav-bar.vue' // 头部导航组件
import swiperBar from 'components/swiper-bar.vue'
import calendar from 'components/time_module/calendar.vue'
import eventCard from 'components/sportsEvent/event-card.vue'
// import test from '@/api/fetch.js'
export default {
  components: {
    uniNavBar,
    swiperBar,
    calendar,
    eventCard
  },
  data() {
    return {
      tabbar: [
        '热门',
        '娱乐',
        '体育',
        '国内',
        '财经',
        '科技',
        '教育',
        '汽车',
        '热门',
        '娱乐',
        '体育',
        '国内',
        '财经',
        '科技',
        '教育',
        '汽车'
      ],
      windowHeight: '', //窗口高度
      currentTab: 0, //预设当前tab项的值
      scrollLeft: 0 //tab标题的滚动条位置
    }
  },
  beforeCreate() {
    // #ifndef APP-PLUS
    console.time('renderTime')
    // #endif
  },
  created() {
    that = this
    uni.getSystemInfo({
      success: function(res) {
        that.windowHeight = res.windowHeight
      }
    })
  },
  onReady() {
    // #ifndef APP-PLUS
    console.log(
      '%c如果渲染用时超过3秒，则列入待优化项目',
      'color: yellow; background-color: black;padding: 2px'
    )
    console.timeEnd('renderTime')
    // #endif
  },
  methods: {
    // 滚动切换标签样式
    switchTab: function(e) {
      that.currentTab = e.detail.current
      that.checkCor()
    },
    // 点击标题切换当前页时改变样式
    swichNav: function(e) {
      let cur = e.currentTarget.dataset.current
      if (that.currentTab == cur) {
        return false
      } else {
        that.currentTab = cur
      }
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function() {
      // 如果当前选项卡索引值大于5，设置横向滚动条
      if (that.currentTab > 5) {
        //这里距离按实际计算
        that.scrollLeft = 50 * that.currentTab
      } else {
        that.scrollLeft = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/*tabbar start*/
/* 该页面全局隐藏滚动条 */
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.container {
  .tab-view {
    width: 100vw;
    font-size: 24rpx;
    overflow: hidden;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    /* #ifdef H5 */
    // top: 44px;
    /* #endif */
    left: 0;
    z-index: 99;
    background: $default-bg-white;
    white-space: nowrap;
  }

  .tab-bar-item {
    padding: 0;
    height: 76rpx;
    line-height: 76rpx;
    margin: 0 28rpx;
    display: inline-block;
    text-align: center;
    box-sizing: border-box;
  }
  .scoll-y {
    height: 100%;
  }
  .tab-bar-title {
    color: $default-text-color-inverse;
  }

  .active {
    border-bottom: 2rpx solid $default-color-primary;
    .tab-bar-title {
      color: $default-text-color;
      font-weight: bold;
      transition: font-weight 0.5s;
    }
  }

  /*tabbar end*/
}
</style>
