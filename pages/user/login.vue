<!--
 * @Description: 登陆页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-06 17:16:48
 * @LastEditTime: 2019-11-13 02:32:35
 * @LastEditors: Edmund
 -->
<template>
	<view class="container">
		<view class="topLayout">
			<image class="iconLogo"></image>
		</view>
		<view   class="contentLayout"
            :style="[{'height':contentHeight}]">
        <input  class="inputItem"
                placeholder="请输入手机号"
                v-model="userName"
                @change="console.log(userName)"
                type="number" />
        <input  class="inputItem"
                placeholder="请输入密码"
                v-model="password"
                type="password" />
        <button class="btLogin"
                type="default"
                @tap.stop="handleLogin">
                登录
        </button>
        <navigator  class="forgetText"
                    url="/pages/user/reset-psw">
              忘记密码?
        </navigator>
        <button class="btRegister"
                @tap.stop="naviToRegister"
                type="default">
                注册
        </button>
		</view>
	</view>
</template>

<script>
let that
import { login } from 'api/user.js'
export default {
	data() {
		return {
			contentHeight: '0px',
			userName: '',
			password: ''
		}
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
	mounted() {},
	onLoad() {},
	methods: {
		/**
		 * @Description: 跳转至注册页
		 */
		naviToRegister() {
			uni.navigateTo({
				url: '/pages/user/register'
			})
		},
		/**
		 * @Description: 点击登录按钮
		 */
		async handleLogin() {
			// 拼接参数
			let params = {
				password: that.password,
				phone: that.userName
			}
			// 同步处理异步请求
			let res = await login(params)
			if (res.statusCode === 200) {
				// 登陆成功后更新本地user数据
				uni.setStorage({
					key: 'user',
					data: {
						userName: 'xuefeng',
						phoneNo: '13650970597',
						token: 'aaa'
					},
					success: function() {
						console.log('success')
					}
				})
			}
		}
	}
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
	-moz-box-shadow: 0rpx 0rpx 5rpx $default-border-shadow;
	-webkit-box-shadow: 0rpx 0rpx 5rpx $default-border-shadow;
	box-shadow: 0rpx 0rpx 5rpx $default-border-shadow;
	padding-top: 40rpx;
	.inputItem {
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
	.btLogin {
		color: $default-text-color-white;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		font-size: 30rpx;
		width: 600rpx;
		background-color: $default-bg-black;
		margin-top: 80rpx;
	}
	.btRegister {
		color: $default-bg-black;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		font-size: 30rpx;
		width: 600rpx;
		border: solid 1px $default-bg-black;
		background-color: $default-bg-white;
	}
	.forgetText {
		color: $default-text-color-inverse;
		font-size: 26rpx;
		line-height: 60rpx;
		float: right;
		margin-right: 45rpx;
	}
}
</style>
