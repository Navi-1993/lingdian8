<!--
 * @Description: 首页index
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-18 22:07:02
 * @LastEditTime: 2019-11-26 00:49:23
 * @LastEditors: Edmund
 -->

<template>
  <view
    class="container"
    :style="{ height: windowHeight + 'px', minHeight: windowHeight + 'px' }">
    <!-- tabbar -->
    <scroll-view	class="tab-view"
									:scroll-x="true"
									:show-scrollbar="false"
									:scroll-into-view="scrollInto">
			<!-- tabbar item -->
			<block 	v-for="(item, idx) in tabbarList"
							:key="idx">
					<view	class="tab-bar-item"
								:id="item.tabId"
								:class="[currentTab === idx ? 'active' : '']"
								@tap.stop="swichNav(idx)">
						<text class="tab-bar-title" v-if="item">
									{{ item.name }}
						</text>
					</view>
			</block>
      <view class="tabbar-controls" @click="navi2Drag">+</view>
    </scroll-view>
		<!-- 下层组件 -->
    <swiper
      class="tab-content"
      :current="currentTab"
      duration="300"
      :style="{ height: windowHeight + 'px' }"
      @change="switchTab">
			<!-- item -->
      <block v-for="(item, idx) in tabbarList" :key="idx">
        <swiper-item >
          <scroll-view 	:scroll-y="true" 
												class="scoll-y">
            <calendar>
              <text slot="date">11月24日 星期天</text>
            </calendar>
            <block v-for="(item, index) in matchList[currentTab].data" :key="index">
              <view @tap.stop="navi2Chatroom(item)">
                <event-card		:homeTeamName="item.homeTeamName"
															:guestTeamName="item.guestTeamName"
															:teamALogo="item.homeTeamLogoPath"
															:teamBLogo="item.guestTeamLogoPath"
															:livesUrl="''">
                  <text slot="text">
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

// 定义每页的缓存数据长度与在该清空下缓存的页码
const MAX_CACHE_DATA = 5
const MAX_CACHE_PAGE = 3
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
			isLoading: false, // 加载弹窗
			scrollInto: '',
			cacheTab: [] // 缓存tab
		}
	},
	beforeCreate() {
		// #ifndef APP-PLUS
		console.time('renderTime')
		// #endif
	},
	created() {
		that = this
		that.windowHeight = that.$sysCall.windowHeight()
		async function initFetch() {
			await that._queryAllEvent()
			that.tabbarList.forEach((item) => {
				// 为tabbarList 的每一个元素增加tabId(不以数字开头)
				that.matchList.push({
					data: [],
					isLoading: false,
					refreshText: '',
					loadingText: 'loading...'
				})
			})
			await that._queryAllMatchList(0)
		}
		initFetch()
	},
	onLoad() {},
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
				limit: 20
			}
			let res = await queryAllEvent(params)
			if (res.statusCode === 200) {
				let obj = res.data.data.list
				obj = obj.map((item) => {
					return (item = {
						...item,
						tabId: `tabId${item.id}${parseInt(Math.random() * 10 + 1)}`
					})
				})
				that.tabbarList = obj
			}
		},
		/**
		 * @Description: 跳至赛事聊天室页面
		 */
		navi2Chatroom(item) {
			that.$Router.push({ path: '/pages/home/chatroom' })
			getApp().globalData.routerData = item
		},
		/**
		 * @Description: 跳至拖拽排序页
		 */
		navi2Drag() {
			that.$Router.push({ path: '/pages/home/drag' })
		},
		// 滚动切换标签样式
		switchTab: (e) => {
			that.currentTab = e.target.current
			that.swichNav(that.currentTab)
		},
		// 点击标题切换样式与下层组件数据
		swichNav: function(idx) {
			that.currentTab = idx
			if (that.matchList[idx].data.length === 0) {
				that._queryAllMatchList(idx)
			}
			// 当前tab为5的倍数，则调整一次tab
			// if (idx % 3 == 0) {
			that.scrollInto = that.tabbarList[idx].tabId
			// }

			// TODO:当页面数据超过100条，则缓存该tab到cachetab
			if (that.matchList[idx].data.length > MAX_CACHE_DATA) {
				let isExist = that.cacheTab.indexOf(idx)
				if (isExist < 0) {
					that.cacheTab.push(idx)
				}
			}
			// TODO:当cachetab的长度大于缓存页码数，则去掉对应的tab数据
			if (that.cacheTab.length > MAX_CACHE_PAGE) {
				let cacheIndex = that.cacheTab[0]
				that.clearTabData(cacheIndex)
				that.cacheTab.splice(0, 1)
				// console.log('remove cache index:: ' + cacheIndex)
			}
		},
		clearTabData(idx) {
			this.matchList[idx].data.length = 0
			this.matchList[idx].loadingText = '加载更多...'
		},

		/**
		 * @Description: 获取赛事展示数据,进行防抖处理
		 */
		_queryAllMatchList: _.debounce(async (idx) => {
			that.isLoading = true
			let params = {
				id: that.tabbarList[that.currentTab].id,
				// limit: 20,
				offset: 1,
				type: that.tabbarList[that.currentTab].type * 1
			}
			let res = await queryAllMatchList(params)
			if (res.statusCode === 200) {
				that.isLoading = false
				that.matchList[idx].data = res.data.data.list || []
			} else {
				that.$sysCall.toast('加载失败，请刷新重试')
			}
			// 2秒后加载不到数据关闭loading控件
			clearTimeout(timer)
			let timer = setTimeout(() => {
				that.isLoading = false
			}, 2000)
			// 1秒防抖
		}, 1000)
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
