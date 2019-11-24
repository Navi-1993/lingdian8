<!--
 * @Description: 视频详情
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-24 10:20:42
 * @LastEditTime: 2019-11-24 18:36:33
 * @LastEditors: Edmund
 -->

<template>
  <view class="container" :style="{ height: windowHeight + 'px',
                                    minHeight: windowHeight + 'px'}">
    
    <!-- #ifdef APP-PLUS || MP -->
    <u-parse :content="html"
            :noData="'当前新闻没有数据'"/>
    <!-- #endif -->

		<!-- #ifdef H5 -->
		<div 	v-html="html"
					style="	padding: 0 20rpx;">
		</div>
		<!-- #endif -->
		<view class="footer">
			<input 	type="text"
							class="input"
							placeholder="评论功能尚未接入"
							v-model="inputValue"/>
			<text class="iconfont"
						@tap.stop="votting">
				&#xe603;
			</text>
		</view>
  </view>
</template>

<script>
let that
import uParse from 'components/gaoyia-parse/parse.vue'
import { queryNewsContent } from 'api/news.js'
export default {
	name: 'news-detail',
	components: {
		uParse
	},
	props: {},
	data() {
		return {
			windowHeight: 0,
			html_start: `<!DOCTYPE html>
						<html lang="en">
						<head>
							<meta charset="UTF-8">
							<meta name="viewport" content="width=device-width, initial-scale=1.0">
							<meta http-equiv="X-UA-Compatible" content="ie=edge">
							<title>Document</title>
						</head>
						<body>`,
			html_end: `	
									<div style="height:100px;width:100%;"></div>
									</body>
									</html>`,
			content: `<div>该文章无最新数据</div>`,
			inputValue: ''
		}
	},
	beforeCreate() {
		// #ifndef APP-PLUS
		console.time('renderTime')
		// #endif
	},
	created() {
		that = this
		console.log('that.$Route.query.id', that.$Route)
		that.windowHeight = that.$sysCall.windowHeight()
		// #ifdef H5
		that._queryNewsContent(that.$Route.query.id)
		// #endif
	},
	mounted() {},
	onLoad(option) {
		// #ifdef APP-PLUS || MP
		console.log('option.id', option.id)
		that._queryNewsContent(option.id)
		// #endif
	},
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
	methods: {
		async _queryNewsContent(id) {
			let params = id
			let res = await queryNewsContent(params)
			if (res.statusCode === 200) {
				that.content = res.data.data.newsContent
			}
		},
		votting() {
			that.$sysCall.toast('点赞成功')
		}
	},
	computed: {
		html() {
			return that.html_start + that.content + that.html_end
		}
	},
	watch: {}
}
</script>

<style lang="scss" scoped>
.container {
	position: relative;
	display: flex;
	flex-direction: column;
	font-size: 30rpx;
	// #ifdef APP-PLUS || MP
	padding: 0 20rpx;
	// #endif
	padding-bottom: 98rpx;
	background: $default-bg-white;

	.footer {
		width: 100vw;
		height: 98rpx;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		background: $default-border-color-gray;
		border-top: 1px solid $default-border-color-gray;
		background: $default-bg-white;
		position: fixed;
		bottom: 0;
		z-index: 100;
		.input {
			width: 640rpx;
			height: 68rpx;
			border: 1rpx solid $default-border-color-gray;
			border-radius: 12rpx;
			padding-left: 16rpx;
			margin-right: 16rpx;
			font-size: 26rpx;
		}
		.iconfont {
			font-size: 36rpx;
		}
	}
}
</style>
