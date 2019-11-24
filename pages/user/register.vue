<!--
 * @Description: 注册页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-10 21:42:14
 * @LastEditTime: 2019-11-23 22:02:00
 * @LastEditors: Edmund
 -->

<template>
  <view class="container">
    <view class="topLayout">
      <image class="iconLogo"></image>
    </view>
    <view class="contentLayout" :style="[{ height: contentHeight }]">
      <input
        class="input1"
        placeholder="请输入手机号"
        v-model="phoneNo"
        maxlength="11"
        type="number"
      />
      <view>
        <!-- TODO:getCode btn -->
        <view class="btGet" @tap.stop="handleGetCode">
          {{ count }}
        </view>
        <input
          class="input2"
          v-model="code"
          placeholder="请输入手机验证码"
          type="text"
        />
      </view>
      <input
        class="input1"
        placeholder="请输入密码"
        v-model="password"
        type="password"
      />
      <button class="btSubmit" type="default" @tap.stop="handleRegister">
        注册
      </button>
    </view>
    <!--toast提示-->
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
let that
import _ from 'underscore'
import tuiToast from 'components/extend/toast/toast.vue'
import { sendSMS, register } from 'api/user.js'
export default {
	name: '',
	components: {
		tuiToast
	},
	props: {},
	data() {
		return {
			contentHeight: '0px',
			phoneNo: '',
			password: '',
			code: '',
			count: '获取',
			isgetCode: true
		}
	},
	beforeCreate() {
		// #ifndef APP-PLUS
		console.time('renderTime')
		// #endif
	},
	created() {
		that = this
		uni.getSystemInfo({
			success(res) {
				let naviHeight = 45
				if (res.platform == 'android') {
					naviHeight = 50
				}
				that.contentHeight =
					res.windowHeight -
					res.statusBarHeight -
					naviHeight -
					uni.upx2px(360 - 100 - 20) +
					'px'
			}
		})
	},
	onLoad() {},
	onShow() {
		console.log(that.count, 'timer')
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
	onHide() {
		clearInterval(timer)
	},
	onUnload() {
		console.log('unload')
	},
	methods: {
		/**
		 * @Description: 使用工具函数的节流方法，让执行事件时产生间隔
		 */
		handleGetCode: _.throttle(async () => {
			if (that.isgetCode === false) return
			that.isgetCode = false
			that.count = 59
			let timer = setInterval(() => {
				that.count--
				// console.log(that.count, 'timer')
				// 边界值处理
				if (that.count === 0) {
					that.count = '获取'
					that.isgetCode = true
					// 到0清除定时器
					clearInterval(timer)
				}
			}, 1000)
			// 离开页面清除定时器
			that.$once('hook:beforeDestroy', () => {
				clearInterval(timer)
			})
			let res = await sendSMS({
				phone: that.phoneNo,
				smsType: 1 // 1 = 注册用短信类型
			})
			if (res.statusCode === 200) {
				that.$sysCall.toast(res.data.resultMsg)
			}
		}, 5000),

		/**
		 * @Description: 点击注册按钮
		 */
		async handleRegister() {
			// 拼接参数
			let params = {
				code: that.code,
				password: that.password,
				phone: that.phoneNo,
				smsType: 1
			}
			let res = await register(params)
			if (res.statusCode === 200) {
				that.$sysCall.toast(res.data.resultMsg)
				if (res.resultCode === 1) {
					// do sth
					console.log('success')
				}
			}
		}
	},
	computed: {},
	watch: {}
}
</script>

<style lang="scss" scoped>
page {
	background-color: $default-bg-white;
}

.topLayout {
	background-color: $default-bg-black;
	height: 360rpx;
	.iconLogo {
		background-color: $default-color-warning;
		width: 180rpx;
		height: 180rpx;
		border-radius: 8rpx;
		margin-top: 20rpx;
		margin-left: 285rpx;
	}
}

.contentLayout {
	background-color: $default-bg-white;
	border-radius: 10rpx;
	margin-top: -100rpx;
	width: 690rpx;
	margin-left: 30rpx;
	-moz-box-shadow: 0px 0px 5px $default-border-shadow;
	-webkit-box-shadow: 0px 0px 5px $default-border-shadow;
	box-shadow: 0px 0px 5px $default-border-shadow;
	padding-top: 40rpx;
	.input1 {
		width: 580rpx;
		height: 80rpx;
		margin-left: 45rpx;
		border: solid 1px $default-border-color;
		border-radius: 40rpx;
		font-size: 30rpx;
		text-align: center;
		padding: 0 10rpx;
		margin-bottom: 20rpx;
	}
	.input2 {
		width: 320rpx;
		height: 80rpx;
		margin-left: 45rpx;
		text-align: center;
		border: solid 1px $default-border-color;
		border-radius: 40rpx;
		font-size: 30rpx;
		padding: 0 130rpx;
		margin-bottom: 20rpx;
	}
	.btGet {
		width: 140rpx;
		height: calc(80rpx + 2px);
		line-height: calc(80rpx + 2px);
		text-align: center;
		color: $default-text-color-white;
		font-size: 30rpx;
		background-color: $default-bg-black;
		border-top-right-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
		position: absolute;
		margin-left: 510rpx;
	}
	.btSubmit {
		color: $default-text-color-white;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		font-size: 30rpx;
		width: 600rpx;
		background-color: $default-bg-black;
		margin-top: 120rpx;
	}
}
</style>
