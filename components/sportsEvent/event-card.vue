<!--
 * @Description: 赛事信息卡片组件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-28 14:37:31
 * @LastEditTime: 2019-11-26 15:32:10
 * @LastEditors: Edmund
 -->


<template>
    <view class="container">
        <view class="eventCard_content">
            <view class="eventCard_title">
              <slot name="text" />
            </view>
            <view class="team">
              <view class="teamA">
                <image :src="teamALogo || '/static/assets/teamLogo_default.png'"/>
                <text>{{homeTeamName}}</text>
              </view>
              <view class="controls">
								<view class="status">{{matchStatement}}</view>
                <text class="iconfont"
											v-if="!isVsLogo">&#xe600;</text>
								<view class="vsLogo"
											v-if="isVsLogo">VS</view>
                <text class="videoControls"
                      @tap="bottomToast">
                      视频直播
                </text>
              </view>
              <view class="teamB">
                <image :src="teamBLogo || '/static/assets/teamLogo_default.png'"/>
                <text>{{guestTeamName}}</text>
              </view>
            </view>
        </view>
    </view>
</template>


<script>
// import { dev } from 'config.js'
export default {
	name: 'eventCard',
	props: {
		isVsLogo: {
			type: Boolean,
			default: false
		},
		status: {
			type: String
		},
		homeTeamName: {
			type: String,
			default: 'homeTeamName'
		},
		guestTeamName: {
			type: String,
			default: 'guestTeamName'
		},
		livesUrl: {
			type: Array,
			default: []
		},
		teamALogo: {
			type: String,
			default: ''
		},
		teamBLogo: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			// baseurl: dev.BASE_URL
		}
	},
	created() {},
	onLoad() {},
	onReady() {},
	onUnload() {},
	methods: {
		/**
		 * @Description: 底部弹窗
		 * @param {type}
		 * @return:
		 */

		bottomToast() {
			this.$emit('toast', {})
		}
	},
	computed: {
		matchStatement() {
			let str
			switch (this.status) {
				case '0':
					str = '进行中'
					break
				case '1':
					str = '未开始'
					break
				case '2':
					str = '已结束'
					break
			}
			return str
		}
	},
	watch: {}
}
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	padding-top: 24rpx;
	width: 100vw;
	height: 206rpx;
}
.eventCard_title {
	display: flex;
	font-size: 24rpx;
	width: 100vw;
	justify-content: center;
}
.team {
	display: flex;
	font-size: 26rpx;
	image {
		width: 88rpx;
		height: 88rpx;
	}
	.teamA,
	.controls,
	.teamB {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.teamA {
		margin-left: 106rpx;
	}
	.controls {
		margin: 0 122rpx 0 122rpx;
		width: 118rpx;
		color: $default-text-color-inverse;
		.status {
			font-size: 22rpx;
		}
		text {
			font-size: 40rpx;
		}
		.videoControls {
			display: flex;
			height: 40rpx;
			padding: 0 20rpx;
			width: 110rpx;
			justify-content: center;
			align-items: center;
			margin-top: 18rpx;
			border-radius: 15rpx;
			background-color: $default-bg-black;
			color: $default-text-color-white;
			font-size: 18rpx;
		}
	}
	.vsLogo {
		font-size: 36rpx;
	}
}
</style>