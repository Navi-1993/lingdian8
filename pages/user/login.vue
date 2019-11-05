<template>
	<view class="container">
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
            @change="switchTab" 
            :style="{height:winHeight+'px'}">
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
import calendar from 'components/time_module/calendar.vue'
import eventCard from 'components/sportsEvent/event-card.vue'
export default {
  components: {
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
      winHeight: '', //窗口高度
      currentTab: 0, //预设当前tab项的值
      scrollLeft: 0 //tab标题的滚动条位置
    }
  },
  onLoad: function() {
    let that = this
    // 高度自适应
    uni.getSystemInfo({
      success: function(res) {
        let calc = res.windowHeight
        that.winHeight = calc
      }
    })
  },
  methods: {
    // 滚动切换标签样式
    switchTab: function(e) {
      let that = this
      this.currentTab = e.detail.current
      this.checkCor()
    },
    // 点击标题切换当前页时改变样式
    swichNav: function(e) {
      console.log(e, 'e')
      let cur = e.currentTarget.dataset.current
      if (this.currentTab == cur) {
        return false
      } else {
        this.currentTab = cur
      }
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function() {
      // 如果当前选项卡索引值大于5，设置横向滚动条
      if (this.currentTab > 5) {
        //这里距离按实际计算
        this.scrollLeft = 50 * this.currentTab
      } else {
        this.scrollLeft = 0
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
    width: 750rpx;
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
