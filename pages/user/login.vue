<!--
 * @Description: 登陆页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-06 17:16:48
 * @LastEditTime: 2019-11-15 12:10:51
 * @LastEditors: Edmund
 -->
<template>
  <view class="container">
    <view class="topLayout">
      <image class="iconLogo"></image>
    </view>
    <view class="contentLayout"
					:style="[{ height: contentHeight }]">
      <input
        class="inputItem"
        placeholder="请输入手机号"
        type="text"
        maxlength="11"
        confirm-type="确定"
        v-model="phoneNo"
      />
      <input
        class="inputItem"
        placeholder="请输入密码"
        v-model="password"
        password
        maxlength="16"
        type="text"
      />
      <button class="btLogin"
							type="default"
							@tap.stop="handleLogin">
        登录
      </button>
      <navigator 	class="forgetText" 
									url="/pages/user/reset-psw">
        忘记密码?
      </navigator>
      <button 	class="btRegister"
								@tap.stop="naviToRegister"
								type="default">
        注册
      </button>
    </view>
    <!--toast提示-->
    <tui-toast ref="toast"></tui-toast>
		<tui-fab 	:left="left"
							:right="right"
							:bottom="bottom"
							:bgColor="bgColor"
							:btnList="btnList"
							>
		</tui-fab>
  </view>
</template>

<script>
let that
import { login } from 'api/user.js'
import tuiToast from 'components/extend/toast/toast.vue'
import tuiFab from 'components/tui-fab/tui-fab.vue'
export default {
	name: 'login',
	props: {},
	components: {
		tuiToast,
		tuiFab
	},
	data() {
		return {
			left: 0,
			right: 80,
			bottom: 100,
			bgColor: '#5677fc',
			btnList: [],
			list2: [
				{
					bgColor: '#16C2C2',
					//名称
					text: '关于',
					//字体大小
					fontSize: 28,
					//字体颜色
					color: '#fff'
				},
				{
					bgColor: '#64B532',
					//名称
					text: '分享',
					//字体大小
					fontSize: 28,
					//字体颜色
					color: '#fff'
				},
				{
					bgColor: '#FFA000',
					//名称
					text: '赞赏',
					//字体大小
					fontSize: 28,
					//字体颜色
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
		that.btnList = [...that.list2]
	},
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
				phone: that.phoneNo,
				registeIp: that.registeIp,
				deviceType: that.deviceType
			}
			// 同步处理异步请求
			let res = await login(params)
			console.log(res)
			if (res.statusCode === 200) {
				// 登陆成功后给出toast提示
				that.$refs.toast.show({
					title: '登陆成功',
					icon: false,
					duration: 1000
				})
				// 登陆成功后更新本地user数据
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
		line-height: 1000rpx;
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
