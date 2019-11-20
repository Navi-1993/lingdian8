<!--
 * @Description: 视频首页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-10-21 14:20:23
 * @LastEditTime: 2019-11-21 01:24:23
 * @LastEditors: Edmund
 -->

<template>
  <view class="container" :style="{ height: windowHeight + 'px' }">
    <!-- #ifdef H5 -->
    
    <!-- #endif -->
  </view>
</template>

<script>
let that

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
			console.log('nvue open')
		})
		// #endif
	},
	mounted() {
		that.windowHeight = that.$sysCall.windowHeight()
	},
	onHide() {},
	onUnload() {},
	data() {
		return {
			windowHeight: 0
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
}
</style>
