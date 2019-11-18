<!--
 * @Description: 视频首页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 14:20:23
 * @LastEditTime: 2019-11-19 01:45:11
 * @LastEditors: Edmund
 -->

<template>
  <view class="container" :style="{ height: windowHeight + 'px' }">
    <!-- #ifdef H5 -->
    <!-- <d-player class="dplayer"> </d-player> -->
    <block v-for="item in 10" :key="item">
      <div :id="'id' + item">{{ item }}</div>
    </block>
    <!-- #endif -->
  </view>
</template>

<script>
let that
// #ifdef H5
import Player from 'xgplayer'
// #endif
export default {
	name: 'video',
	components: {},
	props: {},
	created() {
		that = this
	},
	onLoad() {},
	onShow() {
		// #ifdef APP-PLUS
		// 通过id获取nvue子窗体
		const playerNVue = uni.getSubNVueById('myplayer')
		// 打开 nvue 子窗体
		playerNVue.show('slide-in-right', 300, function() {
			console.log('open')
		})
		// #endif
	},
	mounted() {
		uni.getSystemInfo({
			success: function(res) {
				that.windowHeight = res.windowHeight
			}
		})
		that.multiPlayerInit()
	},
	onHide() {},
	onUnload() {},
	data() {
		return {
			windowHeight: 0 // 设备可用高度
		}
	},
	methods: {},
	computed: {},
	watch: {}
}
</script>

<style lang="scss" scoped>
.container {
	width: 100vw;
	display: flex;
	flex-direction: column;
	position: relative;
	overflow-y: auto;
	background: gray;
}
</style>
