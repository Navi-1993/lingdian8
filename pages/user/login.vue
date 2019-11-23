<!--
 * @Description: 登陆页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-06 17:16:48
 * @LastEditTime: 2019-11-23 21:51:53
 * @LastEditors: Edmund
 -->
<template>
  <view class="container">
    <view class="topLayout">
      <image class="iconLogo"></image>
    </view>
    <view class="contentLayout" :style="[{ height: contentHeight }]">
      <input
        class="inputItem"
        placeholder="请输入手机号"
        type="text"
        maxlength="11"
        confirm-type="确定"
        v-model="phoneNo"
      />
      <input	class="inputItem"
							placeholder="请输入密码"
							v-model="password"
							password
							maxlength="16"
							type="text"/>
      <button class="btLogin" type="default" @tap.stop="handleLogin">
        登录
      </button>
      <navigator class="forgetText" url="/pages/user/reset-psw">
        忘记密码?
      </navigator>
      <button class="btRegister" @tap.stop="naviToRegister" type="default">
        注册
      </button>
    </view>
    <!--toast提示-->
    <toast ref="toast"></toast>

    <!-- 悬浮按钮 -->
    <fab	:left="left"
					:right="right"
					:bottom="bottom"
					:bgColor="bgColor"
					:btnList="btnList"
					@click="fabClick">
    </fab>
  </view>
</template>

<script>
let that
import { login } from 'api/user.js'
import toast from 'components/extend/toast/toast.vue'
import fab from 'components/tui-fab/tui-fab.vue'
export default {
	name: 'login',
	props: {},
	components: {
		toast,
		fab
	},
	data() {
		return {
			left: 0,
			right: 80,
			bottom: 100,
			bgColor: '#5677fc',
			btnList: [],
			fabList: [
				{
					bgColor: '#16C2C2',
					text: '去拖拽页',
					fontSize: 20,
					color: '#fff'
				},
				{
					bgColor: '#64B532',
					text: '去聊天室',
					fontSize: 20,
					color: '#fff'
				},
				{
					bgColor: '#FFA000',
					text: '待引入',
					fontSize: 20,
					color: '#fff'
				}
			],
			contentHeight: '0px',
			phoneNo: '',
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
	mounted() {
		that.btnList = [...that.fabList]
	},
	onLoad() {},
	methods: {
		/**
		 * @Description: 浮动按钮点击
		 */
		fabClick(e) {
			let idx = e.index
			switch (idx) {
				case 0:
					uni.navigateTo({
						url: '/pages/home/drag'
					})
					break
				case 1:
					uni.navigateTo({
						url: '/pages/home/chatroom'
					})
					break
			}
		},
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
		 * TODO: 登录内容
		 */
		async handleLogin() {
			// 拼接参数
			let params = {
				password: that.password,
				phone: that.phoneNo,
				registeIp: that.registeIp,
				deviceType: that.deviceType
			}
			// 同步处理异步请求
			let res = await login(params)
			if (res.statusCode === 200) {
				// 接口调用后返回提示内容
				that.$sysCall.toast(res.data.resultMsg)
				// 接口返回状态码不为1，则退出方法
				if (res.data.resultCode !== 1) return
				// TODO: 周一改为vuex 存储 登陆成功后更新本地user数据
				uni.setStorage({
					key: 'user',
					data: {
						phoneNo: that.phoneNo,
						token: res.data.data.token,
						registeIp: res.data.data.registeIp,
						deviceType: that.deviceType,
						systemInfo: uni.getSystemInfoSync()
					},
					success: function() {
						console.log('user info inject success')
					}
				})
			}
		}
	},
	computed: {
		registeIp() {
			return uni.getStorageSync('user').registeIp || ''
		},
		deviceType() {
			return uni.getSystemInfoSync().system
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
