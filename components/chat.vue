<!--
 * @Description: 聊天室组件
 * @Author: Edmund
 * @Email: q1592193221@gmail.com
 * @Date: 2019-11-20 17:32:51
 * @LastEditTime: 2019-11-20 23:19:45
 * @LastEditors: Edmund
 -->

<template>
    <view class="container">
      <scroll-view  :scroll-y="true"
                    class="scroll-box"
										@scroll="scroll"
										@touchstart="touchStart"
										@touchmove="touchMove"
                    :style="{height: height + 'rpx'}">
          <loadmore :visible="loading"
                        :index="3"
                        type="primary"
                        text=" ">
          </loadmore>
          <view class="chat-content">
              <block v-for="(item,idx) in chatDataList" :key="idx">
                <view >
                  <view class="chat-center"
                        v-if="item.time">
                    {{item.time}}
                  </view>
                  <!-- other people -->
                  <view   class="chat-right"
                          v-if="item.otherText">
                    <view class="chatbox chatbox-right">
                      {{item.otherText}}
                    </view>
                    <image src="" class="user-pic left"></image>
                  </view>
                  <!-- mine -->
                  <view   class="chat-left"
                          v-if="item.myText">
                    <image src="" class="user-pic right"></image>
                    <view class="chatbox chatbox-left">
                        {{item.myText}}
                    </view>
                  </view>
                </view>
            </block>
            <view style="height:40rpx;"/>
          </view>
      </scroll-view>
  </view>
</template>


<script>
let that
import _ from 'underscore'
import loadmore from 'components/loadmore/loadmore.vue'
export default {
	name: 'chat',
	components: {
		loadmore
	},
	props: {
		chatDataList: {
			type: Array,
			default: []
		},
		height: {
			type: Number,
			default: 930
		}
	},
	data() {
		return {
			loading: false,
			couldLoad: true,
			// TODO: 记录触发操作
			oldX: 0,
			oldY: 0
		}
	},
	beforeCreate() {},
	created() {
		that = this
	},
	beforeMount() {},
	mounted() {},
	beforeDestroy() {},
	destroyed() {},
	methods: {
		/**
		 * @Description: 滚动容器滚动时触发
		 * @param {type}
		 * @return:
		 */
		scroll(e) {
			let scrollTop = e.mp.target.scrollTop
			if (scrollTop < 10) {
				that.couldLoad = true
			}
			if (scrollTop > 10 && scrollTop <= 20) {
				that.couldLoad = false
			}
		},

		/**
		 * @Description: 开始触摸盒子容器时触发
		 */
		touchStart(e) {
			that.oldX = e.touches[0].pageX
			that.oldY = e.touches[0].pageY
		},
		/**
		 * @Description: 手指在盒子容器中滑动过程中触发
		 */
		touchMove(e) {
			if (!that.couldLoad) return
			let currentX = e.touches[0].pageX
			let currentY = e.touches[0].pageY
			let tx = currentX - that.oldX
			let ty = currentY - that.oldY
			if (Math.abs(tx) < 50) {
				if (ty > 120) {
					that.loadmore()
				}
			}
		},
		loadmore: _.debounce(() => {
			that.$sysCall.toast('触发向下拉动加载更多')
			that.loading = true
			setTimeout(() => {
				that.loading = false
			}, 2000)
		}, 300)
	},
	computed: {},
	watch: {}
}
</script>

<style lang="scss" scoped>
.container {
	box-sizing: border-box;
	width: 100vw;
	height: 100%;
	overflow: hidden;
}
.scroll-box {
	display: flex;
	flex-direction: column;
}
.label {
	display: inline-block;
	background: rgba(0, 0, 0, 0.4);
	color: #fff;
	font-size: 24rpx;
	line-height: 24rpx;
	margin-top: 36rpx;
	padding: 12rpx 16rpx;
	text-align: center;
	border-radius: 8rpx;
	margin-left: 50%;
	transform: translateX(-50%);
}
.chat-center {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 28rpx;
	font-size: 28rpx;
	color: #666;
	padding-top: 36rpx;
}

.chat-left {
	display: flex;
	margin-left: 20rpx;
	justify-content: flex-start;
	padding-top: 36rpx;
}
.chat-right {
	display: flex;
	margin-right: 20rpx;
	justify-content: flex-end;
	padding-top: 36rpx;
}

.chatbox {
	max-width: 66%;
	border-radius: 10rpx;
	position: relative;
	margin: 0 20rpx;
	padding: 20rpx 22rpx;
	font-size: 32rpx;
	color: #000;
	/* text-align: justify; */
	word-break: break-all;
	word-wrap: break-word;
}
.chatbox-right {
	background: #a0d5f3;
	border: 1upx solid #a0d5f3;
}

.user-pic {
	width: 80rpx;
	height: 80rpx;
	flex-shrink: 0;
	border: 1rpx solid black;
	border-radius: 50%;
	display: block;
}

// .left {
// 	margin-left: 26rpx;
// }
// .right {
// 	margin-right: 26rpx;
// }

.chatbox-left {
	background: #fff;
	border: 1rpx solid #fff;
	display: inline-block;
}
</style>