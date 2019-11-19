<!--
 * @Description: 进度条
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-19 10:43:39
 * @LastEditTime: 2019-11-19 13:40:51
 * @LastEditors: Edmund
 -->

<template>
    <view class="container">
				<view class="leftNum"
							@tap="leftTap">
					<text class="iconfont">&#xe603;</text>
					{{leftNum}}
				</view>
				<view class="rightNum"
								@tap="rightTap">
					<text class="iconfont">&#xe603;</text>
					{{rightNum}}
				</view>
        <progress :percent="percent"
                  :active="isAnimate"
                  :stroke-width="barHeight"
                  :activeColor="leftBgColor"
                  :backgroundColor="rightBgColor"/>
    </view>
</template>


<script>
let that
export default {
	name: '',
	components: {},
	props: {
		barHeight: {
			type: Number,
			default: 3
		},
		percent: {
			type: Number,
			default: 50
		},
		leftBgColor: {
			type: String,
			default: '#FF8400'
		},
		rightBgColor: {
			type: String,
			default: '#1B1B30'
		},
		isAnimate: {
			type: Boolean,
			default: false
		},
		leftNum: {
			type: Number,
			default: 0
		},
		rightNum: {
			type: Number,
			default: 0
		}
	},
	beforeCreate() {},
	created() {
		that = this
	},
	beforeMount() {},
	mounted() {},
	beforeDestroy() {},
	destroyed() {},
	methods: {
		leftTap() {
			that.$emit('leftTap', {})
		},
		rightTap() {
			that.$emit('rightTap', {})
		}
	},
	computed: {},
	watch: {}
}
</script>

<style lang="scss" scoped>
.container {
	height: 40rpx;
	position: relative;
	.leftNum {
		position: absolute;
		left: 20rpx;
		top: 0;
		color: #ff8400;
		font-size: 22rpx;
	}
	.rightNum {
		position: absolute;
		right: 20rpx;
		top: 0;
		color: #1b1b30;
		font-size: 22rpx;
	}
}
</style>