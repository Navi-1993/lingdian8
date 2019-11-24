<!--
 * @Description: 页面模板
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-20 09:39:27
 * @LastEditTime: 2019-11-24 12:19:06
 * @LastEditors: Edmund
 -->

<template>
  <view class="container" :style="{	height: windowHeight + 'px',
																		minHeight: windowHeight + 'px'}">

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
			windowHeight: 0
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
	methods: {},
	computed: {},
	watch: {}
}
</script>

<style lang="scss" scoped></style>
