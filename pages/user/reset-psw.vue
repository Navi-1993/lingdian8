<!--
 * @Description: 重置密码
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-10 21:43:59
 * @LastEditTime: 2019-11-15 10:42:50
 * @LastEditors: Edmund
 -->

<template>
    <view class="container">
        <input  class="input1" 
                placeholder="请输入手机号"
								maxlength="11"
                v-model="phoneNo" 
                type="number" />
            <view>
                  <view class="btnGet"
                        @tap.stop="handleGetCode">
                        {{count}}
                  </view>
                  <input  class="input2" 
                          placeholder="请输入手机验证码"
                          v-model="code"
                          type="number" />
            </view>
        <input  class="input1" 
                placeholder="新密码"
                v-model="newPsw"
                type="password" />
        <input  class="input1"
                placeholder="确认密码"
                v-model="confirmPsw"
                type="password" />
        <button class="btnSubmit" 
                type="default"
                @tap.stop="tapConfirm">
                确定
		</button>
		<!--toast提示-->
    	<tui-toast ref="toast"></tui-toast>
    </view>
</template>

<script>
let that
import _ from 'underscore'
import tuiToast from 'components/extend/toast/toast.vue'
import { resetPsw, sendSMS } from 'api/user.js'
export default {
	name: '',
	components: {
		tuiToast
	},
	props: {},
	data() {
		return {
			isGetCode: false,
			count: '获取',
			phoneNo: '', // input-手机号码
			code: '', // input-验证码
			newPsw: '', // input-新密码
			confirmPsw: '' //input-确认密码
		}
	},
	beforeCreate() {
		// #ifndef APP-PLUS
		console.time('renderTime')
		// #endif
	},
	created() {
		that = this
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
		/**
		 * @Description: 点击获取按钮执行方法
		 */
		handleGetCode: _.throttle(async () => {
			if (that.isgetCode === false) return
			that.isgetCode = false
			that.count = 59
			let timer = setInterval(() => {
				that.count--
				// 边界值处理
				if (that.count === 0) {
					that.count = '获取'
					that.isgetCode = true
					clearInterval(timer) // 到0清除定时器
				}
			}, 1000)
			// 离开页面卸载定时器
			that.$once('hook:beforeDestroy', () => {
				clearInterval(timer)
			})
			let res = await sendSMS({
				phone: that.phoneNo,
				smsType: 2 // 2 = 重置短信
			})
			if (res.statusCode === 200) {
				// do sth you want
				that.$refs.toast.show({
					title: '短信发送成功',
					icon: false,
					duration: 1000
				})
			}
		}, 5000),

		/**
		 * @Description: 点击`确认`按钮执行方法
		 * @param {number} smsType 短信类型，1=注册，2=重置密码
		 */
		async tapConfirm() {
			let params = {
				code: that.code,
				password: that.newPsw,
				confirmPwd: that.confirmPsw,
				phone: that.phoneNo,
				smsType: 2
			}
			let res = await resetPsw(params)
			console.log(res)
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

.container {
	margin-left: 30rpx;
	margin-top: 40rpx;
	.input1 {
		width: 580rpx;
		height: 80rpx;
		line-height: 50rpx;
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
		line-height: 50rpx;
		margin-left: 45rpx;
		border: solid 1px $default-border-color;
		border-radius: 40rpx;
		font-size: 30rpx;
		text-align: center;
		padding: 0 130rpx;
		margin-bottom: 20rpx;
	}
	.btnSubmit {
		color: $default-bg-white;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		font-size: 30rpx;
		width: 600rpx;
		background-color: $default-bg-black;
		margin-top: 120rpx;
	}
	.btnGet {
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
}
</style>