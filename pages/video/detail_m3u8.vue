<!--
 * @Description: 视频详情m3u8
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-24 23:10:59
 * @LastEditTime: 2019-11-26 14:04:06
 * @LastEditors: Edmund
 -->


<template>
  <view class="container" :style="{ height: windowHeight + 'px' }">
    <!-- <web-view src="http://cbs.sports.cctv.com/match.html?id=4412084"></web-view> -->
    <view class="header">
      <text class="arrow-left iconfont" @tap.stop="naviBack">
        &#xe602;
      </text>
      <!-- TODO:player -->
      <!-- #ifdef H5 -->
      <iframe v-if="RouteData.playLive.length === 0 && RouteData.sourceLive.length > 1"
							:src="RouteData.sourceLive"
							frameborder="0" 
							height="100%" 
							scrolling='auto' 
							style="width: 1px; min-width: 100%; *width: 100%;">
			</iframe>
      <player	v-if="RouteData.playLive"
							:url="RouteData.playLive"
							:width="750"
							:height="420"
							:poster="poster"
							:type="type"/>
      <!-- #endif -->

      <!-- 文章详情 -->
      <view class="detail">
        <view class="title">{{RouteData.liveTitle}}</view>

        <!-- 详情控件区 -->
        <view class="controls">
          <view class="controls_left">
            <text class="time">{{ RouteData.createdTime }}</text>
            <text class="playTimes">{{ playTimes }}次播放</text>
          </view>
          <view class="controls_right">
            <!-- 点赞 -->
            <view class="vote" @tap.stop="handleVote">
              <text class="iconfont">&#xe603;</text>
              <text>{{ RouteData.likeNumber || 0 }}</text>
            </view>

            <!-- 评论 -->
            <view class="comment">
              <text class="iconfont">&#xe642;</text>
              <text>{{ commentTimes }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- body -->
    <view class="body">
      <view class="title">
        <view class="commentSum">
          <text>全部评论 {{ commentSum }}</text>
        </view>
        <view class="hot" @tap.stop="comment">
          <text>热门评论</text>
          <text class="iconfont" style="font-size:22rpx;">
            &#xe684;
          </text>
        </view>
      </view>
      <view class="chatBox">
        <chat :height="626" :chatDataList="chatDataList" />
      </view>
    </view>

    <!-- footer -->
    <view class="footer">
      <input
        ref="input"
        type="text"
        class="input"
        placeholder="评论功能未接入"
        v-model="inputValue"
      />
      <text class="iconfont vote">
        &#xe603;
      </text>
    </view>
  </view>
</template>

<script>
let that
import chat from 'components/chat.vue'
export default {
	name: 'video-detail',
	components: {
		// #ifdef H5
		player: () => {
			return import('platform/h5/player/xgplayer.vue')
		},
		// #endif
		chat
	},
	props: {},
	data() {
		return {
			windowHeight: 0,
			// TODO: 路由传参数据
			RouteData: null,
			// TODO: 聊天室组件所需数据
			chatDataList: [
				{ otherText: '39其中冠亚和值6码，09至14..' },
				{ myText: '1' },
				{ myText: '2' },
				{ myText: '3' },
				{ myText: '4' },
				{ myText: '5' },
				{ myText: '一阵大概率是詹姆斯、小卡、阿杜、哈登、库里' },
				{ myText: '卢本伟牛逼' },
				{ otherText: '我也觉得一阵大概率是詹姆斯、小卡、阿杜、哈 登、库里' },
				{ otherText: '评论2' },
				{ otherText: '评论3' },
				{ otherText: '评论4' }
			],
			// TODO: 播放器组件所需数据
			// url: `http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8`,
			type: 2, // 播放器类型，2为hls，m3u8
			poster: '', // 封面
			playTimes: 1, // 播放次数
			commentTimes: 0, // 评论次数
			commentSum: 0, // 评论总数
			// TODO: vote行为对象
			vote: {
				able: true,
				sum: 0
			},
			// TODO: 输入框绑定数据
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
		// 配置页面容器自适应高度
		that.windowHeight = that.$sysCall.windowHeight()
		that.RouteData = getApp().globalData.routerData
		// 赋值后，释放内存
		getApp().globalData.routerData = null
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
	methods: {
		naviBack() {
			that.$sysCall.naviBack()
		},
		handleVote() {
			if (!that.vote.able) return that.$sysCall.toast('已点过赞')
			that.RouteData.likeNumber = that.RouteData.likeNumber || 0
			that.RouteData.likeNumber++
			that.$sysCall.toast('点赞成功')
		},
		comment() {
			console.log('focus')
			that.$refs.input.focus()
		}
	},
	computed: {},
	watch: {}
}
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	/* header */
	.header {
		height: 564rpx;
		.arrow-left {
			position: fixed;
			top: 66rpx;
			left: 36rpx;
			width: 36rpx;
			height: 36rpx;
			font-size: 36rpx;
			z-index: 200;
		}
		.detail {
			background: rgba(255, 255, 255, 1);
			padding: 23rpx 20rpx 23rpx 20rpx;
			.title {
				white-space: nowrap;
				font-size: 34rpx;
			}
			.controls {
				display: flex;
				width: 100%;
				height: 30rpx;
				line-height: 30rpx;
				font-size: 22rpx;
				margin-top: 20rpx;
				&_left {
					flex: 1;
					display: flex;
					justify-content: flex-start;
					.playTimes {
						margin-left: 20rpx;
					}
				}
				&_right {
					flex: 1;
					display: flex;
					justify-content: flex-end;
					.comment {
						margin-left: 20rpx;
					}
				}
			}
		}
	}
	/* body */
	.body {
		flex: 1;
		position: relative;
		.title {
			padding: 0 20rpx;
			display: flex;
			align-items: center;
			font-size: 24rpx;
			font-weight: bold;
			height: 56rpx;
			background: $default-bg-gray;
			.hot {
				flex: 1;
				display: flex;
				justify-content: flex-end;
			}
		}
		.chatBox {
			flex: 1;
		}
	}
	/* footer */
	.footer {
		position: fixed;
		bottom: 0;
		height: 88rpx;
		width: 100vw;
		border-top: 1px solid $default-border-color-gray;
		display: flex;
		align-items: center;
		padding-left: 20rpx;
		background: rgba(255, 255, 255, 1);
		.input {
			width: 654rpx;
			height: 68rpx;
			padding-left: 17rpx;
			background: $default-bg-gray;
			border: 1rpx solid $default-border-color-gray;
			border-radius: 12rpx;
			font-size: 26rpx;
		}
		.vote {
			margin-left: 20rpx;
			font-size: 36rpx;
		}
	}
}
</style>
