<!--
 * @Description: 新闻首页
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-18 22:07:02
 * @LastEditTime: 2019-11-21 01:32:23
 * @LastEditors: Edmund
 -->

<template>
	<view class="container"
        :style="{ height:windowHeight + 'px'}">
		<swiper-bar :styleObject="styleObject"
                :renderData = "sportNameList">
    </swiper-bar>
		<swiper class="news_banner"
            :circular='true'
            :acceleration='true'
            :skip-hidden-item-layout='true'
            :scrollXshow ="true"
            display-multiple-items = 1
            duration = 100
            previous-margin = "70rpx"
            next-margin = "70rpx"
						:autoplay='true'>
        <swiper-item  class="news_banner_item"
                      v-for="item of 10"
                      :key="item">
            <view >
                <image  class="news_banner_img"
                        mode="aspectFill"
                        src="https://ws1.sinaimg.cn/large/c28979f3gy1g8ed7uh2icj206f06f76u.jpg" />
                <view class="news_banner_mask">
                  
                </view>
                <text class="news_banner_title">{{item}}</text>
            </view>
            
        </swiper-item>
		</swiper>
	</view>
</template>

<script>
import swiperBar from 'components/swiper-bar.vue'
export default {
	name: 'news-index',
	components: {
		swiperBar
	},
	props: {},
	data() {
		return {
			windowHeight: 0,
			styleObject: {
				color: 'black'
			},
			faboriteData: [
				{
					name: '1'
				},
				{
					name: '2'
				},
				{
					name: '3'
				},
				{
					name: '4'
				},
				{
					name: '5'
				},
				{
					name: '6'
				},
				{
					name: '7'
				},
				{
					name: '8'
				}
			]
		}
	},
	computed: {
		sportNameList() {
			return this.faboriteData.map((item) => {
				return item.name
			})
		}
	}
}
</script>

<style lang="scss">
.container {
	.news_banner {
		display: flex;
		align-items: center;
		width: 100vw;
		height: 320rpx;
		border-top: 1rpx solid $default-border-color;
		border-bottom: 1rpx solid $default-border-color;
		&_item {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
		}
		&_img {
			width: 586rpx;
			height: 280rpx;
			border-radius: 10rpx;
		}
		&_mask {
			position: absolute;
			bottom: 24rpx;
			left: 16rpx;
			width: 584rpx;
			height: 38rpx;
			background: $default-bg-black;
			opacity: 0.3;
			border-radius: 0 0 10rpx 10rpx;
		}
		&_title {
			color: $default-text-color-white;
			font-size: 24rpx;
			height: 38rpx;
			line-height: 38rpx;
			@include center;
			top: 276rpx;
		}
	}
}
</style>
