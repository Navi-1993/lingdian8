<!--
 * @Description: 视频首页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 14:20:23
 * @LastEditTime: 2019-11-26 09:58:12
 * @LastEditors: Edmund
 -->

<template>
  <view
    class="container"
    :style="{ height: windowHeight + 'px', minHeight: windowHeight + 'px' }"
  >
    <!-- #ifdef H5 || MP -->
    <!-- tabbar -->
    <scroll-view	class="tab-view"
									:scroll-x="true"
									:show-scrollbar="false"
									:scroll-into-view="scrollInto"
									:scroll-with-animation="true">
      <block 	v-for="(item, idx) in tabbarList"
							:key="idx">
        <view
          class="tab-bar-item"
					:id="item.tabId"
					@tap.stop="swichNav(idx)"
          :class="[currentTab === idx ? 'active' : '']"
        >
          <text class="tab-bar-title">
            {{ item.name }}
          </text>
        </view>
      </block>
      <view class="tabbar-controls" @click="navi2Drag">+</view>
    </scroll-view>
    <swiper
						class="tab-content"
						:current="currentTab"
						duration="300"
						:style="{ height: windowHeight + 'px', minHeight: windowHeight + 'px' }"
						@change="switchTab">
      <block v-for="(item, idx) in tabbarList" :key="idx">
        <swiper-item>
          <scroll-view
												:scroll-y="true"
												:style="{ height: windowHeight - 40 + 'px' }"
												:scroll-with-animation="true">
            <block v-for="(item, index) in videoList[idx].data" :key="index">
              <view class="card" 
										@tap.stop="navi2(item)">
                <view class="poster">
                  <!-- item.imgHref -->
                  <image 	:src="item.imgHref"
													class="image" 
													mode="aspectFill">
                  </image>
                  <text class="playBtn iconfont">
                    &#xe620;
                  </text>
                </view>
                <view class="controls">
                  <view class="sheet_l">
                    <view 	style="margin-right:10rpx" 
														class="iconfont">
                      &#xe61f;
                    </view>
                    <view>99999</view>
                  </view>
                  <view class="sheet_r">
                    <view style="margin-right:10rpx" class="iconfont">
                      &#xe642;
                    </view>
                    <view>{{ item.likeNumber || 0 }}</view>
                  </view>
                </view>
                <view class="title">{{ item.liveTitle }}</view>
              </view>
            </block>
          </scroll-view>
        </swiper-item>
      </block>
    </swiper>
    <tui-loading :visible="isLoading"></tui-loading>
    <!-- #endif -->
  </view>
</template>

<script>
let that
import _ from 'underscore'
import tuiLoading from 'components/loading/loading.vue'
import { queryAllEvent } from '@/api/match.js'
import { queryVideoTitle, queryLiveContent } from 'api/video.js'
// 定义每页的缓存数据长度与在该清空下缓存的页码
const MAX_CACHE_DATA = 20
const MAX_CACHE_PAGE = 3
export default {
	name: 'video',
	components: {
		tuiLoading
	},
	props: {},
	data() {
		return {
			windowHeight: '', //窗口高度
			tabbarList: [], // tabbar数据
			currentTab: 0, //预设当前tab项的值
			isLoading: false, // 加载弹窗
			scrollInto: '',
			cacheTab: [], // 缓存tab
			// TODO: 视频所用数据
			videoList: []
		}
	},
	created() {
		that = this
		that.windowHeight = that.$sysCall.windowHeight()
		async function init() {
			await that._queryAllEvent()
			that.tabbarList.forEach((item) => {
				that.videoList.push({
					data: [],
					isLoading: false,
					refreshText: '',
					loadingText: 'loading...'
				})
			})
			await that._queryVideoTitle(0)
		}
		init()
	},
	onShow() {
		// #ifdef APP-PLUS
		// 通过id获取nvue子窗体
		const playerNVue = uni.getSubNVueById('myplayer')
		// 打开 nvue 子窗体
		playerNVue.show('slide-in-right', 300, function() {})
		// #endif
	},
	mounted() {},
	methods: {
		/**
		 * @Description: 请求视频标题列表
		 */

		_queryVideoTitle: _.debounce(async (idx) => {
			that.isLoading = true
			let params = {
				// limit: 20,
				// type: that.tabbarList[that.currentTab].type
				id: that.tabbarList[that.currentTab].id,
				offset: 1,
				type: 5
			}
			let res = await queryVideoTitle(params)
			if (res.statusCode === 200) {
				that.isLoading = false
				that.videoList[idx].data = res.data.data.list
			} else {
				that.$sysCall.toast('加载失败，请刷新重试')
			}
		}, 1000),
		/**
		 * @Description: 请求所有项目
		 */
		async _queryAllEvent() {
			let params = {
				offset: 1,
				limit: 30
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

		navi2(item) {
			that.$Router.push({
				path: '/pages/video/detail'
			})
			getApp().globalData.routerData = item
		},

		/**
		 * @Description: 跳至拖拽排序页
		 */
		navi2Drag() {
			that.$Router.push({ path: '/pages/home/drag' })
		},

		/**
		 * @Description: 滚动切换标签样式
		 */
		switchTab: (e) => {
			that.currentTab = e.target.current
			that.swichNav(that.currentTab)
		},
		swichNav: function(idx) {
			that.currentTab = idx
			if (that.videoList[idx].data.length === 0) {
				that._queryVideoTitle(idx)
			}
			// console.log('that.tabbarList[idx].tabId', that.tabbarList[idx].tabId)
			// 调整页签
			that.scrollInto = that.tabbarList[idx].tabId

			// TODO:当页面数据超过100条，则缓存该tab到cachetab
			if (that.videoList[idx].data.length > MAX_CACHE_DATA) {
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
			}
		}
	},
	computed: {},
	watch: {}
}
</script>

<style lang="scss" scoped>
page {
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
}
.container {
	display: flex;
	flex-direction: column;
	.tab-view {
		width: 100vw;
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
		// background: gray;
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
	.tab-content {
		margin-top: 88rpx;
		.card {
			position: relative;
			display: flex;
			flex-direction: column;
			height: 548rpx;
			box-shadow: 0rpx 5rpx 5rpx 0rpx $default-border-color-gray,
				5rpx 5rpx 5rpx 0rpx $default-border-color-gray,
				7rpx -5rpx 5rpx -5rpx $default-border-color-gray,
				1rpx 1rpx 7rpx 0rpx $default-border-color-gray;
			margin: 10rpx 20rpx 20rpx 20rpx;
			.poster {
				position: relative;
				height: 488rpx;
				border-radius: 10rpx 10rpx 0 0;
				.image {
					height: 100%;
					width: 100%;
					border-radius: 10rpx 10rpx 0 0;
				}
				.playBtn {
					@include center;
					font-size: 160rpx;
					color: rgba(120, 120, 120, 0.7);
				}
			}
			.controls {
				flex: 1;
				display: flex;
				align-items: center;
				background: $default-bg-white;
				border-radius: 0 0 10rpx 10rpx;
				font-size: 22rpx;
				.sheet_l {
					flex: 1;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-left: 20rpx;
				}
				.sheet_r {
					flex: 1;
					display: flex;
					align-items: center;
					margin-right: 20rpx;
					justify-content: flex-end;
				}
			}
			.title {
				height: 88rpx;
				width: 710rpx;
				display: flex;
				align-items: center;
				background: transparent;
				position: absolute;
				z-index: 100;
				top: 0;
				color: $default-text-color-white;
				font-size: 30rpx;
				padding-left: 18rpx;
			}
		}
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
}
</style>
