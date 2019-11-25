<!--
 * @Description: 个人信息
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-26 02:07:35
 * @LastEditTime: 2019-11-26 02:24:41
 * @LastEditors: Edmund
 -->


<template>
  <view class="container" :style="{	height: windowHeight + 'px',
																		minHeight: windowHeight + 'px'}">
    <view class="sheet">
      <block v-for="(item,idx) in sheetList" :key="idx">
          <view class="sheet_item">
            <view class="sheet_item_l">{{item.name}}</view>
            <view class="sheet_item_r">{{'testting'}}</view>
          </view>
      </block>
    </view>
	</view>
</template>

<script>
let that
export default {
	name: 'user-information',
	components: {},
	props: {},
	data() {
		return {
			windowHeight: 0,
			// TODO: sheetItem 数据
			sheetList: [
				{
					name: '头像'
				},
				{
					name: '修改昵称'
				}
			]
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

<style lang="scss" scoped>
.container {
	background: $default-bg-gray;
	.sheet {
		width: 100vw;
		display: flex;
		flex-direction: column;
		background: $default-bg-white;
		&_item {
			padding: 0 20rpx;
			border-bottom: 1rpx solid $default-border-color-gray;
			display: flex;
			align-items: center;
			height: 88rpx;
			font-size: 34rpx;
			&_l {
				flex: 1;
				display: flex;
				justify-content: flex-start;
			}
			&_r {
				flex: 1;
				color: $default-text-color-inverse;
				display: flex;
				justify-content: flex-end;
			}
		}
	}
}
</style>
