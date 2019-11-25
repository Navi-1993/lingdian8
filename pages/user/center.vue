<!--
 * @Description: 个人中心页面
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-25 11:06:28
 * @LastEditTime: 2019-11-25 13:54:09
 * @LastEditors: Edmund
 -->


<template>
  <view class="container" :style="{	height: windowHeight + 'px',
																		minHeight: windowHeight + 'px',
																		background:'blue'}">

    <view class="header">
			<!-- #ifndef H5 -->
			<view class="status"></view>
			<!-- #endif -->
			<view class="setting iconfont">&#xe657;</view>
			<view class="user">
				<image 	src="/static/assets/default.png"
								class="head"
								mode="aspectFill"></image>
				<text class="name">{{userName}}</text>
				<text class="arrow_r iconfont">&#xe602;</text>
			</view>
			<view class="controls">
				<view class="controls_l">
					当前积分: 0
				</view>
				<view class="controls_c">|</view>
				<view class="controls_r">
					<text class="iconfont">&#xe659;</text>
					签到领积分
				</view>
			</view>
    </view>
    <view class="content">
			<view class="sheet">
				<block>
					<view class="sheet_item"></view>
				</block>
			</view>
    </view>
	</view>
</template>

<script>
let that
export default {
	name: '',
	components: {},
	props: {},
	data() {
		return {
			windowHeight: 0,
			// TODO: 个人中心数据
			userName: '测试数据长达九个字',
			// TODO: 操作菜单数据
			sheetData: [
				{
					name: '积分商城',
					iconfont: '',
					color: '',
					url: ''
				},
				{
					name: '任务大厅',
					iconfont: '',
					color: '',
					url: ''
				},
				{
					name: '意见反馈',
					iconfont: '',
					color: '',
					url: ''
				},
				{
					name: '邀请朋友赚积分',
					iconfont: '',
					color: '',
					url: ''
				}
			]
		}
	},
	beforeCreate() {
		// #ifndef APP-PLUS
		console.time('renderTime')
		// #endif
	},
	created() {
		that = this
		that.windowHeight = that.$sysCall.windowHeight
	},
	onLoad() {},
	onShow() {},
	onReady() {
		// #ifndef APP-PLUS
		console.log(
			'%c如果渲染用时超过3秒，则列入待优化项目',
			'color: yellow; background-color: black;padding: 2px'
		)
		console.timeEnd('renderTime')
		console.log(`%c${that.$Route.path}`, 'color:yellow;background-color:black')
		// #endif
	},
	onHide() {},
	onUnload() {},
	onPullDownRefresh() {},
	onReachBottom() {},
	onShareAppMessage() {},
	onPageScroll() {},
	methods: {},
	computed: {},
	watch: {}
}
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	.header {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 362rpx;
		background: $default-bg-black1;
		.status {
			height: var(--status-bar-height);
		}
		.setting {
			height: 88rpx;
			display: flex;
			justify-content: flex-end;
			margin-right: 20rpx;
			align-items: center;
			color: $default-text-color-white;
			font-size: 36rpx;
		}
		.user {
			flex: 1;
			display: flex;
			align-items: center;
			position: relative;
			.head {
				height: 118rpx;
				width: 118rpx;
				margin-right: 40rpx;
			}
			.name {
				font-size: 34rpx;
				color: $default-text-color-white;
			}
			.arrow_r {
				@include center;
				right: 40rpx;
				top: 50%;
				color: $default-text-color-white;
				font-size: 36rpx;
				transform: rotate(180deg);
			}
		}
		.controls {
			height: 86rpx;
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: $default-text-color-white;
			&_c {
			}
			&_l,
			&_r {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			&_r {
				.iconfont {
					margin-right: 20rpx;
				}
			}
		}
	}
	.content {
		background: red;
		height: 884rpx;
	}
}
</style>
