<!--
 * @Description: 个人中心页面
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-25 11:06:28
 * @LastEditTime: 2019-11-26 02:18:41
 * @LastEditors: Edmund
 -->


<template>
  <view class="container" :style="{	height: windowHeight + 'px',
																		minHeight: windowHeight + 'px',}">

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
				<text class="arrow_r iconfont"
							@tap.stop="navi2Information">&#xe602;</text>
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
				<block v-for="(item,idx) in sheetData" :key="idx">
					<view class="sheet_item"
								@tap.stop="sheetTap(item)">
						<text class="sheet_item_l iconfont" :style="{	color:item.color}">
							{{item.iconfont}}
						</text>
						<view class="sheet_item_c">{{item.name}}</view>
						<view class="sheet_item_r iconfont"> &#xe602;</view>
					</view>
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
					iconfont: '\ue62b',
					color: '#cc69d6',
					url: ''
				},
				{
					name: '任务大厅',
					iconfont: '\ue60b',
					color: '#4191d2',
					url: ''
				},
				{
					name: '意见反馈',
					iconfont: '\ue607',
					color: '#4191be',
					url: ''
				},
				{
					name: '邀请朋友赚积分',
					iconfont: '\ue608',
					color: '#d0a5a1',
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
	methods: {
		sheetTap(item) {
			that.$sysCall.toast(item.name + '功能未开放')
		},
		navi2Information() {
			that.$Router.push({
				path: '/pages/user/information'
			})
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
				margin: 0 40rpx;
				border-radius: 50%;
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
			background: url('../../static/assets/bg_mask.png') no-repeat;
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
		padding: 20rpx 20rpx 0 20rpx;
		height: 950rpx;
		// flex: 1;
		background: $default-bg-gray;
		.sheet {
			width: 690rpx;
			height: 395rpx;
			background: $default-bg-white;
			box-shadow: 0rpx 1rpx 10rpx 0rpx $default-shadow-color;
			border-radius: 12rpx;
			padding: 0 10rpx;
			:nth-last-child(1) {
				border-bottom: none;
			}
			&_item {
				position: relative;
				box-sizing: border-box;
				height: 98rpx;
				border-bottom: 1rpx solid $default-border-color-gray;
				display: flex;
				align-items: center;
				font-size: 36rpx;
				&_l {
					margin-right: 20rpx;
				}
				&_r {
					transform: rotate(180deg);
					position: absolute;
					right: 0;
					margin-right: 10rpx;
					color: $default-text-color-inverse;
				}
			}
		}
	}
}
</style>
