<!--
 * @Description: 首页index
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-18 22:07:02
 * @LastEditTime: 2019-11-23 22:38:02
 * @LastEditors: Edmund
 -->

<template>
  <view class="container" :style="{ height: windowHeight + 'px',
																		minHeight: windowHeight + 'px'}">
    <!-- tabbar -->
    <scroll-view	class="tab-view"
									:scroll-x="true"
									:scroll-top="0"
									:scroll-with-animation="true"
									:scroll-left="scrollLeft">
      <view
        class="tab-bar-item"
        :class="[currentTab === idx ? 'active' : '']"
        v-for="(item, idx) in tabbarList"
        :key="idx"
        @tap.stop="swichNav(idx)">
        <text class="tab-bar-title" v-if="item">
          {{ item.name }}
        </text>
				<text class="tab-bar-title">
					{{'      '}}
        </text>
      </view>
      <view class="tabbar-controls" @click="navi2Drag">+</view>
    </scroll-view>
    <swiper	class="tab-content"
						:current="currentTab"
						duration="300"
						:style="{ height: windowHeight + 'px' }"
						@change="switchTab">
      <block v-for="(item, idx) in tabbarList" :key="idx">
        <swiper-item v-show="currentTab === idx">
          <scroll-view scroll-y class="scoll-y">
            <calendar>
              <text slot="date">11月24日 星期天</text>
            </calendar>
						<block 	v-for="(item, index) in matchList"
										:key="index">
								<view @tap.stop="navi2Chatroom(item)">
										<event-card		:homeTeamName="item.homeTeamName"
																	:guestTeamName="item.guestTeamName"
																	:teamALogo="item.homeTeamLogoPath"
																	:teamBLogo="item.guestTeamLogoPath"
																	:livesUrl="''">
											<text slot="text" >
												{{ item.matchBeginTime }}
												{{ item.matchTitle }}
											</text>
										</event-card>
								</view>
						</block>
          </scroll-view>
        </swiper-item>
      </block>
    </swiper>
    <tui-loading :visible="isLoading"></tui-loading>
  </view>
</template>

<script>
let that
import _ from 'underscore'
import calendar from 'components/time_module/calendar.vue'
import tuiLoading from 'components/loading/loading.vue'
import eventCard from 'components/sportsEvent/event-card.vue'
import { queryAllEvent, queryAllMatchList } from '@/api/match.js'
export default {
	components: {
		calendar,
		eventCard,
		tuiLoading
	},
	data() {
		return {
			windowHeight: '', //窗口高度
			tabbarList: [], // tabbar数据
			matchList: [], // 赛事数据
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
			await that._queryAllEvent()
			await that.fetchEvent()
		}
		initFetch()
		that.windowHeight = that.$sysCall.windowHeight()
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
		async _queryAllEvent() {
			let params = {
				offset: 1,
				limit: 7
			}
			let res = await queryAllEvent(params)
			if (res.statusCode === 200) {
				that.tabbarList = res.data.data.list
			}
		},
		/**
		 * @Description: 跳至赛事聊天室页面
		 */
		navi2Chatroom(item) {
			that.$Router.push({ path: '/pages/home/chatroom', params: item })
		},
		/**
		 * @Description: 跳至拖拽排序页
		 */
		navi2Drag() {
			that.$Router.push({ path: '/pages/home/drag' })
		},
		// 滚动切换标签样式
		switchTab: (e) => {
			// console.log('changeTab', e.detail.current)
			that.currentTab = e.target.current
			that.checkCor()
			that.fetchEvent()
		},
		// 点击标题切换当前页时改变样式
		swichNav: function(idx) {
			that.currentTab = idx
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
		 * @Description: 获取赛事展示数据,进行防抖处理
		 */
		fetchEvent: _.debounce(async () => {
			that.isLoading = true
			let params = {
				// id: `${that.tabbarList[that.currentTab].id}`,
				limit: 20,
				offset: 1,
				type: 5
			}
			let res = await queryAllMatchList(params)
			if (res.statusCode === 200) {
				// when success ,do sth you want
				that.isLoading = false
				that.matchList = res.data.data.list || []
			}
			// 2秒后加载不到数据关闭loading控件
			clearTimeout(timer)
			let timer = setTimeout(() => {
				that.isLoading = false
			}, 2000)
			// 1.5秒防抖
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
	display: flex;
	flex-direction: column;
	.tab-view {
		font-size: 24rpx;
		overflow: hidden;
		box-sizing: border-box;
		position: fixed;
		height: 76rpx;
		top: 0;
		/* #ifdef H5 */
		top: 88rpx;
		/* #endif */
		left: 0;
		z-index: 99;
		background: $default-bg-white;
		white-space: nowrap;
		.tabbar-controls {
			height: 76rpx;
			width: 76rpx;
			background: $default-bg-white;
			position: fixed;
			right: 0;
			top: 88rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 60rpx;
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
	.tab-content {
		margin-top: 88rpx;
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
