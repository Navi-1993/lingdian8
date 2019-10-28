<!--
 * @Description: 首页index
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 12:54:43
 * @LastEditTime: 2019-10-28 16:55:22
 * @LastEditors: Edmund
 -->
<template>
	<view class="home_container">
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
    <!-- 赛事导航 -->
    <swiper-bar :styleObject="styleObject"
                :renderData = "sportNameList"
                scrollTop="200">
    </swiper-bar>
    <!-- 赛事列表 -->
    <view class="home_content">
      <scroll-view  :scroll-y="true"
                    class="scrollView">
          <calendar>
              <text slot="date">11月6日  星期六</text>
          </calendar>
          <event-card v-for="(item,idx) of 10"
                      :key="idx">
              <text slot="text">17:00   PCM大师赛-决赛</text>
          </event-card>
      </scroll-view>
    </view>
	</view>
</template>

<script>
import uniNavBar from 'components/uni-nav-bar/uni-nav-bar.vue' // 头部导航组件
import swiperBar from 'components/swiper-bar.vue'
import calendar from 'components/time_module/calendar.vue'
import eventCard from 'components/sportsEvent/event-card.vue'
export default {
  components: {
    uniNavBar,
    swiperBar,
    calendar,
    eventCard
  },
  data() {
    return {
      navBarBackColor: '#1B1B30',
      navBarColor: '#FFFFFF',
      styleObject: {
        color: 'black'
      },
      faboriteData: [
        {
          name: 'wong'
        },
        {
          name: 'xue'
        },
        {
          name: 'feng'
        },
        {
          name: 'niu'
        },
        {
          name: 'xu'
        },
        {
          name: 'feng'
        },
        {
          name: 'jia'
        },
        {
          name: 'SB'
        }
      ]
    }
  },
  onLoad() {},
  methods: {},
  computed: {
    sportNameList() {
      return this.$_.map(this.faboriteData, item => {
        return item.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home_container {
  height: 100vh;
  .scrollView {
    margin-top: 76rpx;
    height: calc(84vh);
  }
}
</style>
