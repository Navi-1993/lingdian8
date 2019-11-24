<!--
 * @Description: 视频首页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 14:20:23
 * @LastEditTime: 2019-11-24 20:33:42
 * @LastEditors: Edmund
 -->

<template>
  <view
    class="container"
    :style="{ height: windowHeight + 'px', minHeight: windowHeight + 'px' }"
  >
    <!-- #ifdef H5 || MP -->
    <!-- tabbar -->
    <scroll-view
      class="tab-view"
      :scroll-x="true"
      :scroll-with-animation="true"
      :scroll-left="scrollLeft"
    >
      <block v-for="(item, idx) in tabbarList" :key="idx">
        <view
          class="tab-bar-item"
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
      @change="switchTab"
    >
      <block v-for="(item, idx) in 10" :key="idx">
        <swiper-item>
          <scroll-view
            :scroll-y="true"
            :style="{ height: windowHeight - 40 + 'px' }"
            :scroll-with-animation="true"
            :scroll-left="scrollLeft"
          >
            <block v-for="(item, idx) in videoList" :key="idx">
              <view class="card" @tap.stop="navi2(item)">
                <view class="poster">
                  <!-- item.imgHref -->
                  <image src="http://47.112.131.52:83/1c9e79dd-2991-4efc-b719-b42783b346bf.jpg" class="image" mode="aspectFill">
                  </image>
                  <text class="playBtn iconfont">
                    &#xe620;
                  </text>
                </view>
                <view class="controls">
                  <view class="sheet_l">
                    <view style="margin-right:10rpx" class="iconfont">
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
			scrollLeft: 0, //tab标题的滚动条位置
			isLoading: false, // 加载弹窗
			// TODO: 视频所用数据
			videoList: []
		}
	},
	created() {
		that = this
		that._queryVideoTitle()
	},
	onShow() {
		// #ifdef APP-PLUS
		// 通过id获取nvue子窗体
		const playerNVue = uni.getSubNVueById('myplayer')
		// 打开 nvue 子窗体
		playerNVue.show('slide-in-right', 300, function() {
			console.log('nvue open')
		})
		// #endif
	},
	mounted() {
		that.windowHeight = that.$sysCall.windowHeight()
		that._queryAllEvent()
	},
	methods: {
		/**
		 * @Description: 请求视频标题列表
		 */

		_queryVideoTitle: _.debounce(async () => {
			let params = {
				id: that.tabbarList[that.currentTab].id,
				// limit: 20,
				offset: 1,
				type: 5
			}
			let res = await queryVideoTitle(params)
			if (res.statusCode === 200) {
				// console.log('请求视频标题列表', res.data.data)

				that.videoList = res.data.data.list
			}
		}, 1000),
		// 点击标题切换当前页时改变样式
		swichNav: function(idx) {
			that.currentTab = idx
		},

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
				that.tabbarList = res.data.data.list
			}
		},

		navi2(item) {
			that.$Router.push({
				path: '/pages/video/detail',
				params: { item: item }
			})
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
			// #ifdef H5
			that.videoList = []
			// #endif
			that.checkCor()
			that._queryVideoTitle()
		},

		/**
		 * @Description: 判断当前滚动超过一屏时，设置tab标题滚动条
		 */
		checkCor: function() {
			if (that.currentTab === 0) {
				that.scrollLeft = 0
			}
			// 如果当前选项卡索引值大于5，设置横向滚动条
			if (that.currentTab > 5) {
				that.scrollLeft = 30 * that.currentTab
			}
		}
	},
	computed: {},
	watch: {}
}
</script>

<style lang="scss" scoped>
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
