<!--
 * @Description: 新闻首页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-21 10:34:46
 * @LastEditTime: 2019-11-26 23:17:46
 * @LastEditors: Edmund
 -->
<template>
  <view
    class="container"
    :style="{ height: windowHeight + 'px',
							minHeight: windowHeight + 'px' }"
  >
    <!-- tabbar -->
    <scroll-view	class="tab-view"
									:scroll-x="true"
									:show-scrollbar="false"
									:scroll-into-view="scrollInto"
									:scroll-with-animation="true">
			<!-- tabbar item -->
      <block v-for="(item, idx) in tabbarList" :key="idx">
        <view
							class="tab-bar-item"
							:id="item.tabId"
							@tap.stop="swichNav(idx)"
							:class="[currentTab === idx ? 'active' : '']">
          <text class="tab-bar-title">
            {{ item.name }}
          </text>
        </view>
      </block>
      <view class="tabbar-controls" @click="navi2Drag">+</view>
    </scroll-view>

		<!-- 下层组件 -->
    <swiper	class="tab-content"
						:current="currentTab"
						duration="300"
						:style="{ height: windowHeight + 'px', minHeight: windowHeight + 'px' }"
						@change="switchTab">
      <block v-for="(item, idx) in tabbarList" :key="idx">
        <swiper-item >
					<!-- banner 轮播图 -->
					<swiper :autoplay="true"
									:interval="3000"
									:duration="300"
									:circular="true"
									previous-margin="60rpx"
									next-margin="60rpx"
									class="banner">
							<block v-for="(item,index) in newsList[idx].data" :key="index">
								<swiper-item class="banner_item" >
									<image 	:src="'../../static/assets/default.png'"
													class="banner_item_img"
													@tap.stop="navi2NewsDetail(item)"
													mode="aspectFill">
										<view class="banner_item_img_title">{{item.newsTitle}}</view>
									</image>
									
								</swiper-item>
							</block>
      		</swiper>
					<view class="bannerStepStone"></view>
					<!-- 数据列表 -->
          <scroll-view	:scroll-y="true"
												style="height:720rpx;"
												:scroll-with-animation="true"
												:scroll-left="scrollLeft"
												@scroll="scroll"
												@scrolltolower="scroll2Bottom"
												@touchstart="touchStart"
												@touchmove="touchMove">
						<loadmore :visible="loadingMore"
											:index="3"
											type="primary"
											text=" ">
          	</loadmore>
						<!-- card_item -->
            <block v-for="(item,index) in newsList[idx].data" :key="index">
								<view class="card_item"
											@tap.stop="navi2NewsDetail(item)">
									<view class="card_img">
										<image 	:src="'../../static/assets/default.png'"
														mode="aspectFill"
														class="img"/>
									</view>
									<view class="card_content">
										<view class="card_content_top">{{item.newsTitle}}</view>
										<view class="card_content_bottom">
											<view class="card_content_bottom_left">
												{{item.createdTime}}
											</view >
											<view class="card_content_bottom_right">
												<text class="iconfont"
															style="margin-right:20rpx;">&#xe642;</text>
												{{item.commentNumber || 0}}
											</view>
										</view>
									</view>
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
import tuiLoading from 'components/loading/loading.vue'
import loadmore from 'components/loadmore/loadmore'
import { queryAllEvent } from 'api/match.js'
import { queryNewsTitle } from 'api/news.js'
// 定义每页的缓存数据长度与在该清空下缓存的页码
const MAX_CACHE_DATA = 20
const MAX_CACHE_PAGE = 1
export default {
	name: 'news-index',
	components: {
		tuiLoading,
		loadmore
	},
	props: {},
	data() {
		return {
			windowHeight: '', //窗口高度
			tabbarList: [], // tabbar数据
			currentTab: 0, //预设当前tab项的值
			scrollLeft: 0, //tab标题的滚动条位置
			isLoading: false, // 加载弹窗
			scrollInto: '',
			pagesNum: 0,
			cacheTab: [], // 缓存tab
			// TODO: 新闻数据
			newsList: [],
			couldLoad: true,
			loadingMore: false, // 显示下拉刷新
			// TODO: 记录触发操作
			oldX: 0,
			oldY: 0
		}
	},
	created() {
		that = this
		that.windowHeight = that.$sysCall.windowHeight()
		async function init() {
			await that._queryAllEvent()
			that.tabbarList.forEach((item) => {
				that.newsList.push({
					data: [],
					isLoading: false,
					refreshText: '',
					loadingText: 'loading...'
				})
			})
			await that._queryNewsTitle(0)
		}
		init()
	},
	onShow() {},
	mounted() {},
	methods: {
		/**
		 * @Description: 请求新闻列表数据
		 */
		_queryNewsTitle: _.debounce(async (idx) => {
			that.isLoading = true
			let params = {
				id: that.tabbarList[that.currentTab].id,
				limit: 20,
				offset: 1,
				type: that.tabbarList[that.currentTab].type * 1
			}
			let res = await queryNewsTitle(params)
			if (res.statusCode === 200) {
				that.isLoading = false
				that.newsList[idx].data = res.data.data.list || []
			} else {
				that.$sysCall.toast('加载失败，请刷新重试')
			}
			// 2秒后加载不到数据关闭loading控件
			clearTimeout(timer)
			let timer = setTimeout(() => {
				that.isLoading = false
			}, 2000)
			// 防抖间隔1秒
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
				let arr = res.data.data.list
				arr = arr.map((item) => {
					return (item = {
						...item,
						tabId: `tabId${item.id}${parseInt(Math.random() * 10 + 1)}`
					})
				})
				that.tabbarList = arr
			}
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
		// 点击标题切换当前页时改变样式
		swichNav: function(idx) {
			that.currentTab = idx
			if (that.newsList[idx].data.length === 0) {
				that._queryNewsTitle(idx)
			}
			that.scrollInto = that.tabbarList[idx].tabId

			// TODO:当页面数据超过xx条，则缓存该tab到cachetab
			if (that.newsList[idx].data.length > MAX_CACHE_DATA) {
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
		},
		clearTabData(idx) {
			this.newsList[idx].data.length = 0
			this.newsList[idx].loadingText = '加载更多...'
		},
		async scroll2Bottom() {
			that.pagesNum++
			let params = {
				id: that.tabbarList[that.currentTab].id,
				limit: 20,
				offset: that.pagesNum,
				type: that.tabbarList[that.currentTab].type * 1
			}
			that.isLoading = true
			let res = await queryNewsTitle(params)
			if (res.statusCode === 200) {
				that.isLoading = false
				res.data.data.list.map((item) => {
					that.newsList[that.currentTab].data.push(item)
				})
			} else {
				that.$sysCall.toast('加载失败，请刷新重试')
			}
		},

		/**
		 * @Description: 跳转到新闻详情页
		 */
		navi2NewsDetail(item) {
			// #ifdef H5
			that.$Router.push({
				path: '/pages/news/detail',
				params: { id: item.id }
			})
			// #endif
			// #ifdef APP-PLUS || MP
			uni.navigateTo({
				url: `/pages/news/detail?id=${item.id}`
			})
			// #endif
		},
		/**
		 * @Description: 滚动容器滚动时触发
		 * @param {type}
		 * @return:
		 */
		scroll(e) {
			let scrollTop = e.mp.target.scrollTop
			if (scrollTop < 10) {
				that.couldLoad = true
			}
			if (scrollTop > 10 && scrollTop <= 20) {
				that.couldLoad = false
			}
		},

		/**
		 * @Description: 开始触摸盒子容器时触发
		 */
		touchStart(e) {
			that.oldX = e.touches[0].pageX
			that.oldY = e.touches[0].pageY
		},
		/**
		 * @Description: 手指在盒子容器中滑动过程中触发
		 */
		touchMove(e) {
			if (!that.couldLoad) return
			let currentX = e.touches[0].pageX
			let currentY = e.touches[0].pageY
			let tx = currentX - that.oldX
			let ty = currentY - that.oldY
			if (Math.abs(tx) < 50) {
				if (ty > 120) {
					that.loadmore()
				}
			}
		},
		loadmore: _.debounce(() => {
			that.loadingMore = true
			that.pagesNum = 0
			that._queryNewsTitle(that.currentTab)
			setTimeout(() => {
				that.loadingMore = false
			}, 2000)
		}, 300)
	},
	computed: {
		bannerList() {
			// let list = that.newsList.filter((item) => {
			// 	// 找出推荐数据
			// 	return item.isRecommend === '0'
			// })
			// return list
			return that.newsList
		}
	},
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
		.banner {
			height: 316rpx;
			width: 100vw;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			top: 0;
			&_title {
				position: absolute;
				bottom: 060rpx;
				z-index: 100;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 88rpx;
				background: $default-text-color-white;
				word-wrap: none;
			}
			&_item {
				display: flex;
				align-items: center;
				justify-content: center;
				&_img {
					display: inline-block;
					position: relative;
					width: 586rpx;
					height: 280rpx;
					border-radius: 10rpx;
					&_title {
						opacity: 0.7;
						width: 586rpx;
						border-radius: 0 0 10rpx 10rpx;
						background-color: rgba(0, 0, 0, 1);
						position: absolute;
						bottom: 20rpx;
						font-size: 22rpx;
						text-indent: 20rpx;
						line-height: 38rpx;
						height: 38rpx;
						color: $default-text-color-white;
						display: block;
						word-break: keep-all;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
		}
		.bannerStepStone {
			height: 316rpx;
		}
		.card_item {
			height: 184rpx;
			display: flex;
			padding: 24rpx 20rpx;
			// background: blue;
			border-bottom: 1rpx solid $default-border-color;
			.card_img {
				display: flex;
				justify-content: center;
				align-items: center;
				.img {
					width: 210rpx;
					height: 100%;
					border-radius: 6rpx;
				}
			}
			.card_content {
				flex: 1;
				display: flex;
				flex-direction: column;
				margin-left: 20rpx;
				&_top {
					flex: 1;
					display: flex;
					align-items: flex-start;
					font-size: 26rpx;
				}
				&_bottom {
					flex: 1;
					display: flex;
					align-items: flex-end;
					font-size: 22rpx;
					color: $default-text-color-inverse;
					&_left {
						flex: 1;
						height: 40rpx;
						display: flex;
						align-items: center;
						justify-content: flex-start;
					}
					&_right {
						flex: 1;
						height: 40rpx;
						display: flex;
						align-items: center;
						justify-content: flex-end;
					}
				}
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