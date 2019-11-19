<!--
 * @Description: 赛程聊天室
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-19 09:49:44
 * @LastEditTime: 2019-11-19 10:55:51
 * @LastEditors: Edmund
 -->

<template>
  <view class="container" :style="{height: windowHeight + 'px'}">
    <view class="header">
      <event-card :homeTeamName="'中国'"
                  :guestTeamName="'韩国'"
                  :livesUrl="'www.baidu.com'"
                  @toast="test"/>
      <progress-bar></progress-bar>
    </view>
    <view class="body">

    </view>
    <view class="footer">
      <input  type="text"
              class="input"
              placeholder="功能尚未开放"
              v-model="value">
    </view>
  </view>
</template>

<script>
let that
import eventCard from 'components/sportsEvent/event-card.vue'
import progressBar from 'components/sportsEvent/progress-bar.vue'
export default {
	name: 'chatroom',
	components: {
		eventCard,
		progressBar
	},
	props: {},
	data() {
		return {
			windowHeight: 0,
			value: '' // 聊天框value
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
			success: (res) => {
				this.windowHeight = res.windowHeight
			}
		})
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
		// #endif
	},
	onHide() {},
	onUnload() {},
	onPullDownRefresh() {},
	onReachBottom() {},
	onShareAppMessage() {},
	onPageScroll() {},
	methods: {
		test() {
			this.value = parseInt(Math.random() * 100 + 1)
		}
	},
	computed: {},
	watch: {}
}
</script>

<style lang="scss" scoped>
.container {
	width: 100vw;
	display: flex;
	flex-direction: column;
}
.header {
	position: fixed;
	width: 100vw;
	height: 222rpx;
	z-index: 100;
	background: $default-bg-white;
}
.body {
	flex: 1;
	background: $default-bg-grey;
}
.footer {
	position: fixed;
	bottom: 0;
	width: 100vw;
	height: 88rpx;
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;
	background: $default-bg-white;
	.input {
		width: 670rpx;
		height: 60rpx;
		border-radius: 30rpx;
		background: $default-bg-grey;
		padding-left: 40rpx;
	}
}
</style>
