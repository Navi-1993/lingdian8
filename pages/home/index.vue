<!--
 * @Description: 首页index
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-07 11:10:23
 * @LastEditTime: 2019-11-13 22:53:33
 * @LastEditors: Edmund
 * @FilePath: \lingdian8\pages\home\index.vue
 -->

<template>
	<view class="container">
    <!--  #ifndef MP-WEIXIN  -->
    <!-- 状态栏 -->
    <!-- <uni-nav-bar  title="零点吧"
                  :fixed="true"
                  color = "yellow"
                  background-color = "red"
                  status-bar="true"
                  :border="false">
      <view slot="right"
            style="font-size: 40rpx;"
            class="iconfont">
      </view>
    
    </uni-nav-bar> -->
    <!--  #endif -->
    <!-- tabbar -->
    <scroll-view  scroll-x 
                  scroll-with-animation 
                  class="tab-view" 
                  :scroll-left="scrollLeft">
			<view 	v-for="(item,idx) in tabbarList" 
					:key="idx"
					class="tab-bar-item" 
					:class="[currentTab == idx ? 'active' : '']"
			      :data-current="idx"
            @tap.stop="swichNav">
        <text class="tab-bar-title"
              v-if="item">
            {{item.name}}
        </text>
			</view>
      <view class="tabbar-controls">+</view>
		</scroll-view>
		<swiper class="tab-content" 
				:current="currentTab" 
				duration="200"
				:style="{height: windowHeight + 'px'}"
				@change="switchTab" >
			<swiper-item    v-for="(item,idx) in tabbarList" 
                      :key="idx"
                      v-show="item">
				<scroll-view  scroll-y
                      class="scoll-y">
          <calendar>
              <text slot="date">11月6日  星期六</text>
          </calendar>
          <event-card v-for="(item,index) in matchList"
                      :homeTeamName="item.homeTeamName"
                      :guestTeamName="item.guestTeamName"
                      :livesUrl="''"
                      :key="index">
              	<text slot="text">
					{{item.matchBeginTime}}
					{{item.matchTitle}}
				</text>
          </event-card>
				</scroll-view>
			</swiper-item>
		</swiper>
		<tui-loading :visible="isLoading"></tui-loading>
	</view>
</template>

<script>
let that
import _ from 'underscore'
import uniNavBar from 'components/uni-nav-bar/uni-nav-bar.vue' // 头部导航组件
import swiperBar from 'components/swiper-bar.vue'
import calendar from 'components/time_module/calendar.vue'
import tuiLoading from 'components/loading/loading.vue'
import eventCard from 'components/sportsEvent/event-card.vue'
import { queryAllEvent, queryAllMatchList } from '@/api/match.js'
export default {
	components: {
		uniNavBar,
		swiperBar,
		calendar,
		eventCard,
		tuiLoading
	},
	data() {
		return {
			tabbarList: ['name'], // tabbar数据
			matchList: [], // 赛事数据
			windowHeight: '', //窗口高度
			currentTab: 0, //预设当前tab项的值
			scrollLeft: 0, //tab标题的滚动条位置
			isLoading: false // 加载弹窗
		}
	},
	beforeCreate() {
		// #ifndef APP-PLUS
		console.time('renderTime')
		// #endif
	},
	created() {
		that = this
		async function initFetch() {
			await that.fetchEvent()
		}
		initFetch()
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
		switchTab: (e) => {
			console.log('changeTab', e.detail.current)
			let scollWidth = currentTarget.offsetLeft
			that.currentTab = e.detail.current
			that.checkCor()
			that.fetchEvent()
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
			if (that.currentTab === 0) {
				that.scrollLeft = 0
			}
			// 如果当前选项卡索引值大于5，设置横向滚动条
			if (that.currentTab > 5) {
				that.scrollLeft = 30 * that.currentTab
			}
		},
		/**
		 * @Description: 获取赛事项目的化异步作同步的方法，具体看match.js的api
		 * 模块
		 */
		async fetchEvent() {
			let res = await queryAllEvent({
				// limit: 10,
				offset: 1
			})
			if (res.statusCode === 200) {
				that.tabbarList = res.data.data.list || []
			}
		},

		/**
		 * @Description: 获取赛事展示数据,进行防抖处理
		 */
		fetchEvent: _.debounce(async () => {
			that.isLoading = true
			// console.log('current', that.currentTab)
			let idx = that.currentTab
			let params = {
				// id: that.tabbarList[idx].id,
				// limit: 10,
				offset: 1,
				type: that.tabbarList[idx].type
			}
			let res = await queryAllMatchList(params)
			if (res.statusCode === 200) {
				// when success ,do sth you want
				that.isLoading = false
				that.matchList = res.data.data.list || []
			}
			// 如果加载不到数据，关闭loading控件
			clearTimeout(timer)
			let timer = setTimeout(() => {
				that.isLoading = false
			}, 0)
		}, 1500)
	},
	computed: {},
	watch: {}
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
		.tabbar-controls {
			height: 76rpx;
			width: 76rpx;
			// background: $default-bg-white;
			background: red;
			position: absolute;
			// right: 0;
			z-index: 200;
		}
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
